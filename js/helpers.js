// HELPER FUNCTIONS

// FUNCTION hideAll =======================================================
// Takes a collection of element nodes and hides all of them using style.display
function hideAll(collection){
    if(collection && collection.length){
        for(let i = 0; i < collection.length; i++){
            collection[i].classList.remove('show');
        }
    }
}

// FUNCTION warnIfEmpty ===================================================
// Takes a collection and a node. If the collection is empty, inserts a warning message 'afterend' of node
function warnIfEmpty(collection, node){
    if(!collection){
        node.insertAdjacentHTML('afterend', `<p>No results found.</p>`);
        return;
    }
}

// FUNCTION removePagination ==============================================
// Remove possibly incorrect pagination links before displaying items
function removePagination(){
    const pagination = document.querySelector('.pagination');
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
		// Don't attempt to set the style of items that don't exist, e.g. item 55 in a list of 54
		if(collection[i]){
			collection[i].classList.add = 'show';
		}
    }
}