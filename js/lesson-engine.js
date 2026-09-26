/**
 * ============================================================================
 * PROJETO CERTIFICADORA UTFPR - AS64C: FRONTLINGO
 * Arquivo: js/lesson-engine.js
 * Papel no Sistema: Mecanismo de Execução de Lições Interativas (Máquina de Estados)
 * ============================================================================
 * 
 * 💡 EXPLICAÇÃO DIDÁTICA PARA O PROFESSOR:
 * "Professor, este arquivo gerencia o 'Player de Lição', que é o modal interativo
 * onde o estudante aprende e é avaliado no estilo Duolingo.
 * 
 * Implementamos aqui uma MÁQUINA DE ESTADOS que controla o fluxo da lição:
 * 1. MULTIFORMATO DE PERGUNTAS: Suportamos 5 tipos pedagógicos diferentes:
 *    - Teoria com código formatado (explicando a base conceitual);
 *    - Múltipla escolha (Quiz direto);
 *    - Preenchimento de lacunas de código (Fill-in-the-blank);
 *    - Quebra-cabeça de ordenação de blocos (Puzzle interativo);
 *    - Associação de pares/colunas (Match).
 * 2. FEEDBACK IMEDIATO: Ao clicar em 'Verificar', o aluno recebe resposta
 *    instantânea (verde com som de vitória se acertou; vermelho com som de erro
 *    e perda de vida se errou).
 * 3. APRENDIZAGEM PARA O DOMÍNIO (Mastery Learning): Para garantir que o aluno
 *    realmente aprendeu o conteúdo daquela fase do currículo, exigimos 100% de
 *    acertos na fase para desbloquear o nível seguinte."
 * ============================================================================
 */

import { appState } from './state.js';
import { soundEffects } from './audio.js';
import { MODULES_DATA } from './data/modules.js';

export class LessonEngine {
  constructor(modalElementId, onLessonFinished) {
    this.modal = document.getElementById(modalElementId);
    this.onLessonFinished = onLessonFinished;

    this.currentLesson = null;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.isAnswerChecked = false;
    this.isCurrentCorrect = false;

    // Elementos de interface mapeados do modal
    this.progressBar = this.modal.querySelector('.lesson-progress-fill');
    this.livesCounter = this.modal.querySelector('.lesson-lives-count');
    this.closeBtn = this.modal.querySelector('.btn-close-lesson');
    this.contentArea = this.modal.querySelector('.lesson-content-area');
    this.footerBanner = this.modal.querySelector('.lesson-footer-banner');
    this.footerFeedback = this.modal.querySelector('.footer-feedback');
    this.actionBtn = this.modal.querySelector('.btn-lesson-action');

    this._bindEvents();
  }

  /**
   * Conecta os botões de fechar e ação principal
   */
  _bindEvents() {
    this.closeBtn.addEventListener('click', () => {
      if (this.isFinished) {
        this._finishLesson();
      } else if (confirm("Deseja sair da lição? O progresso desta fase será reiniciado.")) {
        this.closeModal();
      }
    });

    this.actionBtn.addEventListener('click', () => {
      this._handleActionClick();
    });
  }

  /**
   * Inicializa uma nova lição e abre o modal em tela cheia
   */
  startLesson(lesson) {
    this.currentLesson = lesson;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.isAnswerChecked = false;
    this.isCurrentCorrect = false;
    this.isFinished = false;
    this.isFailedPhase = false;
    this.mistakesCount = 0;
    this.finishData = null;

    this.modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this._updateHeader();
    this._renderCurrentQuestion();
  }

  /**
   * Fecha o modal e devolve a rolagem normal para a página
   */
  closeModal() {
    this.modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.isFinished = false;
    this.finishData = null;
  }

  /**
   * Finaliza formalmente a lição e dispara o callback para o app principal
   */
  _finishLesson(targetView = null) {
    const data = this.finishData || { lesson: this.currentLesson, justCompletedTrail: false };
    if (targetView) {
      data.targetView = targetView;
    }
    this.closeModal();
    if (this.onLessonFinished) {
      this.onLessonFinished(data);
    }
  }

