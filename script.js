fetch('heroes.json')
  .then(response => response.json())
  .then(data => {
    const buttons = document.querySelectorAll('.hero_btn');

    buttons.forEach((button, index) => {
      if (index < data.length) {
        button.textContent = data[index].nome;
      } else {
        console.error('Não há dados suficientes para todos os botões.');
      }
    });
  });