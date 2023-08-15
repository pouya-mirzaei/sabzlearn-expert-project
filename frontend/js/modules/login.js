if (isUserLoggedIn()) {
  redirectTo('index.html');
}

import { isUserLoggedIn, login } from '../functions/auth.js';
import { redirectTo } from '../functions/fuctions.js';
import { showLoadingOverlay } from '../functions/utilities.js';

const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});
