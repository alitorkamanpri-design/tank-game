// ============================================================
// برنامه مدیریت اضافه‌کاری - نسخه 2.0 (تکمیل‌شده و پاسخگو)
// تمام داده‌ها محلی در localStorage ذخیره می‌شوند
// ============================================================

// آرایه برای ذخیره رکوردهای اضافه‌کاری (تمام داده‌ها از localStorage - دائمی)
let overtimeRecords = JSON.parse(localStorage.getItem("overtimeRecords")) || [];

// تنظیم timezone پیش‌فرض
moment.tz.setDefault("Asia/Tehran");

// نمایش اطلاعات اولیه در کنسول
console.clear();
console.log(
  "%c🚀 برنامه مدیریت اضافه‌کاری - نسخه 2.0",
  "color: #bb86fc; font-size: 18px; font-weight: bold;",
);
console.log(
  "%c═══════════════════════════════════════",
  "color: #03dac6; font-size: 12px;",
);
console.log(
  `%c📦 تعداد رکوردهای موجود: ${overtimeRecords.length}`,
  "color: #03dac6; font-size: 12px;",
);
console.log(
  `%c💾 آخرین بروزرسانی: ${new Date().toLocaleString("fa-IR")}`,
  "color: #03dac6; font-size: 12px;",
);
console.log(
  "%c═══════════════════════════════════════",
  "color: #03dac6; font-size: 12px;",
);
console.log(
  "%c✅ برنامه آماده است",
  "color: #4caf50; font-size: 12px; font-weight: bold;",
);

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

