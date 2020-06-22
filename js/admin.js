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
                    <div>
                      <button data-id="${quiz.id}" class="btn btn-danger deleteHandler">Delete</button>
                      <span>Created: ${new Date(parseInt(quiz.date)).toLocaleDateString()} | 
                        ${new Date(parseInt(quiz.date)).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              `
            })
            const deleteHandlers = document.querySelectorAll('.deleteHandler');
            [...deleteHandlers].forEach(handler => {
              handler.addEventListener('click', () => {
                fetch('./api/qdelete.php', {
                  method: 'POST',
                  body: JSON.stringify({id: handler.getAttribute('data-id')})
                })
                  .then(response => {
                    response.json()
                      .then(data => {
                        if (data === "Success!") {
                          location.reload();
                        }
                      })
                      .catch(e => console.log(e))
                  })
              })
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
        document.location.href = document.location.href.replace('admin', 'login');
      }
    })
    .catch(e => {
      console.log(e);
    })
}