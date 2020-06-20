window.onload = () => {
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
    if (questionBlocks.length === 0) {
      error.innerHTML = 'Quiz must contain at least 1 question';
      error.classList.remove('hidden');
    }
    if (allFill) {
      error.innerHTML = 'Fill main info quiz';
      error.classList.remove('hidden');
    }
    if (questionBlocks.length !== 0 && !allFill) {
      error.classList.add('hidden');
      error.innerHTML = '';
      console.log("OK")
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
