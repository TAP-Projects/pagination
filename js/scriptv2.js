function showPage(list, page) {
	warnIfListEmpty(list, header);
	hideAll(list);
	removePagination();
	displayItemsPaginated(list, page, perPage)
	setUpPagination(list, page);

}

function searchStudents(e, list) {
	e.preventDefault();
	const queryText = e.target.value.trim().toLowerCase();
	const query = new RegExp(queryText);
	const searchResults = [...list].filter( item => {
		const nameText = item.firstElementChild.children[1].textContent.trim().toLowerCase();
		const name = new RegExp(nameText);
		return query.test(name);
	}); 
	return searchResults;	
}

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

function setUpSearchForm() {
	const search = createSearchForm();
	search.addEventListener('keyup', (e) => {
		hideAll(students);
		showPage(searchStudents(e, students),1);
	});
	search.addEventListener('submit', (e) => showPage(searchStudents(e, students),1));
	header.append(search);
}

const pageContainer = document.querySelector('.page');
const header = document.querySelector('.page-header');
const students = document.querySelectorAll('.student-item');
let perPage = 10;

setUpSearchForm();
showPage(students, 1);
