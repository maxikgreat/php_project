window.onload = () => {
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
                      <a href="./quiz.html?id=${quiz.id}&name=${quiz.name}" class="btn btn-primary mr-3">Start</a>
                      <span>Created: ${new Date(parseInt(quiz.date)).toLocaleDateString()} | 
                        ${new Date(parseInt(quiz.date)).toLocaleTimeString()}
                      </span>
                    </div>
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

//anv lada largus = 205
