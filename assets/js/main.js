const form = document.querySelector('form');
const input = document.getElementById('newPersonName');
const addButton = document.getElementById('addButton');
const listButton = document.getElementById('listButton');
const clearButton = document.getElementById('clearButton');
const ul = document.querySelector('ul');

// load array if localStorage not empty
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
// save itemsArray into localStorage
function saveItemsArray() {
    localStorage.setItem('items', JSON.stringify(itemsArray))
}
saveItemsArray();

// event listener for input form
form.addEventListener("submit", ev => {
    ev.preventDefault()
    // push input into array
    itemsArray.push(input.value)
    // localStorage.setItem('key', 'value')
    localStorage.setItem('items', JSON.stringify(itemsArray))
    // liMaker(input.value) // create list instantly
    input.value = ''
});

addButton.addEventListener("click", showAddMenuUI)
listButton.addEventListener("click", showListMenuUI);
clearButton.addEventListener("click", clearPersonsList);

// function for creating li element
const liMaker = text => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
}

function getPersons() {
    // clean the list before printing
    ul.innerText = ""
    // show localStorage items if not empty
    if (localStorage.items.length > 2) { // not empty is more than 2
        // localStorage.getItem('key');
        const data = JSON.parse(localStorage.getItem('items'));
        // create list of persons
        data.forEach(item => {
            liMaker(item)
        })
    } else {
        ul.innerText = "Guest List is empty"
    }
}

function clearPersonsList(e) {
    // remove list from localStorage
    localStorage.clear();
    // clear list of array
    itemsArray.length = 0;
    // override itemsArray list from localStorage
    saveItemsArray();
    // remove list from DOM
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
}

function showAddMenuUI(){
    document.getElementById("addMenu").style.display="block";
    document.getElementById("listMenu").style.display="none";
}

function showListMenuUI(){
    // call getPersons function to create list of guests
    getPersons();
    document.getElementById("addMenu").style.display="none";
    document.getElementById("listMenu").style.display="block";
}

// on first load show Guests List Menu
showListMenuUI();
