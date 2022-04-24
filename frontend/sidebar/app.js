const side=document.querySelector('.sidebar-toggle');
const cross=document.querySelector('.close-btn');
const header=document.querySelector(".sidebar");

console.log(header.classList);
side.addEventListener('click' ,function()
{
    header.classList.toggle('show-sidebar');
    
})

cross.addEventListener('click' , function(){
    header.classList.remove('show-sidebar');
})