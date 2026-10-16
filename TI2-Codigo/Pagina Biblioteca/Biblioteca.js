/* =========================================================
   Vireo — Listagem de Biblioteca / Materiais
   ========================================================= */

// Dados padrão reais do Vireo usados caso o fetch do JSON falhe (ex.: página aberta direto via file://)
const DADOS_PADRAO_LIVROS = [
  {
    "id_material": 1,
    "titulo_nome": "O Poder do Hábito",
    "autor": "Charles Duhigg",
    "descricao": "Em O Poder do Hábito, Charles Duhigg investiga por que os hábitos existem e como podem ser transformados. Com histórias envolventes e descobertas científicas, o autor mostra como pequenas mudanças de rotina podem gerar resultados profundos na vida pessoal, nos estudos e nas organizações.",
    "estado_conservacao": "Excelente",
    "tipo_disponibilidade": "Doação",
    "ano_publicacao": 2012,
    "serie_ano_escolar": "Ensino Médio / Geral",
    "idioma": "Português",
    "categoria": "PRODUTIVIDADE",
    "url_foto": "../poder-do-habito.jpg"
  },
  {
    "id_material": 2,
    "titulo_nome": "Dom Casmurro",
    "autor": "Machado de Assis",
    "descricao": "Clássico da literatura brasileira focado na história de Bentinho e Capitu. Edição em ótimo estado de conservação para estudos escolares.",
    "estado_conservacao": "Bom",
    "tipo_disponibilidade": "Doação",
    "ano_publicacao": 1899,
    "serie_ano_escolar": "3º Ano - Ensino Médio",
    "idioma": "Português",
    "categoria": "LITERATURA",
    "url_foto": "../dom-casmurro.jpg"
  },
  {
    "id_material": 3,
    "titulo_nome": "Memórias Póstumas de Brás Cubas",
    "autor": "Machado de Assis",
    "descricao": "Obra-prima do Realismo brasileiro narrada por um defunto autor. Exemplar conservado e sem anotações.",
    "estado_conservacao": "Novo",
    "tipo_disponibilidade": "Troca",
    "ano_publicacao": 1881,
    "serie_ano_escolar": "2º Ano - Ensino Médio",
    "idioma": "Português",
    "categoria": "LITERATURA",
    "url_foto": "../bras-cubas.jpg"
  },
  {
    "id_material": 4,
    "titulo_nome": "Vidas Secas",
    "autor": "Graciliano Ramos",
    "descricao": "Retrata a vida dura de uma família de retirantes no sertão nordestino. Perfeito para leituras de vestibulares.",
    "estado_conservacao": "Bom",
    "tipo_disponibilidade": "Aluguel",
    "ano_publicacao": 1938,
    "serie_ano_escolar": "1º Ano - Ensino Médio",
    "idioma": "Português",
    "categoria": "LITERATURA",
    "url_foto": "../vidas-secas.jpg"
  }
];

async function carregarBiblioteca() {
  let livros = [];

  try {
    const resposta = await fetch('../dados.json');
    if (!resposta.ok) throw new Error('Erro ao carregar dados dos livros.');
    livros = await resposta.json();
  } catch (erro) {
    // Fallback caso o fetch falhe (ex: file://)
    console.warn('Falha no fetch do JSON, utilizando dados padrão.', erro);
    livros = DADOS_PADRAO_LIVROS;
  }

  const containerGrid = document.getElementById('grid-biblioteca');
  if (!containerGrid) return;

  containerGrid.innerHTML = '';

  livros.forEach(livro => {
    const card = document.createElement('div');
    card.classList.add('card-livro');

    card.onclick = () => {
      window.location.href = `../Pagina Detalhes Livro e Uniforme/Detalhes.html?id=${livro.id_material}`;
    };

    card.innerHTML = `
      <div class="capa-container">
        <img src="${livro.url_foto || 'https://via.placeholder.com/220x280?text=Sem+Foto'}" alt="${livro.titulo_nome}">
      </div>
      <div class="conteudo-card">
        <h3 class="titulo-livro">${livro.titulo_nome}</h3>
        <p class="descricao-livro">${livro.descricao || ''}</p>
      </div>
    `;

    containerGrid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', carregarBiblioteca);