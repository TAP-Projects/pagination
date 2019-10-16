// FUNCTION warnIfEmpty ===================================================
// Takes a collection of element nodes. If the collection is empty, inserts a warning message
function warnIfEmpty(collection, node){
    // Note: We test for existence in the case that our search returns no results
	if(collection && collection.length <= 0){
        // Insert a warning
        node.insertAdjacentHTML('beforeend', `<p>No results found.</p>`);
        //REVIEW: will this really exit the outer function?
        return 
    }
}

// FUNCTION hideAll =======================================================
// Takes a collection of element nodes and hides all of them using style.display
function hideAll(collection){
    if(collection && collection.length >= 0){
        collection.forEach(item => item.style.display = 'none');
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