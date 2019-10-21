


// DOM references ===============================================================

// page is the outermost container div in the body
const page = document.querySelector('.page');
// header div is the first child of the page div
const header = document.querySelector('.page-header');
// students is the live collection of student list items
const students = document.querySelectorAll('.student-item');
// search results is the live collection of student list items flagged as search results
const searchResults = document.getElementsByClassName('.searchResult');

// Constants ====================================================================
const perPage = 10;

// FUNCTION showPage ============================================================
// Takes a list of students and a page number and shows a list of no more than 10 
// students on a given page
function showPage(list, page) {

	// Hide all the students
	hideAll(list);
	
	//!FIXME: what if the search returns one item? Then the line below will throw an error
	//!FIXME: The error warning does not display (and when it was, it was displaying incorrectly)
	// Show a warning if the list of students is empty and exit showPage
	warnIfEmpty(list, header);

	// Remove the pagination and re-insert it later (normal page results and search results require different pagination)
	removePagination();
	
	if(searchResults.length > 0) {
		// Display the search results with pagination, showing the first page by default
		displayItemsPaginated(searchResults, page, perPage)
		// Add pagination links
		appendPageLinks(searchResults);
	} else {
		// Display the search results with pagination, showing the first page by default
		displayItemsPaginated(students, page, perPage)
		// Add (or re-add) the new pagination links
		appendPageLinks(students);
	}
}

// appendPageLinks generates, appends, and adds functionality to the pagination buttons.
function appendPageLinks(list) {
	// If there are no students in the collection, then return
	if(!list.length) return;

	// Get the needed number of page links
	const numPage = Math.ceil(list.length / perPage);
	
	// Create pagination list item html
	function createPageLink(index){
		return `
			<li>
				<a href="#" data-page=${index}>${index}</a>
			</li>
		`;
	}
	
	// Create list string
	let pageLinks = '';

	// Create a string containing the needed number of page links
	for(let i=1; i<=numPage; i++){
		pageLinks += createPageLink(i);
	}

	// Create the pagination html
	const paginationHTML = `
		<div class="pagination">
			<ul>
				${pageLinks}
			</ul>
		</div>	
	`;

	// The only place I touch the DOM
	page.insertAdjacentHTML('beforeend', paginationHTML);

	// Need a new reference to .pagination here
	const pagination = document.querySelector('.pagination');
	pagination.addEventListener('click', (e) => {
		// Remove 'active' from the previously active page link
		pagination.querySelectorAll('a').forEach( link => link.className = '');
		// Make the event target the active page link
		e.target.classList.add = 'active';
		// Call showPage with the correct page number
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
	header.appendChild(search);

	// searchStudents searches through the list of students and returns an array of matches
	function searchStudents(e){
		// prevent page reload on submit
		e.preventDefault();
		// Store the query string as a regexp
		const query = new RegExp(e.target.value.trim().toLowerCase());
		// Loop through the student collection and store the students who pass the test
		for(let i = 0; i < students.length; i++){
			// Remove any searchResults left by previous searches
			if(students[i].classList.contains('searchResult')) {
				students[i].classList.remove('searchResult');
			}
			// Store the student name as a regexp
			const name = new RegExp(students[i].firstElementChild.children[1].textContent.trim().toLowerCase());
			// Test the query against the name, return true if it's found
			if(query.test(name)){	
				//NOTE: Let's try using querySelectorAll with students up above
				console.log("The query and name are: ", query, name)
				console.log("And students[i] is: ", students[i])
				console.log("And students[i].classList is: ", students[i].classList)
				if(students[i]){
					// Add a searchResult class
					students[i].classList.add('searchResult');
				}
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
