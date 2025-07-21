document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-list');
  const sortButton = document.getElementById('sort-button');
  let productList = [];
  let sortAscending = true;

  function renderProducts(data) {
    container.innerHTML = '';

    data.forEach(({ folder, heading, description, price, availability }) => {
      const imgElement = new Image();

      imgElement.onload = () => {
        const detailLink = `product.html?folder=${folder}&heading=${encodeURIComponent(heading)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}&availability=${encodeURIComponent(availability)}`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <a href="${detailLink}">
            <img src="${imgElement.src}" alt="${heading}">
          </a>
          <div class="card-content">
            <div class="title">${heading}</div>
            <div class="price">Rs. ${price}</div>
          </div>
        `;
        container.appendChild(card);
      };

      imgElement.onerror = () => {
        imgElement.src = `pic/dress_material/${folder}/pic_1.png`;
      };

      imgElement.src = `pic/dress_material/${folder}/pic_1.jpg`;
    });
  }

  fetch('image_list.csv')
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split('\n').slice(1); // skip header
      productList = lines.map(line => {
        const [no, folder, heading, description, price, availability] = line.split(',').map(s => s.trim());
        return {
          folder,
          heading,
          description,
          price: parseFloat(price),
          availability
        };
      });

      renderProducts(productList);
    })
    .catch(err => {
      console.error('Error loading CSV:', err);
      container.innerHTML = '<p style="color:red;">Failed to load product list.</p>';
    });

  sortButton?.addEventListener('click', () => {
    const sorted = [...productList].sort((a, b) => sortAscending ? a.price - b.price : b.price - a.price);
    renderProducts(sorted);
    sortAscending = !sortAscending;
    sortButton.textContent = sortAscending
      ? 'Sort by Price (Low to High)'
      : 'Sort by Price (High to Low)';
  });
});
