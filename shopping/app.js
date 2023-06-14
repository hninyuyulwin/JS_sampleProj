// Render products
let productDiv = document.getElementById("product-div");
let tbody = document.querySelector(".carts-table");
let show = document.querySelector(".show");

function renderProducts(){
  products.forEach(product => {
    // console.log(product);
    productDiv.innerHTML += `
      <div class="col-12 col-lg-6 mb-4">
        <div class="card card-ctr">
          <div class="card-body">
            <img src="${product.src}" class="w-100" />
            <hr />
            <p class="fs-5 fw-bold">${product.name}</p>
            <p>
              Price - <span class="text-primary fs-5 fw-bold">$ ${product.price}</span>
            </p>
            <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addToCarts(${product.id})">
              Add to cart
            </div>
          </div>
        </div>
      </div>
    `;
  });
}
renderProducts();

//  cart array
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

function addToCarts(id){
  if (carts.some(cart => cart.id === id)) {
    changeQty("plus",id);
  }else{
    let cart = products.find(product => product.id === id);
    carts.push({
      ...cart,
      quantity : 1
    });
    // console.log(carts);
  }
  updateCarts();
}

// render cart
function renderProductCart(){
  show.innerHTML = "";
  tbody.innerHTML = "";
  carts.forEach(cart => {
    tbody.innerHTML += `
      <tr>
      <td>
        <img src="${cart.src}" id="img-cart" title="${cart.name}" />
      </td>
      <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
      <td>
        <i
          class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQty('minus',${cart.id})"
        ></i
        ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
        ><i
          class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQty('plus',${cart.id})"
        ></i>
      </td>
      <td>
        <i
          class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.id})"
          title="Remove"
        ></i>
      </td>
    </tr>
    `;
  });
  renderNumber();
  showHide();
}

function changeQty(condition,id){
  carts = carts.map(cart => {
    let quantity = cart.quantity;
    if (cart.id == id) {
      if (condition == "minus" && quantity > 1) {
        quantity--;
      }else if(condition == "plus"){
        quantity++;
      } 
    }
    return{
      ...cart,
      quantity : quantity,
    };
  });
  updateCarts();
}
// total price and cart qty
function renderNumber(){
  let totalPrice = 0,totalCart = 0;
  carts.forEach(cart=>{
    totalPrice += cart.price * cart.quantity;
    totalCart += cart.quantity;
  });
  document.querySelector("#totalCart").innerText = `${totalCart}`;
  document.querySelector("#totalPrice").innerText = `$ ${totalPrice}`;
}

function removeCart(id){
  carts = carts.filter(cart=>cart.id !== id);
  updateCarts();
}
// showhide
function showHide(){
  if(!tbody.innerHTML){
    show.innerHTML = `
      <h5 class="text-center fw-bold"><i class="fa-solid fa-circle-xmark me-3"></i>No items in cart!</h5><hr>
    `;
  }
}

function updateCarts(){
  renderProductCart();
  // renderNumber();
  localStorage.setItem("productCarts",JSON.stringify(carts));
}
updateCarts();