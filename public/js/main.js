// logic for search for restaurant button to redirect to page
const searchBtn = document.getElementById("new-restaurant")
function gotonewres(){
  window.location.href = "/new-restaurant";
}
//if statement to avoid null errors on other pages
if(searchBtn){
searchBtn.addEventListener('click', gotonewres)
}
document.addEventListener('DOMContentLoaded', function() {
  const viewresBtn = document.getElementsByClassName("singleresbtn");
  

  function viewres(event) {
    const clickedElement = event.target;
    
    // Check if the clicked element has the class "singleresbtn"
    if (clickedElement.classList.contains("singleresbtn")) {
      // Get the parent container with the class "Singlerestaurant"
      const parentContainer = clickedElement.closest(".Singlerestaurant");
      
      // Get the ID of the specific restaurant from the data attribute
      const restaurantId = parentContainer.getAttribute("data-restaurant-id");
      
      // Redirect to the appropriate restaurant page based on the restaurant's ID.
      window.location.href = `/restaurant/${restaurantId}`;
    }
  }
// add event listener to all btns
  if (viewresBtn) {
    for (const btn of viewresBtn) {
      btn.addEventListener('click', viewres);
    }
  }
});