  /**
   * Atualiza a barra verde de progresso superior e o contador de vidas
   */
  _updateHeader() {
    const total = this.currentLesson.questions.length;
    const current = this.currentQuestionIndex;
    const percent = (current / total) * 100;
    this.progressBar.style.width = `${percent}%`;

    const state = appState.getState();
    this.livesCounter.textContent = state.lives;
  }

  /**
   * Direciona a renderização conforme o tipo pedagógico da questão atual
   */
  _renderCurrentQuestion() {
    this.isAnswerChecked = false;
    this.selectedAnswer = null;
    this._resetFooter();

    const q = this.currentLesson.questions[this.currentQuestionIndex];
    this.contentArea.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'question-container';

    switch (q.type) {
      case 'video':
        this._renderVideo(container, q);
        break;
      case 'theory':
        this._renderTheory(container, q);
        break;
      case 'quiz':
        this._renderQuiz(container, q);
        break;
      case 'fill_blank':
        this._renderFillBlank(container, q);
        break;
      case 'puzzle':
        this._renderPuzzle(container, q);
        break;
      case 'match':
        this._renderMatch(container, q);
        break;
      default:
        container.innerHTML = `<p>Tipo de pergunta desconhecido</p>`;
    }

    this.contentArea.appendChild(container);
  }

  // ==========================================================================
  // RENDERIZADORES DOS TIPOS DE QUESTÕES
  // ==========================================================================

  /**
   * TIPO 0: VÍDEO-AULA EXPLICATIVA (Gravada pela Equipe UTFPR)
   * Suporta incorporação de vídeo do YouTube (iframe) ou arquivo MP4/WebM local,
   * além de um placeholder visual elegante com instruções para a equipe.
   */
  _renderVideo(container, q) {
    const hasVideo = q.videoUrl && q.videoUrl.trim().length > 0;
    const isYouTube = hasVideo && (q.videoUrl.includes('youtube.com') || q.videoUrl.includes('youtu.be'));
    
    let videoMediaHTML = '';
    if (hasVideo) {
      if (isYouTube) {
        let embedUrl = q.videoUrl;
        if (q.videoUrl.includes('watch?v=')) {
          embedUrl = q.videoUrl.replace('watch?v=', 'embed/');
        } else if (q.videoUrl.includes('youtu.be/')) {
          embedUrl = q.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
        }
        videoMediaHTML = `
          <div class="video-embed-wrapper">
            <iframe src="${embedUrl}" title="${q.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      } else {
        videoMediaHTML = `
          <div class="video-embed-wrapper">
            <video controls src="${q.videoUrl}" style="width:100%; height:100%; border-radius:12px; background:#000;">
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
        `;
      }
    } else {
      videoMediaHTML = `
        <div class="video-placeholder-frame">
          <div class="video-placeholder-badge">🎬 Vídeo da Equipe UTFPR</div>
          <div class="video-placeholder-icon">🎥</div>
          <h3 class="video-placeholder-title">${q.title}</h3>
          <p class="video-placeholder-desc">${q.description || 'Assista à explicação gravada pela equipe apresentando a teoria e prática deste módulo.'}</p>
          <div class="video-instruction-box">
            <span class="instruction-tag">📌 Como Inserir o Vídeo Gravado:</span>
            <p>Abra o arquivo <code>js/data/modules.js</code> e cole o link do <strong>YouTube</strong> ou caminho do arquivo <strong>.mp4</strong> na propriedade <code>videoUrl</code> desta lição!</p>
          </div>
        </div>
      `;
    }

    const pointsHTML = (q.summaryPoints && q.summaryPoints.length > 0) ? `
      <div class="video-summary-card">
        <h4 class="video-summary-title">📋 O que você aprenderá neste módulo:</h4>
        <ul class="video-summary-list">
          ${q.summaryPoints.map(p => `<li><span class="point-check">✔</span> <span>${this._escapeHtml(p)}</span></li>`).join('')}
        </ul>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="video-lesson-card">
        <div class="video-header">
          <span class="video-tag">🎬 Vídeo Explicativo do Módulo</span>
          <h2 class="video-main-title">${q.title}</h2>
          ${q.description && hasVideo ? `<p class="video-desc-text">${q.description}</p>` : ''}
        </div>
        ${videoMediaHTML}
        ${pointsHTML}
        ${q.tip ? `
          <div class="theory-tip" style="margin-top: 16px;">
            <span class="tip-icon">💡</span>
            <div class="tip-text"><strong>Dica:</strong> ${q.tip}</div>
          </div>
        ` : ''}
      </div>
    `;

    this.actionBtn.textContent = "Assistir e Continuar ▶";
    this.actionBtn.className = "btn-lesson-action btn-continue active";
    this.selectedAnswer = "video_watched";
  }

  /**
   * TIPO 1: TEORIA & CÓDIGO EXPLICATIVO
   * Formata texto em negrito, blocos de código e dicas de boas práticas.
   */
  _renderTheory(container, q) {
    let formattedText = q.explanation
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, (m, code) => `<code>${this._escapeHtml(code)}</code>`)
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    // Formatação de blocos com marcação de linguagem
    formattedText = formattedText.replace(/```(html|css|javascript)?<br>([\s\S]*?)<br>```/g, (match, lang, code) => {
      const cleanCode = code.replace(/<br>/g, '\n');
      return `<pre class="code-snippet"><code>${this._escapeHtml(cleanCode)}</code></pre>`;
    });

    container.innerHTML = `
      <div class="theory-card">
        <div class="theory-header">
          <span class="theory-badge">💡 Conceito Essencial</span>
          <h2 class="theory-title">${q.title}</h2>
        </div>
        <div class="theory-body">${formattedText}</div>
        ${q.tip ? `
          <div class="theory-tip">
            <span class="tip-icon">✨</span>
            <div class="tip-text"><strong>Dica Pro:</strong> ${q.tip}</div>
          </div>
        ` : ''}
      </div>
    `;

    this.actionBtn.textContent = "Entendi! Continuar ▶";
    this.actionBtn.className = "btn-lesson-action btn-continue active";
    this.selectedAnswer = "theory_read";
  }

  /**
   * TIPO 2: MÚLTIPLA ESCOLHA (QUIZ)
   * Renderiza alternativas clicáveis com numeração e destaque visual.
   */
  _renderQuiz(container, q) {
    container.innerHTML = `
      <div class="quiz-box">
        <h2 class="quiz-question">${q.question}</h2>
        <div class="quiz-options-list"></div>
      </div>
    `;

    const list = container.querySelector('.quiz-options-list');
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-key">${idx + 1}</span>
        <span class="option-text">${this._escapeHtml(opt.text)}</span>
      `;

      btn.addEventListener('click', () => {
        if (this.isAnswerChecked) return;
        soundEffects.playPop();
        container.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedAnswer = opt;
        this.actionBtn.textContent = "Verificar Resposta";
        this.actionBtn.className = "btn-lesson-action btn-verify active";
      });

      list.appendChild(btn);
    });

    this.actionBtn.textContent = "Selecione uma opção";
    this.actionBtn.className = "btn-lesson-action btn-verify disabled";
  }

