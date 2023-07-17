// logic for search for restaurant button to redirect to page
const searchBtn = document.getElementById("new-restaurant")
function gotonewres(){
  window.location.href = "/new-restaurant";
}
//if statement to avoid null errors on other pages
if(searchBtn){
searchBtn.addEventListener('click', gotonewres)
}