// const url = `https://api.tvmaze.com/search/shows?q=`;
const btn = document.querySelector('.search-btn');
const text = document.querySelector('.text');


const axios = require('axios').default;

btn.addEventListener('click',function()
{
    axios.get(`https://api.tvmaze.com/search/shows?q=${text}`)
    .then (function(res)
    {
        console.log(res);
    })

})
