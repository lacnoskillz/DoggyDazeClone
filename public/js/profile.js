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
  if (event.target.hasAttribute('data-id')) {
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
if (document.querySelector('.delete')) {
  document
    .querySelector('.delete')
    .addEventListener('click', delButtonHandler);
};

