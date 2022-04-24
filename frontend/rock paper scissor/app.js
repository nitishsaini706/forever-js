
const Userchoice = document.getElementById('user-choice')

const ComputerChoice = document.getElementById('computer-choice')

const result=document.getElementById('result')

const choices = document.querySelectorAll('button')

let user
let comp='';

// we are iterating through buttons using for each on choices 
// then we add event listner for click to get the user id of the button 
// then we add the button clicked to inner html to display

choices.forEach(choice => choice.addEventListener('click' , (e) => {
    user = e.target.id;
    Userchoice.innerHTML = user;
    computerfunc();
}));

function computerfunc()
{
    const randomChoice=Math.random() * choices.length;
    console.log(Math.round(randomChoice));
    if(Math.round(randomChoice) === 0)
    {
        comp='ROCK';
    }
    if(Math.round(randomChoice) === 1)
    {
        comp='Scissors';
    }

    if(Math.round(randomChoice) === 2)
    {
        comp='Paper';
    }

    ComputerChoice.innerHTML = comp;
}
    

