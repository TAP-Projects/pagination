function showPage(list, page) {
	hideAll(list);
	warnIfEmpty(list, header);
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
	header.append(search);
	search.addEventListener('keyup', (e) => showPage(searchStudents(e, students)));
	search.addEventListener('submit', (e) => showPage(searchStudents(e, students)));
}

function searchStudents(e, list) {
	e.preventDefault();
	const query = new RegExp(e.target.value.trim().toLowerCase());
	for (let i = 0; i < list.length; i++) {
		if (list[i].classList.contains('searchResult')) {
			list[i].classList.remove('searchResult');
		}
		const name = new RegExp(list[i].firstElementChild.children[1].textContent.trim().toLowerCase());
		if (query.test(name)) {
			let classes = `${list[i].classList}`;
			classes += ' searchResult'
			list[i].setAttribute('class', classes);
		}
	}
	return document.querySelectorAll('.searchResult');
}

const page = document.querySelector('.page');
const header = document.querySelector('.page-header');
const students = document.querySelectorAll('.student-item');
//const searchResults = document.getElementsByClassName('.searchResult');
const perPage = 10;

setUpSearchForm();

showPage(students, 1);
document.querySelector("a[data-page='1']").className = 'active';