document.addEventListener("DOMContentLoaded", () => {
  // Find elements
  const dialog = document.querySelector(".dialog");
  const dialogBtns = document.querySelectorAll(".dialog_btn");
  const dialogClose = document.querySelector(".dialog__close");
  const dialogContent = document.querySelector(".dialog__content");
  const form = document.getElementById("mypost"); // Get the form element
  const body = document.querySelector('body');

  dialogBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      dialog.style.display = "flex";
      body.style.overflow = 'hidden'
    });
  });

  dialogClose.addEventListener("click", (event) => {
    event.stopPropagation();
    hideDialog();
  });


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideDialog();
    form.reset();
  });

 body.addEventListener("click", (event) => {
    if (!dialogContent.contains(event.target) && dialog.contains(event.target) ) {
      hideDialog();
    }
  });
  document.addEventListener('keydown', function(event) {
    if( event.key === "Escape" ){
      hideDialog();
    }
  });

  function hideDialog() {
    dialog.style.display = "none";
    body.style.overflow = 'auto';
  }


  // Mobile menu
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuIcon.addEventListener('click', () => {
    mobileMenu.style.display = 'block';
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'inline-block';
    body.style.overflow = 'hidden'
  });

  closeIcon.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    menuIcon.style.display = 'inline-block';
    closeIcon.style.display = 'none';
    body.style.overflow = 'auto';
  });
});