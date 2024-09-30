var image = document.getElementById('img');

image.addEventListener('mousemove',function()
{
    image.setAttribute('src','./assests/img/product/2.jfif')
})


image.addEventListener('mouseleave',function(){
    image.setAttribute('src','./assests/img/product/1.jfif')
})

//bai 2

function monHoc(name){
    this.name = name;
}

function danhSachMon()
{
    this.list = [];
}
let render = document.getElementById('render');
let nameMon = document.getElementById('nameMon');
let listMon = new danhSachMon();


let mon1 = new monHoc('Toan');
let mon2 = new monHoc('Van');
let mon3 = new monHoc('Su');


listMon.list.push(mon1);
listMon.list.push(mon2);
listMon.list.push(mon3);

danhSachMon.prototype.renderHTML = function(){
    let myHTML = `<thead>
    <tr>
        <th >STT</th>
        <th >Tên môn học</th>
    </tr>
</thead>`;
for (let i = 0; i < this.list.length; i++) {
    myHTML += `
    <tr>
        <td>${(i + 1)}</td>
        <td>${this.list[i].name}</td>
    </tr>
    `;
}
render.innerHTML = myHTML;
}

listMon.renderHTML();

danhSachMon.prototype.addMon = function(MonHoc){
    let monInList = this.list.find(function(monhoc)
    {
        return mon.mon = monhoc.mon;
    })

    if(monInList)
    {
        alert('Da co mon hoc nay')
    }else{
        this.list.push(MonHoc);
    }
    listMon.renderHTML();
}


danhSachMon.prototype.addMon = function(MonHoc) {
        this.list.push(MonHoc);
        listMon.renderHTML();
};

let addToList = function() {
    let name = nameMon.value;
    let newMon = new monHoc(name);
    listMon.addMon(newMon);
    nameMon.value = ''; 
};

let btn = document.getElementById('btn');
btn.addEventListener('click', addToList);


//bai 3

function Product(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  
  function Cart() {
    this.products = [];
  }
  
  var newcart = new Cart();
  
  var product1 = new Product("1", "SamSung", "400", 3);
  newcart.products.push(product1);
  var product2 = new Product("2", "Nokia", "100", 14);
  newcart.products.push(product2);
  var product3 = new Product("3", "Motorola", "180", 2);
  newcart.products.push(product3);
  
  Cart.prototype.renderMyCart = function () {
    var listCard = document.getElementById('colProduct');
    var total = document.getElementById('total');
    var sub = 0;
    var totalprice = 0;
    var myhtml = '';
  
    for (i = 0; i < this.products.length; i++) {
      sub = this.products[i].quantity * this.products[i].price;
      myhtml += `
      <tr>
        <td>${this.products[i].id}</td>
        <td>${this.products[i].name}</td>
        <td>${this.products[i].price}</td>
        <td><input type="number" value="${this.products[i].quantity}"></td>
        <td>${sub}</td>
      </tr>
      `;
      totalprice += Number(this.products[i].price) * Number(this.products[i].quantity);
    }
    total.innerText = totalprice;
    listCard.innerHTML = myhtml;
  };
  
  newcart.renderMyCart();