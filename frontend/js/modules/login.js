import { login } from '../functions/auth.js';

const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});
