// متغیری برای ذخیره آخرین موقعیت اسکرول
let lastScrollTop = 0;
const header = document.getElementById("main-header");

window.addEventListener("scroll", function () {
  // گرفتن موقعیت فعلی اسکرول صفحه
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // کاربر به سمت پایین اسکرول کرده است -> مخفی کردن هدر
    // ارتفاع هدر 70 پیکسل است، پس آن را 70 پیکسل به بالا می‌بریم
    header.style.top = "-70px";
  } else {
    // کاربر به سمت بالا اسکرول کرده است -> نمایش مجدد هدر
    header.style.top = "0";
  }

  // به‌روزرسانی موقعیت قبلی
  lastScrollTop = scrollTop;
});
