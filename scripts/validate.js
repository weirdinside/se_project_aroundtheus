function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass },
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`,
  );
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass },
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`,
  );
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

function checkInputValidity(formElement, inputElement, formItems) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, formItems);
  } else {
    hideInputError(formElement, inputElement, formItems);
  }
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
  console.log("button disabled");
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
  console.log("button enabled");
}

// function hasInvalidInput(inputList){
//     return (inputList.some((inputElement)=>{
//         inputElement.validity.valid;
//     }));
// }

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass },
) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, inactiveButtonClass);
    return;
  } else {
    enableButton(submitButton, inactiveButtonClass);
    return;
  }
}

function setEventListeners(formElement, formItems) {
  const { inputSelector } = formItems;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(formItems.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, formItems);
      toggleButtonState(inputElements, submitButton, formItems);
    });
  });
}

function enableValidation(formItems) {
  const formElements = Array.from(
    document.querySelectorAll(formItems.formSelector),
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, formItems);
  });
}


// this is the sample code that was provided, just renamed to match the naming 
// scheme i had going in the previous stages of the project
const formItems = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(formItems);
