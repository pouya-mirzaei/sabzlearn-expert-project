if (isUserLoggedIn()) {
  redirectTo('index.html');
}

import { isUserLoggedIn, register } from '../functions/auth.js';
import { redirectTo } from '../functions/fuctions.js';

const registerBtn = document.querySelector('#register');

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  register();
});
