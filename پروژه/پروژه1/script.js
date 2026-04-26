// مدیریت صفحه ورود و ثبت‌نام
function showRegister() {
  document.querySelector(".auth-container").style.display = "none";
  document.getElementById("registerContainer").style.display = "flex";
}

function showLogin() {
  document.querySelector(".auth-container").style.display = "flex";
  document.getElementById("registerContainer").style.display = "none";
}

// مدیریت ورود
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("ایمیل یا رمز عبور اشتباه است");
  }
});

// مدیریت ثبت‌نام
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      alert("این ایمیل قبلاً ثبت شده است");
      return;
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("ثبت‌نام با موفقیت انجام شد");
    showLogin();
  });
