/**
 * ============================================================================
 * PROJETO CERTIFICADORA UTFPR - AS64C: FRONTLINGO
 * Arquivo: js/app.js
 * Papel no Sistema: Orquestrador Principal da Aplicação SPA (O "Maestro")
 * ============================================================================
 * 
 * 💡 EXPLICAÇÃO DIDÁTICA PARA O PROFESSOR:
 * "Professor, este arquivo é o ponto de entrada e o 'Maestro' da nossa aplicação.
 * Desenvolvemos uma SPA (Single Page Application) em Vanilla JavaScript, ou seja,
 * uma aplicação web moderna que troca de telas instantaneamente sem nunca
 * precisar recarregar ou piscar a página.
 * 
 * O app.js tem 4 responsabilidades bem delimitadas:
 * 1. MAPEAMENTO DO DOM: Conecta as tags do HTML aos objetos JavaScript.
 * 2. SINCRONIZAÇÃO DE ESTADO (Observer): Sempre que o aluno ganha XP, perde vida
 *    ou avança de fase, o app.js atualiza o cabeçalho e redesenha o currículo.
 * 3. NAVEGAÇÃO POR ABAS: Alterna suavemente entre a 'Trilha', o 'Meu Currículo'
 *    e a aba 'Equipe UTFPR'.
 * 4. INTEGRAÇÃO DOS MÓDULOS: Faz a ponte entre o motor de lições (lesson-engine),
 *    o desenhista da trilha (trail.js) e o construtor do portfólio (portfolio-builder)."
 * ============================================================================
 */

import { appState } from './state.js';
import { soundEffects } from './audio.js';
import { TrailRenderer } from './trail.js';
import { LessonEngine } from './lesson-engine.js';
import { portfolioBuilder } from './portfolio-builder.js';
import { MODULES_DATA, TEAM_MEMBERS } from './data/modules.js';

class App {
  constructor() {
    this.currentView = 'trail';            // Tela ativa no momento ('trail' | 'portfolio' | 'team')
    this.currentPreviewMode = 'preview';    // Modo do portfólio ('preview' visual ou 'code' fonte)

    this.trailRenderer = null;
    this.lessonEngine = null;

    this.init();
  }

  /**
   * Ponto de partida: inicializa todos os subsistemas em sequência
   */
  init() {
    this._bindDOM();                 // 1. Mapeia os elementos do HTML
    this._setupStateSubscription();  // 2. Inscreve a interface para reagir ao StateManager
    this._setupTrailAndLessons();    // 3. Inicializa a Trilha e o Motor de Lições
    this._setupPortfolioView();      // 4. Configura o visualizador de currículo e download
    this._setupTeamView();           // 5. Renderiza os cartões dos integrantes da equipe
    this._setupModals();             // 6. Conecta os botões e janelas modais
  }

  /**
   * 1. MAPEAMENTO DOS ELEMENTOS DO DOM
   * Guarda referências diretas aos botões, contadores e caixas de visualização.
   */
  _bindDOM() {
    // Cabeçalho e Abas de Navegação
    this.tabBtns = document.querySelectorAll('.nav-tab-btn');
    this.viewSections = document.querySelectorAll('.view-section');
    this.brandHomeBtn = document.getElementById('brand-home-btn');

    // Contadores da Barra Superior (Gamificação)
    this.streakCounter = document.getElementById('streak-counter');
    this.xpCounter = document.getElementById('xp-counter');
    this.livesCounter = document.getElementById('lives-counter');
    this.btnToggleSound = document.getElementById('btn-toggle-sound');
    this.soundIcon = document.getElementById('sound-icon');

    // Painel do Currículo / Portfólio
    this.milestonesList = document.getElementById('portfolio-milestones-list');
    this.portfolioIframe = document.getElementById('portfolio-live-iframe');
    this.portfolioViewportBox = document.getElementById('portfolio-viewport-box');
    this.codeInspector = document.getElementById('portfolio-code-inspector');
    this.codeSnippetArea = document.getElementById('code-snippet-area');
    this.modeTabPreview = document.getElementById('mode-tab-preview');
    this.modeTabCode = document.getElementById('mode-tab-code');
    this.btnDownloadPortfolio = document.getElementById('btn-download-portfolio');

    // Modais (Edição de Perfil e Guia GitHub)
    this.btnOpenEditProfile = document.getElementById('btn-open-edit-profile');
    this.modalEditProfile = document.getElementById('modal-edit-profile');
    this.btnCloseProfileModal = document.getElementById('btn-close-profile-modal');
    this.btnCancelProfile = document.getElementById('btn-cancel-profile');
    this.formEditProfile = document.getElementById('form-edit-profile');

    this.btnOpenGithubGuide = document.getElementById('btn-open-github-guide');
    this.modalGithubGuide = document.getElementById('modal-github-guide');
    this.btnCloseGithubModal = document.getElementById('btn-close-github-modal');
    this.btnConfirmGithubModal = document.getElementById('btn-confirm-github-modal');

    // Aba da Equipe UTFPR e Botão de Reset para o Avaliador
    this.teamCardsContainer = document.getElementById('team-cards-container');
    this.btnResetProgress = document.getElementById('btn-reset-progress');
  }

