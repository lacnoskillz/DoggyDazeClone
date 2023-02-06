const newReviewHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#review').value.trim();
    const rating = document.querySelector('#myRange').value
    const itemForm = document.getElementById('item-form')
    const checkboxes = itemForm.querySelectorAll('input[type="checkbox"]');
    let amenities = [];
    checkboxes.forEach(item => { // loop all the checkbox item
        let data = {    // create an object
            item: item.value,
            selected: item.checked
        }
        amenities.push(data); //stored the objects to result array
    });

amenities = JSON.stringify(amenities)
console.log(amenities)
if (description && rating && amenities) {
    const restaurant_id = document.URL.split('/').at(-1);
    console.log(description)
    const rating = document.getElementById('myRange').value.trim();
    //send a POST request to the API endpoint
    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ rating, description, restaurant_id, amenities }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        // console.log(description)
        window.location.reload();
    } else {
        alert('Failed to create review');
    }
}
}

//wrap in an if so we dont get errors
if (document.querySelector('.new-review-form')) {
    document
        .querySelector('.new-review-form')
        .addEventListener('submit', newReviewHandler)
};


