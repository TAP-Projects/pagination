// Global variables
// DOM references
const students = document.querySelectorAll('.student-item');
const thePage = document.querySelector('.page');
const theHeader = document.querySelector('.page-header');
// Constants
const studentsPerPage = 10;

// showPage takes a list of students and a page number and shows a list of no more than 10 students on a given page
function showPage(list, page) {

	// Show a message if there are no students in the list
	if(list && list.length <= 0){
		const oops = document.createElement('p');
		oops.textContent = "No results found.";
		thePage.appendChild(oops);
		return;
	}

	//! what if the search returns one item? Then the line below will through an error

	// Hide all the students except for the ten you want displayed on a given page
	list.forEach(item => item.style.display = 'none');
	
	// The start and end index of the list items to be shown on a given page
	// On page 1, the startIndex will be 0, on page 2, 10, etc.
	const startIndex = (page * studentsPerPage) - studentsPerPage;
	// On page 1, the endIndex will be 10, on page 2, 20, etc.
	const endIndex = (page * studentsPerPage);

	// Remove possibly incorrect pagination links
	const paginationLinks = document.querySelector('.pagination');
	if(paginationLinks) {
		paginationLinks.remove();
	}
	
	// Get any list items flagged as search results
	const searchResults = document.querySelectorAll('.searchResult');
	
	if(searchResults.length > 0) {
		// Display any item with an index that is greater than or equal to the start index and less than the end index
		for(let i = startIndex; i < endIndex; i++){
			// Don't attempt to set the style of items that don't exist, e.g. item 55 in a list of 54!
			if(searchResults[i]){
				searchResults[i].style.display = 'block';
			}
		}
		// Add (or re-add) the new pagination links
		appendPageLinks(searchResults);
	} else {
		// Display any item with an index that is greater than or equal to the start index and less than the end index
		for (let i = startIndex; i < endIndex; i++) {
			// Don't attempt to set the style of items that don't exist, e.g. item 55 in a list of 54!
			if (list[i]) {
				list[i].style.display = 'block';
			}
		}
		// Add (or re-add) the new pagination links
		appendPageLinks(students);
	}
}

// appendPageLinks generates, appends, and adds functionality to the pagination buttons.
function appendPageLinks(list) {
	// If there are no students, then return
	if(list.length <= 0) return;

	// Create the pagination div and set it's class to pagination
	const pagination = document.createElement('div');
	pagination.setAttribute('class', 'pagination');
	// Create the list
	theList = document.createElement('ul');
	// Append the list to the div
	pagination.appendChild(theList);


	// Create the needed number of page links and append them to the list
	const numPage = Math.ceil(list.length / studentsPerPage)
	for(let i=0; i<numPage; i++){
		item = document.createElement('li');
		link = document.createElement('a');
		link.setAttribute('href', '#');
		// This will be used to mark the first page as 'active'
		link.dataset.page = i + 1;
		link.textContent = i + 1;
		item.appendChild(link);
		theList.appendChild(item);
	}

	// The only place I touch the DOM
	thePage.appendChild(pagination);

	pagination.addEventListener('click', (e) => {
		pagination.querySelectorAll('a').forEach( link => link.className = '');
		e.target.className = 'active';
		showPage(students, parseInt(e.target.textContent))
		
	});
	
}

function appendSearch(list){

	// Generate and append search form
	const search = document.createElement('form');
	search.setAttribute('class', 'student-search');
	const input = document.createElement('input');
	input.placeholder = 'Search for students';
	const button = document.createElement('button');
	button.textContent = 'Search';
	search.appendChild(input);
	search.appendChild(button);
	theHeader.appendChild(search);

	// searchStudents searches through the list of students and returns an array of matches
	function searchStudents(e){
		// prevent page reload on submit
		e.preventDefault();
		// Store the query string as a regexp
		const query = new RegExp(e.target.value.trim().toLowerCase());
		// Loop through the student collection and store the students who pass the test
		for(let i = 0; i < students.length; i++){
			// Remove any searchResults left by previous searches
			students[i].classList.remove('searchResult');
			// Store the student name as a regexp
			const name = new RegExp(students[i].firstElementChild.children[1].textContent.trim().toLowerCase());
			// Test the query against the name, return true if it's found
			if(query.test(name)){	
				// Add a searchResult class
				students[i].classList.add('searchResult');
			} 
		}
		showPage(students, 1);
		
	}

	// Add the event listeners
	search.addEventListener('keyup', (e) => showPage(searchStudents(e), 1));
	search.addEventListener('submit', searchStudents);
}

// Append search
appendSearch(students);

// Show the first page of students
showPage(students, 1);

// Mark the first page as the 'active' page
document.querySelector("a[data-page='1']").className = 'active';
