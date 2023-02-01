const loginFormHandler = async (event) => {
    event.preventDefault();
  
    
    const user_name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  console.log(user_name,password,"user and pass");
    if (user_name && password) {
      
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document.getElementById('loginbtn').addEventListener('click', loginFormHandler);