let listProductHTML = document.querySelector(".renderItems")
let listProducts = [];
let carts = [];
let listCartHTML = document.getElementById('header_cart-list-item');
let qntCart = document.querySelector('.header_cart-notice');
let noCart = document.querySelector('.header_cart-list');
console.log(noCart);
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
//                 <span class="home-product-item_price-new">${product.price}</span>
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


// listProductHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if (positionClick.classList.contains('home-product-find-item-content')) {
//         let product_id = positionClick.dataset.id;
//         addToCart(product_id);
//     }
// });

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToLocalstorage();
}
const addCartToLocalstorage = () => {
    localStorage.setItem('cart',JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(carts => {
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
    }
    qntCart.innerHTML = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('header_cart-item-remove')){
        let product_id = positionClick.dataset.id;
        changeQuantity(product_id);
    }
    
})

const changeQuantity = (product_id) => {
    let positionItemCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemCart >= 0){
        let valueChange = carts[positionItemCart].quantity - 1;
        if(valueChange > 0){
            carts[positionItemCart].quantity = valueChange;
        }else{
            carts.splice(positionItemCart, 1);
        }
    }
    addCartToLocalstorage();
    addCartToHTML();
}

const initApp = () => {
    // get data from json
    fetch('product.json')
    .then(Response => Response.json())
    .then(data => {
        listProducts = data;
        // addDataToHTML();

        //get cart from localstorage
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();