let inputQtys = document.getElementsByClassName('product-briefing-ship_quantity-num');
let minusQtys = document.getElementsByClassName('product-briefing-ship_quantity-minus');
let plusQtys = document.getElementsByClassName('product-briefing-ship_quantity-plus');
// Gán sự kiện và xử lý cho mỗi sản phẩm
for (let i = 0; i < inputQtys.length; i++) {
    minusQtys[i].addEventListener('click', function() {
        console.log('ok');
        minusBtn(i);
    });
  
    plusQtys[i].addEventListener('click', function() {
        console.log('ok');
      plusBtn(i);
    });
}
  
  function minusBtn(index) {
    let quantityElement = inputQtys[index];
    console.log(quantityElement);
    // let quantity = quantityElement.value;
    // if (quantity > 1) {
    //   quantity--;
    //   quantityElement.value = quantity;
    // }
    // inputQtys[index].innerHTML = quantity;
  }
  
  function plusBtn(index) {
    let quantityElement = inputQtys[index];
    console.log(quantityElement);
    // let quantity = quantityElement.value;
    // quantity++;
    // quantityElement.value = quantity;
    // inputQtys[index].innerHTML = quantity;
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
let listProducts = [];
let carts = [];
let listCartHTML = document.getElementById('header_cart-list-item');//li
let qntCart = document.querySelectorAll('.qtnTotal');
let noCart = document.querySelector('.header_cart-list');//ul
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
    addCartToHTML();
    addCartToLocalstorage();
}



let myCart = new Cart();


function Product(id, name, price, image){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
}




    let cha = document.querySelector('.table-product_detail_list');
let myHtml = '';

const addCartToHTML = () => {
    
    noCart.appendChild(listCartHTML);
    listCartHTML.innerHTML = '';
    cha.innerHTML = '';
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
            let rowSubtotal = info.price * carts.quantity;
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
                // cart to
                let bigCart = document.createElement('tr');
                bigCart.classList.add('table-product_detail');
                bigCart.innerHTML=`<tr class="table-product_detail">
                <th><input class="table_input" type="checkbox"></th>
                <td class="table-product-bottom">
                    <div class="table-product-bottom-detail">
                        <a href="./product-detail.html" class="table-product-bottom-detail-link">
                            <img class="table-product-bottom-detail-link-img" src="${info.img}" alt="product image"></a>
                        </a>
                        <div class="table-product-bottom-detail-pro">
                            <a href="./product-detail.html" class="table-product-bottom-detail-pro-link">
                            ${info.name}
                            </a>
                            <div class="table-product-bottom-detail-pro-book">
                                <span class="table-product-bottom-detail-pro-book-text">Hàng Đặt Trước</span>
                            </div>
                            <img class="table-product-bottom-detail-pro-img" src="https://down-vn.img.susercontent.com/file/vn-50009109-0c1ec43538dd62f8ea3894276c7a1c07">
                        </div>
                    </div>
                </td>
                <td>
                    <i class="see_shop-logo fa-solid fa-shop"></i>
                    <span class="table-name_shop">79vwhnhpcc</span>
                    <i class="chat_shop-logo fa-solid fa-comments"></i>
                </td>
                <th style="font-weight: normal;color: #333;">₫<span class="price">${info.price.toLocaleString(undefined, {minimumFractionDigits: 0})}</span></th>
                <th class="table-product-bottom-quantity">
                    <div style="width: 100px;" class="product-briefing-ship_quantity-btn_1 table-product-bottom-quantity-btn">
                    <button href="" onclick="myCart.changeQuantity(${info.id});" class="product-briefing-ship_quantity-minus">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <button id='quantity' value="${carts.quantity}" style="width: 3rem;" class="product-briefing-ship_quantity-num">${carts.quantity}</button>
                    <button href="" onclick="myCart.addToCart(${info.id});" class="product-briefing-ship_quantity-plus">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                </th>
                <th style="font-weight: normal; color: #ee4d2d;">₫<span class="sub">${rowSubtotal}</span></th>
                <th>
                    <button onclick="myCart.changeQuantity(${info.id});" class="table-product-bottom-delete-1">Xóa</button>
                    <div class="table-product-bottom-delete-2">
                        <span class="table-product-bottom-delete-2-text">Tìm sản phẩm tương tự</span>
                        <i class="table-product-bottom-delete-2-icon fa-solid fa-caret-down"></i>
                    </div>
                </th>
            </tr>`
            cha.appendChild(bigCart);
        });
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
    for(i = 0; i < qntCart.length;i++){
        qntCart[i].innerHTML = totalQuantity;
    }
    LumTien()
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
let divsubtotal = document.getElementsByClassName('sub');
let divCountSubtotal = document.getElementById('subtotal');


function LumTien(){
    let tong = 0;
    for(i = 0; i< divsubtotal.length;i++)
    {
        tong += parseFloat(divsubtotal[i].textContent)
    }
    divCountSubtotal.innerText = tong;
    let tax = 1.15;
    let divTotal = document.getElementById('total');
    let total = tong * tax;
    divTotal.innerText = total.toFixed(0);
}

// // Thuc hien cong tru Qty
// for (let i = 0; i < minusQtys.length; i++) {
//     minusQtys[i].addEventListener('click', function () {
//         console.log('ok');
//         let currentValue = parseInt(inputQtys[i].value);
//         if (isNaN(currentValue)) {
//             currentValue = 0;
//         }
//         inputQtys[i].value = currentValue - 1;
//         if (parseInt(inputQtys[i].value) < 0) {
//             inputQtys[i].value = 0;
//         }
//         inputQtys[i].dispatchEvent(new Event('change'));
//         inputQtys[i].innerHTML = inputQtys[i].value;
//     });
// }
// for (let i = 0; i < plusQtys.length; i++) {
//     plusQtys[i].addEventListener('click', function () {
//         let currentValue = parseInt(inputQtys[i].value);
//         if (isNaN(currentValue)) {
//             currentValue = 0;
//         }
//         inputQtys[i].value = currentValue + 1;
//         inputQtys[i].dispatchEvent(new Event('change'));
//         inputQtys[i].innerHTML = inputQtys[i].value;
//     });
// }
// // Thuc hien phep tinh
// for(let i = 0; i < inputQtys.length; i++)
// {
//     inputQtys[i].addEventListener('change', updateQty);
// }

// updateQty();

// function updateQty() {
//     let prices = document.getElementsByClassName('price');
//     let divsubtotal = document.getElementsByClassName('sub');
//     let divCountSubtotal = document.getElementById('subtotal');
//     let subtotal = 0;
//     for (let i = 0; i < inputQtys.length; i++) {
//         let qty = Number(inputQtys[i].value);
//         let price = Number(prices[i].outerText);

//         if (isNaN(qty) || isNaN(price)) {
//             divsubtotal[i].innerHTML = 'Invalid value';
//         } else {
//             let rowSubtotal = qty * price;
//             divsubtotal[i].innerHTML = rowSubtotal.toFixed(2);
//             subtotal += rowSubtotal;
//         }
//     }
//     divCountSubtotal.innerHTML = subtotal.toFixed(2);
// }