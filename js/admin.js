window.onload = () => {
  checkAdmin();
  const logoutHandler = document.querySelector('.logoutHandler');
  logoutHandler.addEventListener('click', () => {
    fetch('./api/logout.php', {method: 'GET'})
      .catch(e => console.log(e))
  });
};

const checkAdmin = () => {
  fetch('./api/ifadmin.php', {method: 'GET'})
    .then(response => {
      if (!response.ok) {
        document.write('You need firstly log in to see this page');
        const splitedUrl = document.location.href.split('/');
        const lastParam = splitedUrl[splitedUrl.length - 1].split('.');
        lastParam[0] = 'login';
        const joindedParam = lastParam.join('.');
        splitedUrl[splitedUrl.length - 1] = joindedParam;
        const joinedUrl = splitedUrl.join('/');
        document.location.href = joinedUrl;
      }
    })
    .catch(e => {
      console.log(e);
    })
}