
   function checkIfMoreNeeded() {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  if (scrollHeight <= clientHeight + 100 && hasMore) {
    fetchProducts();
  }
}
// fetching the data 
    let skip = 0;
    const limit = 18;
    let isLoading = false;
    let hasMore = true;
    let loadedStock = false;
    let loadedCategory = false; 
    let loadlaptops  = false ;
   
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
 
};

function cartpage() {
  document.getElementById("body").style.display = "none";
  document.getElementById("cartdesign").style.display = "block";
  document.getElementById("opencategory").style.display = "none";
  document.getElementById("openstock").style.display = "none";
  document.getElementById("openlaptop").style.display = "none";
  renderCart(); // Now show the cart items
};

function backToShop() {
  document.getElementById("body").style.display = "block";
  document.getElementById("cartdesign").style.display = "none";
  document.getElementById("").style.display = "none";
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
};

var carTotal = 0

function plusbutton(myindex) {
  var item = productarray[myindex];
  carTotal += item.price;
  document.getElementById("hamaada").innerHTML = carTotal.toFixed(2);
};

function minusbutton(myindex) {
  var item = productarray[myindex];
  carTotal -= item.price;
  if (carTotal < 0) carTotal = 0;
  document.getElementById("hamaada").innerHTML = carTotal.toFixed(2);
};




function applybtn() {
    // Get the checkbox elements
    const lapBox = document.getElementById('lap');
    const grocBox = document.getElementById('groc');
    const statusBox = document.getElementById('status');

    // Hide the main landing pages to make room for results
    document.getElementById("body").style.display = "none";
    document.getElementById("cartdesign").style.display = "none";

    // Initial Hide: Hide everything, then show only what's checked
    document.getElementById("openlaptop").style.display = "none";
    document.getElementById("opencategory").style.display = "none";
    document.getElementById("openstock").style.display = "none";

    // Check each box - NO 'return' here, so it can run all of them
    if (lapBox.checked) {
        checklaptops(); 
        document.getElementById("openlaptop").style.display = "block";
    }
    
    if (grocBox.checked) {
        groceries();
        document.getElementById("opencategory").style.display = "block";
    }
    
    if (statusBox.checked) {
        availabilityStatus();
        document.getElementById("openstock").style.display = "block";
    }
}


function availabilityStatus() {

  // If already loaded once, do NOT load again
  if (loadedStock) {

  document.getElementById("openstock").style.display = "block";
    return;

  }

  loadedStock = true; // mark as loaded

  fetch("https://dummyjson.com/products/category/groceries")
    .then(res => res.json())
    .then(data => {
      const products = data.products;

      const inStockProducts = products.filter(
        p => p.availabilityStatus === "In Stock"
      );

      const wrapper = document.getElementById("stock");

      inStockProducts.forEach(product => {
        var div = document.createElement("div");
        div.classList.add("container");

        var fullStars = Math.floor(product.rating);
        var stars = "";

        for (var j = 0; j < fullStars; j++) stars += '<i class="fa-solid fa-star"></i>';
        for (var k = fullStars; k < 5; k++) stars += '<i class="fa-regular fa-star"></i>';

        div.innerHTML =
          '<img class="images" src="' + product.thumbnail + '" />' +
          '<span class="thename">' + product.title + '</span>' +
          '<span class="price">' + product.price + '$</span>' +
          '<div class="star-row">' + stars + '</div>' +
          '<span class="Arate">Rating: ' + product.rating + '</span>' +
          '<button onclick=\'addToCart(' + JSON.stringify(product) + ')\'>Add to Cart</button>';

        wrapper.appendChild(div);
      });
    });
};

function groceries() {

  // If already loaded once, do NOT reload
  if (loadedCategory) {
document.getElementById("opencategory").style.display = "block";
    return;
  }

  loadedCategory = true; // mark as loaded

  fetch("https://dummyjson.com/products/category/groceries")
    .then(res => res.json())
    .then(data => {

      const wrapper = document.getElementById("category");

      data.products.forEach(product => {
        var div = document.createElement("div");
        div.classList.add("container");

        var fullStars = Math.floor(product.rating);
        var stars = "";

        for (var j = 0; j < fullStars; j++) stars += '<i class="fa-solid fa-star"></i>';
        for (var k = fullStars; k < 5; k++) stars += '<i class="fa-regular fa-star"></i>';

        div.innerHTML =
          '<img class="images" src="' + product.thumbnail + '" />' +
          '<span class="thename">' + product.title + '</span>' +
          '<span class="price">' + product.price + '$</span>' +
          '<div class="star-row">' + stars + '</div>' +
          '<span class="Arate">Rating: ' + product.rating + '</span>' +
          '<button onclick=\'addToCart(' + JSON.stringify(product) + ')\'>Add to Cart</button>';

        wrapper.appendChild(div);
      });

    });

};


function checklaptops() {




  // If already loaded once, do NOT load again
  if (loadlaptops) {
  document.getElementById("openlaptop").style.display = "block";
    return;
  }

  loadlaptops = true; // mark as loaded

  fetch("https://dummyjson.com/products/category/laptops")
    .then(res => res.json())
    .then(data => {
      const products = data.products;

      const laps = products.filter(
        p => p.category === "laptops"
      );

      const wrapper = document.getElementById("laptop");

      laps.forEach(product => {
        var div = document.createElement("div");
        div.classList.add("container");

        var fullStars = Math.floor(product.rating);
        var stars = "";

        for (var j = 0; j < fullStars; j++) stars += '<i class="fa-solid fa-star"></i>';
        for (var k = fullStars; k < 5; k++) stars += '<i class="fa-regular fa-star"></i>';

        div.innerHTML =
          '<img class="images" src="' + product.thumbnail + '" />' +
          '<span class="thename">' + product.title + '</span>' +
          '<span class="price">' + product.price + '$</span>' +
          '<div class="star-row">' + stars + '</div>' +
          '<span class="Arate">Rating: ' + product.rating + '</span>' +
          '<button onclick=\'addToCart(' + JSON.stringify(product) + ')\'>Add to Cart</button>';

        wrapper.appendChild(div);
      });
    });

};

  

function filterpage() {

  document.getElementById("filterdesign").style.display = "block";
  document.getElementById("cartdesign").style.display = "none";
  document.getElementById("body").style.display = "none";
  document.getElementById("openstock").style.display = "none";
  document.getElementById("opencategory").style.display = "none";
  document.getElementById("openlaptop").style.display = "none";

};



