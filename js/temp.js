/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// GLOBAL VARS
// =======================================================================
let students = document.querySelectorAll(".cf");
const startPage = 1;

// =======================================================================
function colorCode() {
  // DEBUGGING ONLY

  for (let i = 1; i < students.length; i++) {
    if (i > 0 && i < 11) {
      students[i].style.backgroundColor = "darkred";
    } else if (i > 10 && i < 21) {
      students[i].style.backgroundColor = "darkblue";
    } else if (i > 20 && i < 31) {
      students[i].style.backgroundColor = "pink";
    } else if (i > 30 && i < 41) {
      students[i].style.backgroundColor = "orange";
    } else if (i > 40 && i < 51) {
      students[i].style.backgroundColor = "purple";
    } else if (i > 50 && i < 60) {
      students[i].style.backgroundColor = "darkgreen";
    }
  }
}

// =======================================================================
function createSearchButtons() {
  // gin up the markup
  let buttonMarkup = `
    <div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
    </div>
    `;

  // insert in DOM
  document.querySelector(".cf h2").insertAdjacentHTML("afterend", buttonMarkup);
}

// ========================================================================
function howManyPages(array) {
  // divide the number of students by 10 and return the result
  let buttons = Math.ceil(array.length / 10);
  return buttons;
}

// ========================================================================
function createPageButtons(buttons) {
  let liMarkup = "";

  // gin up the <li> items
  for (let i = 1; i <= buttons; i++) {
    let buildLiMarkup = `
      <li>
         <a href="#">${i}</a>
      </li>`;
    liMarkup += buildLiMarkup;
  }

  // drop the <li> items into the HTML
  let finalMarkup = `
  <div class="pagination">
    <ul>
      ${liMarkup}
    </ul>
  </div>`;

  // insert in the DOM and set the active button
  document
    .querySelector(".student-list")
    .insertAdjacentHTML("afterend", finalMarkup);

  document.querySelector(".pagination ul li a").classList.add("active");
}

// ========================================================================
function pageButtonListener() {
  // EVENT LISTENER for Page Buttons
  document.addEventListener("click", event => {
    if (event.target.tagName === "A") {
      // paginate!
      paginate(event.target.innerText, students);
      // remove all .active then add for clicked button
      a = document.querySelectorAll("a");
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove("active");
        event.target.classList.add("active");
      }
    }
  });
}

// ========================================================================
function paginate(pageToShow, nodelist) {
  // break node list into 10s and show the selected page
  let displayFirst = pageToShow * 10 - 10;
  let displayLast = displayFirst + 11;

  // loop over - show the desired 10, hide the rest
  for (let i = 1; i < nodelist.length; i++) {
    if (i > displayFirst && i < displayLast) {
      nodelist[i].style.display = "list-item";
    } else {
      nodelist[i].style.display = "none";
    }
  }
}

// ========================================================================
function searchButtonListener() {
  // EVENT LISTENER for Search Button
  let searchButton = document.getElementsByTagName("button");

  searchButton[0].addEventListener("click", event => {
    searchNames();
  });
}

// ========================================================================
function searchInputListener() {
  // EVENT LISTENER for Search Input
  // TODO: Live Search
  let searchInput = document.getElementsByTagName("input");

  searchInput[0].addEventListener("keypress", event => {
    if (event.keyCode === 13) {
      searchNames();
    }
  });
}

// ========================================================================
function searchNames() {
  // Compare names with search string
  // set visibility for matches
  // send to paginate

  let studentNames = [];
  let cleanStudentNames = [];
  let h3Names = document.querySelectorAll("h3");
  let searchString = document.querySelector("input").value;

  // the student names live in <h3> tags. Variable h3Names is a node list
  // variable studentNames extracts the actual names from the code
  // studentNames is an array
  for (i = 0; i < h3Names.length; i++) {
    // clear .visible class from any previous runs of this function
    let invisible = document.querySelectorAll(".visible");
    h3Names[i].classList.remove("visible");

    studentNames[i] = h3Names[i].innerText;

    // compare search text (extracted from input box) wuth the names extracted from <h3>
    let searchStringIsInStudentNames = studentNames[i].includes(searchString);

    // if the search string is in the text, set the <h3> to be seen
    // otherwise, hide it. Fix border. Add class for passing to paginate()
    if (searchStringIsInStudentNames) {
      h3Names[i].parentElement.parentElement.style.display = "block";
      h3Names[i].parentElement.parentElement.style.borderBottom =
        "1px solid #eaeaea;";
      // this makes a clean array with no null or undefined elements
      // which were causing errors in array.length
      cleanStudentNames.push(studentNames[i]);
      h3Names[i].classList.add("visible"); //+++++++
    } else {
      h3Names[i].parentElement.parentElement.style.display = "none";
      h3Names[i].parentElement.parentElement.style.borderBottom = "none";
    }
  }

  // clear off the old page buttons - make the new page buttons
  removePageButtons();
  let numberOfButtons = howManyPages(cleanStudentNames);
  createPageButtons(numberOfButtons);

  // create a nodelist to pass to paginate
  let visible = document.querySelectorAll(".visible");
  //   console.log(visible.length);

  // ****************************************************************
  // paginate() works on initial call... but not from here
  // h3 is hiding names <h3> of students 11 - end who should be visible
  // i.e., only showing names for studnets 1-11 on search.
  // This shows the bug is in paginate()
  paginate(startPage, visible);

  // ****************************************************************
}

// ========================================================================
function removePageButtons() {
  // destroy page buttons so they dont accumulate
  let removeButtons = document.querySelector(".pagination");
  removeButtons.parentNode.removeChild(removeButtons);
}

// ========================================================================
function main() {
  //  function calls are kept here because I dont like loose code
  // rolling around outside of boxes
  colorCode();
  createSearchButtons();
  let numberOfButtons = howManyPages(students);
  createPageButtons(numberOfButtons);
  pageButtonListener();
  paginate(startPage, students);
  searchButtonListener();
  searchInputListener();
}

// ========================================================================
main();