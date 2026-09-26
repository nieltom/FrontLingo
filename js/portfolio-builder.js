/**
 * ============================================================================
 * PROJETO CERTIFICADORA UTFPR - AS64C: FRONTLINGO
 * Arquivo: js/portfolio-builder.js
 * Papel no Sistema: Motor de Geração Cumulativa do Portfólio / Currículo Web
 * ============================================================================
 * 
 * 💡 EXPLICAÇÃO DIDÁTICA PARA O PROFESSOR:
 * "Professor, este arquivo representa a grande proposta pedagógica do nosso
 * projeto: a APRENDIZAGEM BASEADA EM PROJETOS (PBL).
 * 
 * Em vez de o aluno apenas responder quizzes abstratos, cada fase concluída
 * na trilha do Duolingo constrói uma parte real de um Currículo Web profissional:
 * 
 * 1. Módulo 2 (HTML): Desbloqueia e monta a estrutura semântica (tags header,
 *    section, ul, li, img) preenchida com os dados do aluno.
 * 2. Módulo 3 (CSS): Aplica estilização profissional com Variáveis CSS (:root),
 *    Cartões modernos (Box Model) e alinhamento flexível (Flexbox).
 * 3. Módulo 4 (JavaScript): Acrescenta interatividade real, como alternador
 *    de Modo Escuro/Claro e botão de 'Copiar E-mail com 1 Clique'.
 * 4. Módulo 5 (Deploy): Torna a página 100% responsiva (Mobile-First) e gera
 *    um arquivo 'index.html' autônomo para publicação no GitHub Pages."
 * ============================================================================
 */

import { appState } from './state.js';

export class PortfolioBuilder {
  constructor() {
    this.container = null;
  }

  /**
   * 1. MAPEAMENTO DE RECURSOS DESBLOQUEADOS
   * Consulta o StateManager para saber quais lições o aluno já concluiu com sucesso.
   * Retorna um mapa booleano simples (true/false) de cada recurso.
   */
  getUnlockedFeatures() {
    const state = appState.getState();
    const completed = state.completedLessons || [];

    // O currículo HTML nasce quando o aluno completa o Módulo 2 (lição final 2.4)
    const hasHTMLCurriculum = completed.includes('l-2-4');
    // A formatação CSS moderna entra quando completa o Módulo 3 (lição final 3.4)
    const hasCSSFormatting = completed.includes('l-3-4');

    return {
      hasHTMLCurriculum,
      hasHTMLSkeleton: hasHTMLCurriculum || completed.includes('l-2-1'),
      hasTextAndLists: hasHTMLCurriculum || completed.includes('l-2-2'),
      hasMediaAndLinks: hasHTMLCurriculum || completed.includes('l-2-3'),
      hasSemantics: hasHTMLCurriculum,
      hasCSSFormatting,
      hasCSSColors: hasCSSFormatting || completed.includes('l-3-1'),
      hasCSSBoxModel: hasCSSFormatting || completed.includes('l-3-2'),
      hasCSSFlexbox: hasCSSFormatting || completed.includes('l-3-3'),
      hasJSBasics: completed.includes('l-4-1'),
      hasJSDom: completed.includes('l-4-2'),
      hasJSDarkMode: completed.includes('l-4-3'),
      hasJSCopyEmail: completed.includes('l-4-4'),
      hasResponsiveUI: completed.includes('l-5-1'),
      hasGitHubPagesReady: completed.includes('l-5-2')
    };
  }

