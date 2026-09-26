# 🦉 FrontLingo • UTFPR (AS64C)

> **Plataforma de Microlearning Gamificada para Ensino de Front-End & Construção Cumulativa de Portfólio/Currículo Web**  
> Desenvolvida na disciplina **AS64C - Certificadora de Competência Comum** da Universidade Tecnológica Federal do Paraná (UTFPR).

[![Deploy no GitHub Pages](https://img.shields.io/badge/Acesse%20Online-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://nieltom.github.io/FrontLingo/)

[![Status](https://img.shields.io/badge/Status-Concluído-success.svg)](#)
[![Tecnologias](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B%20Modular-blue.svg)](#)
[![Metodologia](https://img.shields.io/badge/Metodologia-PBL%20%2B%20Mastery%20Learning-orange.svg)](#)

---

### 🌐 Acesse a Aplicação Online:
👉 **[https://nieltom.github.io/FrontLingo/](https://nieltom.github.io/FrontLingo/)**

---

## 🎯 Sobre o Projeto

O **FrontLingo** é um *Recurso Educacional Aberto (REA)* concebido com uma proposta pedagógica inovadora: **Aprendizagem Baseada em Projetos (PBL)** combinada com a gamificação viciante inspirada no Duolingo e no Mimo.

Em vez de o estudante apenas responder a quizzes teóricos e terminar sem nada prático, **cada fase completada na trilha destrava uma melhoria real no seu Currículo Web profissional**:
1. **Módulo 1:** Conceitos fundamentais de como a web funciona e ferramentas (VS Code e DevTools);
2. **Módulo 2:** Estruturação semântica do currículo em HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, títulos, listas e foto);
3. **Módulo 3:** Design moderno em CSS3 com Variáveis (`:root`), Cartões com sombra (Box Model) e alinhamento flexível (Flexbox);
4. **Módulo 4:** Interatividade com JavaScript puro (Manipulação do DOM, alternador de Modo Escuro/Claro e cópia de e-mail com 1 clique);
5. **Módulo 5:** Design Responsivo (Mobile-First) e publicação gratuita no **GitHub Pages**.

---

## 🚀 Como Executar o Projeto Localmente

A aplicação é **100% estática e modular (Vanilla JavaScript ES6)**. Não requer Node.js, compilação ou instalação de dependências:

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/nieltom/FrontLingo.git
   ```
2. Abra a pasta no **Visual Studio Code**;
3. Inicie através da extensão **Live Server**:
   - Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"** (ou clique no botão **"Go Live"** na barra inferior do VS Code);
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500/`.

---

## 🌟 Principais Recursos & Tecnologias

- **Single Page Application (SPA) Nativa:** Transições instantâneas entre a *Trilha*, o *Meu Currículo* e a aba *Equipe UTFPR*, sem recarregamento de página.
- **Trilha Gamificada Estilo Duolingo:** Caminho sinuoso em zigue-zague com nós de lições, status de bloqueio, popovers informativos e animação comemorativa de desbloqueio com **confetes em HTML5 Canvas nativo**.
- **Vídeo-Aulas Introdutórias (🎬):** Lições de vídeo no início de cada módulo (fases 1.0, 2.0, 3.0, 4.0 e 5.0) para introduzir os conteúdos de forma expositiva (Sala de Aula Invertida).
- **Player Interativo com 6 Tipos de Questão:**
  - Vídeo-Aulas incorporadas;
  - Teoria com código formatado e dicas;
  - Quizzes de múltipla escolha;
  - Preenchimento de lacunas de código (*Fill in the Blank*);
  - Quebra-cabeças de ordenação de blocos (*Puzzle*);
  - Associação de colunas (*Match*).
- **Mastery Learning (Aprendizagem para o Domínio):** Exige 100% de acertos para liberar a fase seguinte, com contagem de vidas e feedback visual/sonoro imediato.
- **Sintetizador Sonoro Nativo (Web Audio API):** Efeitos sonoros gerados por frequências matemáticas puras (acorde triunfante de vitória, erro, cliques e fanfarras), sem arquivos externos pesados (.mp3).
- **Visualizador de Currículo em Tempo Real:** Renderização isolada e segura via `<iframe>` com `srcdoc`, alternância entre modo visual e código-fonte, e botão de exportação direta do `index.html` pronto para publicação.
- **Persistência Local (`localStorage`):** Salva XP, ofensiva (streak), vidas, perfil do aluno e progresso das trilhas diretamente no navegador.

---

## 👥 Integrantes da Equipe UTFPR

| Nome | Atribuições Principais | Contatos |
| :--- | :--- | :--- |
| **Nielton Augusto** | Desenvolvimento do Website & Arquitetura Web | [GitHub](https://github.com/nieltom) • [LinkedIn](https://www.linkedin.com/in/nieltom-augusto-233b11274/) |
| **Luiz Gustavo Mendes Lemes** | Gravação das Aulas & Coordenação Geral | [GitHub](https://github.com/lgustavolemes) • [LinkedIn](https://www.linkedin.com/in/gustav0lemes/) |
| **Leonardo Di Camargo Rodrigues** | Edição de Vídeo & Gravação das Aulas | [GitHub](https://github.com/LeonardoCamargo19) • [LinkedIn](https://www.linkedin.com/in/leonardo-di-camargo-rodrigues-2b9888238/) |
| **Rafaela da Silva** | Design de Slides & Documentação Técnica | [GitHub](https://github.com/rafaeladasilva2005-dev) • [LinkedIn](https://www.linkedin.com/in/rafaela-da-silva-pinto-42ab772ba/) |
| **Danilo Vargas** | Manual de Usuário & Gestão Trello/Kanban | [GitHub](https://github.com/danilovargasslk) • [LinkedIn](https://www.linkedin.com/in/danilo-silva-vargas-b407512aa/) |

---

## 📚 Documentação para a Banca Avaliadora

Para mais detalhes sobre a arquitetura do software, perguntas frequentes feitas por professores e o roteiro de apresentação passo a passo, consulte o arquivo:
📄 **[GUIA_EXPLICACAO_PROFESSOR.md](./GUIA_EXPLICACAO_PROFESSOR.md)**

---

*Projeto desenvolvido com dedicação acadêmica para a disciplina AS64C da Universidade Tecnológica Federal do Paraná (UTFPR).*