  /**
   * 2. REATIVIDADE COM PADRÃO OBSERVER
   * Conecta a interface ao StateManager: sempre que qualquer dado mudar,
   * a barra superior é atualizada e a trilha/currículo são recalculados.
   */
  _setupStateSubscription() {
    appState.subscribe((state) => {
      // Atualiza os números da barra de topo
      this.streakCounter.textContent = state.streak;
      this.xpCounter.textContent = state.xp;
      this.livesCounter.textContent = state.lives;

      // Atualiza o ícone do alto-falante (mutado/desmutado)
      soundEffects.enabled = state.soundEnabled;
      this.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';

      // Redesenha a trilha e o portfólio
      if (this.trailRenderer) {
        this.trailRenderer.render();
      }
      this._updatePortfolio();
    });

    // Botão de ligar/desligar som
    this.btnToggleSound.addEventListener('click', () => {
      const isEnabled = appState.toggleSound();
      if (isEnabled) soundEffects.playPop();
    });

    // Cliques nas abas de navegação principal
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundEffects.playPop();
        const view = btn.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Clique na logo FrontLingo retorna para a Trilha
    if (this.brandHomeBtn) {
      this.brandHomeBtn.addEventListener('click', () => {
        this.switchView('trail');
      });
    }

    // Botão de Reset de Teste (Área do Avaliador / Professor)
    this.btnResetProgress.addEventListener('click', () => {
      if (confirm("Tem certeza que deseja resetar todo o progresso da trilha para testar novamente do início?")) {
        appState.resetProgress();
        soundEffects.playPop();
        alert("Progresso reiniciado com sucesso!");
        this.switchView('trail');
      }
    });
  }

