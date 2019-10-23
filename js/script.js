// FUNCTION showPage  ================================================
// Takes a list of nodes and a page number and displays nodes with pagination
function showPage(list, page) {
	warnIfListEmpty(list, header);
	hideAll(list);
	removePagination();
	displayItemsPaginated(list, page, perPage)
	setUpPagination(list, page);
}

// FUNCTION searchStudents ================================================
// Takes a list of nodes and searches for a query within those nodes, returning matching nodes
function searchStudents(e, list) {
	e.preventDefault();
	let queryText;
	// Test for the event type to determine how to get the query text
	if(e.type === 'keyup'){
		queryText = e.target.value.trim().toLowerCase();
	} else if(e.type === 'submit'){
		queryText = e.target.firstElementChild.value.trim().toLowerCase();
	}
	const query = new RegExp(queryText);
	// Filter the list of nodes returning any where the query can be matched 
	const searchResults = [...list].filter( item => {
		const nameText = item.firstElementChild.children[1].textContent.trim().toLowerCase();
		const name = new RegExp(nameText);
		return query.test(name);
	}); 
	return searchResults;	
}

// FUNCTION setUpPagination ================================================
// Takes a list of nodes and a page number, creates the pagination HTML, attaches a listener and handlers, and adds pagination to the page
function setUpPagination(list, page) {
	warnIfListEmpty(list, header);
	const pagination = createPagination(list, page);
	pagination.addEventListener('click', (e) => {
		const pageLinks = e.target.parentNode.parentNode.children;
		[...pageLinks].forEach(link => link.className = '');
		showPage(list, parseInt(e.target.textContent))	
	});
	pageContainer.append(pagination);
}

// FUNCTION setUpSearchForm ================================================
// Creates a search form, attaches listeners and handlers, and adds the form to the page
function setUpSearchForm() {
	const search = createSearchForm();
	search.addEventListener('keyup', (e) => {
		hideAll(students);
		showPage(searchStudents(e, students),1);
	});
	search.addEventListener('submit', (e) => {
		hideAll(students);
		showPage(searchStudents(e, students),1)
	});
	header.append(search);
}

const pageContainer = document.querySelector('.page');
const header = document.querySelector('.page-header');
const students = document.querySelectorAll('.student-item');
let perPage = 10;

setUpSearchForm();
showPage(students, 1);
