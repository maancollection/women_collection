document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-list');
  const sortButton = document.getElementById('sort-button');
  let productList = [];
  let sortAscending = true;

  function renderProducts(data) {
    container.innerHTML = '';

    if (!data.length) {
      container.innerHTML = '<p>No products found.</p>';
      return;
    }

    data.forEach(({ filename, name, price }) => {
      const imgSrc = `pic/${encodeURIComponent(filename)}`;
      const detailLink = `product.html?filename=${encodeURIComponent(filename)}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;

      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <a href="${detailLink}">
          <img src="${imgSrc}" alt="${name}">
        </a>
        <div class="card-content">
          <div class="title">${name.toUpperCase()}</div>
          <div class="price">Rs. ${price}</div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  fetch('image_list.txt')
    .then(response => {
      if (!response.ok) throw new Error("Failed to load image_list.txt");
      return response.text();
    })
    .then(data => {
      const lines = data.trim().split('\n');

      productList = lines
        .map(line => {
          const [filename, name, price] = line.split(':').map(x => x.trim());
          return filename && name && price
            ? { filename, name, price: parseFloat(price) }
            : null;
        })
        .filter(Boolean);

      renderProducts(productList);
    })
    .catch(err => {
      console.error('Error loading products:', err);
      container.innerHTML = '<p style="color:red;">Failed to load products.</p>';
    });

  sortButton.addEventListener('click', () => {
    const sorted = [...productList].sort((a, b) => {
      return sortAscending ? a.price - b.price : b.price - a.price;
    });

    renderProducts(sorted);

    sortAscending = !sortAscending;
    sortButton.textContent = sortAscending
      ? 'Sort by Price (Low to High)'
      : 'Sort by Price (High to Low)';
  });
});