  /**
   * TIPO 3: PREENCHIMENTO DE LACUNAS DE CÓDIGO (FILL IN THE BLANK)
   * Permite ao aluno digitar diretamente a tag ou propriedade que falta no código.
   */
  _renderFillBlank(container, q) {
    container.innerHTML = `
      <div class="fill-box">
        <h2 class="quiz-question">${q.question}</h2>
        <div class="code-line-fill">
          <span class="code-part">${this._escapeHtml(q.prefix)}</span>
          <input type="text" class="input-blank" placeholder="${q.placeholder || 'digite aqui'}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <span class="code-part">${this._escapeHtml(q.suffix)}</span>
        </div>
        ${q.hint ? `<p class="blank-hint">💡 <em>Dica: ${q.hint}</em></p>` : ''}
      </div>
    `;

    const input = container.querySelector('.input-blank');
    input.focus();

    input.addEventListener('input', () => {
      if (this.isAnswerChecked) return;
      const val = input.value.trim();
      if (val.length > 0) {
        this.selectedAnswer = val;
        this.actionBtn.textContent = "Verificar Resposta";
        this.actionBtn.className = "btn-lesson-action btn-verify active";
      } else {
        this.selectedAnswer = null;
        this.actionBtn.textContent = "Digite para continuar";
        this.actionBtn.className = "btn-lesson-action btn-verify disabled";
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.selectedAnswer && !this.isAnswerChecked) {
        this._handleActionClick();
      }
    });

    this.actionBtn.textContent = "Digite para continuar";
    this.actionBtn.className = "btn-lesson-action btn-verify disabled";
  }

