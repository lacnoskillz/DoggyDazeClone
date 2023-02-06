const prenewReviewHandler = async(event) => {
    event.preventDefault();
    const restaurant_id = document.URL.split('/').at(-1);
    
        const response2 = await fetch('/api/reviewcheck', {
            method: 'POST',
            body: JSON.stringify({ restaurant_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        }); if (response2.ok) {
             console.log(response2,"2")
            newReviewHandler();
         } else {
             alert('not good');
         }
    }








const newReviewHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#review').value.trim();
    const rating = document.querySelector('#myRange').value

    if (description && rating) {
        const restaurant_id = document.URL.split('/').at(-1);
        console.log(description)
        const rating = document.getElementById('myRange').value.trim();
        //send a POST request to the API endpoint
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ rating, description, restaurant_id }),
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
        .addEventListener('submit', prenewReviewHandler)
};



