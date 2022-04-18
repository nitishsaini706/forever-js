const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');

const grocery = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = "";

//submit form
form.addEventListener('submit', addItem);

//clear items
clearBtn.addEventListener('click', clearItem);


function addItem(e) {
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
    if (value && !editFlag) {
        const art = document.createElement('article');
        art.classList.add('grocery-item');

        const ele = document.createAttribute("data-id");
        ele.value = id;
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

        const deleteBtn = art.querySelector('.delete-btn');
        const editBtn = art.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        list.appendChild(art);

        //dispally alery

        displayAlert('item added to the list', 'success');

        //show container 

        container.classList.add('show-container');

        // add to local storage 
        addToLocalStorage(id, value);

        //set back to default

        setBackToDefault();
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value edited', 'success');
        editLocalStorage(editId, value);
        setBackToDefault();
    }
    else {
        displayAlert('please enter value', 'danger');
    }
}


// display alert 

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert 
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

function clearItem() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        })

    }
    container.classList.remove("show-container");
    displayAlert('empty list', 'success');
    localStorage.removeItem('list');
    setBackToDefault();
}


//delete item 

function deleteItem(e) {
    const elemet = e.currentTarget.parentElement.parentElement;
    const id = elemet.dataset.id;
    list.removeChild(elemet);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    //remove from local 
    removeFromLocalStorage(id);

}

//edit item 

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';
}

// set back to default 
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editId = '';
    submitBtn.textContent = "submit";
}

// local storage , save items as strings

function addToLocalStorage(id, value) {
    const grocery = { id, value }; //es6 shorthand id:id ,value:value as same name es6 shorthand 
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    })

    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(editId, value) {
    let items = getLocalStorage();
    items = item.map(function(item){
        if(item.id === editId)
        {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));

}

function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}