  /**
   * TIPO 4: QUEBRA-CABEÇA DE ORDENAÇÃO (PUZZLE DE BLOCOS)
   * O estudante clica nas peças para organizá-las na ordem correta do código.
   */
  _renderPuzzle(container, q) {
    container.innerHTML = `
      <div class="puzzle-box">
        <h2 class="quiz-question">${q.question}</h2>
        <p class="puzzle-sub">Clique nas peças abaixo para organizá-las na ordem correta:</p>
        <div class="puzzle-drop-zone">
          <div class="drop-placeholder">Sua resposta aparecerá aqui...</div>
        </div>
        <div class="puzzle-pool-zone"></div>
      </div>
    `;

    const dropZone = container.querySelector('.puzzle-drop-zone');
    const poolZone = container.querySelector('.puzzle-pool-zone');
    const placeholder = container.querySelector('.drop-placeholder');

    // Embaralha as peças iniciais
    const shuffled = [...q.correctOrder].sort(() => Math.random() - 0.5);

    const checkState = () => {
      const selectedTiles = dropZone.querySelectorAll('.puzzle-tile');
      if (selectedTiles.length > 0) {
        placeholder.style.display = 'none';
        const currentOrder = Array.from(selectedTiles).map(t => t.getAttribute('data-val'));
        this.selectedAnswer = currentOrder;

        if (selectedTiles.length === q.correctOrder.length) {
          this.actionBtn.textContent = "Verificar Ordem";
          this.actionBtn.className = "btn-lesson-action btn-verify active";
        } else {
          this.actionBtn.textContent = "Complete a ordem";
          this.actionBtn.className = "btn-lesson-action btn-verify disabled";
        }
      } else {
        placeholder.style.display = 'block';
        this.selectedAnswer = null;
        this.actionBtn.textContent = "Clique nas peças";
        this.actionBtn.className = "btn-lesson-action btn-verify disabled";
      }
    };

    shuffled.forEach((text) => {
      const tile = document.createElement('button');
      tile.className = 'puzzle-tile';
      tile.setAttribute('data-val', text);
      tile.textContent = text;

      tile.addEventListener('click', () => {
        if (this.isAnswerChecked) return;
        soundEffects.playPop();
        // Alterna entre a área de peças disponíveis e a área de resposta
        if (tile.parentElement === poolZone) {
          dropZone.appendChild(tile);
        } else {
          poolZone.appendChild(tile);
        }
        checkState();
      });

      poolZone.appendChild(tile);
    });

    this.actionBtn.textContent = "Clique nas peças";
    this.actionBtn.className = "btn-lesson-action btn-verify disabled";
  }

  /**
   * TIPO 5: ASSOCIAÇÃO DE CONCEITOS (MATCH)
   * O estudante associa cada termo ao seu significado correspondente em caixas de seleção.
   */
  _renderMatch(container, q) {
    container.innerHTML = `
      <div class="match-box">
        <h2 class="quiz-question">${q.question}</h2>
        <div class="match-pairs-list"></div>
      </div>
    `;

    const list = container.querySelector('.match-pairs-list');
    const terms = q.pairs.map(p => p.term);
    const definitions = [...q.pairs.map(p => p.match)].sort(() => Math.random() - 0.5);

    const userPairs = {};

    terms.forEach(term => {
      const row = document.createElement('div');
      row.className = 'match-row';
      row.innerHTML = `
        <div class="match-term">${this._escapeHtml(term)}</div>
        <div class="match-arrow">➜</div>
        <select class="match-select">
          <option value="">Selecione o correspondente...</option>
          ${definitions.map(d => `<option value="${this._escapeHtml(d)}">${this._escapeHtml(d)}</option>`).join('')}
        </select>
      `;

      const select = row.querySelector('.match-select');
      select.addEventListener('change', () => {
        userPairs[term] = select.value;
        const allFilled = terms.every(t => userPairs[t] && userPairs[t].length > 0);
        if (allFilled) {
          this.selectedAnswer = userPairs;
          this.actionBtn.textContent = "Verificar Combinações";
          this.actionBtn.className = "btn-lesson-action btn-verify active";
        } else {
          this.selectedAnswer = null;
          this.actionBtn.textContent = "Combine todos os itens";
          this.actionBtn.className = "btn-lesson-action btn-verify disabled";
        }
      });

      list.appendChild(row);
    });

    this.actionBtn.textContent = "Combine os itens";
    this.actionBtn.className = "btn-lesson-action btn-verify disabled";
  }

