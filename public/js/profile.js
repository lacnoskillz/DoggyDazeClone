const newFormHandler = async (event) => {
  event.preventDefault();
  console.log('-------------PROFILE-------')
  const name = document.querySelector('#review-name').value.trim();
  const description = document.querySelector('#review-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create review');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.classList.contains('delete')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete review');
    }
  }
};
// document
//   .querySelector('.new-review-form')
//   .addEventListener('submit', newFormHandler);


//wrap in an if so we dont get errors
//assign listener to ALL delete buttons
document.addEventListener('DOMContentLoaded', function() {
  const deleteButtons = document.querySelectorAll('.delete');
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener('click', delButtonHandler);
    });
  }
});

