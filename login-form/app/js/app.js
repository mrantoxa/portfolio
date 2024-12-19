function showStep(stepId) {
  document
    .querySelectorAll(".step")
    .forEach((step) => step.classList.add("hidden"));
  document.getElementById(stepId).classList.remove("hidden");
}

// Function to reset all inputs
function resetAllFields() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  document
    .querySelectorAll(".error")
    .forEach((error) => (error.textContent = ""));
}

// Step 1: Login form
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  let isValid = true;

  emailError.textContent = "";
  passwordError.textContent = "";

  // Улучшенная валидация email
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    emailError.textContent = "Введите корректный email.";
    isValid = false;
  }

  // Добавлена проверка на спецсимволы в пароле
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Пожалуйста, введите правильный email адрес";
    emailError.style.color = "red";
    isValid = false;
  }

  if (isValid) {
    showStep("step2");
  }
});

// Step 2: Code input
const codeForm = document.getElementById("codeForm");
const codeInputs = document.querySelectorAll(".code-input");
const codeError = document.getElementById("codeError");

codeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = Array.from(codeInputs)
    .map((input) => input.value)
    .join("");

  if (code !== "123456") {
    // Example correct code
    codeError.textContent = "Код введён неверно.";
    return;
  }

  if (code !== "123456") {
    // Example correct code
    codeError.textContent = "Код введён неверно.";
    return;
  }

  showStep("step3");
});

// Automatically move between code inputs
codeInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < codeInputs.length - 1) {
      codeInputs[index + 1].focus();
    }
  });
});

// Step 3: Logout
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {
  resetAllFields();
  showStep("step1");
});
