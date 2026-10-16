/* =========================================================
   Vireo — Detalhes do Livro / Material
   ========================================================= */

// Mesmos dados padrão reais para garantir consistência caso abra via file://
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

let livroAtual = null;
let imagemBase64Carregada = "";

async function carregarDetalhesDoLivro() {
  const parametros = new URLSearchParams(window.location.search);
  const idLivro = parametros.get('id');

  if (!idLivro) {
    window.location.href = '../Pagina Biblioteca/Biblioteca.html';
    return;
  }

  let livros = [];

  try {
    const resposta = await fetch('../dados.json');
    if (!resposta.ok) throw new Error('Erro ao carregar o JSON');
    livros = await resposta.json();
  } catch (erro) {
    console.warn('Falha no fetch do JSON, utilizando dados padrão.', erro);
    livros = DADOS_PADRAO_LIVROS;
  }

  livroAtual = livros.find(item => item.id_material == idLivro);

  if (!livroAtual) {
    const containerDetalhes = document.querySelector('.container-detalhes');
    if (containerDetalhes) {
      containerDetalhes.innerHTML = '<h2>Livro não encontrado.</h2>';
    }
    return;
  }

  // Preenche os dados no HTML
  document.getElementById('detalhe-titulo').textContent = livroAtual.titulo_nome;
  document.getElementById('detalhe-autor').textContent = livroAtual.autor || 'Autor não informado';
  document.getElementById('detalhe-descricao').textContent = livroAtual.descricao || 'Sem descrição informada.';
  
  // Tratamento de URL da foto do livro desejado
  const urlFotoTratada = livroAtual.url_foto 
    ? (livroAtual.url_foto.startsWith('http') || livroAtual.url_foto.startsWith('../') ? livroAtual.url_foto : `../Pagina Biblioteca/${livroAtual.url_foto}`)
    : 'https://via.placeholder.com/300x400?text=Sem+Foto';

  document.getElementById('detalhe-imagem').src = urlFotoTratada;
  document.getElementById('detalhe-categoria').textContent = livroAtual.categoria || 'GERAL';
  document.getElementById('detalhe-ano').textContent = livroAtual.ano_publicacao || 'N/A';
  document.getElementById('detalhe-serie').textContent = livroAtual.serie_ano_escolar || 'Geral';
  document.getElementById('detalhe-idioma').textContent = livroAtual.idioma || 'Português';

  // Verificar se já existe uma reserva salva no localStorage
  const reservasSalvas = JSON.parse(localStorage.getItem('vireo_minhas_reservas') || '[]');
  const estaReservado = reservasSalvas.some(r => r.id_material == livroAtual.id_material);

  atualizarEstadoReservaUI(estaReservado);
}

