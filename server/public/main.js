
const form = document.getElementById("createEvents");


form.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(e.target);

  const strdata = {};
  for (let key of data.keys()) {
    strdata[key] = data.get(key)
  }

  fetch("http://localhost:3030/events/create-event", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(strdata)
  })
});