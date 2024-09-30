let listProductHTML = document.querySelector(".renderItems")
let listProducts = [];
let carts = [];
let listCartHTML = document.getElementById('header_cart-list-item');//li
let qntCart = document.querySelector('.header_cart-notice');
let noCart = document.querySelector('.header_cart-list');//ul

let btnAdd = document.getElementsByClassName("home-product-find-item");

listProducts = JSON.parse(localStorage.getItem('categories'));
function Cart()
{
    this.carts = JSON.parse(localStorage.getItem('cart')) || [];
}

Cart.prototype.addToCart = function(product_id) {
    let positionThisProductInCart = this.carts.findIndex((value) => value.product_id == product_id);
    if(this.carts.length <= 0){
        this.carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        this.carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        this.carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToLocalstorage();
}

Cart.prototype.changeQuantity = function(product_id) {
    let positionItemCart = this.carts.findIndex((value) => value.product_id == product_id);
    if(positionItemCart >= 0){
        let valueChange = this.carts[positionItemCart].quantity - 1;
        if(valueChange > 0){
            this.carts[positionItemCart].quantity = valueChange;
        }else{
            this.carts.splice(positionItemCart, 1);
        }
    }
    addCartToLocalstorage();
    addCartToHTML();
}



let myCart = new Cart();


function Product(id, name, price, image){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
}



let abc = fetch('https://api.jsonbin.io/v3/b/65634ad80574da7622cc40d2')
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(data => {
// tại đây, json sẽ là dữ liệu JSON đã được parse thành object
// console.log(data.record[0].name);
// console.log(data);\
localStorage.setItem('categories', JSON.stringify(data.record));
if(localStorage.getItem('cart')){
    myCart.carts = JSON.parse(localStorage.getItem('cart'));
    addCartToHTML();
}
})
.catch(function() {   
console.log("Fetch error");
});



for(i = 0; i < listProducts.length; i++)
{
    let newProduct = `<div class="grid__column-2-4 newProduct">
    <div class="home-product-item" >
       <a style="text-decoration: none;color: inherit;" href="./product-detail.html#${listProducts[i].id}" >
       <div class="home-product-item_img" style="background-image: url(${listProducts[i].img}"></div>
       <h4 class="home-product-item_name">${listProducts[i].name}</h4>
       <div class="home-product-item_price">
           <span class="home-product-item_price-old">1.050.000d</span>
           <span class="home-product-item_price-new">${listProducts[i].price.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
       </div>
       <div class="home-product-item_action">
           <span class="home-product-item_like home-product-item_like--liked">
               <i class="home-product-item_like-icon-empty fa-regular fa-heart"></i>
               <i class="home-product-item_like-icon-fill fa-solid fa-heart"></i>
               <!-- <i class="fa-solid fa-heart"></i> -->
           </span>
           <div class="home-product-item_rating">
               <i class="home-product-item_star-gold fa-solid fa-star"></i>
               <i class="home-product-item_star-gold fa-solid fa-star"></i>
               <i class="home-product-item_star-gold fa-solid fa-star"></i>
               <i class="home-product-item_star-gold fa-solid fa-star"></i>
               <i class="home-product-item_star-gold fa-solid fa-star"></i>
           </div>
           <span class="home-product-item_sold">387 đã bán</span>
       </div>
       <div class="home-product-item_origin">
           <span class="home-product-item_brand">Hà Nội</span>
           <span class="home-product-item_origin-name"></span>
       </div>
       <div class="home-product-item_favourite">
           <i class="fa-solid fa-check"></i>
           <span>Yêu thích</span>
       </div>
       <div class="home-product-item_sale-off">
           <span class="home-product-item_sale-off-percent">5%</span>
           <span class="home-product-item_sale-off-label">GIẢM</span>
       </div>  </a> 
       <div class="home-product-find-item btn btn--primary">
           <span data-id="${listProducts[i].id}" class="home-product-find-item-content">Thêm vào giỏ hàng</span>
       </div>
    </div>
  </div> `
  listProductHTML.innerHTML += newProduct;
}


listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('home-product-find-item-content')){
        let product_id = positionClick.dataset.id;
        myCart.addToCart(product_id, listProducts);
    }
});






