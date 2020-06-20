window.onload = () => {
  const quizId = new URLSearchParams(
    new URL(document.location.href).search
  ).get('id');
  fetch('./api/question_parse.php', {
    method: 'POST',
    body: JSON.stringify({id: quizId})
  })
    .then(response => {
      response.json()
      .then(data => {
        console.log(data);
      })
    })
    .catch(e => console.log(e))
};