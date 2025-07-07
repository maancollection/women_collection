fetch('image_list.txt')
  .then(response => response.text())
  .then(data => {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; // Clear loading message

    const lines = data.trim().split('\n');
    lines.forEach(line => {
      const [filename, name, price] = line.split(':').map(x => x.trim());
      const imgSrc = `pic/${encodeURIComponent(filename)}`;
      const detailLink = `product.html?filename=${encodeURIComponent(filename)}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;

      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <a href="${detailLink}">
          <img src="${imgSrc}" alt="${name}">
        </a>
        <div class="title">${name.toUpperCase()}</div>
        <div class="price">Rs. ${price}</div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('product-list').innerText = 'Failed to load products.';
    console.error(err);
  });
