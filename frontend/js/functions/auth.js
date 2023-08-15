import { redirectTo, clearRegisterInputs, areInputsValidated, clearLoginInputs } from './fuctions.js';
import {
  disableLoadingOverlay,
  getCurretUserToken,
  getLocalStorageData,
  setLocalStorageData,
  showLoadingOverlay,
  showMessage,
} from './utilities.js';

const $ = document;

const register = () => {
  const name = $.querySelector('#name');
  const username = $.querySelector('#username');
  const email = $.querySelector('#email');
  const phone = $.querySelector('#phone');
  const password = $.querySelector('#password');
  const confirm = $.querySelector('#confirm-password');

  if (!areInputsValidated(name, username, email, phone, password, confirm)) {
    return;
  }

  showLoadingOverlay();

  let userInfos = {
    name: name.value,
    username: username.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    confirmPassword: confirm.value,
  };

  fetch('http://localhost:4000/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },

    body: JSON.stringify(userInfos),
  })
    .then((res) => {
      if (res.status === 201) {
        disableLoadingOverlay();
        showMessage(
          'ثبت نام شما با موفقیت انجام شد',
          'شما میتوانید  وارد حساب کاربری خود شوید',
          'success',
          'ورود به حساب کاربری',
          (res) => {
            if (res) {
              redirectTo('login.html');
            }
          }
        );

        clearRegisterInputs();
      } else if (res.status === 409) {
        disableLoadingOverlay();
        showMessage(
          'نام کاربری یا ایمیل وارد شده تکراری است',
          'لطفا اطلاعات خود را تصحیح کنید',
          'error',
          'تصحیح اطلاعات',
          () => {}
        );
      }

      return res.json();
    })
    .catch((err) => {
      disableLoadingOverlay();
      swal({
        title: 'خطایی پیش آمد',
        text: 'لطفا بعدا متحان کنید',
        icon: 'error',
      });
      console.log(err);
    });
};

const login = () => {
  const identifier = $.querySelector('#identifier');
  const password = $.querySelector('#password');

  if (!areInputsValidated(identifier, password)) {
    return;
  }

  showLoadingOverlay();

  const userInfos = {
    identifier: identifier.value,
    password: password.value,
  };

  fetch('http://localhost:4000/v1/auth/login', {
    method: 'POST',

    headers: {
      'Content-type': 'application/json',
    },

    body: JSON.stringify(userInfos),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res == 'there is no user with this email or username') {
        disableLoadingOverlay();
        showMessage('خطا', 'کاربری بااطلاعات وارد شده یافت نشد', 'error', 'مجداا امتحان کنید', () => {});
      } else if (res.message) {
        disableLoadingOverlay();
        showMessage('خطا', 'رمز عبور وارد شده اشتباه است', 'error', 'مجداا امتحان کنید', () => {});
      } else if (!res.accessToken) {
        disableLoadingOverlay();
        swal({
          title: 'خطایی پیش آمد',
          text: 'لطفا بعدا متحان کنید',
          icon: 'error',
        });
      } else {
        setLocalStorageData('user', { token: res.accessToken });

        disableLoadingOverlay();

        showMessage('موفق !', 'شمابا موفقیت وارد حساب کاربری خود شدید !', 'success', 'ادامه', (res) => {
          if (res) {
            redirectTo('index.html');
          } else {
            redirectTo('');
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      disableLoadingOverlay();
      showMessage('خطایی پیش آمد', 'لطفا بعدا متحان کنید', 'error', 'close', () => {});
    });
};

const getCurrentUserData = async () => {
  const userToken = getCurretUserToken();

  let res = await fetch('http://localhost:4000/v1/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return await res.json();
};

const isUserLoggedIn = () => {
  if (getLocalStorageData('user')) {
    return true;
  } else {
    return false;
  }
};

export { register, login, getCurrentUserData, isUserLoggedIn };
