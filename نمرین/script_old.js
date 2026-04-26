// آرایه برای ذخیره رکوردهای اضافه‌کاری
let overtimeRecords = JSON.parse(localStorage.getItem("overtimeRecords")) || [];

// تابع ذخیره در Local Storage
function saveToLocalStorage() {
  localStorage.setItem("overtimeRecords", JSON.stringify(overtimeRecords));
}

// تابع تبدیل تاریخ به میلادی بر اساس نوع تقویم
function convertToGregorian(dateStr, calendarType) {
  let m;
  if (calendarType === "jalali") {
    m = moment(dateStr, "jYYYY/jMM/jDD");
  } else if (calendarType === "hijri") {
    m = moment(dateStr, "iYYYY/iMM/iDD");
  } else {
    m = moment(dateStr, "YYYY-MM-DD");
  }
  return m.format("YYYY-MM-DD");
}

// تابع گرفتن تاریخ در فرمت‌های مختلف
function getDateFormats(gregorianDate) {
  const m = moment(gregorianDate);
  return {
    gregorian: m.format("YYYY-MM-DD"),
    jalali: m.locale("fa").format("YYYY/MM/DD"),
    hijri: m.locale("en").format("iYYYY/iMM/iDD"),
  };
}

// تابع دریافت نام روز هفته به فارسی
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

// تابع محاسبه تعداد ساعات کارکرد
function calculateHours(startTime, endTime) {
  const start = moment(`1970-01-01T${startTime}:00`);
  let end = moment(`1970-01-01T${endTime}:00`);
  if (end.isBefore(start)) {
    end.add(1, "day"); // عبور از نیمه‌شب
  }
  const diff = end.diff(start, "hours", true);
  return diff;
}

// تابع فرمت مبلغ به ریال
function formatCurrency(amount) {
  return Math.round(amount).toLocaleString("fa-IR") + " ریال";
}

// تابع رندر جدول
function renderTable(filteredRecords = overtimeRecords) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // پاک کردن محتوای قبلی

  let totalHours = 0;
  let totalAmount = 0;

  filteredRecords.forEach((record, index) => {
    const gregorianDate = convertToGregorian(record.date, record.calendarType);
    const dates = getDateFormats(gregorianDate);
    const hours = calculateHours(record.startTime, record.endTime);
    const amount = hours * record.rate;
    totalHours += hours;
    totalAmount += amount;

    // ایجاد ردیف جدول
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${record.date} (${record.calendarType})</td>
            <td>${dates.gregorian}</td>
            <td>${dates.jalali}</td>
            <td>${dates.hijri}</td>
            <td>${getDayName(gregorianDate)}</td>
            <td>${record.startTime}</td>
            <td>${record.endTime}</td>
            <td>${hours.toFixed(2)}</td>
            <td>${formatCurrency(amount)}</td>
            <td>
                <button class="edit" onclick="editRecord(${index})">ویرایش</button>
                <button class="delete" onclick="deleteRecord(${index})">حذف</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  // نمایش مجموع کل
  document.getElementById("total-hours").textContent = totalHours.toFixed(2);
  document.getElementById("total-amount").textContent =
    formatCurrency(totalAmount);
}

// تابع ویرایش رکورد
function editRecord(index) {
  const record = overtimeRecords[index];

  // پر کردن فرم با داده‌های رکورد
  document.getElementById("calendar-type").value = record.calendarType;
  document.getElementById("date").value = convertToGregorian(
    record.date,
    record.calendarType,
  );
  document.getElementById("start-time").value = record.startTime;
  document.getElementById("end-time").value = record.endTime;
  document.getElementById("rate").value = record.rate;

  // حذف رکورد از آرایه (برای ویرایش)
  overtimeRecords.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}

// تابع حذف رکورد
function deleteRecord(index) {
  if (confirm("آیا مطمئن هستید که می‌خواهید این رکورد را حذف کنید؟")) {
    overtimeRecords.splice(index, 1);
    saveToLocalStorage();
    renderTable();
  }
}

// رویداد ثبت فرم
document
  .getElementById("overtime-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // جلوگیری از ارسال فرم

    // دریافت مقادیر فرم
    const calendarType = document.getElementById("calendar-type").value;
    const date = document.getElementById("date").value; // این میلادی است
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const rate = parseFloat(document.getElementById("rate").value);

    // ذخیره تاریخ در فرمت انتخابی
    let dateStr;
    if (calendarType === "jalali") {
      dateStr = moment(date).locale("fa").format("YYYY/MM/DD");
    } else if (calendarType === "hijri") {
      dateStr = moment(date).locale("en").format("iYYYY/iMM/iDD");
    } else {
      dateStr = date;
    }

    // اضافه کردن رکورد جدید
    overtimeRecords.push({
      calendarType,
      date: dateStr,
      startTime,
      endTime,
      rate,
    });
    saveToLocalStorage();
    renderTable();

    // ریست فرم
    this.reset();
  });

