let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 25.99,
    inStock: true,
    rating: 4.3,
  },
  {
    id: 2,
    name: "Bluetooth Headphones",
    category: "Electronics",
    price: 59.99,
    inStock: true,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 29.99,
    inStock: false,
    rating: 4.1,
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    inStock: true,
    rating: 4.8,
  },
  {
    id: 5,
    name: "Gaming Chair",
    category: "Furniture",
    price: 199.99,
    inStock: false,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Webcam 1080p",
    category: "Electronics",
    price: 45.0,
    inStock: true,
    rating: 4.2,
  },
  {
    id: 7,
    name: "Desk Lamp",
    category: "Furniture",
    price: 18.5,
    inStock: true,
    rating: 4.0,
  },
  {
    id: 8,
    name: "External Hard Drive 1TB",
    category: "Storage",
    price: 64.99,
    inStock: true,
    rating: 4.5,
  },
  {
    id: 9,
    name: "Smartphone Tripod",
    category: "Accessories",
    price: 15.99,
    inStock: true,
    rating: 3.9,
  },
  {
    id: 10,
    name: "Wireless Charger",
    category: "Electronics",
    price: 22.0,
    inStock: false,
    rating: 4.3,
  },
  {
    id: 11,
    name: "USB-C Hub",
    category: "Accessories",
    price: 34.99,
    inStock: true,
    rating: 4.4,
  },
  {
    id: 12,
    name: "Noise Cancelling Earbuds",
    category: "Electronics",
    price: 79.99,
    inStock: true,
    rating: 4.6,
  },
  {
    id: 13,
    name: "Standing Desk",
    category: "Furniture",
    price: 299.99,
    inStock: false,
    rating: 4.7,
  },
  {
    id: 14,
    name: "Fitness Tracker",
    category: "Wearables",
    price: 49.95,
    inStock: true,
    rating: 4.2,
  },
  {
    id: 15,
    name: "LED Monitor 27-inch",
    category: "Electronics",
    price: 189.99,
    inStock: true,
    rating: 4.5,
  },
  {
    id: 16,
    name: "Portable Speaker",
    category: "Audio",
    price: 39.99,
    inStock: true,
    rating: 4.1,
  },
  {
    id: 17,
    name: "Smartwatch",
    category: "Wearables",
    price: 129.99,
    inStock: false,
    rating: 4.6,
  },
  {
    id: 18,
    name: "Graphic Tablet",
    category: "Design",
    price: 74.5,
    inStock: true,
    rating: 4.4,
  },
  {
    id: 19,
    name: "Router Dual Band",
    category: "Networking",
    price: 59.99,
    inStock: true,
    rating: 4.3,
  },
  {
    id: 20,
    name: "Power Bank 20000mAh",
    category: "Accessories",
    price: 29.99,
    inStock: true,
    rating: 4.5,
  },
];

const users = [
  {
    id: 1,
    name: { first: "Alice", last: "Johnson" },
    email: "alice@example.com",
  },
  { id: 2, name: { first: "Bob", last: "Smith" }, email: "bob@example.com" },
  {
    id: 3,
    name: { first: "Charlie", last: "Brown" },
    email: "charlie@domain.com",
  },
  {
    id: 4,
    name: { first: "David", last: "Williams" },
    email: "david@company.com",
  },
];

// Debounce
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Deep search
function deepSearch(obj, query) {
  for (let key in obj) {
    const val = obj[key];
    if (typeof val === "object" && val !== null) {
      if (deepSearch(val, query)) return true;
    } else if (String(val).toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
  }
  return false;
}

// Render
function renderSuggestions(usersFiltered, productsFiltered) {
  const ul = document.getElementById("suggestions");
  ul.innerHTML = "";

  if (usersFiltered.length > 0) {
    const userLabel = document.createElement("li");
    userLabel.className = "label";
    userLabel.textContent = "Users";
    ul.appendChild(userLabel);

    usersFiltered.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name.first} ${user.name.last} (${user.email})`;
      ul.appendChild(li);
    });
  }

  if (productsFiltered.length > 0) {
    const productLabel = document.createElement("li");
    productLabel.className = "label";
    productLabel.textContent = "Products";
    ul.appendChild(productLabel);

    productsFiltered.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `${product.name} - $${product.price}`;
      ul.appendChild(li);
    });
  }

  if (usersFiltered.length === 0 && productsFiltered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    ul.appendChild(li);
  }
}

// Search handler
function handleSearch(e) {
  const query = e.target.value.trim();
  if (!query) {
    document.getElementById("suggestions").innerHTML = "";
    return;
  }

  const userResults = users.filter((user) => deepSearch(user, query));
  const productResults = products.filter((product) =>
    deepSearch(product, query)
  );
  renderSuggestions(userResults, productResults);
}

// Event binding with debounce
document
  .getElementById("searchInput")
  .addEventListener("input", debounce(handleSearch, 300));