const addCartToHTML = () => {
    noCart.appendChild(listCartHTML);
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(myCart.carts.length > 0){
            let content = document.createElement('h4');
            let headingText = document.createTextNode('Sản phẩm đã thêm');
            content.appendChild(headingText);
            listCartHTML.appendChild(content);
            content.classList.add('header_cart-heading');
            myCart.carts.forEach((carts) => {
            totalQuantity += carts.quantity;
            let newCart = document.createElement('li');
            newCart.classList.add('header_cart-item');
            let positionProduct = listProducts.findIndex((value) => value.id == carts.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <img src="${info.img}" alt="" class="header_cart-img">
                <div class="header_cart-item-info">
                    <div class="header_cart-item-head">
                        <h5 class="header_cart-item-name">${info.name}</h5>
                        <div class="header_cart-item-price-wrap">
                        <span class="header_cart-item-price">${info.price.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
                        <span class="header_cart-item-multiply">x</span>
                        <span class="header_cart-item-qnt">${carts.quantity}</span>
                        </div>
                    </div>
                <div class="header_cart-item-body">
                    <span class="header_cart-item-description">
                        Phân loại: Bạc
                    </span>
                    <span data-id="${info.id}" class="header_cart-item-remove">Xóa</span>
                </div>
                </div>`;
                listCartHTML.appendChild(newCart);
        })
        let btnSeeCart = document.createElement('button');
        let btnSeeCartText = document.createTextNode('Xem giỏ hàng');
        btnSeeCart.appendChild(btnSeeCartText);
        let linkElement = document.createElement('a');
        linkElement.href = 'http://127.0.0.1:5500/Assignment/cart_shopee.html';
        linkElement.appendChild(btnSeeCart);
        listCartHTML.appendChild(btnSeeCart);
        btnSeeCart.classList.add('header_cart-viewcart');
        btnSeeCart.classList.add('btn');
        btnSeeCart.classList.add('btn--primary');
        noCart.classList.remove('header_cart-list-no-cart');
    }else if(carts.length == 0)
    {
        noCart.classList.add('header_cart-list-no-cart');
        listCartHTML.remove();
    }
    qntCart.innerHTML = totalQuantity;
}




const addCartToLocalstorage = () => {
    localStorage.setItem('cart',JSON.stringify(myCart.carts));
}


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('header_cart-item-remove')){
        let product_id = positionClick.dataset.id;
        myCart.changeQuantity(product_id);
    }
    addCartToLocalstorage();
})











































// const initApp = () => {
//     // get data from json
//     fetch('product.json')
//     .then(Response => Response.json())
//     .then(data => {
//         listProducts = data;
//         console.log(listProducts);
//         addDataToHTML();
//         //get cart from localstorage
//         if(localStorage.getItem('cart')){
//             carts = JSON.parse(localStorage.getItem('cart'));
//             addCartToHTML();
//         }
//     })
// }
// initApp();






// const addDataToHTML = () => {
//     listProductHTML.innerHTML = '';
//     if(listProducts.length > 0)
//     {
//         listProducts.forEach(product => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('grid__column-2-4');
//             newProduct.innerHTML =`
//             <div class="home-product-item" href="./product-detail.html">
//             <div class="home-product-item_img" style="background-image: url(${product.img});"></div>
//             <h4 class="home-product-item_name">${product.name}</h4>
//             <div class="home-product-item_price">
//                 <span class="home-product-item_price-old">1.050.000d</span>
//                 <span class="home-product-item_price-new">${product.price.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
//             </div>
//             <div class="home-product-item_action">
//                 <span class="home-product-item_like home-product-item_like--liked">
//                     <i class="home-product-item_like-icon-empty fa-regular fa-heart"></i>
//                     <i class="home-product-item_like-icon-fill fa-solid fa-heart"></i>
//                     <!-- <i class="fa-solid fa-heart"></i> -->
//                 </span>
//                 <div class="home-product-item_rating">
//                     <i class="home-product-item_star-gold fa-solid fa-star"></i>
//                     <i class="home-product-item_star-gold fa-solid fa-star"></i>
//                     <i class="home-product-item_star-gold fa-solid fa-star"></i>
//                     <i class="home-product-item_star-gold fa-solid fa-star"></i>
//                     <i class="home-product-item_star-gold fa-solid fa-star"></i>
//                 </div>
//                 <span class="home-product-item_sold">387 đã bán</span>
//             </div>
//             <div class="home-product-item_origin">
//                 <span class="home-product-item_brand">Hà Nội</span>
//                 <span class="home-product-item_origin-name"></span>
//             </div>
//             <div class="home-product-item_favourite">
//                 <i class="fa-solid fa-check"></i>
//                 <span>Yêu thích</span>
//             </div>
//             <div class="home-product-item_sale-off">
//                 <span class="home-product-item_sale-off-percent">5%</span>
//                 <span class="home-product-item_sale-off-label">GIẢM</span>
//             </div>
//             <button class="home-product-find-item btn btn--primary">
//             <span data-id="${product.id}" class="home-product-find-item-content">Thêm vào giỏ hàng</span>
//             </button>
//             </div>  
//             `;
//             listProductHTML.appendChild(newProduct)
//         })
//     }
    
// }





// const addToCart = (product_id) => {
//     let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
//     if(carts.length <= 0){
//         carts = [{
//             product_id: product_id,
//             quantity: 1
//         }]
//     }else if(positionThisProductInCart < 0){
//         carts.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     }else{
//         carts[positionThisProductInCart].quantity += 1;
//     }
//     addCartToHTML();
//     addCartToLocalstorage();
// }



// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('header_cart-item-remove')){
//         let product_id = positionClick.dataset.id;
//         changeQuantity(product_id);
//     }
// })

// const changeQuantity = (product_id) => {
//     let positionItemCart = carts.findIndex((value) => value.product_id == product_id);
//     if(positionItemCart >= 0){
//         let valueChange = carts[positionItemCart].quantity - 1;
//         if(valueChange > 0){
//             carts[positionItemCart].quantity = valueChange;
//         }else{
//             carts.splice(positionItemCart, 1);
//         }
//     }
//     addCartToLocalstorage();
//     addCartToHTML();
// }

