/**
 * modules.js
 * Base de dados pedagógica completa dos 5 módulos do projeto UTFPR (AS64C),
 * estruturados em microlearning gamificado para construção progressiva de um Portfólio/Currículo HTML.
 */

export const MODULES_DATA = [
  {
    id: "mod-1",
    number: 1,
    title: "Módulo 1: Conceitos Fundamentais",
    subtitle: "A Base da Web e Ferramentas",
    description: "Descubra como a internet funciona nos bastidores e prepare suas ferramentas de desenvolvimento.",
    color: "#58CC02", // Duolingo Green
    accentColor: "#46A302",
    lessons: [
      {
        id: "l-1-0",
        code: "1.0",
        title: "Vídeo-Aula: Boas-Vindas & Conceitos da Web",
        xp: 15,
        isVideoLesson: true,
        portfolioMilestone: "Vídeo do Módulo 1 Assistido",
        summary: "Assista ao vídeo explicativo gravado pela equipe apresentando a disciplina e o funcionamento da Web.",
        questions: [
          {
            type: "video",
            title: "Vídeo Explicativo: Introdução ao Módulo 1",
            description: "Vídeo gravado pelos integrantes da equipe (Luiz Gustavo e Leonardo) apresentando a proposta do projeto FrontLingo e como a internet funciona nos bastidores.",
            videoUrl: "", // Cole aqui a URL do YouTube (ex: https://www.youtube.com/watch?v=...) ou arquivo MP4 (ex: videos/modulo1.mp4)
            summaryPoints: [
              "Apresentação da equipe UTFPR e proposta da Certificadora AS64C",
              "Papel fundamental das 3 tecnologias: HTML (Estrutura), CSS (Estilo) e JavaScript (Comportamento)",
              "Como as lições cumulativas construirão seu Currículo Web profissional"
            ],
            tip: "Depois de assistir, clique no botão verde para concluir e desbloquear a primeira fase interativa da trilha!"
          }
        ]
      },
      {
        id: "l-1-1",
        code: "1.1",
        title: "Como a Web Funciona",
        xp: 15,
        portfolioMilestone: "Conceito Inicial",
        summary: "Entenda o papel do Navegador, Cliente, Servidor e os arquivos HTML, CSS e JS.",
        questions: [
          {
            type: "theory",
            title: "Como a Web funciona?",
            explanation: "Quando você digita um site no navegador, seu computador (**Cliente**) envia uma requisição via internet para outro computador (**Servidor**). O servidor responde enviando 3 tipos de arquivos fundamentais:\n\n- **HTML**: Dá a **estrutura** e o conteúdo (textos, títulos, botões);\n- **CSS**: Cuida do **estilo** visual (cores, fontes, layout);\n- **JavaScript**: Dá a **vida e interatividade** (ações, cliques, lógica).",
            tip: "Pense no HTML como o esqueleto humano, o CSS como as roupas e aparência, e o JavaScript como o sistema nervoso que permite se mover!"
          },
          {
            type: "quiz",
            question: "Qual das tecnologias web é responsável pela estrutura e conteúdo de uma página?",
            options: [
              { id: "opt-1", text: "HTML", correct: true },
              { id: "opt-2", text: "CSS", correct: false },
              { id: "opt-3", text: "JavaScript", correct: false },
              { id: "opt-4", text: "Python", correct: false }
            ],
            explanation: "O HTML (HyperText Markup Language) é a linguagem de marcação que define a estrutura de qualquer página web."
          },
          {
            type: "match",
            question: "Associe o papel de cada tecnologia ao seu propósito:",
            pairs: [
              { term: "HTML", match: "Estrutura e conteúdo" },
              { term: "CSS", match: "Estilo visual e cores" },
              { term: "JavaScript", match: "Interatividade e lógica" }
            ]
          }
        ]
      },
      {
        id: "l-1-2",
        code: "1.2",
        title: "Editor de Códigos & Ferramentas",
        xp: 15,
        portfolioMilestone: "Ambiente Preparado",
        summary: "Conheça o VS Code, arquivos .html e as Ferramentas de Desenvolvedor (DevTools).",
        questions: [
          {
            type: "theory",
            title: "Onde escrevemos código?",
            explanation: "Para programar na web usamos um **Editor de Código**, sendo o **VS Code (Visual Studio Code)** o mais popular do mundo.\n\nAlém disso, todo navegador moderno possui o **DevTools** (atalho `F12` ou botão direito > *Inspecionar*), permitindo ver o HTML e CSS de qualquer site em tempo real!",
            tip: "No VS Code, arquivos de páginas sempre terminam com a extensão `.html`, por exemplo: `index.html`."
          },
          {
            type: "quiz",
            question: "Qual o nome padrão do arquivo principal de uma página web que os servidores buscam por padrão?",
            options: [
              { id: "opt-1", text: "pagina.doc", correct: false },
              { id: "opt-2", text: "index.html", correct: true },
              { id: "opt-3", text: "site.css", correct: false },
              { id: "opt-4", text: "main.txt", correct: false }
            ],
            explanation: "O nome `index.html` é a convenção global da web para a página raiz de qualquer site ou portfólio."
          },
          {
            type: "puzzle",
            question: "Ordene o caminho percorrido desde a digitação da URL até a exibição da página:",
            correctOrder: [
              "Usuário digita a URL no navegador",
              "Navegador requisita o index.html ao servidor",
              "Servidor envia os arquivos HTML, CSS e JS",
              "Navegador renderiza e exibe o site"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "mod-2",
    number: 2,
    title: "Módulo 2: HTML Básico",
    subtitle: "O Esqueleto do seu Portfólio",
    description: "Crie a estrutura do seu currículo profissional: cabeçalhos, textos, listas de habilidades, links e foto.",
    color: "#1CB0F6", // Duolingo Blue
    accentColor: "#1899D6",
    lessons: [
      {
        id: "l-2-0",
        code: "2.0",
        title: "Vídeo-Aula: O Esqueleto e a Semântica do HTML5",
        xp: 15,
        isVideoLesson: true,
        portfolioMilestone: "Vídeo do Módulo 2 Assistido",
        summary: "Assista ao vídeo explicativo gravado pela equipe sobre a estruturação semântica do currículo.",
        questions: [
          {
            type: "video",
            title: "Vídeo Explicativo: Fundamentos do HTML5",
            description: "Vídeo gravado pela equipe explicando a importância da semântica na W3C e como estruturar as seções do seu currículo.",
            videoUrl: "", // Cole aqui a URL do YouTube ou arquivo MP4
            summaryPoints: [
              "O esqueleto sagrado do HTML5 (<!DOCTYPE>, <html>, <head>, <body>)",
              "Hierarquia visual com títulos <h1>, <h2> e listas <ul>/<li>",
              "A importância das tags semânticas (<header>, <main>, <section>, <footer>) para acessibilidade"
            ],
            tip: "Conclua a visualização do vídeo para liberar os desafios práticos de HTML!"
          }
        ]
      },
      {
        id: "l-2-1",
        code: "2.1",
        title: "O Esqueleto da Página",
        xp: 20,
        portfolioMilestone: "Esqueleto HTML desbloqueado",
        summary: "Aprenda a tag doctype, html, head, title e body.",
        questions: [
          {
            type: "theory",
            title: "O Esqueleto Sagrado do HTML5",
            explanation: "Toda página web moderna começa com uma estrutura essencial:\n\n```html\n<!DOCTYPE html>\n<html lang=\"pt-BR\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Meu Portfólio</title>\n  </head>\n  <body>\n    <!-- Tudo o que o usuário vê na tela vai aqui -->\n  </body>\n</html>\n```\n- O `<head>` guarda metadados (título da aba, codificação);\n- O `<body>` guarda o conteúdo visível aos olhos do visitante.",
            tip: "Tudo o que você quer que apareça na tela do seu currículo deve estar dentro da tag <body>!"
          },
          {
            type: "fill_blank",
            question: "Complete a tag que envolve todo o conteúdo visual da página:",
            prefix: "<",
            blank: "body",
            suffix: "> ... </body>",
            placeholder: "tag aqui",
            hint: "É a palavra em inglês para 'corpo'."
          },
          {
            type: "puzzle",
            question: "Ordene as tags fundamentais na hierarquia correta de um documento HTML:",
            correctOrder: [
              "<!DOCTYPE html>",
              "<html lang=\"pt-BR\">",
              "<head> ... </head>",
              "<body> ... </body>",
              "</html>"
            ]
          }
        ]
      },
      {
        id: "l-2-2",
        code: "2.2",
        title: "Textos, Cabeçalhos e Listas",
        xp: 20,
        portfolioMilestone: "Identificação e Habilidades adicionadas",
        summary: "Adicione seu nome (h1), cargo (h2), resumo biográfico (p) e lista de competências (ul, li).",
        questions: [
          {
            type: "theory",
            title: "Títulos e Listas no seu Currículo",
            explanation: "No seu currículo você precisará de hierarquia clara:\n\n- `<h1>`: Título principal (Seu Nome)\n- `<h2>`: Subtítulo (Sua Profissão, ex: *Desenvolvedor Front-End Júnior*)\n- `<p>`: Parágrafo com seu resumo ou biografia\n- `<ul>` e `<li>`: Lista não ordenada para listar suas tecnologias favoritas (HTML, CSS, JS, Git).",
            tip: "Regra de ouro de acessibilidade e SEO: use apenas um único <h1> por página!"
          },
          {
            type: "quiz",
            question: "Qual elemento é ideal para criar os itens individuais de uma lista de habilidades?",
            options: [
              { id: "opt-1", text: "<li> (List Item)", correct: true },
              { id: "opt-2", text: "<list>", correct: false },
              { id: "opt-3", text: "<item>", correct: false },
              { id: "opt-4", text: "<p>", correct: false }
            ],
            explanation: "Cada item dentro de um <ul> ou <ol> deve ser envolvido pela tag <li> (list item)."
          },
          {
            type: "puzzle",
            question: "Monte uma lista de tecnologias para o currículo:",
            correctOrder: [
              "<ul>",
              "  <li>HTML5</li>",
              "  <li>CSS3</li>",
              "  <li>JavaScript</li>",
              "</ul>"
            ]
          }
        ]
      },
      {
        id: "l-2-3",
        code: "2.3",
        title: "Links e Imagens",
        xp: 20,
        portfolioMilestone: "Foto de perfil e Redes Sociais ativadas",
        summary: "Adicione sua foto de perfil com <img> e links para GitHub e LinkedIn com <a>.",
        questions: [
          {
            type: "theory",
            title: "Conectando o mundo: Imagens e Links",
            explanation: "Para deixar o currículo profissional, adicionamos:\n\n1. **Foto de Perfil**:\n`<img src=\"perfil.jpg\" alt=\"Foto de rosto do desenvolvedor\">`\nO atributo `alt` é fundamental para acessibilidade e leitores de tela!\n\n2. **Links de Redes**:\n`<a href=\"https://github.com/seuperfil\" target=\"_blank\">Meu GitHub</a>`\nO atributo `target=\"_blank\"` faz o link abrir em uma nova aba.",
            tip: "A tag <img> não precisa de tag de fechamento (ela é auto-fechável)!"
          },
          {
            type: "quiz",
            question: "Qual atributo da tag <a> define o endereço (URL) para onde o usuário será direcionado ao clicar?",
            options: [
              { id: "opt-1", text: "href", correct: true },
              { id: "opt-2", text: "src", correct: false },
              { id: "opt-3", text: "url", correct: false },
              { id: "opt-4", text: "link", correct: false }
            ],
            explanation: "`href` significa Hypertext Reference e guarda o destino do link."
          },
          {
            type: "fill_blank",
            question: "Complete o atributo que descreve a imagem para pessoas com deficiência visual:",
            prefix: '<img src="foto.jpg" ',
            blank: "alt",
            suffix: '="Foto de Perfil">',
            placeholder: "atributo",
            hint: "Significa 'texto alternativo'."
          }
        ]
      },
      {
        id: "l-2-4",
        code: "2.4",
        title: "Estruturando seu Currículo em HTML",
        xp: 25,
        portfolioMilestone: "Estrutura Completa do Currículo em HTML",
        summary: "Construa o esqueleto semântico completo do seu currículo (<header>, <main>, <section>, <footer>) inserindo seus dados reais.",
        questions: [
          {
            type: "theory",
            title: "Estruturando seu Currículo Completo em HTML",
            explanation: "Parabéns por dominar as tags fundamentais! Agora chegou o grande momento do Módulo 2: **construir a estrutura completa do seu Currículo Web**!\n\nNo HTML5 profissional, organizamos o currículo com tags semânticas:\n- `<header>`: Cabeçalho com seu Nome (`<h1>`), Profissão (`<h2>`), foto de perfil e links sociais;\n- `<main>`: Corpo principal contendo seções temáticas:\n  - `<section id=\"sobre\">`: Seu resumo profissional;\n  - `<section id=\"habilidades\">`: Lista `<ul>` com `<li>` das tecnologias;\n  - `<section id=\"experiencias\">`: Seu histórico e projetos;\n- `<footer>`: Rodapé com direitos autorais e créditos.\n\n✨ **Ao concluir esta lição com 100% de acerto, seu currículo estruturado em HTML será ativado instantaneamente na aba 'Meu Currículo'!**",
            tip: "O que você aprender e responder aqui reflete diretamente na estrutura do seu currículo real!"
          },
          {
            type: "puzzle",
            question: "Ordene a hierarquia dos blocos estruturais do seu currículo HTML:",
            correctOrder: [
              "<!DOCTYPE html> e tag <html lang=\"pt-BR\">",
              "<header> (Identificação, Foto e Links) </header>",
              "<main> (Seções Sobre, Habilidades e Projetos) </main>",
              "<footer> (Rodapé com Direitos Autorais) </footer>",
              "</html> (Fechamento do Documento)"
            ]
          },
          {
            type: "quiz",
            question: "Onde devem ficar agrupadas as informações de identificação (nome h1, cargo h2, foto e links de contato) no currículo semântico?",
            options: [
              { id: "opt-1", text: "<header>", correct: true },
              { id: "opt-2", text: "<aside>", correct: false },
              { id: "opt-3", text: "<footer>", correct: false },
              { id: "opt-4", text: "<nav-hidden>", correct: false }
            ],
            explanation: "O `<header>` é o elemento semântico adequado para o cabeçalho introdutório e identificação do autor."
          },
          {
            type: "fill_blank",
            question: "Complete a tag semântica usada para delimitar o bloco temático de habilidades do currículo:",
            prefix: "<",
            blank: "section",
            suffix: ' id="habilidades"> ... </section>',
            placeholder: "tag semântica",
            hint: "Palavra em inglês para 'seção'."
          },
          {
            type: "match",
            question: "Associe as tags semânticas à sua função no seu currículo:",
            pairs: [
              { term: "<header>", match: "Nome, cargo, foto e contatos" },
              { term: "<section>", match: "Bloco temático de conteúdo" },
              { term: "<footer>", match: "Rodapé e créditos finais" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "mod-3",
    number: 3,
    title: "Módulo 3: CSS Básico",
    subtitle: "O Design e Estilo Visual",
    description: "Transforme o HTML cru em um currículo elegante com cores harmônicas, cartões modernos e Flexbox.",
    color: "#CE82FF", // Duolingo Purple
    accentColor: "#A55FE8",
    lessons: [
      {
        id: "l-3-0",
        code: "3.0",
        title: "Vídeo-Aula: Estilização com CSS3 & Flexbox",
        xp: 15,
        isVideoLesson: true,
        portfolioMilestone: "Vídeo do Módulo 3 Assistido",
        summary: "Assista ao vídeo explicativo gravado pela equipe sobre design, Box Model e Flexbox.",
        questions: [
          {
            type: "video",
            title: "Vídeo Explicativo: Estilo e Design com CSS3",
            description: "Vídeo gravado pela equipe demonstrando como aplicar cores harmoniosas, sombras e alinhamentos flexíveis no currículo.",
            videoUrl: "", // Cole aqui a URL do YouTube ou arquivo MP4
            summaryPoints: [
              "Como conectar o arquivo CSS externo e declarar Variáveis (:root)",
              "O conceito de Box Model (margin, border, padding) para criar cartões com sombra",
              "Alinhamento moderno e flexível com display: flex e gap"
            ],
            tip: "Após o vídeo, você começará a aplicar o design visual moderno no seu portfólio!"
          }
        ]
      },
      {
        id: "l-3-1",
        code: "3.1",
        title: "Seletores, Cores e Tipografia",
        xp: 20,
        portfolioMilestone: "Cores e Tipografia Moderna aplicadas",
        summary: "Aprenda a conectar o CSS, estilizar por classes (.card) e escolher cores modernas.",
        questions: [
          {
            type: "theory",
            title: "Dando vida com CSS",
            explanation: "O CSS (Cascading Style Sheets) transforma o documento bruto:\n\n```css\nbody {\n  background-color: #0f172a; /* Fundo elegante */\n  color: #f8fafc;            /* Texto claro */\n  font-family: 'Inter', sans-serif;\n}\n\n.destaque {\n  color: #38bdf8; /* Azul tecnológico */\n}\n```\nConectamos no HTML via: `<link rel=\"stylesheet\" href=\"style.css\">`.",
            tip: "Prefira estilizar elementos usando classes (`.minha-classe`) em vez de IDs (`#meu-id`) para poder reutilizá-los!"
          },
          {
            type: "quiz",
            question: "Como selecionamos uma classe chamada 'badge' no CSS?",
            options: [
              { id: "opt-1", text: ".badge", correct: true },
              { id: "opt-2", text: "#badge", correct: false },
              { id: "opt-3", text: "badge", correct: false },
              { id: "opt-4", text: "@badge", correct: false }
            ],
            explanation: "No CSS, classes são selecionadas usando o ponto (`.`badge), enquanto IDs usam a cerquilha (`#`badge)."
          },
          {
            type: "fill_blank",
            question: "Complete a propriedade que altera a cor do texto no CSS:",
            prefix: "p { ",
            blank: "color",
            suffix: ": #ffffff; }",
            placeholder: "propriedade",
            hint: "Significa 'cor' em inglês."
          }
        ]
      },
      {
        id: "l-3-2",
        code: "3.2",
        title: "O Modelo de Caixa (Box Model)",
        xp: 25,
        portfolioMilestone: "Cards Elegantes com Box-Shadow e Border-Radius",
        summary: "Domine margin, padding, border e border-radius para criar cartões com profundidade.",
        questions: [
          {
            type: "theory",
            title: "Tudo no CSS é uma Caixa!",
            explanation: "O **Box Model** é a base do design web:\n\n- **Content**: Onde o texto ou imagem fica;\n- **Padding**: Espaçamento **interno** (entre o conteúdo e a borda);\n- **Border**: A moldura/linha ao redor da caixa;\n- **Margin**: Espaçamento **externo** (empurra outras caixas ao redor).\n\nAdicionar `border-radius: 12px;` arredonda os cantos e dá o visual de aplicativo moderno!",
            tip: "Lembre-se: 'Padding empurra para dentro, Margin empurra para fora'."
          },
          {
            type: "quiz",
            question: "Se você quer afastar o texto interno da borda de um cartão de experiências, qual propriedade deve usar?",
            options: [
              { id: "opt-1", text: "padding", correct: true },
              { id: "opt-2", text: "margin", correct: false },
              { id: "opt-3", text: "border", correct: false },
              { id: "opt-4", text: "outline", correct: false }
            ],
            explanation: "O `padding` cria respiro interno dentro do próprio elemento."
          },
          {
            type: "puzzle",
            question: "Ordene as camadas do Box Model de dentro para fora:",
            correctOrder: [
              "1. Conteúdo (Content)",
              "2. Espaçamento Interno (Padding)",
              "3. Borda (Border)",
              "4. Margem Externa (Margin)"
            ]
          }
        ]
      },
      {
        id: "l-3-3",
        code: "3.3",
        title: "Layout com Flexbox",
        xp: 25,
        portfolioMilestone: "Alinhamento Flexível e Badges Organizadas",
        summary: "Use display: flex, gap, justify-content e align-items para alinhar tudo perfeitamente.",
        questions: [
          {
            type: "theory",
            title: "O Poder do Flexbox",
            explanation: "Chega de brigar para centralizar coisas na tela! Com Flexbox você faz:\n\n```css\n.skills-container {\n  display: flex;\n  flex-wrap: wrap;       /* Quebra linha se faltar espaço */\n  gap: 12px;             /* Distância uniforme entre badges */\n  justify-content: center;\n}\n```\nIsso organiza suas tags de HTML, CSS e JavaScript lado a lado harmoniosamente!",
            tip: "`gap` é a forma mais moderna e limpa de dar espaçamento entre itens flexíveis."
          },
          {
            type: "quiz",
            question: "Qual propriedade ativa o modelo de layout flexível no elemento pai?",
            options: [
              { id: "opt-1", text: "display: flex;", correct: true },
              { id: "opt-2", text: "flex: active;", correct: false },
              { id: "opt-3", text: "layout: flexbox;", correct: false },
              { id: "opt-4", text: "position: flex;", correct: false }
            ],
            explanation: "`display: flex;` transforma os filhos diretos do elemento em itens flexíveis."
          },
          {
            type: "fill_blank",
            question: "Complete a propriedade que define o espaçamento entre itens no Flexbox:",
            prefix: ".lista-skills { display: flex; ",
            blank: "gap",
            suffix: ": 16px; }",
            placeholder: "propriedade",
            hint: "Palavra inglesa de 3 letras que significa 'espaço/vão'."
          }
        ]
      },
      {
        id: "l-3-4",
        code: "3.4",
        title: "Formatando e Estilizando seu Currículo",
        xp: 30,
        portfolioMilestone: "Currículo Formatado com CSS Moderno",
        summary: "Aplique estilos modernos, cartões com sombras e layout flexível para transformar o HTML do seu currículo em uma página elegante.",
        questions: [
          {
            type: "theory",
            title: "Formatando seu Currículo com CSS Moderno",
            explanation: "Chegou o momento mágico da estilização! Agora vamos aplicar todas as propriedades de CSS aprendidas para **formatar o seu currículo em HTML**!\n\nNo arquivo `style.css`:\n- Definimos variáveis `:root` com paleta de cores harmoniosa;\n- Usamos o **Box Model** (`padding: 24px`, `border-radius: 16px`, `box-shadow`) para transformar as seções em **Cartões Elegantes**;\n- Usamos **Flexbox** (`display: flex`, `gap: 10px`) para alinhar a foto no cabeçalho e transformar as habilidades em **Badges / Pílulas modernas**;\n- Trocamos a fonte padrão por uma tipografia limpa e moderna (`font-family: system-ui`).\n\n🎨 **Ao concluir esta lição com 100% de acerto, o seu currículo na aba 'Meu Currículo' receberá essa formatação visual completa instantaneamente!**",
            tip: "O mesmo HTML estruturado no Módulo 2 agora ganha vida, cores e sofisticação através do CSS!"
          },
          {
            type: "quiz",
            question: "Para transformar a lista de habilidades do currículo em badges/pílulas modernas lado a lado com espaçamento uniforme, quais propriedades aplicamos no container?",
            options: [
              { id: "opt-1", text: "display: flex; gap: 10px; flex-wrap: wrap;", correct: true },
              { id: "opt-2", text: "display: block; float: left; margin: 0;", correct: false },
              { id: "opt-3", text: "position: absolute; width: 100%;", correct: false },
              { id: "opt-4", text: "display: inline; clear: both;", correct: false }
            ],
            explanation: "`display: flex` organiza os itens em linha, `gap: 10px` cria o espaçamento entre eles e `flex-wrap: wrap` quebra linha se necessário."
          },
          {
            type: "fill_blank",
            question: "Complete a propriedade que cria cantos arredondados nos cartões do seu currículo:",
            prefix: ".card-section { border-",
            blank: "radius",
            suffix: ": 16px; }",
            placeholder: "propriedade",
            hint: "Palavra inglesa para 'raio'."
          },
          {
            type: "puzzle",
            question: "Ordene as etapas para vincular e aplicar a formatação CSS ao seu currículo:",
            correctOrder: [
              "Criar as regras de estilo no arquivo style.css",
              "Vincular o CSS com <link rel=\"stylesheet\" href=\"style.css\"> no <head>",
              "Adicionar classes como .card-section e .skills-list no HTML",
              "Visualizar o currículo totalmente formatado e estilizado"
            ]
          },
          {
            type: "match",
            question: "Associe as regras CSS aos efeitos visuais no currículo:",
            pairs: [
              { term: "border-radius: 16px", match: "Cantos arredondados nos cartões" },
              { term: "display: flex; gap: 10px", match: "Alinhamento de badges e botões" },
              { term: "box-shadow", match: "Sombra suave e profundidade" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "mod-4",
    number: 4,
    title: "Módulo 4: JavaScript Básico",
    subtitle: "Dinamismo e Interatividade",
    description: "Dê vida ao seu portfólio: manipule elementos na tela e programe um alternador de Tema Claro / Escuro.",
    color: "#FF9600", // Duolingo Orange
    accentColor: "#E08300",
    lessons: [
      {
        id: "l-4-0",
        code: "4.0",
        title: "Vídeo-Aula: Dando Vida à Página com JavaScript",
        xp: 15,
        isVideoLesson: true,
        portfolioMilestone: "Vídeo do Módulo 4 Assistido",
        summary: "Assista ao vídeo explicativo gravado pela equipe sobre manipulação do DOM e eventos.",
        questions: [
          {
            type: "video",
            title: "Vídeo Explicativo: Interatividade com JavaScript",
            description: "Vídeo gravado pela equipe ensinando a programar o Dark Mode e funções de clique sem precisar recarregar a tela.",
            videoUrl: "", // Cole aqui a URL do YouTube ou arquivo MP4
            summaryPoints: [
              "O que é o DOM (Document Object Model) e seletores com document.querySelector",
              "Como escutar cliques do usuário com addEventListener('click')",
              "Implementação prática do alternador de Modo Escuro e cópia de e-mail"
            ],
            tip: "Prepare-se para transformar seu currículo estático em uma aplicação interativa!"
          }
        ]
      },
      {
        id: "l-4-1",
        code: "4.1",
        title: "Introdução ao JavaScript & Variáveis",
        xp: 20,
        portfolioMilestone: "Script JS conectado",
        summary: "Aprenda sobre variáveis (const, let), tipos de dados e funções.",
        questions: [
          {
            type: "theory",
            title: "Dando cérebro à sua página com JS",
            explanation: "O JavaScript executa ações no navegador. Criamos variáveis para armazenar informações:\n\n```javascript\nconst nomeDev = 'Nielton Augusto';\nlet anosExperiencia = 1;\n\nfunction saudar() {\n  console.log('Olá, bem-vindo ao meu portfólio!');\n}\n```\n- Use `const` para valores que não mudam;\n- Use `let` para valores que podem ser reatribuídos.",
            tip: "Conectamos o script no final do <body> com: `<script src=\"script.js\"></script>`."
          },
          {
            type: "quiz",
            question: "Qual palavra-chave usamos para declarar uma variável cujo valor NÃO deve mudar?",
            options: [
              { id: "opt-1", text: "const", correct: true },
              { id: "opt-2", text: "let", correct: false },
              { id: "opt-3", text: "var_fixa", correct: false },
              { id: "opt-4", text: "immutable", correct: false }
            ],
            explanation: "`const` cria uma constante protegida contra reatribuição."
          }
        ]
      },
      {
        id: "l-4-2",
        code: "4.2",
        title: "Manipulação do DOM",
        xp: 25,
        portfolioMilestone: "Conexão com elementos da página",
        summary: "Descubra como selecionar elementos com document.querySelector e alterar classes e textos.",
        questions: [
          {
            type: "theory",
            title: "O que é o DOM (Document Object Model)?",
            explanation: "O DOM é a representação em árvore do seu HTML que o JavaScript consegue ler e modificar ao vivo:\n\n```javascript\n// 1. Seleciona o botão de tema\nconst botaoTema = document.querySelector('#btn-tema');\n\n// 2. Altera o texto de um elemento\nconst titulo = document.querySelector('h1');\ntitulo.textContent = 'Desenvolvedor Full-Stack';\n```\nCom isso, podemos alterar qualquer coisa na tela sem precisar recarregar a página!",
            tip: "`querySelector` aceita os mesmos seletores que você já aprendeu no CSS (`.classe`, `#id`, `tag`)!"
          },
          {
            type: "quiz",
            question: "Qual método do document usamos para selecionar o primeiro elemento que corresponde a um seletor CSS?",
            options: [
              { id: "opt-1", text: "document.querySelector()", correct: true },
              { id: "opt-2", text: "document.findCSS()", correct: false },
              { id: "opt-3", text: "document.getElement()", correct: false },
              { id: "opt-4", text: "document.select()", correct: false }
            ],
            explanation: "`querySelector` é o método padrão da web moderna para buscar elementos por seletores CSS."
          },
          {
            type: "fill_blank",
            question: "Complete para capturar o elemento com o id 'botao-tema':",
            prefix: "const btn = document.",
            blank: "querySelector",
            suffix: "('#botao-tema');",
            placeholder: "método",
            hint: "Significa 'seletor de consulta'."
          }
        ]
      },
      {
        id: "l-4-3",
        code: "4.3",
        title: "Eventos & Alternador Dark Mode",
        xp: 30,
        portfolioMilestone: "Botão Dark/Light Mode Interativo Funcional",
        summary: "Programe o botão que altera entre Tema Escuro e Claro com addEventListener e classList.toggle.",
        questions: [
          {
            type: "theory",
            title: "Ouvindo Cliques: addEventListener",
            explanation: "Para reagir a cliques do visitante, 'ouvimos' eventos:\n\n```javascript\nconst btnTema = document.querySelector('#btn-tema');\n\nbtnTema.addEventListener('click', () => {\n  // Adiciona ou remove a classe 'dark-mode' do <body>\n  document.body.classList.toggle('dark-theme');\n});\n```\nO método `.toggle()` é mágico: se a classe existir, ele remove; se não existir, ele adiciona!",
            tip: "Esse é exatamente o código que fará o botão de tema do seu portfólio funcionar na prática!"
          },
          {
            type: "puzzle",
            question: "Monte o código do alternador de modo escuro:",
            correctOrder: [
              "const botao = document.querySelector('#btn-tema');",
              "botao.addEventListener('click', () => {",
              "  document.body.classList.toggle('dark-mode');",
              "});"
            ]
          },
          {
            type: "quiz",
            question: "O que o método classList.toggle('ativo') faz se o elemento já tiver a classe 'ativo'?",
            options: [
              { id: "opt-1", text: "Remove a classe 'ativo'", correct: true },
              { id: "opt-2", text: "Duplica a classe", correct: false },
              { id: "opt-3", text: "Gera um erro no console", correct: false },
              { id: "opt-4", text: "Não faz nada", correct: false }
            ],
            explanation: "O toggle funciona como um interruptor de luz: desliga se estiver ligado, liga se estiver desligado."
          }
        ]
      },
      {
        id: "l-4-4",
        code: "4.4",
        title: "Filtro de Habilidades e Interatividade",
        xp: 25,
        portfolioMilestone: "Interação de Filtro e Cópia de E-mail",
        summary: "Crie um botão para copiar seu e-mail profissional com feedback visual e filtre tags.",
        questions: [
          {
            type: "theory",
            title: "Toques de Mestre: Copiar com 1 Clique",
            explanation: "Impressione recrutadores permitindo copiar seu e-mail com um clique usando a API nativa da Web:\n\n```javascript\nnavigator.clipboard.writeText('contato@meuemail.com');\n```\nEm seguida, você pode alterar temporariamente o texto do botão para 'Copiado! ✓' para dar um retorno visual imediato.",
            tip: "Feedback visual para cada ação do usuário é uma das principais regras de UX!"
          },
          {
            type: "quiz",
            question: "Qual API do navegador permite copiar textos diretamente para a área de transferência do usuário?",
            options: [
              { id: "opt-1", text: "navigator.clipboard", correct: true },
              { id: "opt-2", text: "window.pasteboard", correct: false },
              { id: "opt-3", text: "document.copyEngine", correct: false },
              { id: "opt-4", text: "browser.copy", correct: false }
            ],
            explanation: "A Clipboard API (`navigator.clipboard.writeText`) é o padrão moderno para operações de cópia."
          }
        ]
      }
    ]
  },
  {
    id: "mod-5",
    number: 5,
    title: "Módulo 5: UI/UX & Publicação",
    subtitle: "Design Centrado no Usuário & Deploy",
    description: "Refine a usabilidade, garanta responsividade mobile e publique seu portfólio no GitHub Pages.",
    color: "#2B70C9", // Duolingo Deep Navy / Tech Blue
    accentColor: "#1B4F8F",
    lessons: [
      {
        id: "l-5-0",
        code: "5.0",
        title: "Vídeo-Aula: Responsividade Mobile & GitHub Pages",
        xp: 15,
        isVideoLesson: true,
        portfolioMilestone: "Vídeo do Módulo 5 Assistido",
        summary: "Assista ao vídeo explicativo gravado pela equipe sobre design para celular e publicação gratuita no GitHub Pages.",
        questions: [
          {
            type: "video",
            title: "Vídeo Explicativo: Responsividade e Deploy",
            description: "Vídeo gravado pela equipe demonstrando como adaptar o currículo para celulares e colocá-lo no ar para o mundo todo.",
            videoUrl: "", // Cole aqui a URL do YouTube ou arquivo MP4
            summaryPoints: [
              "A meta tag viewport e a abordagem Mobile-First",
              "Media queries (@media) para telas menores de smartphones",
              "Passo a passo de como criar o repositório e ativar o GitHub Pages gratuitamente"
            ],
            tip: "Esta é a etapa final para colocar seu currículo no ar e compartilhar com recrutadores!"
          }
        ]
      },
      {
        id: "l-5-1",
        code: "5.1",
        title: "Princípios de UI/UX & Responsividade",
        xp: 25,
        portfolioMilestone: "Design Responsivo e Mobile-First",
        summary: "Contraste de cores (acessibilidade), espaçamentos consistentes e meta tag viewport.",
        questions: [
          {
            type: "theory",
            title: "UI & UX: O que os recrutadores reparam primeiro?",
            explanation: "Não adianta ter bom código se a experiência for frustrante:\n\n1. **Hierarquia Visual**: O olhar deve ir primeiro para seu nome e projetos;\n2. **Contraste de Cores**: Garanta que o texto seja legível em qualquer tela (WCAG);\n3. **Mobile-First**: Adicione sempre `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` no `<head>` para que o site não fique encolhido no celular!",
            tip: "Mais de 60% dos acessos à web hoje vêm de smartphones. Seu currículo DEVE ser impecável no celular!"
          },
          {
            type: "quiz",
            question: "Qual meta tag é indispensável para que o site se adapte corretamente à tela de smartphones?",
            options: [
              { id: "opt-1", text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', correct: true },
              { id: "opt-2", text: '<meta name="phone" content="true">', correct: false },
              { id: "opt-3", text: '<meta name="responsive" content="yes">', correct: false },
              { id: "opt-4", text: '<meta screen="mobile">', correct: false }
            ],
            explanation: "A meta tag viewport instrui o navegador do celular a usar a largura real da tela do dispositivo."
          }
        ]
      },
      {
        id: "l-5-2",
        code: "5.2",
        title: "Publicação no GitHub Pages",
        xp: 35,
        portfolioMilestone: "Currículo Finalizado e Publicável no GitHub Pages",
        summary: "Passo a passo para hospedar seu site gratuitamente no GitHub Pages e compartilhar o link.",
        questions: [
          {
            type: "theory",
            title: "Seu Portfólio no Ar de Graça!",
            explanation: "O **GitHub Pages** transforma qualquer repositório público com um arquivo `index.html` em um site real na web com endereço `seunome.github.io/portfolioweb`!\n\n**Como publicar em 4 passos**:\n1. Crie um repositório público no GitHub (ex: `meu-portfolio`);\n2. Faça upload dos arquivos `index.html`, `style.css` e `script.js`;\n3. Vá em **Settings** > **Pages**;\n4. Em *Branch*, selecione **main** e clique em **Save**. Em instantes seu link estará no ar!",
            tip: "Agora você tem um link real para colocar no seu LinkedIn e enviar para recrutadores!"
          },
          {
            type: "puzzle",
            question: "Ordene os passos para colocar o portfólio no GitHub Pages:",
            correctOrder: [
              "Criar repositório no GitHub com os arquivos",
              "Acessar a aba 'Settings' do repositório",
              "Navegar até a opção 'Pages' no menu lateral",
              "Selecionar a branch 'main' e clicar em Save"
            ]
          },
          {
            type: "quiz",
            question: "Qual deve ser o nome obrigatório do arquivo principal para que o GitHub Pages abra sua página inicial automaticamente?",
            options: [
              { id: "opt-1", text: "index.html", correct: true },
              { id: "opt-2", text: "home.html", correct: false },
              { id: "opt-3", text: "portfolio.html", correct: false },
              { id: "opt-4", text: "main.html", correct: false }
            ],
            explanation: "O servidor web procura automaticamente pelo arquivo com o nome exato de `index.html`."
          }
        ]
      }
    ]
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Nielton Augusto",
    role: "Desenvolvimento do Website & Arquitetura",
    github: "https://github.com/nieltom",
    linkedin: "https://www.linkedin.com/in/nieltom-augusto-233b11274/"
  },
  {
    name: "Luiz Gustavo Mendes Lemes",
    role: "Gravação das Aulas & Coordenação",
    github: "https://github.com/lgustavolemes",
    linkedin: "https://www.linkedin.com/in/gustav0lemes/"
  },
  {
    name: "Rafaela da Silva",
    role: "Design de Slides & Documentação Técnica",
    github: "https://github.com/rafaeladasilva2005-dev",
    linkedin: "https://www.linkedin.com/in/rafaela-da-silva-pinto-42ab772ba/"
  },
  {
    name: "Danilo Vargas",
    role: "Manual de Usuário & Gestão Trello/Kanban",
    github: "https://github.com/danilovargasslk",
    linkedin: "https://www.linkedin.com/in/danilo-silva-vargas-b407512aa/"
  },
  {
    name: "Leonardo Di Camargo Rodrigues",
    role: "Edição de Vídeo & Gravação das Aulas",
    github: "https://github.com/LeonardoCamargo19",
    linkedin: "https://www.linkedin.com/in/leonardo-di-camargo-rodrigues-2b9888238/"
  }
];
