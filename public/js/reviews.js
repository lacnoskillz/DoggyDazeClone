const newReviewHandler = async (event) => {
    event.preventDefault();
    console.log("hello?");

    const description = document.querySelector('#review').value.trim();


    if (description) {
        const restaurant_id = document.URL.split('/').at(-1);
        console.log(description)
        let rating = 19;
        console.log(restaurant_id)
        //send a POST request to the API endpoint
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({rating, description, restaurant_id }),
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
    
document
  .querySelector('.new-review-form')
  .addEventListener('submit', newReviewHandler);
