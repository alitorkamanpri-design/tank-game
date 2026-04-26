let currentUser = null;
let clients = [];
let projects = [];
let payments = [];
let editingId = null;

// بارگذاری اولیه
window.onload = function () {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("userAvatar").textContent = currentUser.name
    .charAt(0)
    .toUpperCase();

  loadData();
  loadDashboard();
};

function loadData() {
  clients = JSON.parse(
    localStorage.getItem("clients_" + currentUser.id) || "[]",
  );
  projects = JSON.parse(
    localStorage.getItem("projects_" + currentUser.id) || "[]",
  );
  payments = JSON.parse(
    localStorage.getItem("payments_" + currentUser.id) || "[]",
  );
}

function saveData() {
  localStorage.setItem("clients_" + currentUser.id, JSON.stringify(clients));
  localStorage.setItem("projects_" + currentUser.id, JSON.stringify(projects));
  localStorage.setItem("payments_" + currentUser.id, JSON.stringify(payments));
}

function showPage(page) {
  document
    .querySelectorAll(".page-content")
    .forEach((p) => (p.style.display = "none"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));

  document.getElementById(page + "Page").style.display = "block";
  event.target.classList.add("active");

  const titles = {
    dashboard: "داشبورد",
    clients: "مشتریان",
    projects: "پروژه‌ها",
    payments: "پرداخت‌ها",
  };
  document.getElementById("pageTitle").textContent = titles[page];

  if (page === "dashboard") loadDashboard();
  if (page === "clients") loadClients();
  if (page === "projects") loadProjects();
  if (page === "payments") loadPayments();
}

function loadDashboard() {
  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const pendingPayments = payments.filter((p) => p.status === "pending").length;

  document.getElementById("totalRevenue").textContent =
    totalRevenue.toLocaleString("fa-IR");
  document.getElementById("activeProjects").textContent =
    activeProjects.toLocaleString("fa-IR");
  document.getElementById("totalClients").textContent =
    clients.length.toLocaleString("fa-IR");
  document.getElementById("pendingPayments").textContent =
    pendingPayments.toLocaleString("fa-IR");

  drawChart();
  loadActivities();
}

function drawChart() {
  const canvas = document.getElementById("revenueChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];
  const data = [3000000, 5000000, 4000000, 7000000, 6000000, 8000000];
  const max = Math.max(...data);
  const barWidth = canvas.width / months.length - 20;

  data.forEach((value, i) => {
    const height = (value / max) * (canvas.height - 40);
    const x = i * (barWidth + 20) + 10;
    const y = canvas.height - height - 20;

    const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
    gradient.addColorStop(0, "#667eea");
    gradient.addColorStop(1, "#764ba2");

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, height);
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(months[i], x + barWidth / 2, canvas.height - 5);
  });
}

function loadActivities() {
  const activities = [
    ...payments
      .slice(-3)
      .map((p) => ({
        text: `پرداخت ${p.amount.toLocaleString("fa-IR")} تومان`,
        time: p.date,
      })),
    ...projects
      .slice(-2)
      .map((p) => ({
        text: `پروژه ${p.title} ایجاد شد`,
        time: new Date().toLocaleDateString("fa-IR"),
      })),
  ];

  document.getElementById("recentActivities").innerHTML = activities
    .map(
      (a) => `
        <div style="padding: 15px; border-bottom: 1px solid #f3f4f6;">
            <div style="color: #374151;">${a.text}</div>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 5px;">${a.time}</div>
        </div>
    `,
    )
    .join("");
}

// مشتریان
function loadClients() {
  document.getElementById("clientsTable").innerHTML = clients
    .map(
      (c) => `
        <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.company}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editClient(${c.id})">ویرایش</button>
                <button class="action-btn delete-btn" onclick="deleteClient(${c.id})">حذف</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

function showAddClientModal() {
  editingId = null;
  document.getElementById("clientModalTitle").textContent = "افزودن مشتری";
  document.getElementById("clientName").value = "";
  document.getElementById("clientEmail").value = "";
  document.getElementById("clientPhone").value = "";
  document.getElementById("clientCompany").value = "";
  document.getElementById("clientModal").style.display = "block";
}

function editClient(id) {
  const client = clients.find((c) => c.id === id);
  editingId = id;
  document.getElementById("clientModalTitle").textContent = "ویرایش مشتری";
  document.getElementById("clientName").value = client.name;
  document.getElementById("clientEmail").value = client.email;
  document.getElementById("clientPhone").value = client.phone;
  document.getElementById("clientCompany").value = client.company;
  document.getElementById("clientModal").style.display = "block";
}

function saveClient() {
  const name = document.getElementById("clientName").value;
  const email = document.getElementById("clientEmail").value;
  const phone = document.getElementById("clientPhone").value;
  const company = document.getElementById("clientCompany").value;

  if (!name || !email) {
    showToast("نام و ایمیل الزامی است");
    return;
  }

  if (editingId) {
    const client = clients.find((c) => c.id === editingId);
    Object.assign(client, { name, email, phone, company });
  } else {
    clients.push({ id: Date.now(), name, email, phone, company });
  }

  saveData();
  loadClients();
  closeModal("clientModal");
  showToast("مشتری ذخیره شد");
}

function deleteClient(id) {
  if (confirm("آیا مطمئن هستید؟")) {
    clients = clients.filter((c) => c.id !== id);
    saveData();
    loadClients();
    showToast("مشتری حذف شد");
  }
}

// پروژه
