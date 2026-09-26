# 🎓 Guia Completo de Explicação do Projeto para o Professor
### Projeto: **FrontLingo** — Plataforma Gamificada de Aprendizado Front-End & Currículo Web
### Disciplina: **AS64C - Certificadora de Competência Comum (UTFPR)**

---

## 🚀 1. Como Executar a Aplicação (Via Extensão Live Server)

> 💡 **Instrução Simples para o Professor / Aluno:**
> A aplicação é **100% estática e modular (HTML5, CSS3 e ES6 Modules)**. Ela não necessita de nenhum servidor back-end, banco de dados ou Node.js instalado na máquina.
>
> **Como rodar no VS Code em 2 passos:**
> 1. Abra a pasta do projeto no **VS Code**;
> 2. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"** (ou clique no botão **"Go Live"** na barra azul inferior do VS Code).
> 
> A aplicação abrirá automaticamente no seu navegador padrão (geralmente em `http://127.0.0.1:5500/`).

---

## 🧭 2. Resumo em 1 Minuto (O "Pitch" para o Professor)

> *"Professor, o nosso projeto é o **FrontLingo**: uma plataforma de microlearning gamificada inspirada no Duolingo, desenvolvida para o ensino de desenvolvimento Front-End.*
>
> *O nosso grande diferencial pedagógico é a **Aprendizagem Baseada em Projetos (PBL) com Sala de Aula Invertida**:*
> 1. *No início de cada módulo há uma **Vídeo-Aula Explicativa** gravada pela nossa equipe apresentando os conceitos fundamentais;*
> 2. *Em seguida, o estudante pratica com **desafios interativos de microlearning** (quizzes, preenchimento de código, quebra-cabeças);*
> 3. *A cada fase concluída, **uma parte real de um Currículo Web profissional é gerada e estilizada em tempo real**, pronta para publicação gratuita no **GitHub Pages**."*

---

## 🎬 3. Mapeamento das Vídeo-Aulas & Como Inserir os Vídeos da Equipe

No início de cada uma das 5 trilhas, foi criada uma fase dedicada com ícone de claquete (`🎬`) para a exibição do vídeo gravado pelos integrantes da equipe (Luiz Gustavo e Leonardo):

| Trilha / Módulo | Lição | Título da Vídeo-Aula | Propósito Pedagógico |
| :--- | :--- | :--- | :--- |
| **Módulo 1** | `1.0` | **Vídeo: Boas-Vindas & Conceitos da Web** | Apresentação da equipe UTFPR e o funcionamento da Web (Cliente x Servidor). |
| **Módulo 2** | `2.0` | **Vídeo: O Esqueleto e a Semântica do HTML5** | Importância das tags semânticas da W3C para a estrutura do currículo. |
| **Módulo 3** | `3.0` | **Vídeo: Estilização com CSS3 & Flexbox** | Aplicação de cores, sombras no Box Model e alinhamento flexível. |
| **Módulo 4** | `4.0` | **Vídeo: Dando Vida à Página com JavaScript** | Manipulação do DOM, eventos de clique e programação do Dark Mode. |
| **Módulo 5** | `5.0` | **Vídeo: Responsividade Mobile & GitHub Pages** | Design Mobile-First com @media queries e deploy no GitHub Pages. |

### 📌 Como Inserir o Link do seu Vídeo Gravado:
Abra o arquivo `js/data/modules.js`, localize a lição correspondente (ex: `l-1-0`) e cole o link do seu vídeo na propriedade `videoUrl`:
- **Vídeo no YouTube:** `videoUrl: "https://www.youtube.com/watch?v=SEU_CODIGO"`
- **Vídeo em Arquivo Local (.mp4):** `videoUrl: "videos/modulo1.mp4"`

> Se o campo `videoUrl` for deixado em branco (`""`), a plataforma exibe automaticamente uma **moldura visual elegante de placeholder**, informando aos avaliadores que o espaço está reservado para a gravação da equipe!

---

## 🏛️ 4. Arquitetura do Sistema (Visão Geral Simples)

