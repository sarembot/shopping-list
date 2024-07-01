const list = document.getElementById('item-list');
const clearButton = document.querySelector('.btn-clear');
const itemInput = document.getElementById('item-input');
const liButton = document.createElement('button');
const filterInput = document.getElementById('filter');

function createButton() {
  const button = document.createElement('button');
  button.classList.add('remove-item', 'btn-link', 'text-red');

  const logo = document.createElement('i');
  logo.classList.add('fa-solid', 'fa-xmark');

  button.appendChild(logo);

  return button;
}

// STEP 1 : ADD ITEMS TO LIST
function createNewItem() {
  const newListItem = document.createElement('li');
  const newText = document.getElementById('item-input').value;

  newListItem.appendChild(document.createTextNode(newText));

  list.appendChild(newListItem);
  newListItem.appendChild(createButton());
}

function addNewItem(e) {
  if (itemInput.value === '') {
    alert('Please add an item.');
    return;
  }

  createNewItem();
  itemInput.value = '';
  toggleUi();

  e.preventDefault();
}

// STEP 2 : REMOVE ITEMS FROM LIST WITH X BUTTON
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.closest('li').remove();
  }

  toggleUi();
  e.preventDefault();
}
// STEP 3 : CLEAR ALL ITEMS WITH CLEAR BUTTON

function removeAll(e) {
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
  toggleUi();
  e.preventDefault();
}

// STEP 4 : FILTER ITEMS BY TYPING IN FILTIER FIELD

function filterItems(e) {
  const items = list.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  // console.log(items);
  // console.log(text);

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    console.log(itemName);
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// TOGGLE UI BASED ON IF LIST ITEMS EXIST
function toggleUi() {
  filterInput.style.display = 'none';
  clearButton.style.display = 'none';

  if (list.firstElementChild) {
    filterInput.style.display = 'block';
    clearButton.style.display = 'block';
  }
}

toggleUi();

// STEP 5 : ADD LOCAL STORAGE TO PERSIST ITEMS

// STEP 6 : CLICK ON AN ITEM TO EDIT IT

// STEP 7 : UPDATE ITEM

// STEP 8 : DEPLOY TO NETLIFY

//EVENT LISTENERS
document.getElementById('add-btn').addEventListener('click', addNewItem);
list.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAll);
filterInput.addEventListener('input', filterItems);
