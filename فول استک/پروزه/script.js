// گرفتن المان مودال از DOM
const modal = document.getElementById("authModal");
const modalTitle = document.getElementById("modalTitle");

// تابعی برای باز کردن مودال ورود یا ثبت‌نام
function openModal(type) {
  // نمایش مودال با تغییر استایل display
  modal.style.display = "flex";

  // تغییر عنوان بر اساس دکمه کلیک شده
  if (type === "login") {
    modalTitle.innerText = "ورود به حساب کاربری";
  } else if (type === "register") {
    modalTitle.innerText = "ثبت‌نام در مَهراد CNC";
  }
}

// تابعی برای بستن مودال
function closeModal() {
  modal.style.display = "none";
}

// بستن مودال در صورت کلیک روی فضای تاریک بیرون آن
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
