const heroesPerPage = 5;
let currentPage = 1;
let totalPages = 0;
const groups = [];

fetch('heroes.json')
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < data.length; i += heroesPerPage) {
      groups.push(data.slice(i, i + heroesPerPage));
    }
    totalPages = groups.length;

    const buttons = document.querySelectorAll('.hero_btn');

    updateButtons(currentPage);

    document.getElementById('btnPrev').addEventListener('click', () => {
      if (currentPage > 1) {
        updateButtons(currentPage - 1);
      }
    });
    
    document.getElementById('btnNext').addEventListener('click', () => {
      if (currentPage < totalPages) {
        updateButtons(currentPage + 1);
      }
    });
  });

function updateButtons(page) {
  currentPage = page;
  const startIndex = (page - 1) * heroesPerPage;
  const endIndex = startIndex + heroesPerPage;
  const buttons = document.querySelectorAll('.hero_btn');

  buttons.forEach((button, index) => {
    const heroes = groups[page - 1];
    if(index < heroes.length) {
      button.textContent = heroes[index].nome;

      button.addEventListener('click', () => {
        const heroData = heroes[index];
        document.getElementById("id").textContent = heroData.id
        document.getElementById("origem").textContent = heroData.origem
        document.getElementById("poder").textContent = heroData.poder
        document.getElementById("inimigo").textContent = heroData.inimigo
        document.getElementById("image").src = heroData.imagem
        document.getElementById("hero_name").textContent = heroData.nome

        // Remove a classe 'active' de todos os botões
        buttons.forEach(btn => btn.classList.remove('active'));

        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');
      })
      button.disabled = false;

    } else {
      button.textContent = '---';
      button.disabled = true;
    }
  });

  document.getElementById('page').textContent = currentPage;
}