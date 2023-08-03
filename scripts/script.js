document.addEventListener("DOMContentLoaded", () => {

  // Dialog
  const dialog = document.querySelector(".dialog");
  const dialogBtns = document.querySelectorAll(".dialog_btn");
  const dialogClose = document.querySelector(".dialog__close");
  const dialogContent = document.querySelector(".dialog__content");
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
  const pageBody = document.querySelector('body');

  menuIcon.addEventListener('click', () => {
    mobileMenu.style.display = 'block';
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'inline-block';
    pageBody.style.overflow = 'hidden';
  });

  closeIcon.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    menuIcon.style.display = 'inline-block';
    closeIcon.style.display = 'none';
    pageBody.style.overflow = 'auto';
  });

  // Send data
  function sendLeadData(event) {
    event.preventDefault();
    const firstName = document.querySelector('.dr-field-fname').value;
    const lastName = document.querySelector('.dr-field-lname').value;
    const email = document.querySelector('.dr-field-email').value;
    const phoneNumber = document.querySelector('.dr-field-phone').value;
    const countryCode = document.querySelector(".select-box__input:checked").value;
    const fullNumber = `+${countryCode}${phoneNumber}`;

    const data = {
      ApiKey: 'TmpBME1sODFNVEJmTmpBME1sOD0=',
      ApiPassword: 'Q6M2W2ENwf',
      CampaignID: '8858',
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNumber: fullNumber,
    };

    const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';
    function encodeFormData(data) {
      return Object.keys(data)
        .map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        })
        .join('&')
    }

    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeFormData(data)

    })
      .then(response => {
        if (response.ok) {
          console.log('Lead data sent successfully!');
          form.reset();
          window.location.href = 'thank-you.html';
        } else {
          throw new Error('Failed to send lead data');
        }
      })
      .catch(error => {
        console.error('An error occurred while sending lead data:', error.message);
      });
  }

  const form = document.getElementById('mypost');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPhoneNumberValid = phoneInput.dispatchEvent(new Event('blur'));

    if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid) {
      sendLeadData(event);
    } else {
      console.log('`Not all required fields are correct');
    }
  });
});