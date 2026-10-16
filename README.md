# Vireo - Plataforma de Doação, Compra e Troca de Materiais Escolares e Livros

Este repositório contém os artefatos do projeto **Vireo**, desenvolvido para o **Trabalho Interdisciplinar - Aplicações Web (TI2)** da PUC Minas. A plataforma tem como objetivo facilitar a doação, compra e troca de materiais escolares, uniformes e livros didáticos/literários.

---

## 💻 Funcionalidades Desenvolvidas

Este módulo do sistema engloba as páginas de **Catálogo**, **Detalhes do Material/Livro** e o **Histórico de Atividades (Reservas, Doações e Trocas)**:

1. **Catálogo de Materiais e Livros (`Biblioteca.html`)**
   - Exibição dinâmica de itens disponíveis com capa, título e breve descrição.
   - Navegação direta para a página de detalhes ao clicar em qualquer item do catálogo.

2. **Detalhes do Livro e Ações (`Detalhes.html`)**
   - Apresentação completa dos metadados do material (autor, ano de publicação, idioma, série/ano recomendado, estado de conservação e categoria).
   - **Gerenciamento de Reserva:** Botão interativo para realizar ou cancelar a reserva do livro.
   - **Proposta de Troca com Drag & Drop:** Modal para envio de proposta de troca incluindo upload de imagem da capa por arrasto e soltura (*drag and drop*) ou seleção de arquivo.
   - Persistência das interações do usuário no `localStorage`.

3. **Histórico de Atividades (`Historico.html`)**
   - Sistema de abas para alternar entre **Minhas Reservas**, **Minhas Doações** e **Minhas Trocas**.
   - **Comparativo de Troca:** Visualização lado a lado do livro oferecido pelo usuário versus o livro desejado da plataforma.
   - Opção de cancelamento instantâneo de ofertas e reservas pendentes.

---

## 📁 Estrutura do Projeto

```text
├── Pagina Biblioteca/
│   ├── Biblioteca.html      # Interface da galeria e catálogo de livros
│   ├── Biblioteca.css       # Estilização do catálogo e cabeçalho/rodapé
│   └── Biblioteca.js        # Lógica de renderização dinâmica do catálogo
│
├── Pagina Detalhes Livro e Uniforme/
│   ├── Detalhes.html        # Interface de detalhes, modal e ações
│   ├── Detalhes.css         # Estilização dos detalhes, feedback e drag & drop
│   └── Detalhes.js          # Lógica de reservas, upload de imagem e formulário de troca
│
└── Pagina Historico de Trocas e Doações/
    ├── Historico.html       # Interface do histórico de atividades
    ├── Historico.css        # Estilização das abas e cards comparativos
    └── Historico.js         # Lógica de renderização das reservas/trocas salvas
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e acessível das telas.
- **CSS3:** Estilização responsiva com Flexbox, CSS Grid, e componentes visuais personalizados.
- **JavaScript (ES6+):** Manipulação da DOM, consumo de APIs (`FileReader` para conversão de imagens em Base64) e lógica de estado.
- **LocalStorage:** Armazenamento local de dados para persistência de reservas e trocas ativas durante a navegação.

---

## 🚀 Como Executar o Projeto

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Navegue até o diretório do projeto e abra o catálogo:**
   - Abra a pasta `Pagina Biblioteca/` e execute o arquivo `Biblioteca.html` no seu navegador de preferência (ou utilize a extensão *Live Server* no VS Code).

3. **Fluxo de Teste:**
   - No catálogo, clique em um livro (ex: *O Poder do Hábito*).
   - Na página de detalhes, clique em **"Reservar livro"** ou **"Propor Troca"**.
   - Acesse o **"Ver Histórico"** para visualizar e gerenciar suas propostas e reservas salvas.