function atualizarEstadoReservaUI(estaReservado) {
  const btnReservar = document.getElementById('btn-reservar');
  const statusTexto = document.getElementById('detalhe-status');
  const pontoStatus = document.getElementById('ponto-status');

  if (!btnReservar || !statusTexto || !pontoStatus || !livroAtual) return;

  if (estaReservado) {
    statusTexto.textContent = 'Reservado (Aguardando Retirada)';
    pontoStatus.style.backgroundColor = '#e53e3e';

    btnReservar.classList.add('btn-cancelar-reserva');
    btnReservar.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      Cancelar Reserva
    `;
  } else {
    statusTexto.textContent = `Disponível para ${livroAtual.tipo_disponibilidade.toLowerCase()} (${livroAtual.estado_conservacao})`;
    pontoStatus.style.backgroundColor = '#0d5c52';

    btnReservar.classList.remove('btn-cancelar-reserva');
    btnReservar.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      Reservar livro
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarDetalhesDoLivro();

  const btnReservar = document.getElementById('btn-reservar');
  const btnTrocar = document.getElementById('btn-trocar');
  const modalTroca = document.getElementById('modal-troca');
  const btnCancelarTroca = document.getElementById('btn-cancelar-troca');
  const formTroca = document.getElementById('form-troca');
  const msgFeedback = document.getElementById('mensagem-feedback');

  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('troca-file');
  const dropContent = document.getElementById('drop-content');
  const previewFoto = document.getElementById('preview-foto');

  if (dropArea && fileInput) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => dropArea.classList.add('drag-over'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => dropArea.classList.remove('drag-over'), false);
    });

    dropArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        fileInput.files = files;
        exibirPreviewImagem(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        exibirPreviewImagem(fileInput.files[0]);
      }
    });
  }

  function exibirPreviewImagem(file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas imagens.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imagemBase64Carregada = e.target.result;
      previewFoto.src = imagemBase64Carregada;
      previewFoto.style.display = 'block';
      dropContent.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  // 1. SALVAR / CANCELAR RESERVA NO LOCALSTORAGE
  if (btnReservar) {
    btnReservar.addEventListener('click', () => {
      if (!livroAtual) return;

      let reservas = JSON.parse(localStorage.getItem('vireo_minhas_reservas') || '[]');
      const index = reservas.findIndex(r => r.id_material == livroAtual.id_material);

      if (index !== -1) {
        reservas.splice(index, 1);
        localStorage.setItem('vireo_minhas_reservas', JSON.stringify(reservas));
        atualizarEstadoReservaUI(false);

        msgFeedback.className = 'mensagem-feedback erro';
        msgFeedback.textContent = 'Reserva cancelada com sucesso. O livro voltou a ficar disponível.';
        msgFeedback.style.display = 'block';
      } else {
        const novaReserva = {
          id_material: livroAtual.id_material,
          titulo: livroAtual.titulo_nome,
          data: new Date().toLocaleDateString('pt-BR'),
          status: 'Aprovada',
          descricao: 'Reserva confirmada. Aguardando retirada na Biblioteca Central.'
        };
        reservas.push(novaReserva);
        localStorage.setItem('vireo_minhas_reservas', JSON.stringify(reservas));
        atualizarEstadoReservaUI(true);

        msgFeedback.className = 'mensagem-feedback sucesso';
        msgFeedback.textContent = 'Livro reservado com sucesso! Acompanhe o status na página de histórico.';
        msgFeedback.style.display = 'block';
      }
    });
  }

  if (btnTrocar) {
    btnTrocar.addEventListener('click', () => { modalTroca.style.display = 'flex'; });
  }

  if (btnCancelarTroca) {
    btnCancelarTroca.addEventListener('click', () => {
      modalTroca.style.display = 'none';
      resetarAreaDrop();
    });
  }

  function resetarAreaDrop() {
    imagemBase64Carregada = "";
    if (previewFoto) { previewFoto.style.display = 'none'; previewFoto.src = ""; }
    if (dropContent) { dropContent.style.display = 'flex'; }
  }

  // 2. SALVAR PROPOSTA DE TROCA
  if (formTroca) {
    formTroca.addEventListener('submit', (e) => {
      e.preventDefault();

      const tituloTroca = document.getElementById('troca-titulo').value;
      const autorTroca = document.getElementById('troca-autor').value;
      const anoTroca = document.getElementById('troca-ano').value;
      const idiomaTroca = document.getElementById('troca-idioma').value;
      const serieTroca = document.getElementById('troca-serie').value;
      const estadoTroca = document.getElementById('troca-estado').value;
      const descricaoTroca = document.getElementById('troca-descricao').value;

      let trocas = JSON.parse(localStorage.getItem('vireo_minhas_trocas') || '[]');

      const fotoDesejadoTratada = livroAtual && livroAtual.url_foto 
        ? (livroAtual.url_foto.startsWith('http') || livroAtual.url_foto.startsWith('../') ? livroAtual.url_foto : `../Pagina Biblioteca/${livroAtual.url_foto}`)
        : 'https://via.placeholder.com/80x110?text=Sem+Foto';

      const novaTroca = {
        id: Date.now(),
        // Dados do livro oferecido
        tituloOferecido: tituloTroca,
        autorOferecido: autorTroca,
        anoOferecido: anoTroca,
        idiomaOferecido: idiomaTroca,
        serieOferecido: serieTroca,
        estadoOferecido: estadoTroca,
        descricaoOferecido: descricaoTroca,
        fotoOferecido: imagemBase64Carregada || 'https://via.placeholder.com/80x110?text=Sem+Foto',

        // Dados do livro desejado
        tituloDesejado: livroAtual ? livroAtual.titulo_nome : "Livro Desejado",
        autorDesejado: livroAtual ? (livroAtual.autor || "Não informado") : "Não informado",
        categoriaDesejado: livroAtual ? (livroAtual.categoria || "GERAL") : "GERAL",
        anoDesejado: livroAtual ? (livroAtual.ano_publicacao || "N/A") : "N/A",
        serieDesejado: livroAtual ? (livroAtual.serie_ano_escolar || "Geral") : "Geral",
        idiomaDesejado: livroAtual ? (livroAtual.idioma || "Português") : "Português",
        descricaoDesejado: livroAtual ? (livroAtual.descricao || "Sem descrição informada.") : "Sem descrição informada.",
        fotoDesejado: fotoDesejadoTratada,

        data: new Date().toLocaleDateString('pt-BR'),
        status: 'Aguardando aceite'
      };

      trocas.push(novaTroca);
      localStorage.setItem('vireo_minhas_trocas', JSON.stringify(trocas));

      modalTroca.style.display = 'none';

      msgFeedback.className = 'mensagem-feedback alerta';
      msgFeedback.textContent = `Proposta enviada com sucesso! Você ofereceu "${tituloTroca}". Acompanhe no histórico.`;
      msgFeedback.style.display = 'block';

      formTroca.reset();
      resetarAreaDrop();
    });
  }
});