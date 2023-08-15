const setLocalStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeLocalStorageData = (key) => {
  localStorage.removeItem(key);
};

const getCurretUserToken = () => {
  return getLocalStorageData('user')?.token;
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

const showLoadingOverlay = () => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.add('active');
};

const disableLoadingOverlay = () => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.remove('active');
};

export {
  getCurretUserToken,
  setLocalStorageData,
  showMessage,
  getLocalStorageData,
  showLoadingOverlay,
  disableLoadingOverlay,
  removeLocalStorageData,
};