  /**
   * 2. GERAÇÃO DO CÓDIGO HTML DO CURRÍCULO
   * Junta as informações do perfil do estudante com as tags HTML desbloqueadas.
   */
  generateHTML(fullDocument = true) {
    const state = appState.getState();
    const { profile } = state;
    const f = this.getUnlockedFeatures();

    // Se o aluno ainda NÃO completou o Módulo 2 de HTML, exibe a tela instrutiva de boas-vindas:
    if (!f.hasHTMLCurriculum) {
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 32px 20px;
      background: #f8fafc;
      color: #334155;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      box-sizing: border-box;
    }
    .construction-card {
      background: #ffffff;
      border: 2px dashed #cbd5e1;
      border-radius: 20px;
      padding: 36px 28px;
      max-width: 540px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
      text-align: center;
    }
    .badge-step {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #e0f2fe;
      color: #0284c7;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 16px;
    }
    h2 { margin: 0 0 10px 0; color: #0f172a; font-size: 1.45rem; font-weight: 800; }
    p.subtitle { margin: 0 0 20px 0; line-height: 1.5; font-size: 0.95rem; color: #64748b; }
    .steps-preview {
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-align: left;
      background: #f1f5f9;
      padding: 18px;
      border-radius: 14px;
      font-size: 0.88rem;
    }
    .step-item { display: flex; align-items: flex-start; gap: 10px; line-height: 1.45; }
    .step-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
  </style>
</head>
<body>
  <div class="construction-card">
    <div class="badge-step">🚀 Portfólio em Construção</div>
    <h2>Seu Currículo Web Nascerá Aqui!</h2>
    <p class="subtitle">Conforme você avança nas trilhas gamificadas, seu currículo é gerado e estilizado passo a passo:</p>
    <div class="steps-preview">
      <div class="step-item">
        <span class="step-icon">📄</span>
        <div><strong>Módulo 2 (HTML Básico):</strong> Ao concluir a lição final <em>2.4: Estruturando seu Currículo</em>, a estrutura semântica com seus dados reais será gerada aqui!</div>
      </div>
      <div class="step-item">
        <span class="step-icon">🎨</span>
        <div><strong>Módulo 3 (CSS Básico):</strong> Ao concluir a lição final <em>3.4: Formatando seu Currículo</em>, o design moderno com cartões, cores e Flexbox será aplicado!</div>
      </div>
      <div class="step-item">
        <span class="step-icon">⚡</span>
        <div><strong>Módulo 4 (JavaScript):</strong> Adicione interatividade com alternador de Modo Escuro e cópia de e-mail!</div>
      </div>
    </div>
  </div>
</body>
</html>`;
    }

    // --- BLOCO 1: Cabeçalho com Foto e Redes Sociais ---
    const headerContent = `
  <header class="portfolio-header">
    <img src="${profile.fotoUrl}" alt="Foto de perfil de ${profile.nome}" class="profile-img">
    <div class="header-info">
      <h1>${profile.nome}</h1>
      <h2>${profile.cargo}</h2>
      <p class="location-tag">📍 ${profile.cidade}</p>
      <div class="social-links">
        <a href="${profile.github}" target="_blank" rel="noopener noreferrer" class="btn-link">GitHub</a>
        <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-link">LinkedIn</a>
        ${f.hasJSCopyEmail ? `<button id="btn-copy-email" class="btn-link">Copiar E-mail</button>` : `<a href="mailto:${profile.email}" class="btn-link">E-mail</a>`}
      </div>
    </div>
    ${f.hasJSDarkMode ? `
    <button id="btn-theme-toggle" class="theme-btn" title="Alternar Tema">
      <span class="theme-icon">🌙</span> Alternar Modo
    </button>` : ''}
  </header>`;

    // --- BLOCO 2: Seção Sobre Mim ---
    const bioSection = `
  <section class="card-section" id="sobre">
    <h3>Sobre Mim</h3>
    <p>${profile.bio}</p>
  </section>`;

    // --- BLOCO 3: Seção Habilidades & Competências ---
    const skillsSection = `
  <section class="card-section" id="habilidades">
    <h3>Habilidades & Tecnologias</h3>
    <ul class="skills-list">
      ${profile.skills.map(s => `<li>${s}</li>`).join('\n      ')}
    </ul>
  </section>`;

    // --- BLOCO 4: Seção Experiências e Projetos ---
    const expSection = `
  <section class="card-section" id="experiencias">
    <h3>Experiência & Projetos</h3>
    <div class="experience-list">
      ${profile.experiencias.map(exp => `
      <div class="exp-item">
        <div class="exp-header">
          <strong>${exp.cargo}</strong>
          <span class="exp-period">${exp.periodo}</span>
        </div>
        <div class="exp-company">${exp.empresa}</div>
        <p>${exp.descricao}</p>
      </div>`).join('')}
    </div>
  </section>`;

    // --- BLOCO 5: Rodapé Semântico ---
    const footerContent = `
  <footer class="portfolio-footer">
    <p>© ${new Date().getFullYear()} ${profile.nome} • Desenvolvido na plataforma UTFPR FrontLingo</p>
  </footer>`;

    // Montagem final do corpo principal
    const mainBody = `
  <main class="portfolio-container">
    ${headerContent}
    ${bioSection}
    ${skillsSection}
    ${expSection}
    ${footerContent}
  </main>`;

    if (!fullDocument) {
      return mainBody;
    }

    // Gera o CSS e o JS correspondentes ao nível de progresso
    const cssContent = this.generateCSS();
    const jsContent = this.generateJS();

    // Retorna o documento HTML5 completo e padronizado
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  ${f.hasResponsiveUI ? '<meta name="viewport" content="width=device-width, initial-scale=1.0">' : ''}
  <title>Currículo & Portfólio de ${profile.nome}</title>
  <style>
${cssContent}
  </style>
</head>
<body>
${mainBody}
${jsContent ? `  <script>
${jsContent}
  </script>` : ''}
</body>
</html>`;
  }

  /**
   * 3. GERAÇÃO DINÂMICA DE CSS
   * Se o Módulo 3 não foi concluído, exibe estilos crus padrão Times New Roman
   * para evidenciar didaticamente ao aluno o papel essencial do CSS.
   * Ao concluir o Módulo 3, ativa variáveis, cartões e Flexbox.
   */
  generateCSS() {
    const f = this.getUnlockedFeatures();

    // Sem CSS formatado ainda: exibe formatação padrão limpa de HTML puro
    if (!f.hasCSSFormatting) {
      return `/* =========================================================================
   ESTRUTURA HTML GERADA (Módulo 2 Concluído)
   Estilos limpos de renderização semântica nativa do navegador.
   Conclua o Módulo 3 na trilha para aplicar a formatação CSS moderna!
   ========================================================================= */
body {
  font-family: 'Times New Roman', Times, serif;
  margin: 32px auto;
  max-width: 800px;
  background-color: #ffffff;
  color: #111111;
  line-height: 1.6;
  padding: 0 16px;
}

header {
  border-bottom: 2px solid #222222;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

header h1 {
  font-size: 2.2rem;
  margin: 0 0 4px 0;
  color: #111111;
}

header h2 {
  font-size: 1.3rem;
  font-weight: normal;
  color: #444444;
  margin: 0 0 8px 0;
}

.profile-img {
  width: 96px;
  height: 96px;
  float: right;
  margin-left: 20px;
  border: 1px solid #999999;
}

.location-tag {
  font-style: italic;
  color: #555555;
  margin-bottom: 8px;
}

.social-links {
  margin-top: 8px;
}

.social-links a, .social-links button {
  color: #0000ee;
  text-decoration: underline;
  margin-right: 12px;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0;
}

section {
  margin-bottom: 28px;
  clear: both;
}

section h3 {
  font-size: 1.25rem;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 4px;
  margin-bottom: 12px;
}

ul {
  margin-left: 24px;
  margin-bottom: 16px;
}

li {
  margin-bottom: 4px;
}

.exp-item {
  margin-bottom: 16px;
}

.exp-header {
  font-weight: bold;
}

.exp-period {
  font-style: italic;
  color: #666666;
  font-size: 0.9rem;
}

.exp-company {
  font-weight: 500;
  color: #333333;
}

footer {
  border-top: 1px solid #cccccc;
  padding-top: 16px;
  margin-top: 40px;
  font-size: 0.85rem;
  color: #666666;
  text-align: center;
}`;
    }

    // CSS Moderno Ativado (Módulo 3 Concluído)
    let css = `/* Variáveis de Tema (CSS Custom Properties) */
:root {
  --bg-primary: #f8fafc;
  --bg-card: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --border-color: #e2e8f0;
  --badge-bg: #eff6ff;
  --badge-text: #1d4ed8;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}

/* Suporte a Tema Escuro */
body.dark-mode {
  --bg-primary: #0b0f19;
  --bg-card: #131b2e;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary: #38bdf8;
  --primary-hover: #7dd3fc;
  --border-color: #1e293b;
  --badge-bg: #1e293b;
  --badge-text: #38bdf8;
  --shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.35);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  padding: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.portfolio-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
`;

    // Cartões do Box Model
    if (f.hasCSSBoxModel) {
      css += `
/* Box Model: Cartões com Espaçamentos e Sombras */
.card-section, .portfolio-header {
  background: var(--bg-card);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-section h3 {
  color: var(--primary);
  margin-bottom: 12px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 8px;
}
`;
    }

    // Alinhamentos Flexbox
    if (f.hasCSSFlexbox) {
      css += `
/* Flexbox: Layout Flexível e Alinhamentos */
.portfolio-header {
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.header-info {
  flex: 1;
}

.header-info h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-main);
}

.header-info h2 {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--primary);
  margin-bottom: 6px;
}

.location-tag {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn-link {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--primary);
  color: #ffffff;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.btn-link:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.theme-btn {
  background: var(--border-color);
  color: var(--text-main);
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  background: var(--primary);
  color: white;
}

/* Badges de Habilidades em Flexbox */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
}

.skills-list li {
  background: var(--badge-bg);
  color: var(--badge-text);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid var(--border-color);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exp-item {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.exp-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exp-period {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.exp-company {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 4px;
}

.portfolio-footer {
  text-align: center;
  padding: 16px;
  color: var(--text-muted);
  font-size: 0.85rem;
}
`;
    }

    // Media Queries Mobile-First (Módulo 5)
    if (f.hasResponsiveUI) {
      css += `
/* Responsividade Mobile-First (Módulo 5) */
@media (max-width: 640px) {
  body {
    padding: 12px;
  }
  .portfolio-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  .social-links {
    justify-content: center;
  }
  .exp-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
`;
    }

    return css;
  }

  /**
   * 4. GERAÇÃO DINÂMICA DE JAVASCRIPT
   * Injeta os scripts de Modo Escuro e Cópia de E-mail se desbloqueados no Módulo 4.
   */
  generateJS() {
    const f = this.getUnlockedFeatures();
    const scripts = [];

    // Script 1: Alternador de Tema Escuro / Claro
    if (f.hasJSDarkMode) {
      scripts.push(`// Alternador de Tema Escuro / Claro (Manipulação da Classe dark-mode)
const btnTheme = document.querySelector('#btn-theme-toggle');
if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    btnTheme.innerHTML = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  });
}`);
    }

    // Script 2: Copiar E-mail com Clipboard API nativa
    if (f.hasJSCopyEmail) {
      const state = appState.getState();
      const email = state.profile.email;
      scripts.push(`// Copiar E-mail com API de Clipboard do Navegador
const btnCopy = document.querySelector('#btn-copy-email');
if (btnCopy) {
  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText('${email}').then(() => {
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Copiado! ✓';
      btnCopy.style.background = '#10b981';
      setTimeout(() => {
        btnCopy.textContent = originalText;
        btnCopy.style.background = '';
      }, 2000);
    });
  });
}`);
    }

    return scripts.join('\n\n');
  }

  /**
   * 5. EXPORTAÇÃO DO ARQUIVO PARA GITHUB PAGES
   * Cria um arquivo virtual (Blob) em memória com todo o HTML/CSS/JS e dispara
   * o download direto do index.html para a máquina do aluno.
   */
  downloadPortfolioFiles() {
    const html = this.generateHTML(true);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Instância única exportada para a aplicação
export const portfolioBuilder = new PortfolioBuilder();
