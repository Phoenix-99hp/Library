let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return (title + ", " + author + ", " + pages + ", " + read + ".");
  }
}

// Sample book entries to appear in initial display.
let Eragon = new Book("Eragon", "Christopher Paolini", "509", "Yes")
let hPotter = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "309", "Partially")
myLibrary.push(Eragon, hPotter);

// A way to add new entries to the myLibrary array.
function addToLibrary() {
  let newEntry = new Book(title.value, author.value, pageCount.value, select.value);
  myLibrary.push(newEntry);
}

function addToLibraryEdit() {
  let newEntry = new Book(titleEdit.value, authorEdit.value, pageCountEdit.value, editSelectRead.value);
  myLibrary.push(newEntry);
}

function deleteFromLibrary(bookTitle) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == bookTitle) {
      myLibrary.splice(i, 1);
    }
  }
}

// function addToLibraryEdit() {
//   let newEntry = new Book(titleEdit.value, authorEdit.value, pageCountEdit.value, editSelectRead.value);
//   myLibrary.push(newEntry);
// }

// Credit to Olayinka Omole for the compare function code https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
// Used in this project to sort all entries in the myLibrary array by title. 
function compare(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
}
// End of Olayinka Omole's compare function code

let potter = document.getElementById("Potter");
let makeEntry = document.getElementById("makeEntry");
let submit = document.getElementById("submit");
let cancel = document.getElementById("cancel");
let title = document.getElementById("title");
let author = document.getElementById("author");
let pageCount = document.getElementById("pageCount");
let select = document.getElementById("select");
let table = document.getElementById("table");
let form = document.getElementById("formContainer");
let initialContainer = document.getElementById("initialContainer");

let titleEdit = document.getElementById("titleEdit");
let authorEdit = document.getElementById("authorEdit");
let pageCountEdit = document.getElementById("pageCountEdit");
let editEntry = document.getElementById("editEntry");
let editHeader = document.getElementById("editHeader");
let editSelect = document.getElementById("editSelect");
let editSelectRead = document.getElementById("editSelectRead");
let editSubmit = document.getElementById("editSubmit");
let editCancel = document.getElementById("editCancel");
let editContainer = document.getElementById("editContainer");
let editDelete = document.getElementById("editDelete");

// Credit to w3 schools for the sortTable() code https://www.w3schools.com/howto/howto_js_sort_table.asp
// Used in this project to sort table contents by title. 
function sortTable() {
  let switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    for (i = 1; i < (table.rows.length - 1); i++) {
      shouldSwitch = false;
      x = table.rows[i].getElementsByTagName("TD")[0];
      y = table.rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        // End of verbatim w3 schools code
        if (shouldSwitch) {
          table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i]);
          switching = true;
        }
        // End of modified w3 schools code
        if (table.rows[i] == table.rows.length - 1) {
          table.rows[i].classList.add("lastRow");
        }
        else if (table.rows[i] !== table.rows.length - 1) {
          table.rows[i].classList.remove("lastRow")
        }
      }
    }
  }
}

// Used for sorting the select menu options. Based on the w3 schools above. 
function sortSelectMenu() {
  let switching, i, x, y, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    for (i = 1; i < (editSelect.children.length - 1); i++) {
      shouldSwitch = false;
      x = editSelect.children[i];
      y = editSelect.children[i + 1];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        if (shouldSwitch) {
          editSelect.children[i].parentNode.insertBefore(editSelect.children[i + 1], editSelect.children[i]);
          switching = true;
        }
      }
    }
  }
}

// The workhorse...inserts a new row with cells for every new book entry and adds a new, corresponding, select menu option. Also sorts the myLibrary array. 
function render() {
  let newOption = document.createElement("option");
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  row.classList.add("lastRow");
  cell1.classList.add("column1");
  cell2.classList.add("column2");
  cell3.classList.add("column3");
  cell4.classList.add("column4");
  cell1.innerHTML = title.value;
  cell2.innerHTML = author.value;
  cell3.innerHTML = pageCount.value;
  cell4.innerHTML = select.value;
  if (cell4.innerHTML === "Yes") {
    cell4.classList.add("yes");
  }
  else if (cell4.innerHTML === "No") {
    cell4.classList.add("no");
  }
  else if (cell4.innerHTML === "Partially") {
    cell4.classList.add("partial");
  }
  sortTable();
  editSelect.add(newOption);
  newOption.innerHTML = cell1.innerHTML;
  myLibrary.sort(compare);
  sortSelectMenu();
}

