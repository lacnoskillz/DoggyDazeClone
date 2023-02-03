const result = document.getElementById("result");

const searchHandler = async (event) => {
    event.preventDefault();
    
    const search = document.querySelector('#search').value.trim();
    
  
    if (search) {
        let searchLink = `https://www.google.com/maps/embed/v1/place?key=AIzaSyC7zAtsP6T4gvbxxyZbASjxQjIKfdAlOcs&q=${search}+(Restaurant),San+Antonio+TX`
        document.querySelector('#map-frame').setAttribute("src", searchLink)
        //capitalSearch = search
        result.innerHTML = `${search}`
    }
  };

const addRestaurantHandler = async (event) => {
    
    event.preventDefault();
  
    const restaurant_name = result.innerHTML;
    
    if (restaurant_name) {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify({ restaurant_name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };


document
  .querySelector('.search-form')
  .addEventListener('submit', searchHandler);

document
  .querySelector('.confirm')
  .addEventListener('submit', addRestaurantHandler);