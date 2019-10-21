// HELPER FUNCTIONS

// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
function createElement(element, text, attributes) {
	const theElem = document.createElement(element);
	if (text && typeof text === 'string' && text.length > 0) {
		theElem.textContent = text;
	}
	if (attributes && Array.isArray(attributes) && attributes.length > 0) {
		attributes.forEach((attr) => {
			theElem.setAttribute(attr.attribute, attr.value);
		});
	}
	return theElem;
}

// FUNCTION hideAll =======================================================
// Takes a collection of element nodes and hides all of them using style.display
function hideAll(collection){
    if(collection && collection.length){
        for(let i = 0; i < collection.length; i++){
            if(!collection[i].classList.contains('hide')){
                let classes = `${collection[i].classList}`;
                classes += ' hide';
                collection[i].setAttribute('class', classes);
            }
        }
    }
}

// FUNCTION warnIfEmpty ===================================================
// Takes a collection and a node. If the collection is empty, inserts a warning message 'afterend' of node
function warnIfEmpty(collection, node){
    //NOTE: I'm not sure this works. I might need to check for existence and length separately
    if(!collection){
        node.insertAdjacentHTML('afterend', `<p>No results found.</p>`);
        return;
    }
}

// FUNCTION removePagination ==============================================
// Remove possibly incorrect pagination links before displaying items
function removePagination(){
    const pagination = document.querySelector('.pagination');
    //NOTE: I'm not sure this works. I might need to check for existence and length separately
    if(pagination) {
        pagination.remove();
    }
}

// FUNCTION displayItemsPaginated ==================================================
// Display any item with an index that is greater than or equal to the start index and less than the end index
function displayItemsPaginated(collection, page, perPage){ 
    // The start and end index of the items to be shown on a given page
	// On page 1, the startIndex will be 0, on page 2, 10, etc.
	const startIndex = (page * perPage) - perPage;
	// On page 1, the endIndex will be 10, on page 2, 20, etc.
	const endIndex = (page * perPage);   
    for(let i = startIndex; i < endIndex; i++){
		// Show only the items on this page
		if(collection[i]){
            if(collection[i].classList.contains('hide')){
                collection[i].classList.remove('hide');
            }
		}
    }
}

function createPagination(list){
    const ul = createElement('ul');
	const numPage = Math.ceil(list.length / perPage);
	for (let i = 1; i <= numPage; i++) {
		const li = createElement('li');
		const link = createElement('a', `${i}`, [{attribute: 'href', value: '#'},{attribute: 'data-page', value: i}]);
		li.append(link);
		ul.append(li);
	}
	const pagination = createElement('div', null, [{attribute: 'class', value: 'pagination'}])
    pagination.append(ul);
    return pagination;
}

function createSearchForm(){
    const search = document.createElement('form');
	search.setAttribute('class', 'student-search');
	const input = document.createElement('input');
	input.placeholder = 'Search for students';
	const button = document.createElement('button');
	button.textContent = 'Search';
	search.appendChild(input);
    search.appendChild(button);
    return search;
}