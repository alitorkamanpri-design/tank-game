// ============================================================
// برنامه مدیریت اضافه‌کاری - نسخه 2.0 (تکمیل‌شده و Responsive)
// ============================================================

// آرایه برای ذخیره رکوردهای اضافه‌کاری (تمام داده‌ها از localStorage - دائمی)
let overtimeRecords = JSON.parse(localStorage.getItem("overtimeRecords")) || [];

// تنظیم timezone پیش‌فرض
moment.tz.setDefault("Asia/Tehran");

console.log("🚀 سیستم راه‌اندازی شد");

// ==================== توابع کمکی ====================

// تابع ذخیره در Local Storage (داده‌ها باقی می‌مانند بعد بستن برنامه)
function saveToLocalStorage() {
  localStorage.setItem("overtimeRecords", JSON.stringify(overtimeRecords));
  console.log("✓ داده‌ها با موفقیت ذخیره شدند");
}

// تابع تبدیل اعداد انگلیسی به فارسی
function toPersianNum(str) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(str).replace(/[0-9]/g, (d) => persianNumbers[d]);
}

// تابع تبدیل اعداد فارسی به انگلیسی
function toEnglishNum(str) {
  return String(str)
    .replace(/۰/g, "0")
    .replace(/۱/g, "1")
    .replace(/۲/g, "2")
    .replace(/۳/g, "3")
    .replace(/۴/g, "4")
    .replace(/۵/g, "5")
    .replace(/۶/g, "6")
    .replace(/۷/g, "7")
    .replace(/۸/g, "8")
    .replace(/۹/g, "9");
}

// تابع محاسبه تعداد ساعات کارکرد
function calculateHours(startTime, endTime) {
  const start = moment(`1970-01-01T${startTime}:00`);
  let end = moment(`1970-01-01T${endTime}:00`);
  if (end.isBefore(start)) {
    end.add(1, "day"); // عبور از نیمه‌شب
  }
  const diff = end.diff(start, "hours", true);
  return Math.max(0, diff);
}

// تابع فرمت مبلغ با جداکننده هزارگان
function formatWithComma(num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// تابع فرمت مبلغ به ریال
function formatCurrency(amount) {
  if (isNaN(amount) || amount < 0) return "۰ ریال";
  const formatted = formatWithComma(Math.round(amount));
  return toPersianNum(formatted) + " ریال";
}

// تابع گرفتن تاریخ شمسی
function getJalaliDate(gregorianDate) {
  return moment(gregorianDate).locale("fa").format("jYYYY/jMM/jDD");
}

// تابع گرفتن نام روز هفته به فارسی
function getDayName(gregorianDate) {
  const date = new Date(gregorianDate);
  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];
  return days[date.getDay()];
}

// ماه‌های شمسی
const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// تابع به‌روزرسانی داشبورد
function updateDashboard() {
  const now = moment().locale("fa");
  const currentMonth = now.format("jMM");
  const currentYear = now.format("jYYYY");

  let totalHours = 0;
  let totalAmount = 0;
  let totalDays = 0;

  overtimeRecords.forEach((record) => {
    const jalaliDate = getJalaliDate(record.date);
    const [year, month] = jalaliDate.split("/");
    if (year === currentYear && month === currentMonth) {
      const hours = calculateHours(record.startTime, record.endTime);
      const amount = hours * record.rate;
      totalHours += hours;
      totalAmount += amount;
      totalDays++;
    }
  });

  document.getElementById("total-hours").textContent = toPersianNum(
    totalHours.toFixed(2),
  );
  document.getElementById("total-amount").textContent =
    formatCurrency(totalAmount);
  document.getElementById("total-days").textContent = toPersianNum(
    totalDays.toString(),
  );
}

// تابع نمایش/پنهان جدول و پیام خالی
function updateTableDisplay() {
  const table = document.getElementById("overtime-table");
  const emptyMessage = document.getElementById("empty-message");

  if (overtimeRecords.length === 0) {
    table.classList.remove("show");
    emptyMessage.style.display = "block";
  } else {
    table.classList.add("show");
    emptyMessage.style.display = "none";
  }
}