function renderEdit() {
  for (i = 1; i < table.rows.length; i++) {
    if (table.rows[i].getElementsByTagName("TD")[0].innerHTML == editSelect.options[editSelect.selectedIndex].text) {
      table.deleteRow(i);
      editSelect.children[i].remove();
    }
  };
  // checkForLastRow();
  let newOption = document.createElement("option");
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  row.classList.add("lastRow");
  cell1.classList.add("column1");
  cell2.classList.add("column2");
  cell3.classList.add("column3");
  cell4.classList.add("column4");
  cell1.innerHTML = titleEdit.value;
  cell2.innerHTML = authorEdit.value;
  cell3.innerHTML = pageCountEdit.value;
  cell4.innerHTML = editSelectRead.value;
  if (cell4.innerHTML === "Yes") {
    cell4.classList.add("yes");
  }
  else if (cell4.innerHTML === "No") {
    cell4.classList.add("no");
  }
  else if (cell4.innerHTML === "Partially") {
    cell4.classList.add("partial");
  }
  sortTable();
  editSelect.add(newOption);
  newOption.innerHTML = cell1.innerHTML;
  myLibrary.sort(compare);
  sortSelectMenu();
}

// Removes previous text from form fields.
function resetFormFields() {
  select.selectedIndex = 0;
  title.value = "";
  author.value = "";
  pageCount.value = "";
  select.classList.remove("valid");
  title.classList.remove("valid");
  author.classList.remove("valid");
  pageCount.classList.remove("valid");
}

// Same as above but for the edit form. 
function resetFormFieldsEdit() {
  editSelect.selectedIndex = 0;
  titleEdit.value = "";
  authorEdit.value = "";
  pageCountEdit.value = "";
  editSelectRead.selectedIndex = 0;
  editSelect.classList.remove("valid");
  titleEdit.classList.remove("valid");
  authorEdit.classList.remove("valid");
  pageCountEdit.classList.remove("valid");
  editSelectRead.classList.remove("valid");
}

// Removes the bottom border from the last entry in the table for cosmetic appeal.  
function checkForLastRow() {
  for (let i = 0; i < table.rows.length; i++) {
    if (table.rows[i] == table.rows[table.rows.length - 1]) {
      table.rows[i].classList.add("lastRow");
      break;
    }
  }
}

makeEntry.addEventListener("click", function (e) {
  form.classList.toggle("inactive");
  initialContainer.classList.toggle("blur");
  makeEntry.disabled = true;
  editEntry.disabled = true;
})

cancel.addEventListener("click", function (e) {
  form.classList.toggle("inactive");
  initialContainer.classList.toggle("blur");
  editEntry.disabled = false;
  makeEntry.disabled = false;
  resetFormFields();
})

editEntry.addEventListener("click", function (e) {
  editContainer.classList.toggle("inactive")
  initialContainer.classList.toggle("blur");
  makeEntry.disabled = true;
  editEntry.disabled = true;
});

editCancel.addEventListener("click", function (e) {
  editContainer.classList.toggle("inactive");
  initialContainer.classList.toggle("blur");
  editEntry.disabled = false;
  makeEntry.disabled = false;
  resetFormFieldsEdit();
})

editDelete.addEventListener("click", function (e) {
  for (i = 1; i < table.rows.length; i++) {
    if (table.rows[i].getElementsByTagName("TD")[0].innerHTML == editSelect.options[editSelect.selectedIndex].text) {
      deleteFromLibrary(titleEdit.value);
      table.deleteRow(i);
      editSelect.children[i].remove();
      checkForLastRow();
      editContainer.classList.toggle("inactive");
      initialContainer.classList.toggle("blur");
      editEntry.disabled = false;
      makeEntry.disabled = false;
      resetFormFieldsEdit();
      console.log(myLibrary);
      break;
    }
  }
})

// Regular expressions used to monitor whether an input field is valid. 
// Inspired by the Net Ninja's Regular Expressions series on YouTube https://www.youtube.com/watch?v=r6I-Ahc0HB4
submit.addEventListener("click", function (e) {
  if ((/^.+$/gi.test(title.value) == true) && (/^[a-z\.-\s]+$/gi.test(author.value) == true) &&
    (/^\d+$/gi.test(pageCount.value) == true) && (/^[a-z]+$/gi.test(select.value) == true)) {
    addToLibrary();
    render();
    form.classList.toggle("inactive");
    initialContainer.classList.toggle("blur");
    editEntry.disabled = false;
    makeEntry.disabled = false;
    resetFormFields();
    console.log(myLibrary);
  }
  else {
    alert("One or more field entries is not valid.");
  }
})

editSubmit.addEventListener("click", function (e) {
  if ((/^.+$/gi.test(editSelect.value) == true) && (/^.+$/gi.test(titleEdit.value) == true) && (/^[a-z\.-\s]+$/gi.test(authorEdit.value) == true) &&
    (/^\d+$/gi.test(pageCountEdit.value) == true) && (/^[a-z]+$/gi.test(editSelectRead.value) == true)) {
    deleteFromLibrary(titleEdit.value);
    addToLibraryEdit();
    renderEdit();
    editContainer.classList.toggle("inactive");
    initialContainer.classList.toggle("blur");
    editEntry.disabled = false;
    makeEntry.disabled = false;
    resetFormFieldsEdit();
    console.log(myLibrary);
  }
  else {
    alert("One or more field entries is not valid.");
  }
})

