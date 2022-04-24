
const score = document.querySelector(".score");

const startScreen = document.querySelector(".startScreen");

const gameArea = document.querySelector(".gameArea");
let player = {speed:5};
let keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};

startScreen.addEventListener('click',start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);


function playGame (){
    
    let car=document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road=gameArea.getBoundingClientRect();
    console.log(player.y);
    if(player.start){
        if(keys.ArrowUp && player.y > road.top) player.y -= player.speed;
        if(keys.ArrowDown && player.y < road.bottom ) player.y += player.speed;
        if(keys.ArrowRight && player.x < road.width-50 ) player.x += player.speed;
        if(keys.ArrowLeft && player.x >0 ) player.x -= player.speed;

        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
        window.requestAnimationFrame(playGame);
    }
    player.score++;
    score.innerText = player.score;
}

function moveLines()
{
    let lines=document.querySelectorAll(".line");
    lines.forEach(function(item){
        if(item.y > 1500)
        {
            item.y -= 1500;
        }
        item.y +=player.speed;
        item.style.top = item.y + 'px';
    })
}


function moveEnemy(car)
{
    let ele=document.querySelectorAll(".enemy");
    ele.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
        }
        if(item.y >= 1500)
        {
            item.y = -800;
            item.style.left = Math.floor(Math.random() * 150) + "px";
            item.style.backgroundColor = randomcolor();
        }
        item.y +=player.speed;
        item.style.top = item.y + 'px';
    })
}
function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
}

function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;
}

function isCollide(a,b)
{
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.Top) || (aRect.top > bRect.bottom) || (aRect.right<bRect.left) || (aRect.left > bRect.right))
}


function endGame(){
    console.log('im working');
    player.start=false;
    score.innerHTML ="Game over <br> Score " + player.score;
    startScreen.classList.remove("hide");
    startScreen.innerHTML="Press to Restart the game";
}

function start(){
    
    startScreen.classList.add("hide");
    gameArea.classList.remove('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score =0;
    window.requestAnimationFrame(playGame);

    for(let i=0;i<10;i++)
    {
        let div =document.createElement("div");
        div.classList.add("line");
        div.y=i*150;
        div.style.top=(i*150) + "px";
        gameArea.appendChild(div);
    }
    let car=document.createElement("div");
    // car.innerText="Car";
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x=car.offsetLeft  ;
    player.y=car.offsetTop  ;

    for(let i=0;i<3;i++)
    {
        let enemy =document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y=((i+1)*-800)-1;
        enemy.innerHtml=(i+1);
        enemy.style.top= enemy.y + "px";
        enemy.style.backgroundColor = randomcolor();
        gameArea.appendChild(enemy);
    }
    
}

function randomcolor(){
    function c(){
        let hex= Math.floor(Math.random() *256).toString(16);
        return("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}