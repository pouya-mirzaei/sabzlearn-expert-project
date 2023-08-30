const userAccountBtnText = document.querySelector('.main-header__profile-text');
const userAccountBtn = document.querySelector('.main-header__profile');
const mainHeader = document.querySelector('#main-header');

import { connectionTest, getTopBarItems, getAllMenus } from '../functions/api/api.js';
import { disableLoadingOverlay, showLoadingOverlay, showMessage } from '../functions/utilities.js';
import { getCurrentUserData, isUserLoggedIn } from './../functions/auth.js';
import { formatHref } from '../functions/fuctions.js';

window.addEventListener('load', app);

async function app() {
  showLoadingOverlay();
  if (await connectionTest()) {
    disableLoadingOverlay();
  } else {
    disableLoadingOverlay();
    showMessage('خطا', 'در ارتباط با سرور خطایی پیش آمد . لطفا بعدا امتحان کنید', 'error', 'ok', () => {
      window.location.href = window.location.href;
    });
    return false;
  }
  // topbar

  let topbarMenus = await getTopBarItems();

  handleTopBar(topbarMenus);

  // menus
  displayMenus();

  // username navbar
  if (isUserLoggedIn()) {
    const userData = await getCurrentUserData();
    userAccountBtnText.textContent = userData.name;
    userAccountBtn.href = 'logout/';
  }
}

function handleTopBar(menus) {
  const menuContainer = document.querySelector('.top-bar__menu');
  menuContainer.innerHTML = '';

  let start = Math.floor(Math.random() * 9);
  let end = start + 7;

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

const displayMenus = async () => {
  const menus = await getAllMenus();

  menus.map((item) => {
    // console.log(item);
    mainHeader.insertAdjacentHTML(
      'beforeend',
      `
        <li class="main-header__item">
          <a href='category.html?cat=${formatHref(item.href)}' class="main-header__link">${item.title}</a>

          ${item.submenus[0] ? hanldeSuMenus(item.submenus) : ''}


       </li>
      `
    );
  });
};

const hanldeSuMenus = (menus) => {
  let items = '';

  menus.map((menu) => {
    // console.log(menu.href);
    items += `
    <li class="main-header__dropdown-item">
      <a href="course.html?name=${formatHref(menu.href)}" class="main-header__dropdown-link">${menu.title}</a>
    </li>

    `;
  });

  return `<i class="fas fa-angle-down main-header__link-icon"></i>

  <ul class="main-header__dropdown">
       ${items}
  </ul>
  `;
};
