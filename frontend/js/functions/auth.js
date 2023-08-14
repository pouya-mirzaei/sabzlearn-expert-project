import { redirectTo, clearRegisterInputs, areInputsValidated } from './fuctions.js';

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
        swal({
          title: 'ثبت نام شما با موفقیت انجام شد',
          text: 'شما میتوانید  وارد حساب کاربری خود شوید',
          icon: 'success',
          button: {
            text: 'ورود به حساب کاربری',
            value: true,
            visible: true,
            className: 'success',
            closeModal: true,
          },
        }).then((result) => {
          if (result) {
            redirectTo('login.html');
          }
        });

        clearRegisterInputs();
      } else if (res.status === 409) {
        swal({
          title: 'نام کاربری یا ایمیل وارد شده تکراری است',
          text: 'لطفا اطلاعات خود را تصحیح کنید',
          icon: 'error',
          button: {
            text: 'تصحیح اطلاعات',
            value: true,
            visible: true,
            className: 'error',
            closeModal: true,
          },
        });
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
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => console.log(res.accessToken));
};

export { register, login };
