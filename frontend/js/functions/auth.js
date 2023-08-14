import { redirectTo, clearRegisterInputs, areInputsValidated, clearLoginInputs } from './fuctions.js';
import { setLocalStorageData, showMessage } from './utilities.js';

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
        showMessage('خطا', 'کاربری بااطلاعات وارد شده یافت نشد', 'error', 'مجداا امتحان کنید', () => {});
      } else if (res.message) {
        showMessage('خطا', 'رمز عبور وارد شده اشتباه است', 'error', 'مجداا امتحان کنید', () => {});
      } else if (!res.accessToken) {
        swal({
          title: 'خطایی پیش آمد',
          text: 'لطفا بعدا متحان کنید',
          icon: 'error',
        });
      } else {
        setLocalStorageData('user', { token: res.accessToken });

        showMessage('موفق !', 'شمابا موفقیت وارد حساب کاربری خود شدید !', 'success', 'ادامه', (res) => {
          if (res) {
            redirectTo('index.html');
          }
        });
      }

      clearLoginInputs();
    });
};

export { register, login };
