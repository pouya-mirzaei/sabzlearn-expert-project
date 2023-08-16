const userAccountBtnText = document.querySelector('.main-header__profile-text');
const userAccountBtn = document.querySelector('.main-header__profile');

import { getTopBarItems } from '../functions/dom/top-bar.js';
import { getCurrentUserData, isUserLoggedIn } from './../functions/auth.js';

async function app() {
  // topbar

  let topbarMenus = await getTopBarItems();

  handleTopBar(topbarMenus);

  // username navbar
  if (isUserLoggedIn()) {
    const userData = await getCurrentUserData();
    userAccountBtnText.textContent = userData.name;
    userAccountBtn.href = 'logout/';
  }
}

app();

function handleTopBar(menus) {
  const menuContainer = document.querySelector('.top-bar__menu');
  menuContainer.innerHTML = '';

  let start = Math.floor(Math.random() * 9);
  let end = start + 7;

  console.log(start, menus.slice(start, end));

  menus.slice(start, end).map((menu) => {
    menuContainer.insertAdjacentHTML(
      'beforeend',
      `
       <li class="top-bar__item">
          <a href="#" class="top-bar__link">${menu.title}</a>
        </li>
    `
    );
  });
}
