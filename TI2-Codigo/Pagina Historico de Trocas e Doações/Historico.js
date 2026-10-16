function obterDadosHistorico() {
  const reservasSalvas = JSON.parse(localStorage.getItem('vireo_minhas_reservas') || '[]');
  const trocasSalvas = JSON.parse(localStorage.getItem('vireo_minhas_trocas') || '[]');

  const doacoesSalvas = [
    { 
      titulo: "Química Orgânica Vol. 1", 
      data: "15/09/2026", 
      status: "Disponível", 
      descricao: "Aguardando alunos interessados na plataforma." 
    }
  ];

  return {
    reservas: reservasSalvas,
    doacoes: doacoesSalvas,
    trocas: trocasSalvas
  };
}

function cancelarPropostaTroca(idTroca) {
  let trocas = JSON.parse(localStorage.getItem('vireo_minhas_trocas') || '[]');
  trocas = trocas.filter(t => t.id !== idTroca);
  localStorage.setItem('vireo_minhas_trocas', JSON.stringify(trocas));
  renderizarHistorico('trocas');
}

function renderizarHistorico(categoria) {
  const container = document.getElementById('conteudo-historico');
  const dados = obterDadosHistorico();
  const itens = dados[categoria] || [];

  if (itens.length === 0) {
    container.innerHTML = '<p class="sem-registro">Nenhum registro encontrado nesta categoria.</p>';
    return;
  }

  let html = '<div class="lista-historico">';
  
  itens.forEach(item => {
    const classeStatus = item.status 
      ? item.status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-") 
      : "pendente";

    if (categoria === 'trocas') {
      const fotoOferecido = item.fotoOferecido || 'https://via.placeholder.com/80x110?text=Sem+Foto';
      const fotoDesejado = item.fotoDesejado || 'https://via.placeholder.com/80x110?text=Sem+Foto';

      html += `
        <div class="item-card-historico card-troca">
          <div class="header-card-troca">
            <span class="data-item">Data da Proposta: ${item.data}</span>
            <div class="acoes-status-header">
              <span class="tag-status ${classeStatus}">${item.status}</span>
              <button class="btn-cancelar-oferta" onclick="cancelarPropostaTroca(${item.id})">Cancelar Oferta</button>
            </div>
          </div>

          <div class="comparacao-troca">
            <!-- LIVRO OFERECIDO POR VOCÊ -->
            <div class="bloco-livro oferecido">
              <span class="label-troca">OFERECIDO POR VOCÊ</span>
              <div class="conteudo-livro-troca">
                <img src="${fotoOferecido}" alt="Livro Oferecido" class="capa-troca-mini">
                <div class="detalhes-livro-troca">
                  <p><strong>Título:</strong> ${item.tituloOferecido || item.oferecido || 'Não informado'}</p>
                  <p><strong>Autor:</strong> ${item.autorOferecido || 'Não informado'}</p>
                  <p><strong>Ano:</strong> ${item.anoOferecido || 'N/A'}</p>
                  <p><strong>Idioma:</strong> ${item.idiomaOferecido || 'N/A'}</p>
                  <p><strong>Série/Ano:</strong> ${item.serieOferecido || 'Geral'}</p>
                  <p><strong>Estado:</strong> ${item.estadoOferecido || 'Não informado'}</p>
                  ${item.descricaoOferecido ? `<p><strong>Descrição:</strong> ${item.descricaoOferecido}</p>` : ''}
                  <span class="tag-subtexto proposta">Proposta de troca</span>
                </div>
              </div>
            </div>

            <!-- SETA INDICATIVA NO MEIO -->
            <div class="seta-troca">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d5c52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <!-- LIVRO DESEJADO -->
            <div class="bloco-livro desejado">
              <span class="label-troca">LIVRO DESEJADO</span>
              <div class="conteudo-livro-troca">
                <img src="${fotoDesejado}" alt="Livro Desejado" class="capa-troca-mini">
                <div class="detalhes-livro-troca">
                  <p><strong>Título:</strong> ${item.tituloDesejado || item.titulo || 'Livro Desejado'}</p>
                  <p><strong>Autor:</strong> ${item.autorDesejado || 'Não informado'}</p>
                  <p><strong>Categoria:</strong> ${item.categoriaDesejado || 'GERAL'}</p>
                  <p><strong>Ano:</strong> ${item.anoDesejado || 'N/A'}</p>
                  <p><strong>Série/Ano:</strong> ${item.serieDesejado || 'Geral'}</p>
                  <p><strong>Idioma:</strong> ${item.idiomaDesejado || 'Português'}</p>
                  <p><strong>Descrição:</strong> ${item.descricaoDesejado || 'Sem descrição informada.'}</p>
                  <span class="tag-subtexto solicitado">Solicitado da plataforma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="item-card-historico">
          <div class="info-item">
            <h3>${item.titulo}</h3>
            <p class="descricao-item">${item.descricao || ''}</p>
            <span class="data-item">Data: ${item.data}</span>
          </div>
          <div class="status-container">
            <span class="tag-status ${classeStatus}">${item.status}</span>
          </div>
        </div>
      `;
    }
  });

  html += '</div>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  const botoesAba = document.querySelectorAll('.btn-aba');

  renderizarHistorico('reservas');

  botoesAba.forEach(botao => {
    botao.addEventListener('click', () => {
      botoesAba.forEach(b => b.classList.remove('ativa'));
      botao.classList.add('ativa');

      const categoria = botao.getAttribute('data-categoria');
      renderizarHistorico(categoria);
    });
  });
});