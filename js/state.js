/**
 * ============================================================================
 * PROJETO CERTIFICADORA UTFPR - AS64C: FRONTLINGO
 * Arquivo: js/state.js
 * Papel no Sistema: Gerenciador de Estado Global e Persistência (Padrão Observer)
 * ============================================================================
 * 
 * 💡 EXPLICAÇÃO DIDÁTICA PARA O PROFESSOR:
 * "Professor, este arquivo funciona como o 'Cérebro' da nossa aplicação.
 * Em vez de espalhar variáveis soltas por vários arquivos, centralizamos todas
 * as informações do usuário (XP, vidas, lições feitas e dados do currículo)
 * em um único lugar: o StateManager.
 * 
 * Usamos aqui dois conceitos fundamentais da Engenharia de Software:
 * 1. PERSISTÊNCIA LOCAL (localStorage): Para o aluno não perder o progresso ao
 *    fechar o navegador ou dar F5 na página, sem precisar de banco de dados.
 * 2. PADRÃO OBSERVER (Inscrição/Notificação): Sempre que o aluno ganha XP ou
 *    conclui uma lição, a tela é avisada automaticamente para se redesenhar."
 * ============================================================================
 */

// Chave única usada para salvar os dados dentro do localStorage do navegador
const STORAGE_KEY = "utfpr_frontlingo_state_v1";

/**
 * Perfil padrão inicial do estudante.
 * Estes dados alimentam a visualização inicial do Currículo Web.
 */
const DEFAULT_PROFILE = {
  nome: "Nielton Augusto",
  cargo: "Desenvolvedor Front-End Júnior",
  bio: "Estudante de Análise e Desenvolvimento de Sistemas apaixonado por interfaces web modernas, acessíveis e intuitivas.",
  email: "contato.dev@exemplo.com",
  cidade: "Curitiba, PR",
  github: "https://github.com/nieltom",
  linkedin: "https://www.linkedin.com/in/nieltom-augusto-233b11274/",
  fotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  skills: [
    "HTML5 Semântico",
    "CSS3 Moderno & Flexbox",
    "JavaScript ES6+",
    "Git & GitHub Pages",
    "UI/UX Design",
    "Acessibilidade Web"
  ],
  experiencias: [
    {
      cargo: "Bolsista / Desenvolvedor Front-End",
      empresa: "Projeto Certificadora UTFPR",
      periodo: "2026 - Presente",
      descricao: "Desenvolvimento da arquitetura web da plataforma de aprendizagem aberta com gamificação estilo Duolingo."
    },
    {
      cargo: "Projetos Pessoais & Estudos Práticos",
      empresa: "GitHub",
      periodo: "2025 - 2026",
      descricao: "Construção de aplicações web interativas, consumo de APIs e criação de layouts responsivos."
    }
  ]
};

/**
 * Estado inicial do jogo/plataforma ao abrir pela primeira vez.
 */
const INITIAL_STATE = {
  xp: 0,                   // Pontos de experiência ganhos nas lições
  streak: 3,               // Dias seguidos de estudo (ofensiva gamificada)
  lives: 5,                // Vidas restantes (perde 1 ao errar uma questão)
  maxLives: 5,             // Capacidade máxima de vidas
  completedLessons: [],    // Lista com os IDs das lições concluídas (ex: ['l-1-0', 'l-1-1'])
  currentLessonId: "l-1-0",
  soundEnabled: true,      // Controle de ligar/desligar efeitos de som
  profile: DEFAULT_PROFILE,// Dados do aluno para geração do portfólio
  lastPlayedDate: new Date().toISOString().split("T")[0]
};

/**
 * Classe responsável por gerenciar e proteger o estado da aplicação.
 */
class StateManager {
  constructor() {
    // Lista de funções 'ouvintes' que querem ser avisadas quando o estado mudar
    this.subscribers = [];
    
    // Carrega os dados salvos anteriormente ou usa os dados iniciais
    this.state = this._loadState();
  }