  /**
   * 3. TROCA DE TELAS DA SPA (SEM RECARREGAR PÁGINA)
   * Alterna a classe 'active' entre as seções do documento.
   */
  switchView(viewName) {
    this.currentView = viewName;

    // Atualiza visual das abas no cabeçalho
    this.tabBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Exibe apenas a seção selecionada
    this.viewSections.forEach(sec => {
      if (sec.id === `view-${viewName}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Se navegou para o currículo, garante que a renderização esteja fresca
    if (viewName === 'portfolio') {
      this._updatePortfolio();
    }
  }

  /**
   * 4. INTEGRAÇÃO DA TRILHA COM O MOTOR DE LIÇÕES
   */
  _setupTrailAndLessons() {
    // Instancia o player de lições com o callback de finalização
    this.lessonEngine = new LessonEngine('lesson-player-modal', (finishData) => {
      const justCompletedTrail = finishData && finishData.justCompletedTrail;
      const nextModule = finishData && finishData.nextModule;
      const targetView = finishData && finishData.targetView;

      // Se acabou de completar uma trilha inteira, aciona transição comemorativa
      if (justCompletedTrail && nextModule) {
        this.trailRenderer.handleTrailUnlocked(nextModule);
      } else {
        this.trailRenderer.render();
      }
      this._updatePortfolio();

      // Se o aluno clicou no atalho 'Ver Meu Currículo', troca de aba
      if (targetView) {
        this.switchView(targetView);
      }
    });

    // Instancia o renderizador da trilha conectando os nós ao início da lição
    this.trailRenderer = new TrailRenderer('trail-root', (lesson) => {
      this.lessonEngine.startLesson(lesson);
    });

    this.trailRenderer.render();
  }

  /**
   * 5. CONFIGURAÇÃO DA ABA MEU CURRÍCULO
   */
  _setupPortfolioView() {
    // Alterna para visualização do site renderizado no Iframe
    this.modeTabPreview.addEventListener('click', () => {
      soundEffects.playPop();
      this.currentPreviewMode = 'preview';
      this.modeTabPreview.classList.add('active');
      this.modeTabCode.classList.remove('active');
      this.portfolioViewportBox.classList.remove('hidden');
      this.codeInspector.classList.add('hidden');
    });

    // Alterna para inspeção do código-fonte HTML/CSS/JS gerado
    this.modeTabCode.addEventListener('click', () => {
      soundEffects.playPop();
      this.currentPreviewMode = 'code';
      this.modeTabCode.classList.add('active');
      this.modeTabPreview.classList.remove('active');
      this.portfolioViewportBox.classList.add('hidden');
      this.codeInspector.classList.remove('hidden');
    });

    // Download do arquivo index.html pronto para publicação no GitHub Pages
    this.btnDownloadPortfolio.addEventListener('click', () => {
      soundEffects.playCelebration();
      portfolioBuilder.downloadPortfolioFiles();
    });

    this._updatePortfolio();
  }

  /**
   * ATUALIZAÇÃO DO PREVIEW E CHECKLIST DO CURRÍCULO
   */
  _updatePortfolio() {
    if (!this.milestonesList) return;

    // Lista de marcos pedagógicos desbloqueados ao longo das lições
    const milestones = [
      { id: 'l-2-1', title: 'Fundamentos HTML (<!DOCTYPE>, <html>, <body>)' },
      { id: 'l-2-2', title: 'Identificação & Habilidades (h1, h2, p, ul, li)' },
      { id: 'l-2-3', title: 'Foto de Perfil & Links Sociais (img, a)' },
      { id: 'l-2-4', title: 'Estrutura HTML do Currículo (Gera o Currículo na Aba!)' },
      { id: 'l-3-1', title: 'Cores e Tipografia CSS (Variáveis e Fontes)' },
      { id: 'l-3-2', title: 'Box Model (Espaçamentos e Cartões)' },
      { id: 'l-3-3', title: 'Flexbox (Alinhamento Flexível & Badges)' },
      { id: 'l-3-4', title: 'Formatação CSS do Currículo (Aplica o Design na Aba!)' },
      { id: 'l-4-3', title: 'JavaScript (Alternador de Tema Escuro / Claro)' },
      { id: 'l-4-4', title: 'JavaScript (Copiar E-mail com 1 Clique)' },
      { id: 'l-5-1', title: 'UI/UX (Design Responsivo Mobile-First)' },
      { id: 'l-5-2', title: 'Publicável no GitHub Pages' }
    ];

    const state = appState.getState();
    const completed = state.completedLessons || [];

    // Desenha o checklist lateral com checks verdes para o que já foi liberado
    this.milestonesList.innerHTML = milestones.map(m => {
      const isDone = completed.includes(m.id);
      return `
        <div class="milestone-item ${isDone ? 'unlocked' : 'locked'}">
          <span class="milestone-check">${isDone ? '✔' : '○'}</span>
          <span class="milestone-title">${m.title}</span>
        </div>
      `;
    }).join('');

    // Gera o código HTML completo e injeta com segurança no Iframe via srcdoc
    const fullHTML = portfolioBuilder.generateHTML(true);
    if (this.portfolioIframe) {
      this.portfolioIframe.srcdoc = fullHTML;
    }

    // Atualiza a aba de inspeção de código
    if (this.codeSnippetArea) {
      this.codeSnippetArea.textContent = fullHTML;
    }
  }

  /**
   * 6. RENDERIZAÇÃO DA ABA DA EQUIPE UTFPR
   */
  _setupTeamView() {
    if (!this.teamCardsContainer) return;

    this.teamCardsContainer.innerHTML = TEAM_MEMBERS.map(member => `
      <div class="team-card">
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
        <div class="team-links">
          <a href="${member.github}" target="_blank" rel="noopener noreferrer" class="team-link">
            🐙 GitHub
          </a>
          <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="team-link">
            💼 LinkedIn
          </a>
        </div>
      </div>
    `).join('');
  }

  /**
   * 7. CONTROLE DOS MODAIS
   */
  _setupModals() {
    // --- MODAL DE PERSONALIZAÇÃO DO PERFIL ---
    const openProfileModal = () => {
      soundEffects.playPop();
      const { profile } = appState.getState();
      document.getElementById('input-profile-nome').value = profile.nome;
      document.getElementById('input-profile-cargo').value = profile.cargo;
      document.getElementById('input-profile-cidade').value = profile.cidade;
      document.getElementById('input-profile-email').value = profile.email;
      document.getElementById('input-profile-bio').value = profile.bio;
      document.getElementById('input-profile-github').value = profile.github;
      document.getElementById('input-profile-linkedin').value = profile.linkedin;
      document.getElementById('input-profile-foto').value = profile.fotoUrl;

      this.modalEditProfile.classList.remove('hidden');
    };

    const closeProfileModal = () => {
      this.modalEditProfile.classList.add('hidden');
    };

    this.btnOpenEditProfile.addEventListener('click', openProfileModal);
    this.btnCloseProfileModal.addEventListener('click', closeProfileModal);
    this.btnCancelProfile.addEventListener('click', closeProfileModal);

    // Salva as alterações feitas no formulário
    this.formEditProfile.addEventListener('submit', (e) => {
      e.preventDefault();
      soundEffects.playCorrect();

      appState.updateProfile({
        nome: document.getElementById('input-profile-nome').value.trim(),
        cargo: document.getElementById('input-profile-cargo').value.trim(),
        cidade: document.getElementById('input-profile-cidade').value.trim(),
        email: document.getElementById('input-profile-email').value.trim(),
        bio: document.getElementById('input-profile-bio').value.trim(),
        github: document.getElementById('input-profile-github').value.trim(),
        linkedin: document.getElementById('input-profile-linkedin').value.trim(),
        fotoUrl: document.getElementById('input-profile-foto').value.trim()
      });

      closeProfileModal();
      this._updatePortfolio();
    });

    // --- MODAL DO GUIA GITHUB PAGES ---
    this.btnOpenGithubGuide.addEventListener('click', () => {
      soundEffects.playPop();
      this.modalGithubGuide.classList.remove('hidden');
    });

    const closeGithubModal = () => {
      this.modalGithubGuide.classList.add('hidden');
    };

    this.btnCloseGithubModal.addEventListener('click', closeGithubModal);
    this.btnConfirmGithubModal.addEventListener('click', closeGithubModal);
  }
}

// Inicializa a aplicação assim que a árvore DOM estiver totalmente carregada
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
