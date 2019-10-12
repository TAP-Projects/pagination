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
	if(list.length <= 0){
		const oops = document.createElement('p');
		oops.textContent = "No results found.";
		thePage.appendChild(oops);
		return;
	}

	// Hide all the students except for the ten you want displayed on a given page
	list.forEach(item => item.style.display = 'none');
	
	// The start and end index of the list items to be shown on a given page
	// On page 1, the startIndex will be 0, on page 2, 10, etc.
	const startIndex = (page * studentsPerPage) - studentsPerPage;
	// On page 1, the endIndex will be 10, on page 2, 20, etc.
	const endIndex = (page * studentsPerPage);

	// Display any list item with an index that is greater than or equal to the start index and less than the end index
	for (let i = startIndex; i < endIndex; i++) {
		// Don't attempt to set the style of items that don't exist!
		if (list[i]) {
			list[i].style.display = 'block';
		}
	}
}

// appendPageLinks generates, appends, and adds functionality to the pagination buttons.
function appendPageLinks(list) {
	// If there are no students, then return
	if(list.length <= 0) return;

	const fragment = new DocumentFragment();

	// Create the needed number of page links and append them to a fragment
	const numPage = Math.ceil(list.length / studentsPerPage)
	for(let i=0; i<numPage; i++){
		item = document.createElement('li');
		link = document.createElement('a');
		link.setAttribute('href', '#');
		link.dataset.page = i + 1;
		link.textContent = i + 1;
		item.appendChild(link);
		fragment.appendChild(item);
	}
	
	// Create the pagination div and set it's class to pagination
	const pagination = document.createElement('div');
	pagination.setAttribute('class', 'pagination');
	// Create the list
	list = document.createElement('ul');
	// Append the list to the div
	pagination.appendChild(list);
	// Append the fragment to the list
	list.appendChild(fragment);

	// The only place I touch the DOM
	thePage.appendChild(pagination);

	pagination.addEventListener('click', (e) => {
		pagination.querySelectorAll('a').forEach( link => link.className = '');
		e.target.className = 'active';
		showPage(students, parseInt(e.target.textContent))
		
	});
	
}

function appendSearch(){
	const search = document.createElement('form');
	search.setAttribute('class', 'student-search');
	const input = document.createElement('input');
	input.placeholder = 'Search for students';
	const button = document.createElement('button');
	button.textContent = 'Search';
	search.appendChild(input);
	search.appendChild(button);
	
	theHeader.appendChild(search);

	function searchStudents(e){
		e.preventDefault();
		console.log(input.value);
	}

	search.addEventListener('keyup', searchStudents);
	search.addEventListener('submit', searchStudents);
}

// Append the page navigation
appendPageLinks(students);

// Append search
appendSearch();

// Show the first page of students
showPage(students, 1);
document.querySelector("a[data-page='1']").className = 'active';
