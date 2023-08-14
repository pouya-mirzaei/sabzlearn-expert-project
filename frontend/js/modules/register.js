import { register } from "../functions/auth.js";

const registerBtn = document.querySelector("#register");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});
