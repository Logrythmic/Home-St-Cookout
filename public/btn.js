const button = document.getElementById('attendBtn');

button.addEventListener('submit',function(e){
  e.preventDefault();
  const data = new FormData(e.target);
  const strdata = {};
  for (let key of data.keys()) {
    strdata[key] = data.get(key)
  }
  
  const url = strdata.attendee

  fetch(`http://localhost:8080${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
  })
  alert("you are now attending this event!")
})