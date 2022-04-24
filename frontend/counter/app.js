let count = 0;


const display = document.getElementById('value');
const button = document.querySelectorAll("button");


button.forEach(function (item){
    {
        item.addEventListener('click', (e) => {

            const styles = e.currentTarget.classList;
            if(styles.contains('decrease'))
            {
                count--;
            }
            else if(styles.contains('increase'))
            {
                count++;
            }
            else{
                count=0;
            }
            display.textContent=count;

            if(count<0)
            {
                display.style.color='red';
            }
            else if(count>0)
            {
                display.style.color='green';
            }
        })
    }
});