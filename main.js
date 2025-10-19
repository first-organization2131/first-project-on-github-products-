    function checkIfMoreNeeded() {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  if (scrollHeight <= clientHeight + 100 && hasMore) {
    fetchProducts();
  }
}
 let skip = 0;
    const limit = 18;
    let isLoading = false;
    let hasMore = true;
   
    const container = document.getElementById('demo');
    const loadingDiv = document.getElementById('loading');
    const Ccontainer = document.getElementById("cproducts");


  function fetchProducts() {
  if (isLoading || !hasMore) {
    return;
  }

  isLoading = true;
  loadingDiv.style.display = 'block';

  fetch('https://dummyjson.com/products?limit=' + limit + '&skip=' + skip)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var products = data.products;

      if (products.length === 0) {
        hasMore = false;
        loadingDiv.style.display = 'none';
        return;
      }

      for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var div = document.createElement('div');
        div.classList.add('container');

        // Generate stars
        var fullStars = Math.floor(product.rating);
        var stars = '';

        for (var j = 0; j < fullStars; j++) {
          stars += '<i class="fa-solid fa-star"></i>';
        }

        for (var k = fullStars; k < 5; k++) {
          stars += '<i class="fa-regular fa-star"></i>';
        }

        div.innerHTML = 
          '<img class="images" src="' + product.thumbnail + '" alt="' + product.title + '" />' +
          '<span class="thename">' + product.title + '</span>' +
          '<span class="price">' + product.price + '$</span>' +
          '<div class="star-row">' + stars + '</div>' +
          '<span class="Arate">Average Rating: ' + product.rating + '</span>' +
         '<button onclick=\'addToCart(' + JSON.stringify(product) + ')\'>Add to Cart</button>'
;

        container.appendChild(div);
      }

      skip += limit;
      isLoading = false;
      checkIfMoreNeeded();
    })
    .catch(function(err) {
      console.error("Fetch error:", err);
      isLoading = false;
    });
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

    

var productarray = [];

function addToCart(product) {
  productarray.push(product);
 
}

function cartpage() {
  document.getElementById("body").style.display = "none";
  document.getElementById("cartdesign").style.display = "block";
  renderCart(); // Now show the cart items
};

function backToShop() {
  document.getElementById("body").style.display = "block";
  document.getElementById("cartdesign").style.display = "none";
};

function renderCart() {
  var container = document.getElementById("cproducts");
  var output = "";

  for (var i = 0; i < productarray.length; i++) {
    var p = productarray[i];
    output +=
      '<div class="cartdesign">' +
        '<img src="' + p.thumbnail + '" width="100"><br>' +
        '<span>' + p.title + '</span><br>' +
        '<span>$' + p.price.toFixed(2) + '</span>' +
      '</div><br>' +'<button onclick="plusbutton(' + i + ')">+</button>' +
'<button onclick="minusbutton(' + i + ')">-</button>';
;
  }

  container.innerHTML = output;
}

var carTotal = 0

function plusbutton(myindex) {
  var item = productarray[myindex];
  carTotal += item.price;
  document.getElementById("hamaada").innerHTML = carTotal.toFixed(2);
}

function minusbutton(myindex) {
  var item = productarray[myindex];
  carTotal -= item.price;
  if (carTotal < 0) carTotal = 0;
  document.getElementById("hamaada").innerHTML = carTotal.toFixed(2);
}