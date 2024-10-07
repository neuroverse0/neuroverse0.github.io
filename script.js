const heroesPerPage = 5;
let currentPage = 1;
let totalPages = 0;
let selectedHeroID = null;
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

  buttons.forEach(btn => btn.classList.remove('active'));

  buttons.forEach((button, index) => {
    const heroes = groups[page - 1];
    if(index < heroes.length) {
      button.textContent = heroes[index].nome;
      button.dataset.heroId = heroes[index].id;
      button.dataset.images = JSON.stringify(heroes[index].imagem);

      button.addEventListener('click', () => {
        const heroData = heroes[index];
        selectedHeroID = heroData.id;

        document.getElementById("id").textContent = heroData.id;
        document.getElementById("origem").textContent = heroData.origem;
        document.getElementById("poder").textContent = heroData.poder;
        document.getElementById("inimigo").textContent = heroData.inimigo;
        document.getElementById("image").src = heroData.imagem[0];
        document.getElementById("image").dataset.imageActive = 0;
        document.getElementById("image").dataset.images = JSON.stringify(heroData.imagem);
        document.getElementById("hero_name").textContent = heroData.nome;

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

  if(selectedHeroID) {
    buttons.forEach(button => {
      const heroData = button.dataset.heroId;
      if(heroData === selectedHeroID) {
        button.classList.add('active');
      }
    })
  }

  document.getElementById('page').textContent = currentPage;
}

function nextImage() {
  const image = document.getElementById("image");
  const images = JSON.parse(image.dataset.images);

  if(parseInt(image.dataset.imageActive) + 1 < images.length) {
    image.dataset.imageActive = parseInt(image.dataset.imageActive) + 1;
    image.src = images[image.dataset.imageActive];
  }

  console.log(images);
  console.log(images.dataset.imageActive);
}

function prevImage() {
  const image = document.getElementById("image");
  const images = JSON.parse(image.dataset.images);

  if(parseInt(image.dataset.imageActive) > 0) {
    image.dataset.imageActive = parseInt(image.dataset.imageActive) - 1;
    image.src = images[image.dataset.imageActive];
  }
}