  // ==========================================================================
  // VALIDAÇÃO & CONTROLE DE RESPOSTAS
  // ==========================================================================

  /**
   * Gerencia o clique no botão verde inferior da lição:
   * 1º Clique: Valida a resposta dada.
   * 2º Clique: Se acertou, avança para a próxima pergunta; se errou, refaz a questão.
   */
  _handleActionClick() {
    if (this.isFinished || this.selectedAnswer === 'finished') {
      if (this.isFailedPhase) {
        this.startLesson(this.currentLesson);
      } else {
        this._finishLesson();
      }
      return;
    }

    if (!this.selectedAnswer) return;

    if (!this.isAnswerChecked) {
      this._checkAnswer();
    } else {
      if (!this.isCurrentCorrect) {
        this._retryCurrentQuestion();
      } else {
        this._nextStep();
      }
    }
  }

  /**
   * Recarrega a pergunta atual para o aluno tentar novamente após errar
   */
  _retryCurrentQuestion() {
    this.isAnswerChecked = false;
    this.selectedAnswer = null;
    this._resetFooter();
    this._renderCurrentQuestion();
  }

  /**
   * Valida a resposta do usuário comparando com o gabarito oficial do módulo
   */
  _checkAnswer() {
    this.isAnswerChecked = true;
    const q = this.currentLesson.questions[this.currentQuestionIndex];
    let isCorrect = false;
    let feedbackText = "";

    if (q.type === 'theory' || q.type === 'video') {
      isCorrect = true;
      this._nextStep();
      return;
    } else if (q.type === 'quiz') {
      isCorrect = this.selectedAnswer.correct === true;
      feedbackText = isCorrect ? (q.explanation || "Resposta correta!") : `Resposta correta: ${q.options.find(o => o.correct).text}`;
    } else if (q.type === 'fill_blank') {
      const cleanInput = String(this.selectedAnswer).trim().toLowerCase();
      const cleanExpected = q.blank.trim().toLowerCase();
      isCorrect = cleanInput === cleanExpected;
      feedbackText = isCorrect ? "Exato! Você mandou muito bem." : `A resposta certa era: "${q.blank}"`;
    } else if (q.type === 'puzzle') {
      const currentOrder = this.selectedAnswer || [];
      isCorrect = JSON.stringify(currentOrder) === JSON.stringify(q.correctOrder);
      feedbackText = isCorrect ? "Ordem perfeitamente organizada!" : "A ordem correta foi destacada para você.";
    } else if (q.type === 'match') {
      isCorrect = q.pairs.every(p => this.selectedAnswer[p.term] === p.match);
      feedbackText = isCorrect ? "Todas as associações estão corretas!" : "Algumas associações estavam incorretas.";
    }

    this.isCurrentCorrect = isCorrect;

    // Resposta Correta: Toca som de vitória e mostra banner verde
    if (isCorrect) {
      soundEffects.playCorrect();
      this.footerBanner.className = 'lesson-footer-banner correct';
      this.footerFeedback.innerHTML = `
        <div class="feedback-icon">🎉</div>
        <div class="feedback-text">
          <strong class="feedback-status">Sensacional!</strong>
          <p class="feedback-desc">${feedbackText}</p>
        </div>
      `;
    } else {
      // Resposta Incorreta: Toca som de erro, perde 1 vida e mostra banner vermelho
      soundEffects.playError();
      this.mistakesCount++;
      const remainingLives = appState.loseLife();
      this.livesCounter.textContent = remainingLives;

      this.footerBanner.className = 'lesson-footer-banner incorrect';
      this.footerFeedback.innerHTML = `
        <div class="feedback-icon">💔</div>
        <div class="feedback-text">
          <strong class="feedback-status">Não foi dessa vez! (-1 vida)</strong>
          <p class="feedback-desc">${feedbackText}</p>
          <span class="feedback-note">⚠️ Atenção: É necessário 100% de acertos para liberar o próximo nível da trilha.</span>
        </div>
      `;

      // Se as vidas chegarem a zero, recarrega e dá nova chance
      if (remainingLives <= 0) {
        setTimeout(() => {
          alert("Suas vidas acabaram! Mas não se preocupe, no FrontLingo você pode recarregar as energias e tentar novamente.");
          appState.refillLives();
          this.livesCounter.textContent = appState.getState().lives;
          this.startLesson(this.currentLesson);
        }, 800);
        return;
      }

      this.actionBtn.textContent = "Refazer Questão ↺";
      this.actionBtn.className = "btn-lesson-action btn-retry active";
      return;
    }

    this.actionBtn.textContent = "Continuar ▶";
    this.actionBtn.className = "btn-lesson-action btn-continue active";
  }

