const searchBtn = document.getElementById("new-restaurant")
function gotonewres(){
  window.location.href = "/new-restaurant";
}
if(searchBtn){
searchBtn.addEventListener('click', gotonewres)
}