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
	
	[...list].forEach( item => {
		let classes = item.className;
		if(classes.includes('searchResult')) {
			classes.replace(/searchResult/, '');
		}
		if(!classes.includes('hide')) {
				classes += ' hide';
		}
		item.className = classes;
	});

	const query = new RegExp(e.target.value.trim().toLowerCase());
	const searchResults = [...list].filter( item => {
		const name = new RegExp(item.firstElementChild.children[1].textContent.trim().toLowerCase());
		if (query.test(name)) {
			let classes = item.className;
			classes += ' searchResult'
			item.className = classes;
			return item
		}
	}); 
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