  /**
   * Avança para a próxima pergunta da lição ou decide se o aluno passou com 100%
   */
  _nextStep() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.currentLesson.questions.length) {
      this._updateHeader();
      this._renderCurrentQuestion();
    } else {
      // Se errou alguma questão ao longo da lição, exige refazer para garantir domínio
      if (this.mistakesCount > 0) {
        this._renderFailure();
      } else {
        // Conclusão com 100% de precisão!
        this._renderCelebration();
      }
    }
  }

  /**
   * Tela de reprovação temporária da lição:
   * Explica pedagogicamente que o próximo nível só abre com 100% de aproveitamento.
   */
  _renderFailure() {
    soundEffects.playError();
    this.isFinished = true;
    this.isFailedPhase = true;

    this.progressBar.style.width = '100%';

    this.contentArea.innerHTML = `
      <div class="celebration-card failure-card">
        <div class="failure-badge">⚠️</div>
        <h1 class="failure-title">Fase Não Superada!</h1>
        <p class="failure-sub">Você completou as perguntas da fase <strong>${this.currentLesson.code}: ${this.currentLesson.title}</strong>, mas cometeu <strong>${this.mistakesCount} erro(s)</strong>.</p>
        
        <div class="failure-alert-box">
          <span class="failure-alert-icon">🔒</span>
          <div class="failure-alert-text">
            <strong>O próximo nível permanece bloqueado!</strong>
            <p>Para passar na trilha e liberar o próximo nível, você precisa concluir esta etapa com <strong>100% de acertos</strong> sem nenhum erro.</p>
          </div>
        </div>

        <div class="celebration-stats-grid">
          <div class="stat-card">
            <span class="stat-icon">🎯</span>
            <span class="stat-val">${Math.max(0, this.currentLesson.questions.length - this.mistakesCount)} / ${this.currentLesson.questions.length}</span>
            <span class="stat-label">Acertos</span>
          </div>
          <div class="stat-card failure-stat">
            <span class="stat-icon">💔</span>
            <span class="stat-val">${this.mistakesCount}</span>
            <span class="stat-label">Erros Cometidos</span>
          </div>
        </div>

        <div class="failure-actions-row">
          <button class="btn-exit-trail" id="btn-exit-failed-lesson">
            Sair para a Trilha 🗺️
          </button>
        </div>
      </div>
    `;

    const exitBtn = this.contentArea.querySelector('#btn-exit-failed-lesson');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    this._resetFooter();
    this.actionBtn.textContent = "Refazer Fase do Início (Buscar 100%) ↺";
    this.actionBtn.className = "btn-lesson-action btn-retry active";
    this.selectedAnswer = "finished";
    this.actionBtn.onclick = () => {
      this.startLesson(this.currentLesson);
    };
  }

  /**
   * Tela triunfante de conclusão com 100% de acertos:
   * Adiciona XP, salva a lição concluída e desbloqueia novos recursos no Currículo Web.
   */
  _renderCelebration() {
    soundEffects.playCelebration();
    this.isFinished = true;

    // Identifica o módulo atual e o próximo na trilha
    const currentMod = MODULES_DATA.find(m => m.lessons.some(l => l.id === this.currentLesson.id));

    // Salva progresso no StateManager
    appState.completeLesson(this.currentLesson.id, this.currentLesson.xp);

    const isModCompletedNow = currentMod ? appState.isModuleCompleted(currentMod.id, MODULES_DATA) : false;
    const isLastLesson = currentMod && currentMod.lessons ? currentMod.lessons[currentMod.lessons.length - 1].id === this.currentLesson.id : false;
    const isTrailComplete = isLastLesson && isModCompletedNow;

    let nextMod = null;
    if (currentMod) {
      const modIdx = MODULES_DATA.findIndex(m => m.id === currentMod.id);
      if (modIdx !== -1 && modIdx + 1 < MODULES_DATA.length) {
        nextMod = MODULES_DATA[modIdx + 1];
      }
    }

    this.progressBar.style.width = '100%';

    let alertContent = `
      <div class="celebration-portfolio-alert">
        <span class="alert-icon">✨</span>
        <div class="alert-text">
          <strong>Seu Currículo e Portfólio subiram de nível!</strong>
          <p>O código foi atualizado e novas funcionalidades foram destravadas.</p>
        </div>
      </div>
    `;
    let curriculumBtnText = "💼 Ver Atualização no Meu Currículo";

    // Mensagens didáticas específicas conforme os marcos do projeto
    if ((currentMod && currentMod.id === 'mod-2') || this.currentLesson.id === 'l-2-4') {
      alertContent = `
        <div class="celebration-portfolio-alert module-complete-alert">
          <span class="alert-icon">📄</span>
          <div class="alert-text">
            <strong>Estrutura do Currículo Gerada com Sucesso!</strong>
            <p>O esqueleto semântico em HTML e seus dados reais foram inseridos no seu currículo na aba <strong>Meu Currículo</strong>!</p>
          </div>
        </div>
      `;
      curriculumBtnText = "💼 Ver Meu Currículo em HTML";
    } else if ((currentMod && currentMod.id === 'mod-3') || this.currentLesson.id === 'l-3-4') {
      alertContent = `
        <div class="celebration-portfolio-alert module-complete-alert">
          <span class="alert-icon">🎨</span>
          <div class="alert-text">
            <strong>Design e Estilos CSS Aplicados com Sucesso!</strong>
            <p>Seu currículo foi formatado com cartões modernos, sombras, Flexbox e tipografia profissional na aba <strong>Meu Currículo</strong>!</p>
          </div>
        </div>
      `;
      curriculumBtnText = "🎨 Ver Currículo Formatado com CSS";
    }

    // CASO 1: Trilha Concluída e Próxima Trilha Desbloqueada
    if (isTrailComplete && nextMod) {
      this.finishData = {
        lesson: this.currentLesson,
        justCompletedTrail: true,
        completedModule: currentMod,
        nextModule: nextMod
      };

      this.contentArea.innerHTML = `
        <div class="celebration-card trail-complete-celebration">
          <div class="celebration-badge">🏆</div>
          <div class="trail-complete-tag">🎉 TRILHA CONCLUÍDA COM 100%!</div>
          <h1 class="celebration-title">Mandou muito bem, Dev!</h1>
          <p class="celebration-sub">Você completou todas as fases da <strong>${currentMod.title}</strong>!</p>
          
          <div class="unlock-next-trail-box">
            <div class="unlock-icon-sparkle">🔓</div>
            <div class="unlock-info">
              <span class="unlock-badge-pill">NOVA TRILHA LIBERADA</span>
              <h3 class="unlock-title">${nextMod.title}</h3>
              <p class="unlock-desc">${nextMod.subtitle} • Suas fases já estão desbloqueadas na trilha!</p>
            </div>
          </div>

          <div class="celebration-stats-grid">
            <div class="stat-card">
              <span class="stat-icon">⚡</span>
              <span class="stat-val">+${this.currentLesson.xp}</span>
              <span class="stat-label">XP Conquistado</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🎁</span>
              <span class="stat-val">Desbloqueado!</span>
              <span class="stat-label">${this.currentLesson.portfolioMilestone}</span>
            </div>
          </div>

          ${alertContent}

          <div class="celebration-actions-row">
            <button type="button" class="btn-curriculum-shortcut" id="btn-celebration-curriculum">
              ${curriculumBtnText}
            </button>
          </div>
        </div>
      `;

      const btnCurriculum = this.contentArea.querySelector('#btn-celebration-curriculum');
      if (btnCurriculum) {
        btnCurriculum.onclick = () => this._finishLesson('portfolio');
      }

      this._resetFooter();
      this.actionBtn.textContent = `Desbloquear e Ir para a ${nextMod.title.replace(/:.*/, '')}! 🚀`;
      this.actionBtn.className = "btn-lesson-action btn-continue active";
      this.selectedAnswer = "finished";
      this.actionBtn.onclick = () => this._finishLesson();

    // CASO 2: Última Trilha do Curso Concluída (100% de Formação)
    } else if (isTrailComplete && !nextMod) {
      this.finishData = {
        lesson: this.currentLesson,
        justCompletedTrail: true,
        completedModule: currentMod,
        nextModule: null
      };

      this.contentArea.innerHTML = `
        <div class="celebration-card trail-complete-celebration">
          <div class="celebration-badge">🎓</div>
          <div class="trail-complete-tag">🏆 TODAS AS TRILHAS CONCLUÍDAS!</div>
          <h1 class="celebration-title">Parabéns! Você é um Desenvolvedor!</h1>
          <p class="celebration-sub">Você finalizou todos os 5 módulos do projeto UTFPR e dominou HTML, CSS, JavaScript e GitHub Pages!</p>
          
          <div class="celebration-stats-grid">
            <div class="stat-card">
              <span class="stat-icon">⚡</span>
              <span class="stat-val">+${this.currentLesson.xp}</span>
              <span class="stat-label">Pontos de XP</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🚀</span>
              <span class="stat-val">100% Pronto</span>
              <span class="stat-label">Portfólio Completo</span>
            </div>
          </div>

          ${alertContent}

          <div class="celebration-actions-row">
            <button type="button" class="btn-curriculum-shortcut" id="btn-celebration-curriculum">
              ${curriculumBtnText}
            </button>
          </div>
        </div>
      `;

      const btnCurriculum = this.contentArea.querySelector('#btn-celebration-curriculum');
      if (btnCurriculum) {
        btnCurriculum.onclick = () => this._finishLesson('portfolio');
      }

      this._resetFooter();
      this.actionBtn.textContent = "Ver Meu Portfólio Completo! 💼";
      this.actionBtn.className = "btn-lesson-action btn-continue active";
      this.selectedAnswer = "finished";
      this.actionBtn.onclick = () => this._finishLesson();

    // CASO 3: Lição Individual Concluída
    } else {
      this.finishData = {
        lesson: this.currentLesson,
        justCompletedTrail: false
      };

      this.contentArea.innerHTML = `
        <div class="celebration-card">
          <div class="celebration-badge">🏆</div>
          <h1 class="celebration-title">Lição Concluída!</h1>
          <p class="celebration-sub">Você completou a fase <strong>${this.currentLesson.code}: ${this.currentLesson.title}</strong>!</p>
          
          <div class="celebration-stats-grid">
            <div class="stat-card">
              <span class="stat-icon">⚡</span>
              <span class="stat-val">+${this.currentLesson.xp}</span>
              <span class="stat-label">Pontos de XP</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🎁</span>
              <span class="stat-val">Desbloqueado!</span>
              <span class="stat-label">${this.currentLesson.portfolioMilestone}</span>
            </div>
          </div>

          ${alertContent}

          <div class="celebration-actions-row">
            <button type="button" class="btn-curriculum-shortcut" id="btn-celebration-curriculum">
              ${curriculumBtnText}
            </button>
          </div>
        </div>
      `;

      const btnCurriculum = this.contentArea.querySelector('#btn-celebration-curriculum');
      if (btnCurriculum) {
        btnCurriculum.onclick = () => this._finishLesson('portfolio');
      }

      this._resetFooter();
      this.actionBtn.textContent = "Voltar à Trilha! 🚀";
      this.actionBtn.className = "btn-lesson-action btn-continue active";
      this.selectedAnswer = "finished";
      this.actionBtn.onclick = () => this._finishLesson();
    }
  }

  /**
   * Reseta o rodapé do modal para o estado padrão
   */
  _resetFooter() {
    this.footerBanner.className = 'lesson-footer-banner default';
    this.footerFeedback.innerHTML = '';
    this.actionBtn.onclick = null;
  }

  /**
   * Utilitário de segurança para escapar caracteres HTML e prevenir injeções acidentais
   */
  _escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
