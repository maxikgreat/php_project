window.onload = () => {
  checkAdmin();
  const logoutHandler = document.querySelector('.logoutHandler');
  logoutHandler.addEventListener('click', () => {
    fetch('./api/logout.php', {method: 'GET'})
      .catch(e => console.log(e))
  });
  const listSection = document.querySelector('.quizes-container');
  fetch('./api/quiz_parse.php', {method: 'GET'})
    .then(response => {
      response.json()
        .then(data => {
          if (data.length !== 0) {
            data.forEach(quiz => {
              listSection.innerHTML += `
                <div class="card col-6">
                  <div class="card-body">
                    <h5 class="card-title">${quiz.name} (${quiz.question_amount} quest.)</h5>
                    <p class="card-text">${quiz.description}</p>
                    <a href="#" class="btn btn-danger">Delete</a>
                  </div>
                </div>
              `
            })
          } else {
            listSection.innerHTML = 'List is empty'
          }
        })
    })
    .catch(e => console.log(e))
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