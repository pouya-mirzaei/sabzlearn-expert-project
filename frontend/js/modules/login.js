import { login } from '../functions/auth.js';
import { getCurretUserToken } from '../functions/utilities.js';

const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});
