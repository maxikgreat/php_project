window.onload = () => {
  checkAdmin();
  const logoutHandler = document.querySelector('.logoutHandler');
  logoutHandler.addEventListener('click', () => {
    fetch('./api/logout.php', {method: 'GET'})
      .catch(e => console.log(e))
  });
};

const checkAdmin = () => {
  console.log('fsaldkfj')
  fetch('./api/ifadmin.php', {method: 'GET'})
    .then(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            if (data !== 'Success!') {
              document.innerHTML = 'You need firstly log in to see this page!'
            }
          })
      }
    })
    .catch(e => {
      console.log(e);
    })
}