// تابع رندر جدول گزارش
function renderTable(filteredRecords = overtimeRecords) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // پاک کردن محتوای قبلی

  let totalHours = 0;
  let totalAmount = 0;

  if (filteredRecords.length === 0) {
    updateTableDisplay();
    return;
  }

  filteredRecords.forEach((record, index) => {
    // پیدا کردن اندکس اصلی در overtimeRecords
    const originalIndex = overtimeRecords.findIndex(
      (r) =>
        r.date === record.date &&
        r.startTime === record.startTime &&
        r.endTime === record.endTime &&
        r.rate === record.rate,
    );

    const jalaliDate = getJalaliDate(record.date);
    const hours = calculateHours(record.startTime, record.endTime);
    const amount = hours * record.rate;
    totalHours += hours;
    totalAmount += amount;

    // ایجاد ردیف جدول
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${jalaliDate}</td>
      <td>${getDayName(record.date)}</td>
      <td>${toPersianNum(record.startTime)}</td>
      <td>${toPersianNum(record.endTime)}</td>
      <td>${toPersianNum(hours.toFixed(2))}</td>
      <td>${formatCurrency(amount)}</td>
      <td>
        <button class="edit" onclick="editRecord(${originalIndex})" title="ویرایش">✏️</button>
        <button class="delete" onclick="deleteRecord(${originalIndex})" title="حذف">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // نمایش مجموع کل
  document.getElementById("report-total-hours").textContent = toPersianNum(
    totalHours.toFixed(2),
  );
  document.getElementById("report-total-amount").textContent =
    formatCurrency(totalAmount);

  updateTableDisplay();
}

// تابع ویرایش رکورد
function editRecord(index) {
  const record = overtimeRecords[index];

  // پر کردن فرم با داده‌های رکورد
  document.getElementById("date").value = getJalaliDate(record.date);
  document.getElementById("day-name").textContent = getDayName(record.date);
  document.getElementById("start-time").value = record.startTime;
  document.getElementById("end-time").value = record.endTime;
  document.getElementById("rate").value = toPersianNum(
    formatWithComma(Math.round(record.rate)),
  );

  // حذف رکورد از آرایه (برای ویرایش)
  overtimeRecords.splice(index, 1);
  saveToLocalStorage();
  renderTable();
  updateDashboard();

  // اسکرول به فرم
  document
    .getElementById("form-section")
    .scrollIntoView({ behavior: "smooth" });
}

// تابع حذف رکورد
function deleteRecord(index) {
  if (confirm("آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.")) {
    overtimeRecords.splice(index, 1);
    saveToLocalStorage();
    renderTable();
    updateDashboard();
    console.log("✓ رکورد حذف شد");
  }
}

// تابع حذف تمام رکوردها
function clearAllRecords() {
  if (
    confirm(
      "⚠️ آیا مطمئن هستید؟ تمام رکوردها برای همیشه حذف می‌شوند!\n\nاین عملیات قابل بازگشت نیست.",
    )
  ) {
    overtimeRecords = [];
    saveToLocalStorage();
    renderTable();
    updateDashboard();
    document.getElementById("overtime-form").reset();
    document.getElementById("day-name").textContent = "";
    alert("✓ تمام رکوردها حذف شدند");
    console.log("✓ تمام رکوردها حذف شدند");
  }
}

// رویداد ثبت فرم
document
  .getElementById("overtime-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // جلوگیری از ارسال فرم

    // دریافت مقادیر فرم
    const dateJalali = document.getElementById("date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const rateStr = toEnglishNum(
      document.getElementById("rate").value.replace(/,/g, ""),
    );
    const rate = parseFloat(rateStr);

    if (!dateJalali) {
      alert("❌ تاریخ را انتخاب کنید.");
      return;
    }
    if (!startTime) {
      alert("❌ ساعت شروع را وارد کنید.");
      return;
    }
    if (!endTime) {
      alert("❌ ساعت پایان را وارد کنید.");
      return;
    }
    if (isNaN(rate) || rate <= 0) {
      alert("❌ مبلغ دستمزد باید عدد مثبت باشد.");
      return;
    }

    // تبدیل تاریخ شمسی به میلادی
    let gregorianDate;
    try {
      gregorianDate = moment(dateJalali, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
      if (gregorianDate === "Invalid date") {
        alert("❌ تاریخ نامعتبر است.");
        return;
      }
    } catch (err) {
      alert("❌ خطا در تبدیل تاریخ.");
      return;
    }

    // بررسی ساعات
    if (startTime === endTime) {
      alert("❌ ساعت شروع و پایان نمی‌توانند یکسان باشند.");
      return;
    }

    // اضافه کردن رکورد جدید
    overtimeRecords.push({
      date: gregorianDate,
      startTime,
      endTime,
      rate,
    });

    saveToLocalStorage();
    renderTable();
    updateDashboard();

    // ریست فرم
    this.reset();
    document.getElementById("day-name").textContent = "";

    alert("✓ رکورد با موفقیت ثبت شد!");
    console.log("✓ رکورد جدید اضافه شد");
  });

// تابع فیلتر رکوردها بر اساس ماه و سال شمسی
function filterRecords() {
  const selectedMonth = document.getElementById("month-filter").value;
  const selectedYear = document.getElementById("year-filter").value;

  let filtered = overtimeRecords;

  if (selectedMonth || selectedYear) {
    filtered = filtered.filter((record) => {
      const jalaliDate = getJalaliDate(record.date);
      const [year, month] = jalaliDate.split("/");
      return (
        (!selectedMonth || month == selectedMonth) &&
        (!selectedYear || year == selectedYear)
      );
    });
  }

  renderTable(filtered);
}

// رویداد تغییر فیلترها
document
  .getElementById("month-filter")
  .addEventListener("change", filterRecords);
document
  .getElementById("year-filter")
  .addEventListener("change", filterRecords);

// پر کردن گزینه‌های فیلتر ماه شمسی
const monthFilter = document.getElementById("month-filter");
jalaliMonths.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = (index + 1).toString().padStart(2, "0");
  option.textContent = month;
  monthFilter.appendChild(option);
});