// تابع فرمت مبلغ با جداکننده هزارگان (خودکار وقتی کاربر می‌نویسد)
function formatNumberWithCommas(num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// تابع حذف جداکننده‌ها
function removeCommas(str) {
  return String(str).replace(/,/g, "");
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

// ==================== توابع داشبورد و رندرینگ ====================

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
  tableBody.innerHTML = "";

  let totalHours = 0;
  let totalAmount = 0;

  if (filteredRecords.length === 0) {
    updateTableDisplay();
    return;
  }

  filteredRecords.forEach((record) => {
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

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${jalaliDate}</td>
      <td>${getDayName(record.date)}</td>
      <td>${toPersianNum(record.startTime)}</td>
      <td>${toPersianNum(record.endTime)}</td>
      <td>${toPersianNum(hours.toFixed(2))}</td>
      <td>${formatCurrency(amount)}</td>
      <td class="action-buttons">
        <button class="edit" onclick="editRecord(${originalIndex})" title="ویرایش">✏️</button>
        <button class="delete" onclick="deleteRecord(${originalIndex})" title="حذف">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById("report-total-hours").textContent = toPersianNum(
    totalHours.toFixed(2),
  );
  document.getElementById("report-total-amount").textContent =
    formatCurrency(totalAmount);

  updateTableDisplay();
}

// ==================== توابع ویرایش و حذف ====================

// تابع ویرایش رکورد
function editRecord(index) {
  if (index < 0 || index >= overtimeRecords.length) return;

  const record = overtimeRecords[index];
  document.getElementById("date-picker").value = record.date;
  document.getElementById("start-time").value = record.startTime;
  document.getElementById("end-time").value = record.endTime;
  // فقط مقدار عددی را نمایش بده، بدون فاصله
  document.getElementById("rate").value = Math.round(record.rate).toString();

  overtimeRecords.splice(index, 1);
  saveToLocalStorage();
  renderTable();
  updateDashboard();

  document
    .getElementById("form-section")
    .scrollIntoView({ behavior: "smooth" });
  alert("ℹ️ اطلاعات رکورد در فرم لوڈ شد. بعد از تغییرات، دوباره ثبت کنید.");
}

// تابع حذف رکورد
function deleteRecord(index) {
  if (index < 0 || index >= overtimeRecords.length) return;

  if (confirm("⚠️ آیا مطمئن هستید؟\n\nاین عملیات قابل بازگشت نیست.")) {
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
      "⚠️⚠️ هشدار خطیر!\n\nآیا مطمئن هستید؟ تمام رکوردها برای همیشه حذف می‌شوند!\nاین عملیات قابل بازگشت نیست.",
    )
  ) {
    overtimeRecords = [];
    saveToLocalStorage();
    renderTable();
    updateDashboard();
    document.getElementById("overtime-form").reset();
    alert("✓ تمام رکوردها حذف شدند");
    console.log("✓ تمام رکوردها به طور کامل حذف شدند");
  }
}

// ==================== رویدادها ====================

// رویداد تغییر تاریخ (input type="date")
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔧 شروع تنظیم رویدادها...");
  console.log("📍 DOM لوڈ شده است");

  const datePickerInput = document.getElementById("date-picker");
  const submitBtn = document.getElementById("submit-btn");
  const rateInput = document.getElementById("rate");

  console.log("✓ datePickerInput:", datePickerInput ? "یافت شد" : "نیافت");
  console.log("✓ submitBtn:", submitBtn ? "یافت شد" : "نیافت");
  console.log("✓ rateInput:", rateInput ? "یافت شد" : "نیافت");

  // تنظیم رویداد تاریخ
  if (datePickerInput) {
    // تاریخ امروز به‌طور پیش‌فرض
    const today = moment().format("YYYY-MM-DD");
    datePickerInput.value = today;
    console.log("✓ تاریخ امروز تنظیم شد");
  }

  // تنظیم رویداد دستمزد (فقط اعداد)
  if (rateInput) {
    rateInput.addEventListener("input", function () {
      // فقط اعداد اجازه داره
      this.value = this.value.replace(/[^0-9]/g, "");
    });
    console.log("✓ رویداد دستمزد تنظیم شد");
  }

  // تنظیم رویداد دکمه ثبت
  if (submitBtn) {
    console.log("✅ رویداد دکمه ثبت آماده است");
    submitBtn.addEventListener("click", function (e) {
      console.log("🔔 دکمه ثبت کلیک شد");
      e.preventDefault();
      e.stopPropagation();

      // دریافت مقادیر
      const datePicker = document.getElementById("date-picker").value.trim();
      const startTime = document.getElementById("start-time").value.trim();
      const endTime = document.getElementById("end-time").value.trim();
      const rateStr = document.getElementById("rate").value.trim();
      const rate = parseFloat(rateStr);

      console.log("📋 داده‌ها:", { datePicker, startTime, endTime, rate });

      // بررسی خالی نبودن
      if (!datePicker) {
        alert("❌ تاریخ را انتخاب کنید");
        return;
      }
      if (!startTime) {
        alert("❌ ساعت شروع را وارد کنید");
        return;
      }
      if (!endTime) {
        alert("❌ ساعت پایان را وارد کنید");
        return;
      }
      if (!rateStr || isNaN(rate) || rate <= 0) {
        alert("❌ مبلغ معتبر وارد کنید (عدد مثبت)");
        return;
      }
      if (startTime === endTime) {
        alert("❌ ساعت شروع و پایان نمی‌توانند یکی باشند");
        return;
      }

      // ثبت رکورد
      const newRecord = {
        date: datePicker,
        startTime: startTime,
        endTime: endTime,
        rate: rate,
        timestamp: new Date().toISOString(), // برای اینکه بفهمیم کی اضافه شد
      };

      overtimeRecords.push(newRecord);
      console.log("✓ رکورد ثبت شد:", newRecord);

      saveToLocalStorage();
      renderTable();
      updateDashboard();

      // ریست فرم
      document.getElementById("overtime-form").reset();

      // تاریخ امروز
      const today = moment().format("YYYY-MM-DD");
      document.getElementById("date-picker").value = today;

      alert("✅ رکورد با موفقیت ثبت شد!");
      console.log("✓ فرم بازنشانی شد");
    });
    console.log("✓ رویداد دکمه ثبت متصل شد");
  } else {
    console.error("❌ دکمه ثبت پیدا نشد!");
  }

  // پر کردن فیلترها
  const monthFilter = document.getElementById("month-filter");
  jalaliMonths.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = (index + 1).toString().padStart(2, "0");
    option.textContent = month;
    monthFilter.appendChild(option);
  });

  const yearFilter = document.getElementById("year-filter");
  const currentJalaliYear = moment().locale("fa").format("jYYYY");
  for (
    let i = parseInt(currentJalaliYear) - 5;
    i <= parseInt(currentJalaliYear) + 5;
    i++
  ) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = toPersianNum(i.toString());
    yearFilter.appendChild(option);
  }

  // رویدادهای فیلتر
  document
    .getElementById("month-filter")
    .addEventListener("change", filterRecords);
  document
    .getElementById("year-filter")
    .addEventListener("change", filterRecords);

  // رویداد دکمه حذف همه
  document
    .getElementById("clear-all-btn")
    .addEventListener("click", clearAllRecords);

  // رویداد صادرات
  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      exportToExcel();
    });
    console.log("✓ دکمه صادرات تنظیم شد");
  }

  console.log("✓ تمام رویدادها تنظیم شد");
});

// ==================== صادرات به Excel ====================

