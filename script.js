const productList = document.getElementById('product-list');
const sortSelect = document.getElementById('sort');

let users = [];

async function fetchData() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch product data');
    users = await res.json();
    renderProducts(users);
  } catch (error) {
    productList.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function renderProducts(data) {
  productList.innerHTML = '';
  data.forEach(user => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;
    productList.appendChild(card);
  });
}

sortSelect.addEventListener('change', () => {
  const sortValue = sortSelect.value;
  let sortedUsers = [...users];
  
  if (sortValue === 'asc') {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === 'desc') {
    sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderProducts(sortedUsers);
});

// Initial fetch
fetchData();
