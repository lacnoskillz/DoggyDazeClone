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

    console.log('---------------------------------------------------')
    console.log(amenities)
    console.log('---------------------------------------------------')
    amenities = JSON.stringify(amenities)
    if (description && rating && amenities) {
        const restaurant_id = document.URL.split('/').at(-1);
        //console.log(description)
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
        } if(response.status === 409){
            const errorData = await response.json();
      alert(errorData.message);
        }
        else{
            console.log("else in newreviewhandler")
        }
    }
}

//wrap in an if so we dont get errors
if (document.querySelector('.new-review-form')) {
    document
        .querySelector('.new-review-form')
        .addEventListener('submit', prenewReviewHandler)
};


