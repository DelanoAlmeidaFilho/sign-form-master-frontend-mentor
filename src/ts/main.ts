const form = document.querySelector(".form")!;
const firstName = document.querySelector<HTMLInputElement>("#first-name")!;
const lastName = document.querySelector<HTMLInputElement>("#last-name")!;
const email = document.querySelector<HTMLInputElement>("#email")!;
const password = document.querySelector<HTMLInputElement>("#password")!;
const passwordConfirmation = document.querySelector<HTMLInputElement>(
  "#password-confirmation"
)!;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmationValue = passwordConfirmation.value.trim();

  if (firstNameValue === "") {
    setError(firstName, "first name is required");
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    setError(lastName, "last name is required");
  } else {
    setSuccess(lastName);
  }

  if (emailValue === "") {
    setError(email, "email is required");
  } else if (!checkEmail(emailValue)) {
    setError(email, "please enter a valid email");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "password is required");
  } else if (passwordValue.length <= 7) {
    setError(password, "Password must be at least 8 characters long");
  } else {
    setSuccess(password);
  }

  if (passwordConfirmationValue === "") {
    setError(passwordConfirmation, "password confirmation is required");
  } else if (passwordConfirmationValue !== passwordValue) {
    setError(
      passwordConfirmation,
      "password confirmation and password are different"
    );
  } else {
    setSuccess(passwordConfirmation);
  }

  const formControls =
    document.querySelectorAll<HTMLDivElement>(".form__control")!;

  const formIsValid = Array.from(formControls).every(
    (formControl) => formControl.className === "form__control success"
  );

  if (formIsValid) {
    console.log({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
      passwordConfirmation: passwordConfirmationValue,
    });
  }
}

function setError(input: HTMLInputElement, message: string) {
  const formControl = input.parentElement!;
  const small = formControl.querySelector("small")!;

  formControl.className = "form__control error";

  small.innerHTML = message;
}

function setSuccess(input: HTMLInputElement) {
  const formControl = input.parentElement!;

  formControl.className = "form__control success";
}

function checkEmail(email: string) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export {};