function exportToExcel() {
  try {
    console.log("🔄 شروع صادرات...");

    if (!overtimeRecords || overtimeRecords.length === 0) {
      alert("❌ هیچ رکوردی برای صادرات وجود ندارد!");
      return;
    }

    if (typeof XLSX === "undefined") {
      alert("❌ کتابخانه Excel لوڈ نشده است. لطفاً دوباره تلاش کنید.");
      return;
    }

    const data = [];
    let totalHours = 0;
    let totalAmount = 0;

    data.push([
      "تاریخ شمسی",
      "روز هفته",
      "ساعت شروع",
      "ساعت پایان",
      "تعداد ساعات",
      "دستمزد (ریال/ساعت)",
      "مبلغ کل (ریال)",
    ]);

    overtimeRecords.forEach((record) => {
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
        console.error(`خطا در ردیف:`, e);
      }
    });

    data.push(["", "", "", "", "", "", ""]);
    data.push([
      "مجموع کل",
      "",
      "",
      "",
      parseFloat(totalHours.toFixed(2)),
      "",
      parseInt(totalAmount.toFixed(0)),
    ]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
      { wch: 15 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "اضافه-کاری");

    const today = moment().format("jYYYY-jMM-jDD");
    const filename = `گزارش_اضافه_کاری_${today}.xlsx`;
    XLSX.writeFile(wb, filename);

    alert("✓ فایل Excel با موفقیت دانلود شد!\n\n" + filename);
    console.log("✓ فایل دانلود شد: " + filename);
  } catch (error) {
    console.error("❌ خطا در صادرات:", error);
    alert("❌ خطایی در صادرات اکسل رخ داد:\n" + error.message);
  }
}

// تابع فیلتر کردن رکوردها برای نمایش
function filterRecords() {
  try {
    const monthFilter = document.getElementById("month-filter").value;
    const yearFilter = document.getElementById("year-filter").value;

    const filtered = overtimeRecords.filter((record) => {
      try {
        const jalaliDate = getJalaliDate(record.date);
        const parts = jalaliDate.split("/");

        if (!parts || parts.length < 2) return true;

        const year = parts[0];
        const month = parts[1];

        if (monthFilter && month !== monthFilter) return false;
        if (yearFilter && year !== yearFilter) return false;
        return true;
      } catch (e) {
        console.warn("خطا در فیلتر رکورد:", e);
        return true;
      }
    });

    renderTable(filtered);
  } catch (error) {
    console.error("خطا در filterRecords:", error);
    renderTable(overtimeRecords);
  }
}

// ==================== راه‌اندازی اولیه ====================

// اگاهی قبل از بستن صفحه (اگر داده‌ای ثبت نشده باشد)
window.addEventListener("beforeunload", function (e) {
  const form = document.getElementById("overtime-form");
  if (form && form.date.value) {
    e.preventDefault();
    e.returnValue =
      "⚠️ فرم تمام" +
      (form.date.value ? "شده است! ابتدا رکورد را ثبت کنید" : "");
  }
});

// توابع تجاری - Utility functions برای console
window.app = {
  // صادرات داده‌ها به صورت JSON
  exportDataJSON: function () {
    const data = {
      version: "2.0",
      exportDate: new Date().toISOString(),
      recordsCount: overtimeRecords.length,
      records: overtimeRecords,
    };
    const json = JSON.stringify(data, null, 2);
    console.log(
      "%c📊 داده‌های صادارت شده (JSON):",
      "color: #bb86fc; font-weight: bold;",
    );
    console.log(json);
    return json;
  },

  // واردات داده‌ها از JSON
  importDataJSON: function (jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.records && Array.isArray(data.records)) {
        overtimeRecords = data.records;
        saveToLocalStorage();
        renderTable();
        updateDashboard();
        console.log(
          `%c✅ ${data.records.length} رکورد وارد شد`,
          "color: #4caf50; font-weight: bold;",
        );
        return true;
      }
    } catch (e) {
      console.error("❌ خطا در واردات:", e);
      return false;
    }
  },

  // مشاهده آمار
  showStats: function () {
    let totalHours = 0;
    let totalAmount = 0;
    overtimeRecords.forEach((r) => {
      totalHours += calculateHours(r.startTime, r.endTime);
      totalAmount += calculateHours(r.startTime, r.endTime) * r.rate;
    });
    console.table({
      "تعداد رکوردها": overtimeRecords.length,
      "مجموع ساعات": totalHours.toFixed(2),
      "مجموع درآمد": Math.round(totalAmount) + " ریال",
    });
  },
};

renderTable();
updateDashboard();
console.log("✓ برنامه کاملا آماده است!");
