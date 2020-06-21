window.onload = () => {
  const quizId = new URLSearchParams(
    new URL(document.location.href).search
  ).get('id');

  const quizName = new URLSearchParams(
    new URL(document.location.href).search
  ).get('name');

  if (!quizId || !quizName) {
    document.location.href = document.location.href.split('?')[0].replace('quiz', 'index');
  }

  fetch('./api/question_parse.php', {
    method: 'POST',
    body: JSON.stringify({id: quizId})
  })
    .then(response => {
      response.json()
      .then(data => {
        if (data.length !== 0) {
          renderQuiz(quizName, data);
        } else {
          document.write('No quiz exists with thid id');
        }
      })
    })
    .catch(e => console.log(e))
};

const renderQuiz = (name, questions) => {
  console.log(questions);
  const quizName = document.querySelector('h2');
  quizName.innerHTML = name;
  const renderQuestion = (question, currentQuestion, length) => {
    const questionNode = document.querySelector('h3');
    const answerNode1 = document.querySelector('input[data-answer="1"]');
    const answerNode2 = document.querySelector('input[data-answer="2"]');
    const answerNode3 = document.querySelector('input[data-answer="3"]');
    const answerNode4 = document.querySelector('input[data-answer="4"]');
    const counter = document.querySelector('.quiz-question-number');
    questionNode.innerHTML = question.question;
    answerNode1.value = question.answer_1;
    answerNode2.value = question.answer_2;
    answerNode3.value = question.answer_3;
    answerNode4.value = question.answer_4;
    counter.innerHTML = `${currentQuestion + 1} of ${length}`;
  };
  let currentQuestion = 0;
  renderQuestion(questions[currentQuestion], currentQuestion, questions.length);

  const answersOpts = document.querySelectorAll('input[type="text"]');
  
  [...answersOpts].forEach(opt => {
    opt.addEventListener('click', () => {
      [...answersOpts].forEach(opt => {
        opt.classList.remove('choosen');
      })
      opt.classList.add('choosen');
      const userAnswer = document.querySelector('.choosen');
      questions[currentQuestion].user_answer = userAnswer.getAttribute('data-answer');
    })
  });

  const finishHandler = document.querySelector('.finishHandler');
  finishHandler.disabled = true;
  finishHandler.classList.add('disabled');

  const nextHandler = document.querySelector('.nextHandler');
  nextHandler.addEventListener('click', () => {
    const userAnswer = document.querySelector('.choosen');
    const error = document.querySelector('.error-text');
    if (!userAnswer) {
      error.innerHTML = 'Chose your answer';
    } else {
      currentQuestion++;
      renderQuestion(questions[currentQuestion], currentQuestion, questions.length);
      error.innerHTML = '';
      [...answersOpts].forEach(opt => {
        opt.classList.remove('choosen');
      })
      if (currentQuestion === questions.length - 1) {
        nextHandler.disabled = true;
        nextHandler.classList.add('disabled');
        finishHandler.disabled = false;
        finishHandler.classList.remove('disabled');
      } 
    }
  });

  finishHandler.addEventListener('click', () => {
    const userAnswer = document.querySelector('.choosen');
    const error = document.querySelector('.error-text');
    if (!userAnswer) {
      error.innerHTML = 'Chose your answer';
    } else {
      error.innerHTML = '';
      [...answersOpts].forEach(opt => {
        opt.classList.remove('choosen');
      }) 
      quizResults(questions);
    }
  });
};

const quizResults = (questions) => {
  const quizContainer = document.querySelector('.quiz');

  let failedAnswers = 0;

  const listItems = questions.reduce((str, item) => {
    if (item.correct_answer_id === item.user_answer) {
      return str += `<li class="text-success">${item.question} &radic;</li>`;
    } else {
      failedAnswers++;
      return str += `<li class="error-text">${item.question} &times;</li>`;
    }
  }, `<ol class="quiz-results">`);

  console.log(listItems);

  if (failedAnswers > 1) {
    failedAnswers = "Unfortunally, you didn't pass this quiz. Max. 2 errors allowed";
  } else {
    failedAnswers = "Congratulations, you've passed this quiz.";
  }

  quizContainer.innerHTML = listItems + '</ol>';
  quizContainer.innerHTML += 
  `
    <div class="footer-quiz">
      <span>${failedAnswers}</span>
      <a href="./" class="btn btn-primary">Back to list</a>
    </div>
  `;

};