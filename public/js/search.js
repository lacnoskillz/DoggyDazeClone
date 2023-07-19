const result = document.getElementById("result");
let map;

const searchHandler = async (event) => {
  event.preventDefault();
  const search = document.querySelector('#search').value.trim();

  if (search) {
    const placesService = new google.maps.places.PlacesService(map);

    const request = {
      query: `${search} Restaurant, San Antonio, TX`,
      fields: ["name", "formatted_address", "geometry"],
    };

    placesService.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const restaurantName = results[0].name;
        const restaurantAddress = results[0].formatted_address;

        result.textContent = `${restaurantName} - ${restaurantAddress}`;

        // Update the map's center to the selected restaurant location
        const restaurantLocation = results[0].geometry.location;
        map.setCenter(restaurantLocation);
        map.fitBounds(results[0].geometry.viewport); // Adjust zoom based on viewport

        // Optionally, you can set a maximum zoom level
        // const maxZoomLevel = 16;
        // map.setZoom(Math.min(maxZoomLevel, map.getZoom()));
      } else {
        result.textContent = "No restaurant found.";
      }
    });
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

// Initialize the map with San Antonio's coordinates
map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 29.4241, lng: -98.4936 }, // Coordinates for San Antonio
  zoom: 12,
});

document
  .querySelector('.search-form')
  .addEventListener('submit', searchHandler);

document
  .querySelector('.confirm')
  .addEventListener('submit', addRestaurantHandler);

