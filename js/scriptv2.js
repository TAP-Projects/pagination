const page = document.querySelector('.page');
const header = document.querySelector('.page-header');
//const students = document.querySelectorAll('.student-item');
const searchResults = document.getElementsByClassName('.searchResult');
const perPage = 10;

function showPage(list, page) {
	hideAll(list);
	warnIfEmpty(list, header);
	removePagination();
	if (searchResults.length > 0) {
		displayItemsPaginated(searchResults, page, perPage)
		appendPageLinks(searchResults);
	} else {
		displayItemsPaginated(students, page, perPage)
		appendPageLinks(students);
	}
}

function appendPageLinks(list) {
	if (!list.length) return;
	const numPage = Math.ceil(list.length / perPage);
	function createPageLink(index) {
		return `
			<li>
				<a href="#" data-page=${index}>${index}</a>
			</li>
		`;
	}
	let pageLinks = '';
	for (let i = 1; i <= numPage; i++) {
		pageLinks += createPageLink(i);
	}
	const paginationHTML = `
		<div class="pagination">
			<ul>
				${pageLinks}
			</ul>
		</div>	
	`;
	page.insertAdjacentHTML('beforeend', paginationHTML);
	const pagination = document.querySelector('.pagination');
	pagination.addEventListener('click', (e) => {
		pagination.querySelectorAll('a').forEach(link => link.className = '');
		e.target.classList.add = 'active';
		showPage(students, parseInt(e.target.textContent))

	});

}

function searchStudents(e,students) {
	e.preventDefault();
	const students2 = [...e.target.parentNode.parentNode.nextElementSibling.children];
	const query = new RegExp(e.target.value.trim().toLowerCase());
	for (let i = 0; i < students2.length; i++) {
		if (students2[i].classList.contains('searchResult')) {
			students2[i].classList.remove('searchResult');
		}
		const name = new RegExp(students2[i].firstElementChild.children[1].textContent.trim().toLowerCase());
		if (query.test(name)) {
			console.log("The query and name are: ", query, name)
			console.log("And students[i] is: ", students2[i])
			console.log("And students[i].classList is: ", students2[i].classList)

			// Add a searchResult class
			students2[i].classList.add('searchResult');
		}
	}
	showPage(students2, 1);
}

const search = createSearchForm();
header.appendChild(search);
showPage(students, 1);
document.querySelector("a[data-page='1']").className = 'active';
search.addEventListener('keyup', (e) => showPage(searchStudents(e), 1));
search.addEventListener('submit', searchStudents);