Desenvolvemos o projeto como uma **SPA (Single Page Application)** utilizando **Vanilla JavaScript (JS Puro)**, sem frameworks externos pesados (como React, Angular ou Vue).

### 💡 Por que Vanilla JS (JavaScript Puro)?
1. **Domínio dos Fundamentos W3C:** Demonstra que compreendemos a fundo a manipulação nativa do DOM, eventos, áudio e estilização moderna, sem depender de "caixas pretas".
2. **Desempenho Instantâneo:** Carrega em milissegundos sem necessidade de compilação ou ferramentas de build complexas.
3. **Autonomia:** Funciona com qualquer servidor estático local (como Live Server).

```
📁 Projeto Certificadora/
│
├── 📄 index.html                -> Única página HTML carregada (Single Page Application)
├── 📄 GUIA_EXPLICACAO_PROFESSOR.md -> Este guia completo para a banca
│
├── 📁 css/                      -> Folhas de Estilos Modulares (Vanilla CSS)
│   ├── main.css                 -> Design System (Cores do Duolingo, variáveis, botões 3D)
│   ├── trail.css                -> Estilos da trilha sinuosa, nós normais e nós de vídeo (🎬)
│   ├── lesson-modal.css         -> Player de lições, vídeos, barras de progresso e feedbacks
│   └── portfolio-view.css       -> Layout do currículo em tempo real e inspetor de código
│
└── 📁 js/                       -> Lógica em Módulos ES6 (Clean Code & Separação de Conceitos)
    ├── app.js                   -> O "Maestro": liga botões, abas e coordena os módulos
    ├── state.js                 -> O "Cérebro": gerencia XP, vidas, lições salvas (localStorage)
    ├── audio.js                 -> O "Músico": sintetiza sons via Web Audio API (sem MP3)
    ├── trail.js                 -> O "Desenhista": desenha a trilha em zigue-zague e confetes
    ├── lesson-engine.js         -> O "Professor": gerencia vídeos, quizzes e validação de 100%
    ├── portfolio-builder.js     -> O "Construtor": gera o HTML/CSS/JS do currículo em tempo real
    └── 📁 data/
        └── modules.js           -> Base pedagógica com os 5 módulos, vídeos e exercícios
```

---

## 📂 5. Explicação Arquivo por Arquivo (Modo Leigo)

Se o professor apontar para qualquer arquivo e perguntar **"O que isso faz?"**, aqui está sua resposta:

