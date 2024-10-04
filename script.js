fetch('heroes.json')
  .then(response => response.json())
  .then(data => {
    const buttons = document.querySelectorAll('.hero_btn');

    buttons.forEach((button, index) => {
      button.textContent = data[index].nome;

      button.addEventListener('click', () => {
        const heroData = data[index];
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
    });
  });