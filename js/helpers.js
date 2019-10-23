// HELPER FUNCTIONS

// FUNCTION createElement ================================================
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

// FUNCTION warnIfEmpty ===================================================
// Takes a list of nodes and a node. If the list is empty, inserts a warning message after the node.
function warnIfListEmpty(collection, node) {
    //!Bug Remove the previous warning message, if any
    const warning = document.querySelector('.warning');
    if(warning){
        warning.remove()
    }
    // If the list is not present or is emtpy, add a warning to the page
    if (!collection || !collection.length) {
        node.after(createElement('p', 'No results found.', [{attribute: 'class', value: 'warning'}]));
        return;
    }
}

// FUNCTION hideAll =======================================================
// Takes a list of nodes and hides them
function hideAll(collection) {
    if (collection && collection.length) {
        for (let i = 0; i < collection.length; i++) {
            if (!collection[i].classList.contains('hide')) {
                let classes = `${collection[i].classList}`;
                classes += ' hide';
                collection[i].setAttribute('class', classes);
            }
        }
    }
}

// FUNCTION removePagination ==============================================
// Remove possibly incorrect pagination links before displaying items
function removePagination() {
    const pagination = document.querySelector('.pagination');
    //NOTE: I'm not sure this works. I might need to check for existence and length separately
    if (pagination) {
        pagination.remove();
    }
}

// FUNCTION displayItemsPaginated =========================================
// Display any item with an index that is greater than or equal to the start index and less than the end index
function displayItemsPaginated(list, page, perPage) {
    // The start and end index of the items to be shown on a given page
    // On page 1, the startIndex will be 0, on page 2, 10, etc.
    const startIndex = (page * perPage) - perPage;
    // On page 1, the endIndex will be 10, on page 2, 20, etc.
    const endIndex = (page * perPage);
    for (let i = startIndex; i < endIndex; i++) {
        // Show only the items on this page
        if (list[i]) {
            if (list[i].classList.contains('hide')) {
                list[i].classList.remove('hide');
            }
        }
    }
}

// FUNCTION createPagination ==============================================
// Creates the pagination html and returns it
function createPagination(list, page) {
    const ul = createElement('ul');
    const numPage = Math.ceil(list.length / perPage);
    for (let i = 1; i <= numPage; i++) {
        const li = createElement('li');
        const link = createElement('a', `${i}`, [
            { 
                attribute: 'class', 
                value: page == i ? 'active' : '' 
            },
            { 
                attribute: 'href', 
                value: '#' 
            }
        ]);
        li.append(link);
        ul.append(li);
    }
    const pagination = createElement('div', null, [{ attribute: 'class', value: 'pagination' }])
    pagination.append(ul);
    return pagination;
}

// FUNCTION createSearchForm ==============================================
// Creates the search form html and returns it
function createSearchForm() {
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