window.onload = () => {
  let action = document.querySelector('.loginHandler');
  action.addEventListener('click', () => {
    let login = document.getElementById('login');
    let password = document.getElementById('password');
    
    fetch('./api/login.php', {
      method: 'POST',
      body: JSON.stringify({login: login.value, password: password.value})
    })
      .then(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              console.log(data);
            })
        }
      })
      .catch(e => {
        console.log(e);
      })
  })
};