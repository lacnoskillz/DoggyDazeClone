
//login logic/script is in login handlebars


const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Validate email format using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email format. Please enter a valid email address.');
    return;
  }

  // Validate password length
  if (password.length < 8) {
    alert('Password should be at least 8 characters long.');
    return;
  }

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const responseData = await response.json();
      if (responseData.error === 'Email already registered') {
        alert('Email is already registered. Please use a different email or log in.');
      } else {
        alert(responseData.error || 'Error during signup.');
      }
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);




document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
