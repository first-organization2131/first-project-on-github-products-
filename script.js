


 let skip = 0;
    const limit = 18;
    let isLoading = false;
    let hasMore = true;

    const container = document.getElementById('demo');
    const loadingDiv = document.getElementById('loading');

    function fetchProducts() {
      if (isLoading || !hasMore) return;

      isLoading = true;
      loadingDiv.style.display = 'block';

      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(data => {
          const products = data.products;
          if (products.length === 0) {
            hasMore = false;
            loadingDiv.textContent = "No more products to load.";
            return;
          }

          products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('container');

            // Generate stars
            const fullStars = Math.floor(product.rating);
            let stars = '';
            for (let i = 0; i < fullStars; i++) {
              stars += `<i class="fa-solid fa-star"></i>`;
            }
            for (let i = fullStars; i < 5; i++) {
              stars += `<i class="fa-regular fa-star"></i>`;
            }

            div.innerHTML = `
              <img class="images" src="${product.thumbnail}" alt="${product.title}" />
              <span class="thename">${product.title}</span>
              <span class="price">${product.price}$</span>
              <div class="star-row">${stars}</div>
              <span class="Arate">Average Rating: ${product.rating}</span>
              <button onclick="Addproduct('${product.title}')">ADDED TO CART</button>
            `;
            container.appendChild(div);
          });

          skip += limit;
          isLoading = false;
        })
        .catch(err => {
          console.error("Fetch error:", err);
          isLoading = false;
        });
    }

    function Addproduct(name) {
      alert(`${name} is added to cart!`);
    }

    // Initial load
    fetchProducts();

    // Infinite scroll
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        fetchProducts();
      }
    }); 








