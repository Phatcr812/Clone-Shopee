let rightBtn = document.getElementById('rightBtn');
rightBtn.addEventListener('click',runSlideRight);
let imgBanner = document.getElementsByClassName('home-banners__main-banner-image');

let index = 0;

function showSlide(n)
{
    var dot =document.getElementsByClassName("dot");
    for(i = 0;i < dot.length;i++)
    {
        dot[i].classList.remove("active");
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
    document.querySelector('.home_banner-main').style.right = index*100+'%';
}

function runSlideRight()
{
    index ++;
    showSlide(index);
}

let leftBtn = document.getElementById('leftBtn');
leftBtn.addEventListener('click',runSlideLeft);

function runSlideLeft()
{
    index --;
    showSlide(index);
}

setInterval(function()
{
    index++;
    showSlide(index);
},4000);

let count = 0;
    window.onscroll = function(e) {
        let theHeight = window.scrollY;                
                
        if (theHeight > 1000 && count == 0) {
            let banner = document.getElementsByClassName('overlay');
            banner[0].classList.remove('close');
            count++;
        }
}

let banner = document.getElementsByClassName('overlay');
banner[0].addEventListener('click',function()
{
    let banner = document.getElementsByClassName('overlay');
    banner[0].classList.add('close');
});


let btnExit = document.getElementById('btn_exit');

btnExit.addEventListener('click',function()
{
    let banner = document.getElementsByClassName('overlay');
    banner[0].classList.add('close');
});

showAlertonSmallerBrowser();         

            window.onresize = showAlertonSmallerBrowser;

            function showAlertonSmallerBrowser() {
                
                let theWidth = window.innerWidth;

                if (theWidth < 1200) {
                        alert('Khong support Width < 1200px');
                }
            }

