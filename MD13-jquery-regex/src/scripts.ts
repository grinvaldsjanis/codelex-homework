import validateName from "./validate-name";
import validateEmail from "./validate-email";
import validatePassword from "./validate-pass";

$(document).ready(function () {
  const nameInput = $(".js-name") as JQuery<HTMLInputElement>;
  const emailInput = $(".js-email") as JQuery<HTMLInputElement>;
  const passwordInput = $(".js-password") as JQuery<HTMLInputElement>;
  const submitButton = $(".js-submit-button") as JQuery<HTMLButtonElement>;

  submitButton.on("click", (event) => {
    if (!validateForm(nameInput, emailInput, passwordInput)) {
      event.preventDefault();
    }
  });

  const validateForm = function (
    nameInput: JQuery<HTMLElement>,
    emailInput: JQuery<HTMLElement>,
    passwordInput: JQuery<HTMLElement>
  ): boolean {
    const name = nameInput.val() as string;
    const email = emailInput.val() as string;
    const password = passwordInput.val() as string;

    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!nameValidation.isValid) {
      showErrorMessage(nameInput, nameValidation.errorMessage);
    } else {
      hideErrorMessage(nameInput);
    }

    if (!emailValidation.isValid) {
      showErrorMessage(emailInput, emailValidation.errorMessage);
    } else {
      hideErrorMessage(emailInput);
    }

    if (!passwordValidation.isValid) {
      showErrorMessage(passwordInput, passwordValidation.errorMessage);
    } else {
      hideErrorMessage(passwordInput);
    }

    return (
      nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid
    );
  };

  function showErrorMessage(input: JQuery<HTMLElement>, message: string) {
    input.siblings(".help").html(message).show();
  }

  function hideErrorMessage(input: JQuery) {
    const errorMessage = input.siblings(".help");
    errorMessage.hide();
  }
});
