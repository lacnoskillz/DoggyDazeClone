const editReviewHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#description').value.trim();
    const rating = document.getElementById('rating').value;
    const itemForm = document.getElementById('item-form');
    const checkboxes = itemForm.querySelectorAll('input[type="checkbox"]');
    let amenities = [];
    checkboxes.forEach(item => {
      let data = {
        item: item.value,
        selected: item.checked
      };
      amenities.push(data);
    });
  
    console.log('PUT Data:', { description, rating, amenities });
  
    try {
      const reviewId = document.URL.split('/').pop();
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({ rating, description, amenities }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert("review edited")
        document.location.replace('/profile')
      } else if (response.status === 409) {
        const errorData = await response.json();
        alert(errorData.message);
      } else {
        console.log('Error in editReviewHandler');
      }
    } catch (err) {
      console.error('Error in fetch request:', err);
    }
  };
  
  if (document.querySelector('.edit-review-form')) {
    document
      .querySelector('.edit-review-form')
      .addEventListener('submit', editReviewHandler);
  }
  
  