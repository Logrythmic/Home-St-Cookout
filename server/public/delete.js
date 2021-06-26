const button = document.getElementById('deleteBtn');

button.addEventListener('submit',function(e){
  e.preventDefault();
  alert("pressed");
  const data = new FormData(e.target);
  const strdata = {};
  for (let key of data.keys()) {
    strdata[key] = data.get(key)
  }
  console.log("*********")
  console.log(JSON.stringify(strdata));

  const url = strdata.deleted
  console.log(url);
  fetch(`http://localhost:3030${url}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
  })
  alert("your event has been deleted");
  location.reload();
})