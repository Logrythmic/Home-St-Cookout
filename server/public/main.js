const form = document.getElementById("createEventPage");

form.addEventListener('submit', function(e){
e.preventDefault();
const data = new FormData(e.target);
fetch("url", {
  method: 'POST',
  header: 
  body: JSON.stringify(data) 
})
});