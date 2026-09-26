/**
 * ============================================================================
 * PROJETO CERTIFICADORA UTFPR - AS64C: FRONTLINGO
 * Arquivo: js/trail.js
 * Papel no Sistema: Renderizador da Trilha Gamificada e Animações (Estilo Duolingo)
 * ============================================================================
 * 
 * 💡 EXPLICAÇÃO DIDÁTICA PARA O PROFESSOR:
 * "Professor, este arquivo é responsável pela experiência visual da Trilha de
 * Aprendizado. Ele transforma a lista de módulos e lições em uma jornada
 * interativa que lembra jogos como o Duolingo:
 * 
 * 1. DESIGN SINUOSO EM ZIGUE-ZAGUE: Os botões das fases não ficam em linha reta
 *    chata; usamos um cálculo de deslocamento horizontal alternado (offset X)
 *    para criar o caminho sinuoso característico.
 * 2. REGRAS DE BLOQUEIO / DESBLOQUEIO: As trilhas avançadas começam trancadas com
 *    cadeados. Assim que o aluno conclui a última fase da Trilha anterior, o
 *    sistema desbloqueia automaticamente a próxima trilha com animação de scroll,
 *    fanfarra sonora e chuva de confetes.
 * 3. ANIMAÇÃO DE CONFETES NATIVA (Canvas HTML5): Feita 100% com a API de desenho
 *    2D nativa do navegador, sem precisar instalar plugins pesados."
 * ============================================================================
 */

import { MODULES_DATA } from './data/modules.js';
import { appState } from './state.js';
import { soundEffects } from './audio.js';

/**
 * 1. EFEITO DE CONFETES EM CANVAS NATIVO (HTML5 2D Context)
 * Cria uma camada transparente temporária por cima da página e dispara
 * 80 partículas coloridas simulando papel picado comemorativo.
 */
