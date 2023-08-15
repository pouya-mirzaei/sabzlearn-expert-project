const userAccountBtnText = document.querySelector('.main-header__profile-text');
const userAccountBtn = document.querySelector('.main-header__profile');

import { getCurrentUserData, isUserLoggedIn } from './../functions/auth.js';

async function app() {
  const userData = await getCurrentUserData();
  userAccountBtnText.textContent = userData.name;
  userAccountBtn.href = 'logout/';
}

app();
