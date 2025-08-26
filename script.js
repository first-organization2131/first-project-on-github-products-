

  let allproducts = [
    {
      image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/12223/2018-Chrysler-300-front_12223_032_2400x1800_PW7.png",
      name: "300 touring",
      price: 28999.99,
      Arate: "Average Rating: 4.05",
    },
    {
      image: "https://m.media-amazon.com/images/I/61ZJvf5xWBL._SY450_.jpg",
      name: "Amazon Echo Plus ",
      price: 99.99,
      Arate: "Average Rating: 3.95",
    },
    {
      image: 'https://m.media-amazon.com/images/I/61rMo6SBhyL.__AC_SX300_SY300_QL70_ML2_.jpg',
      name: "American Football",
      price: 19.99,
      Arate: "Average Rating: 4.15",
    },
    {
      image: 'https://cdn.thewirecutter.com/wp-content/media/2025/07/BEST-MODERN-BED-FRAMES-SUB-2048px-4380.jpg?auto=webp&quality=75&width=980&dpr=2',
      name: "Annibale colombo bed ",
      price: 1899.99,
      Arate: "Average Rating: 4.00",
    },
    {
      image: "https://www.modernresale.com/cdn/shop/products/Modern_Resale_Depadova_Chat_12_Sofa_4.jpg?v=1598910871",
      name: "Annibale colombo sofa ",
      price: 2499.99,
      Arate: "Average Rating: 4.05",
    },
  ];

  let text = "";

  for (let i = 0; i < allproducts.length; i++) {
    let stars = "";

    // Different star layout for first product (index 0)
    if (i === 0 || i === 4) {
      stars = `
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
      `;
    } else {
      // Default stars for others
      stars = `
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      `;
    }

    text += `
      <div class="container">
        <img class="images" src="${allproducts[i].image}" />
        <br>
        <span class="thename">${allproducts[i].name}</span><br>
        <span class="price">${allproducts[i].price}$</span><br>
        <div class="star-row">
          ${stars}
        </div><br>
        <span class="Arate">${allproducts[i].Arate}</span><br>
        <button class="button" onclick="Addproduct(${i})">ADD TO CART</button>
      </div>
    `;
  }

  document.getElementById("demo").innerHTML = text;

  function Addproduct(index) {
    alert( allproducts[index].name + "Is Added to cart!");
  }







