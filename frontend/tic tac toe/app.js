const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS=[
    [0,1,2],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
]
const cells = document.querySelectorAll('[data-cell');
let circleTurn
const board = document.getElementById('board');
const winningMessage= document.querySelector('[data-winning-message-text]');
const winning = document.querySelector(".winning-message");
const restartbutton = document.getElementById("restartButton");


startGame();


function startGame()
{

    circleTurn=false;
    cells.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick , {once:true})
    })
    setboardHover();
    winning.classList.remove('show');
}

restartbutton.addEventListener('click',startGame)


function handleClick(e)
{
    e.preventDefault();
    const cell = e.target
    const currentCLass = circleTurn ? CIRCLE_CLASS: X_CLASS;
    placeMark(cell, currentCLass);
    if(checkWins(currentCLass))
    {
        console.log('wins');
        endGame(false);
    }
    else if(isDraw())
    {
        endGame(true);
    }
    else
    {

        swapTurns();
        setboardHover();
    }

    

}

function isDraw()
{
    return [...cells].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw)
{
    if(draw)
    {
        winningMessage.innerHTML="Draw!!";
    }
    else{
        winningMessage.innerHTML= `${circleTurn ? 'o' : 'x' } "wins!" `;
    }
    winning.classList.add('show');

}

function placeMark(cell, current)
{
    cell.classList.add(current);
}

function swapTurns()
{
    circleTurn = !circleTurn;
}

function setboardHover()
{
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);

    if(circleTurn)
    {
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }

}

function checkWins(currentCLass)
{
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every( index=> {
            return cells[index].classList.contains(currentCLass)
        })
    })
}