// پر کردن گزینه‌های فیلتر ماه
const monthFilter = document.getElementById("month-filter");
for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `ماه ${i}`;
  monthFilter.appendChild(option);
}

// پر کردن گزینه‌های فیلتر سال
const yearFilter = document.getElementById("year-filter");
const currentYear = new Date().getFullYear();
for (let i = currentYear - 5; i <= currentYear + 5; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearFilter.appendChild(option);
}

// تابع فیلتر رکوردها
function filterRecords() {
  const selectedCalendar = document.getElementById("calendar-filter").value;
  const selectedMonth = document.getElementById("month-filter").value;
  const selectedYear = document.getElementById("year-filter").value;

  let filtered = overtimeRecords;

  if (selectedCalendar) {
    filtered = filtered.filter(
      (record) => record.calendarType === selectedCalendar,
    );
  }

  if (selectedMonth || selectedYear) {
    filtered = filtered.filter((record) => {
      const gregorianDate = convertToGregorian(
        record.date,
        record.calendarType,
      );
      const date = new Date(gregorianDate);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
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
  .getElementById("calendar-filter")
  .addEventListener("change", filterRecords);
document
  .getElementById("month-filter")
  .addEventListener("change", filterRecords);
document
  .getElementById("year-filter")
  .addEventListener("change", filterRecords);

// رویداد Export به CSV
document.getElementById("export-csv").addEventListener("click", function () {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent +=
    "تاریخ انتخابی,تاریخ میلادی,تاریخ شمسی,تاریخ قمری,روز هفته,ساعت شروع,ساعت پایان,تعداد ساعات,مبلغ کل\n"; // هدر

  overtimeRecords.forEach((record) => {
    const gregorianDate = convertToGregorian(record.date, record.calendarType);
    const dates = getDateFormats(gregorianDate);
    const hours = calculateHours(record.startTime, record.endTime);
    const amount = Math.round(hours * record.rate);
    csvContent += `${record.date} (${record.calendarType}),${dates.gregorian},${dates.jalali},${dates.hijri},${getDayName(gregorianDate)},${record.startTime},${record.endTime},${hours.toFixed(2)},${amount}\n`;
  });

  // ایجاد لینک دانلود
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "overtime_records.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// رویداد Export به PDF
document.getElementById("export-pdf").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.text("گزارش اضافه‌کاری", 10, 10);

  let y = 20;
  overtimeRecords.forEach((record) => {
    const gregorianDate = convertToGregorian(record.date, record.calendarType);
    const dates = getDateFormats(gregorianDate);
    const hours = calculateHours(record.startTime, record.endTime);
    const amount = Math.round(hours * record.rate);
    const line = `${record.date} (${record.calendarType}) - ${dates.gregorian} - ${getDayName(gregorianDate)} - ${record.startTime}-${record.endTime} - ${hours.toFixed(2)}h - ${formatCurrency(amount)}`;
    doc.text(line, 10, y);
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("overtime_report.pdf");
});

// رندر اولیه جدول
renderTable();
