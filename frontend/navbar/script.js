const links=document.querySelector('.links');
const btn=document.querySelector('.nav-toggle');

btn.addEventListener('click' , function(){
    links.classList.toggle('show-links');
})