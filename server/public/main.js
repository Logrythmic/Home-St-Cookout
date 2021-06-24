//const { mapFinderOptions } = require("sequelize/types/lib/utils");

const form = document.getElementById("createEvents");

form.addEventListener('submit', function(e){
e.preventDefault();
console.log(e);
console.log("******************");
console.log(e.target);
// console.log("******************");
const data = new FormData(e.target);
// console.log(data);
// console.log("******************");
// console.log(JSON.stringify(data));
// console.log("******************");
 fetch("/events/create-event", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) 
  })
});