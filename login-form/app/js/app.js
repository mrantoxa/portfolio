function showStep(step) {
  document
    .querySelectorAll(".step")
    .forEach((step) => step.classList.add("hidden"));
  document.getElementById(step).classList.remove("hidden");
  if (step === "step2") {
    hideLoginTitle();
    document.getElementById("code1").focus();
  } else if (step === "step1") {
    showLoginTitle();
  }
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
const loginTitle = document.getElementById("loginTitle");

function hideLoginTitle() {
  loginTitle.style.display = "none";
}

function showLoginTitle() {
  loginTitle.style.display = "block";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  try {
    let hasErrors = false;

    // Enhanced email validation
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.color = "red";
      hasErrors = true;
    }

    // Password validation - required field
    if (!password) {
      passwordError.textContent = "Password is required";
      passwordError.style.color = "red";
      hasErrors = true;
    }

    if (hasErrors) {
      throw new Error("Validation failed");
    }

    hideLoginTitle();
    showStep("step2");
  } catch (error) {
    // Errors are already displayed
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
    codeError.textContent = "Invalid code";
    return;
  }

  showStep("step3");
});

// Auto moving between code inputs
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
