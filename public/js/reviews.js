const newReviewHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#review').value.trim();


    if (description) {
        const restaurant_id = document.URL.split('/').at(-1);
        //send a POST request to the API endpoint
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ description, restaurant_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace(document.URL);
        } else {
            alert('Failed to create review');
        }
    }
}
    
document
  .querySelector('.new-review-form')
  .addEventListener('submit', newReviewHandler);
