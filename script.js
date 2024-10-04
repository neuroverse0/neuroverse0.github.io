fetch('heroes.json')
  .then(response => response.json())
  .then(data => {
    const buttons = document.querySelectorAll('.hero_btn');

    buttons.forEach((button, index) => {
      button.textContent = data[index].name;

      button.addEventListener('click', () => {
        const heroData = data[index];
        document.getElementById("id").textContent = heroData.id
        document.getElementById("origem").textContent = heroData.origem
        document.getElementById("poder").textContent = heroData.poder
        document.getElementById("inimigo").textContent = heroData.inimigo
        document.getElementById("image").textContent = heroData.imagem
        document.getElementById("hero_name").textContent = heroData.nome
      })
    });
  });