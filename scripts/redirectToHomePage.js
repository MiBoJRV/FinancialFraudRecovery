document.addEventListener("DOMContentLoaded", () => {
// Redirect to home page
const buttonOk = document.querySelector(".thank-you a");
buttonOk.addEventListener('click', function() {
  window.location.href = 'index.html';
});

});