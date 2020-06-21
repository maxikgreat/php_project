window.onload = () => {
  checkAdmin();
  const questionBlocks = [];
  let questionHandler = document.querySelector('.questionHandler');
  let quizHandler = document.querySelector('.quizHandler');

  let errors = {};
  let error = document.querySelector('.error-text');

  questionHandler.addEventListener('click', () => {
    errors = {};
    checkQuestionValid(errors);
    if (errors.emptyQuestion) {
      error.innerHTML = errors.emptyQuestion;
      error.classList.remove('hidden');
    } else {
      error.innerHTML = '';
      error.classList.add('hidden');
    }
    if (Object.keys(errors).length === 0) {
      let question = document.querySelector('input[name="question"]');
      let answers = [];
      for (let i = 1; i <= 4; i++) {
        answers.push(document.querySelector(`input[name="answer${i}"]`));
      }
      let rightAnswer = document.querySelector('select');
      questionBlocks.push({
        question: question.value,
        answer1: answers[0].value,
        answer2: answers[1].value,
        answer3: answers[2].value,
        answer4: answers[3].value,
        rightAnswer: rightAnswer.value,
      })
      question.value = '';
      rightAnswer.value = '1';
      answers.forEach(answer => {
        answer.value = '';
      })
    }
  });

  quizHandler.addEventListener('click', () => {
    errors = {};
    let allFill = false;
    const mainInfoInputs = document.querySelectorAll('.quiz-validate');
    for (let input of mainInfoInputs) {
      if (input.value === '') {
        allFill = true;
        break;
      }
    }
    if (questionBlocks.length < 2) {
      error.innerHTML = 'Quiz must contain at least 3 questions';
      error.classList.remove('hidden');
    }
    if (allFill) {
      error.innerHTML = 'Fill main info quiz';
      error.classList.remove('hidden');
    }
    if (questionBlocks.length > 2 && !allFill) {
      error.classList.add('hidden');
      error.innerHTML = '';
      fetch('./api/qincrement.php', {
        method: 'POST',
        body:JSON.stringify({
          quizTitle: mainInfoInputs[0].value,
          quizDesc: mainInfoInputs[1].value,
          quizDate: Date.now(),
          questions: questionBlocks,
        })
      })
        .then(() => {
          document.location.href = document.location.href.replace('create-quiz', 'admin');
        })
        .catch(e => console.log(e));
    }
  });
};


const checkQuestionValid = (errors) => {
  let inputs = document.querySelectorAll('.question-validate');
  for (let input of inputs) {
    if (input.value === '') {
      errors.emptyQuestion = 'Fill all fields';
      break;
    }
  };
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