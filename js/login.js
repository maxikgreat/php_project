window.onload = () => {
  checkAdmin();
  let action = document.querySelector('.loginHandler');

  let login = document.getElementById('login');
  let password = document.getElementById('password');

  let loginLabel = document.querySelector('.loginLabel');
  let passwordLabel = document.querySelector('.passwordLabel');

  let loginErrorText = document.querySelector('.error-text.login');
  let passwordErrorText = document.querySelector('.error-text.password');
  let authErrorText = document.querySelector('.error-text.auth');

  action.addEventListener('click', () => {
    let errors = {};
    checkValidation(login.value, password.value, errors);
    if (errors.login) {
      login.classList.add('invalid-input');
      loginLabel.classList.add('invalid-prepend');
      loginErrorText.innerHTML = errors.login;
      loginErrorText.classList.remove('hidden');
    } else {
      login.classList.remove('invalid-input');
      loginLabel.classList.remove('invalid-prepend');
      loginErrorText.classList.add('hidden');
    }
    if (errors.password) {
      password.classList.add('invalid-input');
      passwordLabel.classList.add('invalid-prepend');
      passwordErrorText.innerHTML = errors.password;
      passwordErrorText.classList.remove('hidden');
    } else {
      password.classList.remove('invalid-input');
      passwordLabel.classList.remove('invalid-prepend');
      passwordErrorText.classList.add('hidden');
    }

    if (!errors.login && !errors.password) {
      auth(authErrorText);
    } 
  })
};

const checkValidation = (login, password, errors) => {
  if (login.length === 0) {
    errors.login = 'This field is required';
  }
  if (password.length === 0) {
    errors.password = 'This field is required';
  }
  if (password.length !== 0 && password.length < 5) {
    errors.password = 'Min. 5 characters required'
  }
}

const auth = (errorText) => {
  fetch('./api/login.php', {
    method: 'POST',
    body: JSON.stringify({login: login.value, password: password.value})
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            if (!data) {
              errorText.innerHTML = 'Login or password is incorrect'
              errorText.classList.remove('hidden');
            } else {
              errorText.classList.add('hidden');
              const splitedUrl = document.location.href.split('/');
              const lastParam = splitedUrl[splitedUrl.length - 1].split('.');
              lastParam[0] = 'admin';
              const joindedParam = lastParam.join('.');
              splitedUrl[splitedUrl.length - 1] = joindedParam;
              const joinedUrl = splitedUrl.join('/');
              document.location.href = joinedUrl;
            }
          })
      }
    })
    .catch(e => {
      console.log(e);
    })
};

const checkAdmin = () => {
  console.log('fsaldkfj')
  fetch('./api/ifadmin.php', {method: 'GET'})
    .then(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            if (data === 'Success!') {
              const splitedUrl = document.location.href.split('/');
              const lastParam = splitedUrl[splitedUrl.length - 1].split('.');
              lastParam[0] = 'admin';
              const joindedParam = lastParam.join('.');
              splitedUrl[splitedUrl.length - 1] = joindedParam;
              const joinedUrl = splitedUrl.join('/');
              document.location.href = joinedUrl;
            }
          })
      }
    })
    .catch(e => {
      console.log(e);
    })
}