  /**
   * 1. CARREGAMENTO DO LOCALSTORAGE
   * Tenta recuperar o JSON salvo no navegador do usuário.
   * Se não encontrar nada ou der erro, usa os valores padrão com segurança.
   */
  _loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          profile: {
            ...DEFAULT_PROFILE,
            ...(parsed.profile || {})
          }
        };
      }
    } catch (e) {
      console.warn("Aviso didático: Erro ao carregar do localStorage, usando valores padrão:", e);
    }
    return { ...INITIAL_STATE };
  }

  /**
   * 2. SALVAMENTO NO LOCALSTORAGE E NOTIFICAÇÃO
   * Converte o objeto de estado em texto JSON e salva no navegador.
   * Em seguida, chama this._notify() para avisar a tela que os dados mudaram.
   */
  _saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Aviso didático: Erro ao salvar estado no localStorage:", e);
    }
    this._notify();
  }

  /**
   * 3. INSCRIÇÃO NO PADRÃO OBSERVER (Subscribe)
   * Permite que outras partes do sistema (como a barra de topo ou a trilha)
   * se 'inscrevam' para receber atualizações automáticas sempre que o estado mudar.
   */
  subscribe(callback) {
    this.subscribers.push(callback);
    // Executa imediatamente uma vez para inicializar quem se inscreveu
    callback(this.state);
    
    // Retorna uma função para cancelar a inscrição se necessário
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  /**
   * Dispara a atualização para todos os inscritos (Observer Notify).
   */
  _notify() {
    this.subscribers.forEach(cb => cb(this.state));
  }

  /**
   * Retorna uma cópia do estado atual.
   */
  getState() {
    return this.state;
  }

  // ==========================================================================
  // REGRAS DE NEGÓCIO DA GAMIFICAÇÃO & DESBLOQUEIO DE FASES
  // ==========================================================================

  /**
   * Verifica se uma lição específica já foi completada pelo aluno.
   */
  isLessonCompleted(lessonId) {
    return this.state.completedLessons.includes(lessonId);
  }

  /**
   * Verifica se todas as lições de um módulo foram concluídas.
   */
  isModuleCompleted(moduleId, modulesData) {
    if (!modulesData) return false;
    const mod = modulesData.find(m => m.id === moduleId);
    if (!mod || !mod.lessons || mod.lessons.length === 0) return false;
    return mod.lessons.every(l => this.isLessonCompleted(l.id));
  }

  /**
   * Regra didática: A Trilha 1 sempre está liberada.
   * As Trilhas seguintes só são liberadas quando a trilha anterior for 100% finalizada.
   */
  isModuleUnlocked(moduleId, modulesData) {
    if (!modulesData) return true;
    const modIdx = modulesData.findIndex(m => m.id === moduleId);
    if (modIdx <= 0) return true; // Primeira trilha/módulo sempre liberada
    const prevMod = modulesData[modIdx - 1];
    return this.isModuleCompleted(prevMod.id, modulesData);
  }

  /**
   * Calcula a porcentagem de progresso de um módulo para exibir na barra da trilha.
   */
  getModuleProgress(moduleId, modulesData) {
    if (!modulesData) return { total: 0, completed: 0, percent: 0, isCompleted: false, isUnlocked: true };
    const mod = modulesData.find(m => m.id === moduleId);
    if (!mod || !mod.lessons) return { total: 0, completed: 0, percent: 0, isCompleted: false, isUnlocked: false };
    
    const total = mod.lessons.length;
    const completed = mod.lessons.filter(l => this.isLessonCompleted(l.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isCompleted = completed === total && total > 0;
    const isUnlocked = this.isModuleUnlocked(moduleId, modulesData);

    return { total, completed, percent, isCompleted, isUnlocked };
  }

  /**
   * Regra de bloqueio individual de cada fase/nó:
   * Uma lição só fica liberada se sua trilha estiver aberta E se a lição anterior dela já foi feita.
   */
  isLessonUnlocked(lessonId, allLessonsOrder, modulesData) {
    if (modulesData) {
      // Procura a qual módulo esta lição pertence
      const parentMod = modulesData.find(m => m.lessons.some(l => l.id === lessonId));
      if (parentMod) {
        // Se o módulo está bloqueado, a lição fica bloqueada
        if (!this.isModuleUnlocked(parentMod.id, modulesData)) {
          return false;
        }
        const lessonIdxInMod = parentMod.lessons.findIndex(l => l.id === lessonId);
        if (lessonIdxInMod === 0) {
          // Primeira lição da trilha liberada fica disponível imediatamente
          return true;
        }
        const prevLessonInMod = parentMod.lessons[lessonIdxInMod - 1];
        return this.isLessonCompleted(prevLessonInMod.id);
      }
    }

    const idx = allLessonsOrder ? allLessonsOrder.indexOf(lessonId) : -1;
    if (idx <= 0) return true; // Primeira lição geral sempre aberta
    const prevLessonId = allLessonsOrder[idx - 1];
    return this.isLessonCompleted(prevLessonId);
  }

  /**
   * Conclui uma lição com sucesso: registra o ID e soma o XP ganho.
   */
  completeLesson(lessonId, xpEarned) {
    if (!this.state.completedLessons.includes(lessonId)) {
      this.state.completedLessons.push(lessonId);
    }
    this.state.xp += xpEarned;
    this._saveState(); // Salva no localStorage e notifica a tela
  }

  /**
   * Reduz 1 vida quando o aluno erra uma questão.
   */
  loseLife() {
    if (this.state.lives > 0) {
      this.state.lives -= 1;
      this._saveState();
    }
    return this.state.lives;
  }

  /**
   * Recarrega as vidas do aluno ao valor máximo.
   */
  refillLives() {
    this.state.lives = this.state.maxLives;
    this._saveState();
  }

  /**
   * Alterna entre som ligado e desligado.
   */
  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    this._saveState();
    return this.state.soundEnabled;
  }

  /**
   * Atualiza os dados pessoais do currículo (Nome, cargo, bio, redes).
   */
  updateProfile(newProfileData) {
    this.state.profile = {
      ...this.state.profile,
      ...newProfileData
    };
    this._saveState();
  }

  /**
   * Reinicia o progresso para testes do professor ou do avaliador.
   */
  resetProgress() {
    this.state = {
      ...INITIAL_STATE,
      profile: { ...DEFAULT_PROFILE }
    };
    this._saveState();
  }
}

// Instância única (Singleton) exportada para toda a aplicação
export const appState = new StateManager();
