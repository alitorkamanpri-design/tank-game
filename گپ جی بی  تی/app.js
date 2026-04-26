const saveBtn = document.getElementById("saveBtn");
const calcBtn = document.getElementById("calcBtn");
const daysList = document.getElementById("daysList");
const totalResult = document.getElementById("totalResult");

let data = JSON.parse(localStorage.getItem("overtime-data")) || [];

function saveData() {
  const day = document.getElementById("day").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const rate = document.getElementById("rate").value;

  if (!day || !start || !end || !rate) {
    alert("تمام فیلدها را کامل کنید");
    return;
  }

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const diffHours = (endMin - startMin) / 60;

  data.push({
    day,
    start,
    end,
    rate,
    hours: diffHours,
    total: diffHours * Number(rate),
  });

  localStorage.setItem("overtime-data", JSON.stringify(data));

  renderDays();
  clearInputs();
}

function clearInputs() {
  document.getElementById("day").value = "";
  document.getElementById("start").value = "";
  document.getElementById("end").value = "";
  document.getElementById("rate").value = "";
}

function renderDays() {
  daysList.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "day-card";
    card.innerHTML = `
            <h3>روز ${item.day}</h3>
            <p>از ${item.start} تا ${item.end}</p>
            <p>${item.hours.toFixed(2)} ساعت</p>
            <p>${item.total.toLocaleString()} تومان</p>
        `;
    daysList.appendChild(card);
  });
}

function calculateMonth() {
  let sum = data.reduce((acc, x) => acc + x.total, 0);
  totalResult.innerText = `مجموع اضافه‌کاری این ماه: ${sum.toLocaleString()} تومان`;
}

saveBtn.onclick = saveData;
calcBtn.onclick = calculateMonth;

renderDays();
