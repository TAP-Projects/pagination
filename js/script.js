
// DOM references ===============================================================
// These are all live collections, as I'll be operating on HTMLCollections
// div.page is the outermost container element in the body
const divDotPage = document.getElementsByClassName('.page')[0];
// div.header is the first child of div.page
const divDotHeader = document.getElementsByClassName('.page-header')[0];
// querySelectorAll returns a dead NodeList (not a live HTMLCollection)
const students = document.getElementsByTagName('li');

// Constants ====================================================================
const perPage = 10;

// FUNCTION showPage ============================================================
// Takes a list of students and a page number and shows a list of no more than 10 
// students on a given page
function showPage(list, page) {

	// Hide all the students
	hideAll(list);
	
	//!FIXME: what if the search returns one item? Then the line below will throw an error
	//!FIXME: The error warning does not display (and when it was, it was displaying incorrecty)
	// Show a warning if the list of students is empty and exit showPage
	warnIfEmpty(list, divDotHeader);

	// Remove the pagination and re-insert it later (normal page results and search results require different pagination)
	removePagination()
	
	// Get any list items flagged as search results
	const searchResults = document.querySelectorAll('.searchResult');
	
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
	const numPage = Math.ceil(list.length / perPage)
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
	divDotPage.appendChild(pagination);

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
	divDotHeader.appendChild(search);

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