title.addEventListener("keyup", function (e) {
  let x = title.value;
  if (/^.+$/gi.test(x) == true) {
    title.classList.remove("invalid");
    title.classList.add("valid");
  }
  else if (/^.+$/gi.test(x) == false) {
    title.classList.remove("valid");
    title.classList.add("invalid");
  }
})

titleEdit.addEventListener("keyup", function (e) {
  let x = titleEdit.value;
  if (/^.+$/gi.test(x) == true) {
    titleEdit.classList.remove("invalid");
    titleEdit.classList.add("valid");
  }
  else if (/^.+$/gi.test(x) == false) {
    titleEdit.classList.remove("valid");
    titleEdit.classList.add("invalid");
  }
})

author.addEventListener("keyup", function (e) {
  let x = author.value;
  if (/^[a-z\.-\s]+$/gi.test(x) == true) {
    author.classList.remove("invalid");
    author.classList.add("valid");
  }
  else if (/^[a-z\.-\s]+$/gi.test(x) == false) {
    author.classList.remove("valid");
    author.classList.add("invalid");
  }
})

authorEdit.addEventListener("keyup", function (e) {
  let x = authorEdit.value;
  if (/^[a-z\.-\s]+$/gi.test(x) == true) {
    authorEdit.classList.remove("invalid");
    authorEdit.classList.add("valid");
  }
  else if (/^[a-z\.-\s]+$/gi.test(x) == false) {
    authorEdit.classList.remove("valid");
    authorEdit.classList.add("invalid");
  }
})

pageCount.addEventListener("keyup", function (e) {
  let x = pageCount.value;
  if (/^\d+$/gi.test(x) == true) {
    pageCount.classList.remove("invalid");
    pageCount.classList.add("valid");
  }
  else if (/^\d+$/gi.test(x) == false) {
    pageCount.classList.remove("valid");
    pageCount.classList.add("invalid");
  }
})

pageCountEdit.addEventListener("keyup", function (e) {
  let x = pageCountEdit.value;
  if (/^\d+$/gi.test(x) == true) {
    pageCountEdit.classList.remove("invalid");
    pageCountEdit.classList.add("valid");
  }
  else if (/^\d+$/gi.test(x) == false) {
    pageCountEdit.classList.remove("valid");
    pageCountEdit.classList.add("invalid");
  }
})

select.addEventListener("change", function (e) {
  let x = select.value;
  if (/^[a-z]+$/gi.test(x) == true) {
    select.classList.remove("invalid");
    select.classList.add("valid");
  }
  else if (/^[a-z]+$/gi.test(x) == false) {
    select.classList.remove("valid");
    select.classList.add("invalid");
  }
})

editSelect.addEventListener("change", function (e) {
  let x = editSelect.value;
  if (/^.+$/gi.test(x) == true) {
    editSelect.classList.remove("invalid");
    editSelect.classList.add("valid");
  }
  else if (/^.+$/gi.test(x) == false) {
    editSelect.classList.remove("valid");
    editSelect.classList.add("invalid");
  }
})

editSelectRead.addEventListener("change", function (e) {
  let x = editSelectRead.value;
  if (/^[a-z]+$/gi.test(x) == true) {
    editSelectRead.classList.remove("invalid");
    editSelectRead.classList.add("valid");
  }
  else if (/^[a-z]+$/gi.test(x) == false) {
    editSelectRead.classList.remove("valid");
    editSelectRead.classList.add("invalid");
  }
})

// Used to automatically fill out the remaining form fields when an entered title is selected from the select menu. 
editSelect.addEventListener("change", function (e) {
  let val;
  const options = editSelectRead.children;
  for (i = 1; i < (editSelect.children.length); i++) {
    if (table.rows[i].getElementsByTagName("TD")[0].innerHTML == editSelect.options[editSelect.selectedIndex].text) {
      titleEdit.value = table.rows[i].getElementsByTagName("TD")[0].innerHTML;
      authorEdit.value = table.rows[i].getElementsByTagName("TD")[1].innerHTML;
      pageCountEdit.value = table.rows[i].getElementsByTagName("TD")[2].innerHTML;
      val = table.rows[i].getElementsByTagName("TD")[3].innerHTML;
    }
  }
  for (let j = 1; j < options.length; j++) {
    if (options[j].value.trim() == val.trim()) {
      editSelectRead.selectedIndex = j;
      break;
    }
  };
  titleEdit.classList.add("valid");
  authorEdit.classList.add("valid");
  pageCountEdit.classList.add("valid");
  editSelectRead.classList.add("valid");
})