### 📄 `index.html` (A Estrutura Semântica)
- **O que faz:** Contém a casca visual da aplicação.
- **Destaque Acadêmico:** Usa tags semânticas recomendadas pela W3C (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`).
- **Como funciona a SPA:** Todas as três telas (`#view-trail`, `#view-portfolio` e `#view-team`) já estão no HTML. O JavaScript apenas adiciona a classe `.active` na tela que o usuário deseja ver, sem nunca recarregar a página.

### 🧠 `js/state.js` (O Gerenciador de Estado e Persistência)
- **O que faz:** Guarda os dados do aluno (pontos de XP, vidas restantes, lições concluídas e informações do currículo).
- **Conceito Chave 1 — `localStorage`:** Salva o progresso no navegador do próprio aluno em formato JSON. Se der F5 ou fechar a aba, o progresso continua lá!
- **Conceito Chave 2 — Padrão Observer:** Outras partes do sistema se "inscrevem" (`subscribe`). Sempre que o aluno ganha XP ou vidas, o `state.js` notifica a interface para atualizar os números imediatamente.

### 🎵 `js/audio.js` (Efeitos Sonoros Matemáticos)
- **O que faz:** Emite os sons de clique, acerto (acorde alegre estilo Duolingo), erro e fanfarra de comemoração.
- **Destaque Acadêmico:** **Não usa arquivos de áudio externos (.mp3 ou .wav)**. Usa a nativa **Web Audio API** do navegador. O código gera ondas sonoras puras ajustando frequências matemáticas em Hertz (ex: Nota Dó = 523Hz, Mi = 659Hz, Sol = 784Hz).
- **Vantagem:** Zero tempo de carregamento, não depende de internet e nunca dá erro 404 de arquivo não encontrado.

### 🗺️ `js/trail.js` (Renderizador da Trilha de Fases)
- **O que faz:** Cria a trilha de aprendizado com os botões circulares das lições.
- **Destaque Visual:** Cria o efeito visual de zigue-zague alternando um deslocamento horizontal (`transform: translateX`) para que as fases fiquem sinuosas como no Duolingo.
- **Destaque dos Nós de Vídeo:** Identifica lições do tipo vídeo e renderiza o ícone de claquete (`🎬`) com botão destacado de *"Assistir Vídeo ▶"*.
- **Efeito de Confetes:** Ao desbloquear uma trilha nova, aciona uma chuva de confetes desenhada puramente com **HTML5 Canvas 2D**, calculando física básica (gravidade, velocidade e rotação de 80 partículas).

### 🎮 `js/lesson-engine.js` (O Motor das Lições Interativas)
- **O que faz:** Controla o modal onde o aluno assiste aos vídeos e responde aos exercícios.
- **Suporte a 6 Formatos de Conteúdo:**
  1. *Vídeo:* Player responsivo 16:9 ou placeholder com notas de aula;
  2. *Teoria:* Leitura com código formatado e dicas;
  3. *Quiz:* Múltipla escolha tradicional;
  4. *Fill in the Blank:* Preenchimento de tags ou propriedades no código;
  5. *Puzzle:* Quebra-cabeça de blocos de código para ordenar;
  6. *Match:* Associação de conceitos em duas colunas.
- **Critério Pedagógico (Mastery Learning):** Exige **100% de acertos** na fase para liberar o próximo nível, garantindo que o estudante dominou o assunto antes de avançar.

### 🧱 `js/portfolio-builder.js` (O Motor do Currículo Cumulativo)
- **O que faz:** Constrói o Currículo Web passo a passo conforme o aluno passa de fase.
- **Como funciona:** Ele lê as lições completadas no `state.js`. Se o aluno concluiu o Módulo 2, gera as tags HTML. Se concluiu o Módulo 3, adiciona as variáveis e regras CSS. Se concluiu o Módulo 4, adiciona os scripts JS de Modo Escuro e Cópia de E-mail.
- **Exportação Real:** Possui a função `downloadPortfolioFiles()`, que cria um arquivo virtual (`Blob`) e permite ao aluno baixar seu `index.html` completo pronto para hospedagem no GitHub Pages.

### 🕹️ `js/app.js` (O Controlador / Maestro)
- **O que faz:** Inicializa a aplicação, escuta os cliques do usuário nos menus e modais, e conecta o estado à interface.

---

## ❓ 6. Perguntas Típicas dos Professores & Como Responder

### 🎙️ Pergunta 1: *"Onde os dados do usuário ficam salvos? Vocês usaram banco de dados?"*
> **Resposta:**
> *"Professor, como o nosso objetivo era criar um Recurso Educacional Aberto de acesso imediato sem necessidade de cadastro com login/senha ou backend complexo, utilizamos a API nativa de **localStorage** do HTML5.*
> *Os dados (XP, vidas, lições feitas e dados do perfil) são serializados em JSON e armazenados no navegador do próprio estudante. Isso garante persistência mesmo após reiniciar o computador e funciona 100% offline."*

### 🎙️ Pergunta 2: *"Como o currículo na aba 'Meu Currículo' atualiza sozinho sem recarregar a tela?"*
> **Resposta:**
> *"Utilizamos o **Padrão de Projeto Observer (Publicador/Assinante)** implementado no arquivo `state.js`.*
> *Quando uma lição é concluída, o `StateManager` dispara um aviso (`notify`) para todos os inscritos. O `portfolioBuilder` então recalcula o código HTML/CSS/JS acumulado e injeta diretamente no `iframe` usando a propriedade nativa `srcdoc`. Isso faz a visualização atualizar em tempo real de forma isolada e segura."*

### 🎙️ Pergunta 3: *"Por que usar um iframe para renderizar o currículo do aluno?"*
> **Resposta:**
> *"O `<iframe>` com `srcdoc` funciona como um **sandbox (ambiente isolado)**.*
> *Ele garante que as regras de CSS do currículo do aluno (como fontes, cores de fundo e margens) não vazem nem interfiram nos estilos da plataforma FrontLingo principal, e vice-versa. É o mesmo mecanismo de isolamento usado por plataformas como CodePen e JSFiddle."*

### 🎙️ Pergunta 4: *"Como funcionam os efeitos sonoros sem arquivos .mp3 na pasta?"*
> **Resposta:**
> *"Criamos um sintetizador de som nativo no `audio.js` usando a **Web Audio API** do W3C.*
> *Criamos um nó oscilador (`OscillatorNode`) que gera vibração na frequência exata das notas musicais e conectamos a um controle de ganho (`GainNode`) para fazer o volume decair suavemente. Por exemplo, no som de acerto tocamos as notas Dó, Mi, Sol e Dó em sequência rápida, gerando um acorde alegre e triunfante sem gastar 1 kilobyte de internet."*

### 🎙️ Pergunta 5: *"Qual a função das vídeo-aulas no início de cada módulo?"*
> **Resposta:**
> *"As vídeo-aulas adotam o modelo pedagógico de **Sala de Aula Invertida**. Em vez de o aluno encarar códigos frios de imediato, os integrantes da equipe (com Luiz Gustavo na apresentação e Leonardo na edição) explicam em vídeo de 3 a 5 minutos a motivação e a teoria do módulo, preparando o estudante para as atividades práticas na trilha."*

---

## 🎯 7. Roteiro Prático de Demonstração (Para Apresentar na Aula)

Siga estes 5 passos simples na hora de projetar a tela para a banca avaliadora:

1. **Apresente a Página Inicial:**
   - Mostre a logo **FrontLingo (UTFPR • AS64C)**;
   - Mostre a barra superior com contadores de **Ofensiva (🔥)**, **XP (⚡)**, **Vidas (❤️)** e botão de **Som (🔊)**;
   - Aponte para a **Trilha 1** e destaque o **nó especial com ícone de claquete (`🎬`)**: *"Professor, aqui temos a vídeo-aula que introduz o módulo!"*.

2. **Abra a Vídeo-Aula (Fase 1.0):**
   - Clique no nó **1.0: Vídeo-Aula: Boas-Vindas & Conceitos da Web**;
   - Clique em **"Assistir Vídeo ▶"**;
   - Mostre a moldura do player com a lista de tópicos pedagógicos e a instrução clara de inserção do vídeo gravado;
   - Clique em **"Assistir e Continuar ▶"** e mostre a conclusão da fase e o ganho de XP!

3. **Inicie a Fase Prática (Fase 1.1):**
   - Mostre que a fase **1.1** foi desbloqueada automaticamente após assistir ao vídeo;
   - Erre de propósito uma questão (mostre a perda de vida e o som de erro) e depois acerte (mostre o acorde alegre e feedback verde).

4. **Demonstre o Currículo em Construção:**
   - Clique na aba **"💼 Meu Currículo"**;
   - Mostre a tela explicativa "Portfólio em Construção";
   - Abra o modal **"✏️ Personalizar Meus Dados"** e altere o nome ou o cargo para mostrar a personalização;
   - Mostre a alternância entre **"Visualizar Site"** e **"Código-Fonte"**.

5. **Aba da Equipe e Reset do Avaliador:**
   - Acesse a aba **"👥 Equipe UTFPR"**;
   - Mostre os cartões dos integrantes, destacando os papéis de gravação de vídeo, arquitetura e documentação;
   - Mostre o botão **"⚠️ Resetar Progresso"**, explicando que ele foi criado para que os professores avaliadores possam reiniciar os testes a qualquer momento.

---
*Documento preparado com foco em clareza didática e excelência acadêmica para a disciplina AS64C da UTFPR.*
