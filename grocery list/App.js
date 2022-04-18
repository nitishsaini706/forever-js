const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');

const grocery=document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn= document.querySelector('.clear-btn');

let editElement;
let editFlag=false;
let editId = "";

form.addEventListener('submit',addItem);

function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    // do this to get randomg id value , dont do this on serious projects 
    // we can do is set a id and increment it and keep track of it using some array of something 
    const id = new Date().getTime().toString();
    // if(value !== '' && editFlag === false)
    // {
    //     console.log('add item to list');
    // }

    // else if(value !== "" && editFlag === true)
    // {
    //     console.log(editing the value)
    // }
    // else {
    //     console.log('empty value')
    // }

    // !true == false 
    if(value && !editFlag)
    {
        const art = document.createElement('article');
        art.classList.add('grocery-item');

        const ele = document.createAttribute("data-id");
        ele.value=id;
        art.setAttributeNode(ele);
        art.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button class="edit-btn" type="button">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-btn" type="button">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

        list.appendChild(art);

        //dispally alery

        displayAlert('item added to the list' , 'success');

        //show container 

        container.classList.add('show-container');

        // add to local storage 
        addToLocalStorage(id,value);

        //set back to default

        setBackToDefault();
    }
    else if(value && editFlag)
    {

    }
    else{
           displayAlert('please enter value' , 'danger');
    }
}


// display alert 

function displayAlert(text,action)
{
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    // remove alert 
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    } , 2000);
}

// set back to default 
function setBackToDefault()
{

}

// local storage 

function addToLocalStorage(id,value)
{

}