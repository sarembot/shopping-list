const list = document.getElementById('item-list');
const clearButton = document.querySelector('.btn-clear');
const itemInput = document.getElementById('item-input');
const liButton = document.createElement('button');
const filterInput = document.getElementById('filter');
const item = document.querySelectorAll('li');
const formBtn = document.getElementById('add-btn');
const editBtn = document.querySelector('.edit-btn');
let isEditMode = false;

function createButton() {
  const button = document.createElement('button');
  button.classList.add('remove-item', 'btn-link', 'text-red');

  const logo = document.createElement('i');
  logo.classList.add('fa-solid', 'fa-xmark');

  button.appendChild(logo);

  return button;
}

// STEP 1 : ADD ITEMS TO LIST
function createNewItem(text) {
  const newListItem = document.createElement('li');

  newListItem.appendChild(document.createTextNode(text));

  list.appendChild(newListItem);
  newListItem.appendChild(createButton());
}

function addNewItem(e) {
  if (itemInput.value === '') {
    alert('Please add an item.');
    return;
  }

  if (isEditMode) {
    editItem(itemInput.value);
    e.preventDefault();
    return;
  }

  storeLocally(itemInput.value);

  createNewItem(itemInput.value);
  toggleUi();

  itemInput.value = '';

  e.preventDefault();
}

// STEP 2 : REMOVE ITEMS FROM LIST WITH X BUTTON
function onClickItem(e) {
  const itemToRemove = e.target.closest('li');

  if (e.target.parentElement.classList.contains('remove-item')) {
    itemToRemove.remove();
    removeFromStorage(itemToRemove.textContent);
  } else {
    setEditMode(e.target.closest('li'));
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
  localStorage.clear();
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
let storageItems;

function storeLocally(item) {
  if (localStorage.getItem('items') === null) {
    storageItems = [];
  } else {
    storageItems = JSON.parse(localStorage.getItem('items'));
  }

  storageItems.push(item);
  localStorage.setItem('items', JSON.stringify(storageItems));
}

function removeFromStorage(itemToRemove) {
  storageItems = JSON.parse(localStorage.getItem('items'));
  console.log(storageItems);
  storageItems = storageItems.filter((item) => item != itemToRemove);

  localStorage.removeItem('items');
  localStorage.setItem('items', JSON.stringify(storageItems));
}

function loadStoredItems() {
  storageItems = JSON.parse(localStorage.getItem('items'));

  storageItems.forEach((item) => {
    createNewItem(item);
    toggleUi();
  });
}

// STEP 6 : CLICK ON AN ITEM TO EDIT IT

function setEditMode(item) {
  isEditMode = !isEditMode;

  if (isEditMode) {
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Change Item';
    formBtn.classList.add('edit-btn');
    itemInput.value = item.textContent;
  } else if (!isEditMode) {
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.classList.remove('edit-btn');
  }

  item.classList.toggle('edit-mode');
}

// STEP 7 : UPDATE ITEM
function editItem() {
  const item = document.querySelector('.edit-mode');

  item.textContent = itemInput.value;
  item.appendChild(createButton());
  setEditMode(item);
}
// STEP 8 : DEPLOY TO NETLIFY

//EVENT LISTENERS
document.getElementById('add-btn').addEventListener('click', addNewItem);
list.addEventListener('click', onClickItem);
clearButton.addEventListener('click', removeAll);
filterInput.addEventListener('input', filterItems);
window.addEventListener('load', loadStoredItems);
