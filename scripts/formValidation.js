function createErrorMessage(message) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  return errorMessage;
}

function validateFirstName() {
  const input = document.querySelector('.dr-field-fname');
  const errorMessage = document.querySelector('.dr-field-fname-error');

  const value = input.value.trim();

  if (value === '' || value.length < 2 || /\d/.test(value)) {
    if (!errorMessage) {
      const errorMessageElement = createErrorMessage('Field is required');
      errorMessageElement.classList.add('dr-field-fname-error');
      input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
    }
    input.classList.add('error');
    return false;
  }

  if (errorMessage) {
    errorMessage.remove();
  }

  input.classList.remove('error');
  return true;
}

function validateLastName() {
  const input = document.querySelector('.dr-field-lname');
  const errorMessage = document.querySelector('.dr-field-lname-error');

  const value = input.value.trim();

  if (value === '' || value.length < 2 || /\d/.test(value)) {
    if (!errorMessage) {
      const errorMessageElement = createErrorMessage('Field is required');
      errorMessageElement.classList.add('dr-field-lname-error');
      input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
    }
    input.classList.add('error');
    return false;
  }

  if (errorMessage) {
    errorMessage.remove();
  }

  input.classList.remove('error');
  return true;
}

function validateEmail() {
  const input = document.querySelector('.dr-field-email');
  const errorMessage = document.querySelector('.dr-field-email-error');

  const value = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMessages = [];

  if (value === '') {
    errorMessages.push('Field is required');
  } else if (!emailPattern.test(value)) {
    errorMessages.push('Please enter a valid email address (example@email.com)');
  }

  removeErrorMessages(errorMessage);

  if (errorMessages.length > 0) {
    const errorMessageElement = createErrorMessage(errorMessages.join(', '));
    errorMessageElement.classList.add('dr-field-email-error');
    input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
    input.classList.add('error');
    return false;
  }

  input.classList.remove('error');
  return true;
}

function removeErrorMessages(errorMessage) {
  if (errorMessage) {
    errorMessage.remove();
  }
}

const firstNameField = document.querySelector('.dr-field-fname');
firstNameField.addEventListener('blur', () => {
  validateFirstName();
});

const lastNameField = document.querySelector('.dr-field-lname');
lastNameField.addEventListener('blur', () => {
  validateLastName();
});

const emailField = document.querySelector('.dr-field-email');
emailField.addEventListener('blur', () => {
  validateEmail();
});

const countrySelect = document.querySelector(".select-box__input:checked");
const phoneInput = document.querySelector('.dr-field-phone');
const phoneInputWrap = document.querySelector('.phone-input');
const errorField = document.querySelector('.dr-field-phone-error');

// function updatePhonePlaceholder() {
//   if (countrySelect.value === '1') {
//     phoneInput.placeholder = '123 4567 8901 - ca';
//   } else if (countrySelect.value === '44') {
//     phoneInput.placeholder = '123 456 7890 - uk';
//   } else if (countrySelect.value === '61') {
//     phoneInput.placeholder = '123 456 7890 - au';
//   } else {
//     phoneInput.placeholder = '(xxx) xxx-xxxx';
//   }
// }

//ca  +1 12345678901
//uk +44 1234567890
//au +61 1234567890

function validatePhoneNumber(event) {
  const input = event.target.value;
  const sanitizedInput = input.replace(/\D/g, '');
  event.target.value = sanitizedInput;
  const maxLength = 11;
  const minLength = 10;
  const truncatedInput = sanitizedInput.slice(0, maxLength);

  const selectedCountry = countrySelect.value;
  let errorMessage;

  if (truncatedInput.length < minLength || truncatedInput.length > maxLength) {
    if (input === '') {
      errorMessage = 'Field is required'
      phoneInputWrap.classList.add('error');
    } else if (selectedCountry === '1' && input !== '') {
      phoneInputWrap.classList.add('error');
      errorMessage =
        'Please enter your Phone number. Example: 123 4567 8901';
    } else if (selectedCountry === '44' && input !== '') {
      phoneInputWrap.classList.add('error');
      errorMessage =
        'Please enter your Phone number. Example: 123 456 7890';
    } else if (selectedCountry === '61' && input !== '') {
      phoneInputWrap.classList.add('error');
      errorMessage =
        'Please enter your Phone number. Example: 123 456 7890';
    } else {
      phoneInputWrap.classList.add('error');
      errorMessage = 'Invalid phone number. Please provide a valid phone number.';
    }

    errorField.textContent = errorMessage;
    event.target.setCustomValidity(errorMessage);
  } else {
    errorField.textContent = '';
    event.target.setCustomValidity('');
  }
  if (!errorMessage) {
    phoneInputWrap.classList.remove('error');
  }
  event.target.value = truncatedInput;
}

// countrySelect.addEventListener('change', () => {
//   // if (countrySelect.value !== 'none') {
//   //   if (countrySelect.options[0].value === 'none') {
//   //     countrySelect.remove(0);
//   //   }
//   //   updatePhonePlaceholder();
//   // } else {
//   //   phoneInput.placeholder = 'Phone';
//   // }
//   updatePhonePlaceholder();
// });

phoneInput.addEventListener('blur', validatePhoneNumber);

// updatePhonePlaceholder();



