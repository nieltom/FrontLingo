/**
 * ============================================================================
 * PROJETO CERTIFICADORA UTFPR - AS64C: FRONTLINGO
 * Arquivo: js/audio.js
 * Papel no Sistema: Sintetizador de Efeitos Sonoros com Web Audio API Nativa
 * ============================================================================
 * 
 * 💡 EXPLICAÇÃO DIDÁTICA PARA O PROFESSOR:
 * "Professor, para os efeitos sonoros da gamificação (estilo Duolingo), nós
 * NÃO usamos arquivos .mp3 ou .wav baixados da internet.
 * 
 * Por que escolhemos a Web Audio API nativa do próprio navegador?
 * 1. ZERO ARQUIVOS PESADOS: A página carrega instantaneamente, sem precisar
 *    esperar download de áudios.
 * 2. FUNCIONA 100% OFFLINE: Se a internet cair, o som continua funcionando.
 * 3. MATEMÁTICA PURA DO NAVEGADOR: Criamos um 'oscilador' (como num teclado
 *    sintetizador) que gera as frequências sonoras das notas musicais em Hertz
 *    (ex: Nota Dó = 523Hz, Mi = 659Hz, Sol = 783Hz) e um controle de volume
 *    (GainNode) para suavizar a terminação do som."
 * ============================================================================
 */

class SoundEffects {
  constructor() {
    this.ctx = null;     // Contexto de áudio do navegador (AudioContext)
    this.enabled = true; // Permite ao usuário mutar/desmutar
  }

  /**
   * Inicializa o contexto de áudio sob demanda.
   * Regra dos navegadores modernos: o som só pode ser ativado após o usuário
   * interagir com a tela (clicar em algo), evitando reprodução automática indesejada.
   */
  _init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    // Se o navegador suspendeu o áudio para economizar energia, reativa aqui
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * 1. SOM DE CLIQUE / POP
   * Tocado ao clicar em abas, botões de opções e nós da trilha.
   * Onda senoidal curta que sobe suavemente de 450Hz para 700Hz em 80 milissegundos.
   */
  playPop() {
    if (!this.enabled) return;
    this._init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator(); // Gerador da onda sonora
    const gain = this.ctx.createGain();       // Controle de volume

    osc.type = 'sine'; // Onda senoidal suave
    const now = this.ctx.currentTime;
    
    // Frequência sobe rápido (efeito 'pop' de bolha)
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

    // Fade-out no volume para não estalar no alto-falante
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    // Conecta: Oscilador -> Controle de Volume -> Alto-falante do Computador
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * 2. SOM DE RESPOSTA CORRETA (Acorde Triunfante Estilo Duolingo)
   * Toca um acorde alegre em escala ascendente:
   * Notas: Dó5 (523Hz), Mi5 (659Hz), Sol5 (784Hz) e Dó6 (1046Hz).
   */
  playCorrect() {
    if (!this.enabled) return;
    this._init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle'; // Onda triangular: som quente e brilhante
      const startTime = now + (idx * 0.06); // Pequeno intervalo entre cada nota

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  /**
   * 3. SOM DE RESPOSTA INCORRETA (Buzzer Suave de Erro)
   * Onda dente-de-serra grave que desce de 220Hz para 140Hz,
   * alertando o aluno sem ser estridente ou agressivo.
   */
  playError() {
    if (!this.enabled) return;
    this._init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth'; // Onda dente-de-serra para som encorpado
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * 4. FANFARRA DE CELEBRAÇÃO (Finalização de Fase / Lição)
   * Toca uma sequência melódica comemorativa de 4 notas.
   */
  playCelebration() {
    if (!this.enabled) return;
    this._init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },    // Dó
      { f: 659.25, d: 0.12, t: 0.12 }, // Mi
      { f: 783.99, d: 0.15, t: 0.24 }, // Sol
      { f: 1046.50, d: 0.45, t: 0.39 } // Dó agudo sustentado
    ];

    notes.forEach(({ f, d, t }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.25, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d);
    });
  }

  /**
   * 5. ARPEGGIO MÁGICO DE DESBLOQUEIO (Ao Liberar Nova Trilha Completa)
   * Sequência ascendente luminosa de 5 notas que acompanha os confetes na tela.
   */
  playUnlock() {
    if (!this.enabled) return;
    this._init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [
      { f: 392.00, d: 0.10, t: 0 },    // Sol4
      { f: 523.25, d: 0.10, t: 0.09 }, // Dó5
      { f: 659.25, d: 0.12, t: 0.18 }, // Mi5
      { f: 783.99, d: 0.15, t: 0.28 }, // Sol5
      { f: 1046.50, d: 0.50, t: 0.40 } // Dó6 final com brilho
    ];

    notes.forEach(({ f, d, t }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.25, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d);
    });
  }
}

// Instância única exportada para toda a aplicação
export const soundEffects = new SoundEffects();
