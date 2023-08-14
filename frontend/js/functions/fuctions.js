const $ = document;

function redirectTo(url) {
  location.href = url;
}

function clearLoginInputs() {
  const identifier = $.querySelector('#identifier');
  const password = $.querySelector('#password');

  identifier.value = '';
  password.value = '';
}

function clearRegisterInputs() {
  const name = $.querySelector('#name');
  const username = $.querySelector('#username');
  const email = $.querySelector('#email');
  const phone = $.querySelector('#phone');
  const password = $.querySelector('#password');
  const confirm = $.querySelector('#confirm-password');

  name.value = '';
  username.value = '';
  email.value = '';
  phone.value = '';
  password.value = '';
  confirm.value = '';
}

function areInputsValidated(...inputs) {
  let result = true;

  inputs.forEach((input) => {
    if (!input.value) {
      swal({
        title: 'لطفا اطلاعات را به درستی وارد نمایید',
      });

      result = false;
      return;
    } else {
      // console.log("passed");
    }
  });

  return result;
}

export { redirectTo, clearLoginInputs, clearRegisterInputs, areInputsValidated };
