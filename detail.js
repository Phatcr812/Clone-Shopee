

var coupon = {
    code: 0.5,
    date : new Date("Jan 01, 2024 00:00:00").getTime()
}



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
    addCartToHTMLL();
    addCartToLocalstoragee();
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
    addCartToLocalstoragee();
    addCartToHTMLL();
}



let CartCart = new Cart();


function Product(id, name, price, image){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
}



let okiLun = fetch('https://api.jsonbin.io/v3/b/65634ad80574da7622cc40d2')
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
    CartCart.carts = JSON.parse(localStorage.getItem('cart'));
    addCartToHTMLL();
}
})
.catch(function() {
console.log("Fetch error");
});



const addCartToLocalstoragee = () => {
    localStorage.setItem('cart',JSON.stringify(CartCart.carts));
}


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('header_cart-item-remove')){
        let product_id = positionClick.dataset.id;
        CartCart.changeQuantity(product_id);
    }
    addCartToLocalstoragee();
})


const addCartToHTMLL = () => {
    noCart.appendChild(listCartHTML);
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(CartCart.carts.length > 0){
            let content = document.createElement('h4');
            let headingText = document.createTextNode('Sản phẩm đã thêm');
            content.appendChild(headingText);
            listCartHTML.appendChild(content);
            content.classList.add('header_cart-heading');
            CartCart.carts.forEach((carts) => {
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







var productID = window.location.hash.replace('#','');
console.log(productID);

let cha = document.querySelector('.product-briefing');
var myHtml = '';

let dataProducts =  JSON.parse(localStorage.getItem("categories")) ;

var product = dataProducts.find(function(item) {
    return item.id.toString() === productID.toString();
});

Cart.prototype.renderSingleProduct = function(){
if(product)
{
    myHtml = `<div class="grid__row">
    <div class="grid__column-4">
        <div class="product-briefing-left">
            <div class="product-briefing-left-img active" style="background-image: url(${product.img});"></div>
            <div class="product-briefing-left-img" style="background-image: url(./assests/img/product/9.jfif);"></div>
            <div class="product-briefing-left-img" style="background-image: url(./assests/img/product/10.jfif);"></div>
            <div class="product-briefing-left-item">
            <div class="product_banner-main-btn">
                                <i id="leftBtn" class="fa-solid fa-chevron-left leftBtn-product"></i>
                                <i id="rightBtn" class="fa-solid fa-chevron-right rightBtn-product"></i>
            </div>
            <div class="bullet-button-cha bullet-button-cha-product">
                                <ul class="bullet-button">
                                    <li onclick="showSlide(0)" class="dot active"></li>
                                    <li onclick="showSlide(1)" class="dot"></li>
                                    <li onclick="showSlide(2)" class="dot"></li>
                                  </ul>
                            </div>
                <div class="product-briefing-left-item-share">
                    <span class="product-briefing-left-item-share-text">Chia sẻ:  </span>
                    <div class="product-briefing-left-item-share-logo">
                        <i class="fa-brands fa-facebook-messenger" style="color: #0384ff;"></i>
                        <i class="fa-brands fa-facebook" style="color: #3b5999;"></i>
                        <i class="fa-brands fa-pinterest" style="color: #de0217;"></i>
                        <i class="fa-brands fa-twitter" style="background-color: rgb(16, 194, 255);border-radius: 50%;color: white;"></i>
                    </div>
                </div>
                <div class="product-briefing-left-item-favorite">
                    <i class="fa-regular fa-heart product-briefing-left-item-favorite-logo" style="color: #ff424f;"></i>
                    <span class="product-briefing-left-item-favorite-text">Đã thích (52)</span>
                </div>
            </div>
        </div>

    </div>

    <div class="grid__column-6">
        <div class="product-briefing-right">
            <div class="product-briefing-content">
                <div class="product-briefing-content-btn">Yêu Thích</div>
                <span class="product-briefing-content-text">
                ${product.name}
                </span>
            </div>
            <div class="product-briefing-ratting">
                <div class="product-briefing-ratting_1">
                    <div class="product-briefing-ratting_1-num">5.0</div>
                    <div class="product-briefing-ratting_1-logo">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>

                <div class="product-briefing-ratting_2">
                    <div class="product-briefing-ratting_2-num">3</div>
                    <span class="product-briefing-ratting_2-text">Đánh giá</span>
                </div>

                <div class="product-briefing-ratting_3">
                    <div class="product-briefing-ratting_3-num">5</div>
                    <span class="product-briefing-ratting_3-text">Đã Bán</span>
                </div>

                <div class="product-briefing-ratting_4">
                    <span class="product-briefing-ratting_4-text">Tố Cáo</span>
                </div>
            </div>
            <div class="product-briefing-price">
                <span class="home-product-item_price-old product-briefing-price-text_1">${(product.price*(2.5 - coupon.code)).toLocaleString(undefined,{minimumFractionDigits: 0})}</span>
                <span class="home-product-item_price-new product-briefing-price-text_2">${product.price.toLocaleString(undefined, {minimumFractionDigits: 0})}</span>
                <div id='GiamGia' class="product-briefing-content-btn">${coupon.code * 100}% Giảm</div>
            </div>
            <div style="margin-left: 25px;font-size:1.6rem;" id='countdown-timer'>
                <span id="day"> </span> Day
                <span id="hour"> </span> Hour
                <span id="min"> </span> Min
                <span id="sec"> </span> Sec
            </div>
            <div class="product-briefing-ship grid__full-width">
                <section class="product-briefing-ship-1 grid__row">
                    <h3 class="product-briefing-ship-title grid__column-2-4">Vận Chuyển</h3>
                    <div class="product-briefing-ship-container grid__column-8-10">
                        <div class="product-briefing-ship-container_top">
                            <div class="product-briefing-ship-container_top-logo">
                                <i class="fa-regular fa-calendar-days"></i>
                            </div>
                            <div class="product-briefing-ship-container_top-text">
                                Hàng Đặt Trước (có hàng sau 15 ngày)
                            </div>
                        </div>
                        <div class="product-briefing-ship-container_bottom">
                            <div class="product-briefing-ship-container_bottom-logo">
                                <i class="fa-solid fa-truck"></i>
                            </div>
                            <div class="product-briefing-ship-container_bottom-container">
                                <div class="product-briefing-ship-container_bottom-container_1">
                                    <div class="product-briefing-ship-container_bottom-container_1-left">
                                        Vận chuyển tới
                                    </div>
                                    <div class="product-briefing-ship-container_bottom-container_1-right">
                                        Phí vận chuyển
                                    </div>
                                </div>
                                <div class="product-briefing-ship-container_bottom-container_2">
                                    <div class="product-briefing-ship-container_bottom-container_2-left">
                                        Phường Võ Thị Sáu, Quận 3 
                                        <i class="select-input_label_icon fa-solid fa-caret-down"></i>
                                    </div>
                                    <div class="product-briefing-ship-container_bottom-container_2-right">
                                        ₫13.500 - ₫16.500
                                        <i class="select-input_label_icon fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="product-briefing-ship_quantity grid__row">
                    <h3 class="product-briefing-ship-title grid__column-2-4">Số Lượng</h3>
                    <div class="product-briefing-ship_quantity-btn grid__column-8-10">
                        <div class="product-briefing-ship_quantity-btn_1">
                            <button href="" class="product-briefing-ship_quantity-minus">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <button class="product-briefing-ship_quantity-num">1</button>
                            <button href="" class="product-briefing-ship_quantity-plus" >
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <span class="product-briefing-ship_quantity-btn-text">1769 sản phẩm có sẵn</span>
                    </div>
                </div>
            </div>
            <div class="product-briefing-cart">
                <button class="product-briefing-cart-left">
                    <i class="fa-solid fa-cart-plus product-briefing-cart-left-logo" style="color: #ee4d2d;"></i>
                    <span onclick="CartCart.addToCart(${product.id});" data-id="${product.id}" class="product-briefing-cart-left-text">Thêm vào giỏ hàng</span>
                </button>
                <button class="product-briefing-cart-right">
                    <span class="product-briefing-cart-right-text">Mua ngay</span>
                </button>
            </div>
        </div>
    </div>

</div>`
cha.innerHTML = myHtml;
}
}
CartCart.renderSingleProduct();
let rightBtn = document.getElementById('rightBtn');
rightBtn.addEventListener('click',runSlideRight);
let leftBtn = document.getElementById('leftBtn');
leftBtn.addEventListener('click',runSlideLeft);
let imgBanner = document.getElementsByClassName('product-briefing-left-img');
let index = 0;
console.log(imgBanner);
function showSlide(n)
{
    var dot =document.getElementsByClassName("dot");
    for(i = 0;i < dot.length;i++)
    {
        dot[i].classList.remove("active");
        imgBanner[i].classList.remove("active");
    }
    if(n < 0)
    {
        index = imgBanner.length-1;
    }else if(n > imgBanner.length-1)
    {
        index = 0;
    }else{
        index = n;
    }
    dot[index].classList.add("active");
    imgBanner[index].classList.add("active");
}
function runSlideRight()
{
    console.log('ok');
    index ++;
    showSlide(index);
}
function runSlideLeft()
{
    console.log('ok');
    index --;
    showSlide(index);
}
setInterval(function()
{
    index++;
    showSlide(index);
},4000);



var countdown = setInterval(function(){
    var now = new Date().getTime();
    var khoangCanh = coupon.date - now;
    var day = Math.floor( khoangCanh / ( 24*60*60*1000));
    var hour = Math.floor((khoangCanh % ( 24*60*60*1000)) / (60 * 60 * 1000));
    var min = Math.floor((khoangCanh % (60*60*1000)) / (60 * 1000));
    var sec = Math.floor((khoangCanh %(60*1000)) / 1000);
    let GiaCook = document.querySelector('.product-briefing-price-text_1');
    let GiamGiaCook = document.getElementById('GiamGia');
    if(khoangCanh <= 0)
    {
        coupon.code = 0;
        clearInterval(countdown);
        var countdownTimer = document.getElementById('countdown-timer');
        countdownTimer.innerHTML = 'hết giảm giá òi';
        GiaCook.classList.add('cook');
        GiamGiaCook.classList.add('cook');
    }

    var divDay = document.getElementById('day');
    var divHour = document.getElementById('hour');
    var divMin = document.getElementById('min');
    var divSec = document.getElementById('sec');
    
    divDay.innerText = (day < 0) ? 0 : day;
    divHour.innerText = (hour < 0) ? 0 : hour;
    divMin.innerText = (min < 0) ? 0 : min;
    divSec.innerText = (sec < 0) ? 0 : sec;
});









// function discount() {
//     product.price -= 100;
//     dataProducts[productID].price = product.price;
//     localStorage.setItem('categories', JSON.stringify(dataProducts));
//     product.priceReduced = true;
//     // var price = document.getElementsByClassName('price1');
//     // price[0].classList.remove('discount');
//     CartCart.renderSingleProduct();
//     addCartToHTMLL();
//   }
//   discount();
//   let GiaCook = document.querySelector('.product-briefing-price-text_1');
//   let GiamGiaCook = document.getElementById('GiamGia');
//   console.log(GiamGiaCook);
//   const startingMinutes = 0.05; // 0.01=1s , 1 = 1min , 60 = 1h , 6024 = 1d 
//   let time = startingMinutes * 60;
  
//   var countdownTimeout = setInterval(updateCountdown, 1000);
  
//   function updateCountdown() {
//     var countdownTimer = document.getElementById('countdown-timer');
  
//     var days = Math.floor(time / (60 * 60 * 24));
//     var hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
//     var minutes = Math.floor((time % (60 * 60)) / 60);
//     var seconds = time % 60;
  
//     days = days < 10 ? '0' + days : days;
//     hours = hours < 10 ? '0' + hours : hours;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
  
//     if (time > 0) {
//       countdownTimer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
//       time--;
//     } else {
//       clearInterval(countdownTimeout);
//       countdownTimer.innerHTML = 'hết giảm giá òi';
  
//       if (!product.priceReduced) {
//         product.price = product.price + 1000000;
//         dataProducts[productID].price = product.price;
//         product.priceReduced = true;
//         // var price = document.getElementsByClassName('price1');
//         // price[0].classList.remove('discount');
//         CartCart.renderSingleProduct();
//         addCartToHTMLL();
//       }
//     }
//   }







