const setLocalStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const getCurretUserToken = () => {
  return getLocalStorageData('user').token;
};

const showMessage = (title, text, icon, btnText, callback) => {
  swal({
    title,
    text,
    icon,
    button: {
      text: btnText,
      value: true,
      visible: true,
      className: icon,
      closeModal: true,
    },
  }).then((res) => {
    callback(res);
  });
};

export { getCurretUserToken, setLocalStorageData, showMessage, getLocalStorageData };