// پر کردن گزینه‌های فیلتر سال شمسی
const yearFilter = document.getElementById("year-filter");
const currentJalaliYear = moment().locale("fa").format("jYYYY");
for (
  let i = parseInt(currentJalaliYear) - 5;
  i <= parseInt(currentJalaliYear) + 5;
  i++
) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearFilter.appendChild(option);
}

// راه‌اندازی Date Picker
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.querySelector("#date");

  // ایجاد date picker
  new pwtDatePicker(dateInput, {
    mode: "jalali",
    format: "jYYYY/jMM/jDD",
    onSelect: function (date) {
      const jalaliStr = date.format("jYYYY/jMM/jDD");
      dateInput.value = jalaliStr;
      const gregorian = moment(jalaliStr, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
      document.getElementById("day-name").textContent = getDayName(gregorian);
    },
  });
});

// رویداد برای مبلغ: فقط عدد و auto-format با جداکننده هزارگان
document.getElementById("rate").addEventListener("input", function () {
  // تبدیل فارسی به عددی
  let value = toEnglishNum(this.value)
    .replace(/,/g, "")
    .replace(/[^0-9]/g, "");

  if (value) {
    // حذف صفرهای قبلی و فرمت کنید با جداکننده هزارگان
    let formatted = parseInt(value, 10);
    if (formatted > 0) {
      this.value = toPersianNum(formatWithComma(formatted));
    } else {
      this.value = "";
    }
  } else {
    this.value = "";
  }
});

// تابع صادرات به اکسل
function exportToExcel() {
  try {
    console.log("شروع صادرات...");

    if (!overtimeRecords || overtimeRecords.length === 0) {
      alert("هیچ رکوردی برای صادرات وجود ندارد!");
      return;
    }

    console.log(`تعداد رکوردها: ${overtimeRecords.length}`);

    const data = [];
    let totalHours = 0;
    let totalAmount = 0;

    // سرتیتر
    data.push([
      "تاریخ شمسی",
      "روز هفته",
      "ساعت شروع",
      "ساعت پایان",
      "تعداد ساعات",
      "دستمزد به ازای ساعت (ریال)",
      "مبلغ کل (ریال)",
    ]);

    // داده‌های رکوردها
    overtimeRecords.forEach((record, i) => {
      try {
        const jalaliDate = getJalaliDate(record.date);
        const dayName = getDayName(record.date);
        const hours = calculateHours(record.startTime, record.endTime);
        const amount = hours * record.rate;

        totalHours += hours;
        totalAmount += amount;

        data.push([
          jalaliDate,
          dayName,
          record.startTime,
          record.endTime,
          parseFloat(hours.toFixed(2)),
          parseInt(record.rate),
          parseInt(amount.toFixed(0)),
        ]);
      } catch (e) {
        console.error(`خطا در ردیف ${i}:`, e);
      }
    });

    // سطر فاصله
    data.push(["", "", "", "", "", "", ""]);

    // سطر مجموع
    data.push([
      "مجموع کل",
      "",
      "",
      "",
      parseFloat(totalHours.toFixed(2)),
      "",
      parseInt(totalAmount.toFixed(0)),
    ]);

    console.log("داده‌ها آماده شدند");

    // ایجاد Workbook
    const ws = XLSX.utils.aoa_to_sheet(data);

    // تنظیم عرض ستون‌ها
    ws["!cols"] = [
      { wch: 15 }, // تاریخ
      { wch: 12 }, // روز
      { wch: 12 }, // شروع
      { wch: 12 }, // پایان
      { wch: 12 }, // ساعات
      { wch: 20 }, // دستمزد
      { wch: 15 }, // مبلغ
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "اضافه‌کاری");

    console.log("Workbook آماده شد");

    // دانلود
    const today = moment().format("YYYY-MM-DD");
    const filename = `اضافه_کاری_${today}.xlsx`;
    XLSX.writeFile(wb, filename);

    console.log("✓ فایل دانلود شد: " + filename);
    alert("فایل Excel با موفقیت دانلود شد!");
  } catch (error) {
    console.error("خطا در صادرات:", error);
    alert("خطایی در صادرات اکسل رخ داد:\n" + error.message);
  }
}

// تنظیم رویداد دکمه صادرات بعد از تمام کد
setTimeout(() => {
  // بررسی اینکه XLSX لوڈ شده است
  if (typeof XLSX === "undefined") {
    console.error("✗ کتابخانه XLSX لوڈ نشده");
    alert("خطا: کتابخانه Excel لوڈ نشده است");
    return;
  }
  console.log("✓ کتابخانه XLSX لوڈ شد");

  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      exportToExcel();
    });
    console.log("✓ دکمه صادرات تنظیم شد");
  } else {
    console.error("✗ دکمه صادرات پیدا نشد");
  }
}, 100);

// رندر اولیه
renderTable();
updateDashboard();
