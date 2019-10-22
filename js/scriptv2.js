function showPage(list, page) {
	warnIfEmpty(list, header);
	hideAll(list);
	removePagination();
	displayItemsPaginated(list, page, perPage)
	setUpPagination(list);

}

function setUpPagination(list) {
	if (!list.length) {
		throw new Error("No list or list empty");
		return;
	}
	const pagination = createPagination(list);
	
	pagination.addEventListener('click', (e) => {
		[...e.target.parentNode.parentNode.children].forEach(link => link.className = '');
		e.target.className = 'active';
		showPage(list, parseInt(e.target.textContent))	
	});
	
	page.append(pagination);
}

function setUpSearchForm() {
	const search = createSearchForm();
	search.addEventListener('keyup', (e) => searchStudents(e, students));
	search.addEventListener('submit', (e) => searchStudents(e, students));
	header.append(search);
}

function searchStudents(e, list) {
	e.preventDefault();
	const query = new RegExp(e.target.value.trim().toLowerCase());
	const searchResults = [...list].filter( item => {
		const name = new RegExp(item.firstElementChild.children[1].textContent.trim().toLowerCase());
		return query.test(name);
	}); 
	// cleanUpPreviousSearch(list);
	// flagSearchResults(searchResults);
	showPage(searchResults, 1)
	return searchResults;	
}

const page = document.querySelector('.page');
const header = document.querySelector('.page-header');
const students = document.querySelectorAll('.student-item');
//const searchResults = document.getElementsByClassName('.searchResult');
const perPage = 10;

setUpSearchForm();

showPage(students, 1);
document.querySelector("a[data-page='1']").className = 'active';