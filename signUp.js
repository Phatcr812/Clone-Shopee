let theButton = document.getElementsByClassName('signUp');
theButton[0].addEventListener('click',SignUp);
function SignUp()
{
    let d = document.getElementsByClassName('text-error');
    let theInput = document.getElementsByClassName('auth-form_input');
    for(i = 0; i < theInput.length; i++)
    {
        if(theInput[i].value === '')
        {
            theInput[i].classList.add('error');
            d[i].innerHTML = 'Không để trống';
        }else
        {
            theInput[i].classList.remove('error');
            d[i].innerHTML = '';
        }
    }
}
theButton[0].addEventListener('click',checkEmail);
function checkEmail()
{
    let theInput = document.getElementsByClassName('auth-form_input');
    let d = document.getElementsByClassName('text-error');
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(theInput[0].value))
    {
        theInput[0].classList.remove('error');
        d[0].innerHTML = '';
    }else
    {
        theInput[0].classList.add('error');
        d[0].innerHTML = 'Sai cú pháp email';
    }
}
theButton[0].addEventListener('click',checkPass);
function checkPass()
{
    let theInput = document.getElementsByClassName('auth-form_input');
    let d = document.getElementsByClassName('text-error');
    if(theInput[1].value.length < 8 || theInput[1].value.length > 16)
    {
        theInput[1].classList.add('error');
        d[1].innerHTML = 'Mật khẩu có độ dài từ 8 -16 ký tự';
        d[2].innerHTML = 'Mật khẩu có độ dài từ 8 -16 ký tự';
    }
    if(theInput[1].value != theInput[2].value)
    {
        theInput[1].classList.add('error');
        theInput[2].classList.add('error');
        d[1].innerHTML = 'Mật khẩu không khớp';
        d[2].innerHTML = 'Mật khẩu không khớp';
    }
}

function change(num){
    let x = document.getElementsByClassName('auth-form_input');
    if(x[num].value != ''){
        x[num].classList.remove('error');
    }
}