export function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none'; // Permite clicar através do canvas sem travar a tela
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Paleta vibrante com as cores das trilhas
  const colors = ['#58CC02', '#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF', '#2B70C9', '#2CE6A6'];
  const particles = [];
  const particleCount = 80;

  // Cria 80 partículas com posições, velocidades e rotações aleatórias
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 1.2) * 14 - 4,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.35,
      opacity: 1
    });
  }

  const startTime = Date.now();
  const duration = 2800; // 2.8 segundos de animação comemorativa

  function animate() {
    const elapsed = Date.now() - startTime;
    // Quando o tempo limite expirar, remove o canvas da memória
    if (elapsed > duration) {
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza a física de cada partícula
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98; // Atrito do ar suave
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - (elapsed / duration)); // Desaparece gradualmente

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * 2. CLASSE RENDERIZADORA DA TRILHA
 * Responsável por desenhar as caixas de cada módulo, os círculos (nós) de cada lição
 * e os popups com informações da fase.
 */
export class TrailRenderer {
  constructor(containerId, onStartLesson) {
    this.container = document.getElementById(containerId);
    this.onStartLesson = onStartLesson; // Callback chamado quando o aluno clica em 'Começar Lição'
    this.activePopoverNodeId = null;
    this.customMascotMessage = null;

    // Cria uma lista simples com todos os IDs de lições em ordem
    this.allLessonIds = [];
    MODULES_DATA.forEach(mod => {
      mod.lessons.forEach(l => this.allLessonIds.push(l.id));
    });
  }

  /**
   * Renderiza toda a estrutura da trilha no DOM
   */
  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const state = appState.getState();
    const completed = state.completedLessons || [];

    // --- BANNER DO MASCOTE MOTIVACIONAL (DevBot) ---
    const mascotBanner = document.createElement('div');
    mascotBanner.className = 'trail-mascot-banner';
    
    // Procura qual é a próxima lição que o aluno ainda não fez
    const nextLessonId = this.allLessonIds.find(id => !completed.includes(id)) || this.allLessonIds[0];
    let nextLessonTitle = "Mandar bala na primeira fase!";
    for (const mod of MODULES_DATA) {
      const found = mod.lessons.find(l => l.id === nextLessonId);
      if (found) {
        nextLessonTitle = `${found.code} ${found.title}`;
        break;
      }
    }

    if (this.customMascotMessage) {
      mascotBanner.innerHTML = `
        <div class="mascot-avatar">
          <div class="mascot-face celebration-face">🚀</div>
          <div class="mascot-badge">DevBot</div>
        </div>
        <div class="mascot-bubble mascot-celebrate">
          <p class="bubble-title"><strong>${this.customMascotMessage.title}</strong></p>
          <p class="bubble-desc">${this.customMascotMessage.desc}</p>
        </div>
      `;
    } else {
      mascotBanner.innerHTML = `
        <div class="mascot-avatar">
          <div class="mascot-face">🤖</div>
          <div class="mascot-badge">DevBot</div>
        </div>
        <div class="mascot-bubble">
          <p class="bubble-title"><strong>Bora codar seu currículo!</strong></p>
          <p class="bubble-desc">Seu próximo passo é dominar: <span>${nextLessonTitle}</span>. Cada fase adiciona um superpoder ao seu portfólio!</p>
        </div>
      `;
    }
    this.container.appendChild(mascotBanner);

    // --- RENDERIZAÇÃO DE CADA UNIDADE / MÓDULO ---
    MODULES_DATA.forEach((module, modIndex) => {
      const modProgress = appState.getModuleProgress(module.id, MODULES_DATA);
      const isTrailUnlocked = modProgress.isUnlocked;
      const isTrailCompleted = modProgress.isCompleted;

      const unitCard = document.createElement('div');
      unitCard.id = `unit-mod-${module.id}`;
      let statusClass = 'active-trail';
      if (!isTrailUnlocked) {
        statusClass = 'locked';
      } else if (isTrailCompleted) {
        statusClass = 'completed';
      }
      unitCard.className = `trail-unit ${statusClass}`;
      unitCard.style.setProperty('--unit-color', module.color);
      unitCard.style.setProperty('--unit-accent', module.accentColor);

      // Cabeçalho da Unidade com badges e porcentagem
      const unitHeader = document.createElement('div');
      unitHeader.className = 'unit-header';

      let tagHTML = `<span class="unit-tag active">⚡ Trilha ${module.number} • Em Andamento</span>`;
      let progressPillHTML = `<span class="unit-progress-pill active">${modProgress.completed}/${modProgress.total} Fases (${modProgress.percent}%)</span>`;
      let subtitleText = module.subtitle;

      if (!isTrailUnlocked) {
        tagHTML = `<span class="unit-tag locked">🔒 Trilha ${module.number} • Bloqueada</span>`;
        progressPillHTML = `<span class="unit-progress-pill locked">Aguardando Trilha ${module.number - 1} 🔒</span>`;
        subtitleText = `Conclua a Trilha ${module.number - 1} para desbloquear esta trilha!`;
      } else if (isTrailCompleted) {
        tagHTML = `<span class="unit-tag completed">✔ Trilha ${module.number} • 100% Concluída</span>`;
        progressPillHTML = `<span class="unit-progress-pill completed">Concluída 🏆</span>`;
      }

      unitHeader.innerHTML = `
        <div class="unit-info">
          <div class="unit-badges-row">
            ${tagHTML}
            ${progressPillHTML}
          </div>
          <h2 class="unit-title">Trilha ${module.number}: ${module.title.replace(/^(Módulo|Trilha)\s*\d+:\s*/, '')}</h2>
          <p class="unit-subtitle">${subtitleText}</p>
        </div>
        <div class="unit-icon-box ${!isTrailUnlocked ? 'locked-icon-box' : ''}">
          <span class="unit-main-icon">${this._getModuleIcon(module.number)}</span>
          ${!isTrailUnlocked ? '<span class="unit-lock-badge">🔒</span>' : ''}
          ${isTrailCompleted ? '<span class="unit-star-badge">★</span>' : ''}
        </div>
      `;
      unitCard.appendChild(unitHeader);

      // Container onde ficam os nós circulares das fases
      const pathContainer = document.createElement('div');
      pathContainer.className = 'unit-path';

      // Se a trilha está bloqueada, insere um banner visual explicando o porquê
      if (!isTrailUnlocked) {
        const lockedOverlay = document.createElement('div');
        lockedOverlay.className = 'trail-locked-curtain';
        lockedOverlay.innerHTML = `
          <div class="curtain-card">
            <span class="curtain-lock">🔒</span>
            <h4>Trilha ${module.number} Bloqueada</h4>
            <p>Finalize todas as fases da Trilha anterior para liberar o acesso a estes desafios!</p>
          </div>
        `;
        pathContainer.appendChild(lockedOverlay);
      }

      // POSICIONAMENTO SINUOSO (Zigue-Zague estilo Duolingo)
      // Alterna deslocamento horizontal: Centro (0px), Direita (+40px), Esquerda (-40px)...
      const horizontalOffsets = [0, 40, -40, 20, -20];

      module.lessons.forEach((lesson, lIndex) => {
        const isLessonDone = state.completedLessons.includes(lesson.id);
        const isLessonAvail = appState.isLessonUnlocked(lesson.id, this.allLessonIds, MODULES_DATA);
        const isCurrent = isLessonAvail && !isLessonDone;

        const isVideo = lesson.isVideoLesson || (lesson.code && lesson.code.endsWith('.0'));

        // Desloca o nó usando o array de offsets e o operador de resto (%)
        const offset = horizontalOffsets[lIndex % horizontalOffsets.length];

        const nodeWrapper = document.createElement('div');
        nodeWrapper.className = 'node-wrapper';
        nodeWrapper.style.transform = `translateX(${offset}px)`;

        // Botão circular do nó
        const nodeBtn = document.createElement('button');
        nodeBtn.className = `trail-node ${isVideo ? 'video-node' : ''} ${isLessonDone ? 'completed' : ''} ${isCurrent ? 'current pulse' : ''} ${!isLessonAvail ? 'locked' : ''}`;
        nodeBtn.setAttribute('data-lesson-id', lesson.id);
        nodeBtn.title = `${lesson.code}: ${lesson.title}`;

        // Ícone interno do botão
        let nodeIcon = isVideo ? '🎬' : '★';
        if (!isLessonAvail) nodeIcon = '🔒';
        else if (isLessonDone) nodeIcon = '✔';
        else if (isCurrent) nodeIcon = isVideo ? '🎬' : '⭐';

        nodeBtn.innerHTML = `
          <div class="node-icon">${nodeIcon}</div>
          ${isCurrent ? '<div class="node-crown">👑</div>' : ''}
          ${isLessonDone ? '<div class="node-stars">★★★</div>' : ''}
        `;

        // POPOVER / BALÃO DE DETALHES DA FASE
        const popover = document.createElement('div');
        popover.className = 'node-popover';
        popover.id = `popover-${lesson.id}`;
        popover.innerHTML = `
          <div class="popover-arrow"></div>
          <div class="popover-header">
            <span class="popover-code">${lesson.code}</span>
            <span class="popover-xp">+${lesson.xp} XP ⚡</span>
          </div>
          ${isVideo ? '<div class="popover-video-tag">🎬 VÍDEO EXPLICATIVO DO MÓDULO</div>' : ''}
          <h4 class="popover-title">${lesson.title}</h4>
          <p class="popover-summary">${lesson.summary}</p>
          <div class="popover-milestone">
            <span class="milestone-icon">🎁</span>
            <span class="milestone-text">Desbloqueia no Currículo: <strong>${lesson.portfolioMilestone}</strong></span>
          </div>
          ${isLessonAvail ? `
            <button class="btn-start-lesson ${isLessonDone ? 'btn-replay' : 'btn-primary'} ${isVideo ? 'btn-video' : ''}">
              ${isLessonDone ? (isVideo ? 'Rever Vídeo ↺' : 'Revisar Fase ↺') : (isVideo ? 'Assistir Vídeo ▶' : 'Começar! ▶')}
            </button>
          ` : `
            <div class="popover-locked-msg">
              <span>🔒 ${!isTrailUnlocked ? `Finalize a Trilha ${module.number - 1} para liberar!` : 'Complete as fases anteriores para desbloquear!'}</span>
            </div>
          `}
        `;

        // Clique no nó circular abre/fecha o balão
        nodeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!isLessonAvail) {
            soundEffects.playError();
          } else {
            soundEffects.playPop();
          }
          this._togglePopover(lesson.id);
        });

        // Clique no botão interno 'Começar' inicia o modal da lição
        const startBtn = popover.querySelector('.btn-start-lesson');
        if (startBtn) {
          startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._closeAllPopovers();
            if (this.onStartLesson) {
              this.onStartLesson(lesson);
            }
          });
        }

        nodeWrapper.appendChild(nodeBtn);
        nodeWrapper.appendChild(popover);
        pathContainer.appendChild(nodeWrapper);
      });

      unitCard.appendChild(pathContainer);
      this.container.appendChild(unitCard);
    });

    // Fecha qualquer balão aberto ao clicar fora
    document.addEventListener('click', () => {
      this._closeAllPopovers();
    });
  }

  /**
   * 3. TRANSIÇÃO DE DESBLOQUEIO AUTOMÁTICO DE TRILHA
   * Executado quando a lição final da trilha é terminada com êxito.
   */
  handleTrailUnlocked(nextModule) {
    if (!nextModule) {
      this.render();
      return;
    }

    // Configura a mensagem comemorativa do DevBot
    this.customMascotMessage = {
      title: `🎉 Trilha Desbloqueada Automaticamente!`,
      desc: `Parabéns pela conquista! A <strong>${nextModule.title}</strong> foi liberada! Suas novas lições já estão disponíveis.`
    };

    // Atualiza a tela com o novo status desbloqueado
    this.render();

    // Dispara confetes e som comemorativo
    triggerConfetti();
    soundEffects.playUnlock();

    // Rola suavemente a página até a nova trilha liberada
    setTimeout(() => {
      const nextCard = document.getElementById(`unit-mod-${nextModule.id}`);
      if (nextCard) {
        nextCard.classList.add('just-unlocked');
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Abre automaticamente o balão da primeira fase liberada
        setTimeout(() => {
          const firstLesson = nextModule.lessons && nextModule.lessons[0];
          if (firstLesson) {
            this._togglePopover(firstLesson.id);
          }
        }, 800);
      }
    }, 150);
  }

  /**
   * Alterna a visibilidade do balão de detalhes de uma lição
   */
  _togglePopover(lessonId) {
    const target = document.getElementById(`popover-${lessonId}`);
    if (!target) return;

    const isAlreadyOpen = target.classList.contains('active');
    this._closeAllPopovers();

    if (!isAlreadyOpen) {
      target.classList.add('active');
      this.activePopoverNodeId = lessonId;

      // Garante que o elemento fique por cima das outras camadas
      const wrapper = target.closest('.node-wrapper');
      if (wrapper) wrapper.classList.add('has-active-popover');
      const unit = target.closest('.trail-unit');
      if (unit) unit.classList.add('has-active-popover');
    }
  }

  /**
   * Fecha todos os balões abertos
   */
  _closeAllPopovers() {
    const popovers = document.querySelectorAll('.node-popover.active');
    popovers.forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.has-active-popover').forEach(el => el.classList.remove('has-active-popover'));
    this.activePopoverNodeId = null;
  }

  /**
   * Retorna um ícone representativo para cada número de módulo
   */
  _getModuleIcon(num) {
    switch (num) {
      case 1: return '🌐';
      case 2: return '📄';
      case 3: return '🎨';
      case 4: return '⚡';
      case 5: return '🚀';
      default: return '📚';
    }
  }
}
