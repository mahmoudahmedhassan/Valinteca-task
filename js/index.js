// Define a Product class
class Product {
  constructor(name, price, image, addedToCart, id) {
    this.product_name = name;
    this.product_price = price;
    this.product_image = image;
    this.added_to_cart = addedToCart;
    this.id = id;
  }
}

// Create an array of Product objects
const products = [
  new Product("Gold Coin","112.55","imges/pexels-pixabay-106152.jpg",false,1),
  new Product("Silver Ring","50.99","imges/natalia-jonas-WkgJjFcRleQ-unsplash.jpg",false,2),
  new Product("Diamond Necklace","1200.00","imges/ian-talmacs-yctbxRAubvQ-unsplash.jpg",false,3),
  new Product("Platinum Watch","890.00","imges/brigitte-tohm-j8C66j15nAk-unsplash.jpg",false,4),
  new Product("Ruby Earrings","350.00","imges/coppertist-wu-WG12blLiN4U-unsplash.jpg",false,5),
  new Product("Sapphire Bracelet","680.00","imges/sabrianna-AhIQL2CKq7g-unsplash.jpg",false,6),
];

// Get the products div
const productsDiv = document.getElementById("products");

const productDiv = document.getElementById("product");
const modal = document.getElementById("modal");
const cart = document.getElementById("cart");
const menu_cart = document.getElementById("menu-cart");
const nav_dropdown = document.getElementById("nav-dropdown");
const body = document.querySelector(".content");
  
// hideen nav_dropdown 
body.onclick = function () {
  nav_dropdown.style.display = "none";
};
// =======================================================

// add product items in bag 
menu_cart.onclick = function () {
  let productsItems = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : null;
  if (productsItems && productsItems.length > 0) {
    let items = products.filter((p) => productsItems.includes(p.id));

    const navDropdownHtml = items
      ?.map((product) => {
        return `<div class="product_cart" id="product">
                 <img src="${product.product_image}" width="50px" height="50px"  alt="${product.product_name}">
                 <h5 >${product.product_name}</h5>
                 <p>${product.product_price} $</p>
              </div>`;
      })
      .join("");

    nav_dropdown.innerHTML = navDropdownHtml;
   } else {
     nav_dropdown.innerHTML = "No Product Added to cart";
     console.log(nav_dropdown)
  }
  nav_dropdown.style.display = "block";
};
// =======================================================

// add products number in cart
const addToCart = function (productID) {
  let prods = localStorage.getItem("products");
  if (prods) {
    let productsItems = JSON.parse(prods);
    localStorage.setItem(
      "products",
      JSON.stringify(Array.from(new Set([productID, ...productsItems])))
    );
  } else {
    localStorage.setItem(
      "products",
      JSON.stringify(Array.from(new Set([productID])))
    );
  }

  cart.innerHTML = JSON.parse(localStorage.getItem("products")).length;

  products.forEach((p) => {
    if (p.id == productID) {
      p.added_to_cart = true;
    }
  });
  render(products);

  if (modal.style.display === "block") {
    viewModal(productID);
  }
  nav_dropdown.style.display = "none";
};
// =======================================================

// delete product item from cart
const removeFromCart = function (productID) {
  let productsItems = JSON.parse(localStorage.getItem("products"));
  let newProducts = productsItems.filter((id) => id !== productID);

  localStorage.setItem("products", JSON.stringify(newProducts));

  cart.innerHTML = JSON.parse(localStorage.getItem("products")).length;

  products.forEach((p) => {
    if (p.id == productID) {
      p.added_to_cart = false;
    }
  });

  render(products);
  if (modal.style.display === "block") {
    viewModal(productID);
  }
  nav_dropdown.style.display = "none";
};

// =======================================================

function render(products) {
    const productHTML = products.map(
        (product) => {
            let isSelected = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")).includes(product.id) : false
            return `<div class="product" id="product">
          <img src="${product.product_image}" alt="${product.product_name}">
          <div class="product_info">
            <h5 >${product.product_name}</h5>
            <p>${product.product_price} $</p>
          </div>
          <div class="product_buttons">
            <button onclick="${product.added_to_cart || isSelected ? `removeFromCart(${product.id})` : `addToCart(${product.id})`}" class="${product.added_to_cart || isSelected ? "remove_from_cart" : "add_to_cart"}" >${product.added_to_cart || isSelected ? "remove from cart" : "add to cart"}</button>
            <button class="view" onclick="viewModal(${product.id})">quick view</button>
          </div>
        </div>`
        }
    ).join("");
    // Add the HTML for the products to the products div
    productsDiv.innerHTML = productHTML;
};
render(products);
// =======================================================


 
// add count products to cart 
cart.innerHTML = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")).length: 0;

// open modal 
const viewModal = function (id) {
  let selectedProduct = products.find((p) => p.id === id);
 
  const modalContent = ` 
    <div class="modal-content">
        <div class="modal-img">
            <img width="200" src="${selectedProduct.product_image}" alt="${selectedProduct.product_name}">
        </div>
        <div class="product_info">
            <h4 >${selectedProduct.product_name}</h3>
            <p>${selectedProduct.product_price} $</p>
        </div>
        <button 
             onclick="${
               selectedProduct.added_to_cart
                 ? `removeFromCart(${selectedProduct.id})`
                 : `addToCart(${selectedProduct.id})`
             }"  
             class="${
               selectedProduct.added_to_cart
                 ? "modal_remove_from_cart"
                 : "modal_add_to_cart"
             }">
            ${
              selectedProduct.added_to_cart ? "remove from cart" : "add to cart"
            }
        </button>
        <span class="close-button" onclick="closeModal()">×</span>

    </div>
 
     `;

  modal.style.display = "block";
  modal.innerHTML = modalContent;
};

// close modal 
const closeModal = function () {
  modal.style.display = "none";
};
