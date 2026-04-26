// State Management
let currentUser = null;
let clients = [];
let projects = [];
let payments = [];
let currentPage = "dashboard";

// Mock Data
const mockClients = [
  {
    id: 1,
    name: "شرکت آلفا",
    email: "alpha@example.com",
    phone: "09121234567",
    status: "فعال",
    projects: 3,
    totalPaid: 45000000,
  },
  {
    id: 2,
    name: "شرکت بتا",
    email: "beta@example.com",
    phone: "09129876543",
    status: "فعال",
    projects: 2,
    totalPaid: 30000000,
  },
  {
    id: 3,
    name: "شرکت گاما",
    email: "gamma@example.com",
    phone: "09123456789",
    status: "غیرفعال",
    projects: 1,
    totalPaid: 15000000,
  },
];

const mockProjects = [
  {
    id: 1,
    title: "طراحی وبسایت",
    clientId: 1,
    status: "در حال انجام",
    budget: 20000000,
    deadline: "2026-04-15",
    progress: 60,
  },
  {
    id: 2,
    title: "اپلیکیشن موبایل",
    clientId: 1,
    status: "در حال انجام",
    budget: 35000000,
    deadline: "2026-05-20",
    progress: 40,
  },
  {
    id: 3,
    title: "سیستم مدیریت",
    clientId: 2,
    status: "تکمیل شده",
    budget: 25000000,
    deadline: "2026-03-10",
    progress: 100,
  },
];

const mockPayments = [
  {
    id: 1,
    projectId: 1,
    amount: 10000000,
    date: "2026-03-15",
    status: "پرداخت شده",
    method: "کارت به کارت",
  },
  {
    id: 2,
    projectId: 2,
    amount: 15000000,
    date: "2026-03-20",
    status: "پرداخت شده",
    method: "چک",
  },
  {
    id: 3,
    projectId: 3,
    amount: 25000000,
    date: "2026-03-10",
    status: "پرداخت شده",
    method: "واریز",
  },
];

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("currentUser");
  const savedClients = localStorage.getItem("clients");
  const savedProjects = localStorage.getItem("projects");
  const savedPayments = localStorage.getItem("payments");

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    clients = savedClients ? JSON.parse(savedClients) : mockClients;
    projects = savedProjects ? JSON.parse(savedProjects) : mockProjects;
    payments = savedPayments ? JSON.parse(savedPayments) : mockPayments;

    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    showPage("dashboard");
  } else {
    document.getElementById("auth-section").classList.remove("hidden");
    document.getElementById("dashboard-section").classList.add("hidden");
  }

  // Event Listeners
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document
    .getElementById("register-form")
    .addEventListener("submit", handleRegister);
  document.getElementById("logout-btn").addEventListener("click", handleLogout);
  document
    .getElementById("show-register")
    .addEventListener("click", showRegister);
  document.getElementById("show-login").addEventListener("click", showLogin);

  // Sidebar Navigation
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const page = e.currentTarget.dataset.page;
      showPage(page);
    });
  });

  // Client Management
  document
    .getElementById("add-client-btn")
    .addEventListener("click", () => openClientModal());
  document
    .getElementById("close-client-modal")
    .addEventListener("click", closeClientModal);
  document
    .getElementById("cancel-client")
    .addEventListener("click", closeClientModal);
  document.getElementById("client-form").addEventListener("submit", saveClient);
  document
    .getElementById("client-search")
    .addEventListener("input", filterClients);

  // Project Management
  document
    .getElementById("add-project-btn")
    .addEventListener("click", () => openProjectModal());
  document
    .getElementById("close-project-modal")
    .addEventListener("click", closeProjectModal);
  document
    .getElementById("cancel-project")
    .addEventListener("click", closeProjectModal);
  document
    .getElementById("project-form")
    .addEventListener("submit", saveProject);
  document
    .getElementById("project-search")
    .addEventListener("input", filterProjects);

  // Payment Management
  document
    .getElementById("add-payment-btn")
    .addEventListener("click", () => openPaymentModal());
  document
    .getElementById("close-payment-modal")
    .addEventListener("click", closePaymentModal);
  document
    .getElementById("cancel-payment")
    .addEventListener("click", closePaymentModal);
  document
    .getElementById("payment-form")
    .addEventListener("submit", savePayment);

  // Settings
  document
    .getElementById("profile-form")
    .addEventListener("submit", updateProfile);
});

// Authentication Functions
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!validateEmail(email)) {
    showToast("ایمیل معتبر نیست", "error");
    return;
  }

  if (password.length < 6) {
    showToast("رمز عبور باید حداقل 6 کاراکتر باشد", "error");
    return;
  }

  currentUser = {
    id: Date.now(),
    name: email.split("@")[0],
    email: email,
    role: "فریلنسر",
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  if (!localStorage.getItem("clients")) {
    clients = mockClients;
    projects = mockProjects;
    payments = mockPayments;
    saveToLocalStorage();
  }

  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("dashboard-section").classList.remove("hidden");
  showPage("dashboard");
  showToast("خوش آمدید!", "success");
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!name || name.length < 2) {
    showToast("نام باید حداقل 2 کاراکتر باشد", "error");
    return;
  }

  if (!validateEmail(email)) {
    showToast("ایمیل معتبر نیست", "error");
    return;
  }

  if (password.length < 6) {
    showToast("رمز عبور باید حداقل 6 کاراکتر باشد", "error");
    return;
  }

  currentUser = {
    id: Date.now(),
    name: name,
    email: email,
    role: "فریلنسر",
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  clients = mockClients;
  projects = mockProjects;
  payments = mockPayments;
  saveToLocalStorage();

  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("dashboard-section").classList.remove("hidden");
  showPage("dashboard");
  showToast("حساب شما با موفقیت ساخته شد!", "success");
}

function handleLogout() {
  localStorage.removeItem("currentUser");
  currentUser = null;
  document.getElementById("dashboard-section").classList.add("hidden");
  document.getElementById("auth-section").classList.remove("hidden");
  showToast("با موفقیت خارج شدید", "success");
}

function showLogin() {
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("register-section").classList.add("hidden");
}

function showRegister() {
  document.getElementById("register-section").classList.remove("hidden");
  document.getElementById("login-section").classList.add("hidden");
}

// Navigation
function showPage(page) {
  currentPage = page;

  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.add("hidden");
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  document.getElementById(`${page}-page`).classList.remove("hidden");
  document.querySelector(`[data-page="${page}"]`).classList.add("active");

  if (page === "dashboard") loadDashboardData();
  if (page === "clients") loadClientsTable();
  if (page === "projects") loadProjectsTable();
  if (page === "payments") loadPaymentsTable();
  if (page === "invoices") loadInvoicePreview();
  if (page === "settings") loadSettings();
}

// Dashboard Functions
function loadDashboardData() {
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeProjects = projects.filter(
    (p) => p.status === "در حال انجام",
  ).length;
  const totalClients = clients.length;
  const pendingPayments = projects.filter(
    (p) => p.status !== "تکمیل شده",
  ).length;

  document.getElementById("total-revenue").textContent =
    formatCurrency(totalRevenue);
  document.getElementById("active-projects").textContent = activeProjects;
  document.getElementById("total-clients").textContent = totalClients;
  document.getElementById("pending-payments").textContent = pendingPayments;

  drawRevenueChart();
  loadRecentActivities();
}

function drawRevenueChart() {
  const canvas = document.getElementById("revenue-chart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const data = [30, 45, 35, 50, 40, 60, 55];
  const max = Math.max(...data);
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((value, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = canvas.height - padding - (value / max) * chartHeight;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

function loadRecentActivities() {
  const activities = [
    { text: "پرداخت جدید از شرکت آلفا", time: "2 ساعت پیش" },
    { text: "پروژه جدید اضافه شد", time: "5 ساعت پیش" },
    { text: "مشتری جدید ثبت شد", time: "1 روز پیش" },
  ];

  const container = document.getElementById("recent-activities");
  container.innerHTML = activities
    .map(
      (activity) => `
        <div class="activity-item">
            <div class="activity-text">${activity.text}</div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `,
    )
    .join("");
}

// Client Management
function loadClientsTable() {
  const tbody = document.getElementById("clients-table-body");
  tbody.innerHTML = clients
    .map(
      (client) => `
        <tr>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td><span class="status-badge ${client.status === "فعال" ? "status-active" : "status-inactive"}">${client.status}</span></td>
            <td>${client.projects}</td>
            <td>${formatCurrency(client.totalPaid)}</td>
            <td>
                <button class="btn-icon" onclick="editClient(${client.id})">✏️</button>
                <button class="btn-icon" onclick="deleteClient(${client.id})">🗑️</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

function filterClients() {
  const search = document.getElementById("client-search").value.toLowerCase();
  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search),
  );

  const tbody = document.getElementById("clients-table-body");
  tbody.innerHTML = filtered
    .map(
      (client) => `
        <tr>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td><span class="status-badge ${client.status === "فعال" ? "status-active" : "status-inactive"}">${client.status}</span></td>
            <td>${client.projects}</td>
            <td>${formatCurrency(client.totalPaid)}</td>
            <td>
                <button class="btn-icon" onclick="editClient(${client.id})">✏️</button>
                <button class="btn-icon" onclick="deleteClient(${client.id})">🗑️</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

function openClientModal(clientId = null) {
  const modal = document.getElementById("client-modal");
  const form = document.getElementById("client-form");

  if (clientId) {
    const client = clients.find((c) => c.id === clientId);
    document.getElementById("client-id").value = client.id;
    document.getElementById("client-name").value = client.name;
    document.getElementById("client-email").value = client.email;
    document.getElementById("client-phone").value = client.phone;
    document.getElementById("client-status").value = client.status;
  } else {
    form.reset();
    document.getElementById("client-id").value = "";
  }

  modal.classList.remove("hidden");
}

function closeClientModal() {
  document.getElementById("client-modal").classList.add("hidden");
}

function saveClient(e) {
  e.preventDefault();

  const id = document.getElementById("client-id").value;
  const name = document.getElementById("client-name").value;
  const email = document.getElementById("client-email").value;
  const phone = document.getElementById("client-phone").value;
  const status = document.getElementById("client-status").value;
  if (!validateEmail(email)) {
    showToast("ایمیل معتبر نیست", "error");
    return;
  }

  if (id) {
    const index = clients.findIndex((c) => c.id == id);
    clients[index] = { ...clients[index], name, email, phone, status };
    showToast("مشتری با موفقیت ویرایش شد", "success");
  } else {
    const newClient = {
      id: Date.now(),
      name,
      email,
      phone,
      status,
      projects: 0,
      totalPaid: 0,
    };
    clients.push(newClient);
    showToast("مشتری با موفقیت اضافه شد", "success");
  }

  saveToLocalStorage();
  loadClientsTable();
  closeClientModal();
}

function editClient(id) {
  openClientModal(id);
}

function deleteClient(id) {
  if (confirm("آیا از حذف این مشتری اطمینان دارید؟")) {
    clients = clients.filter((c) => c.id !== id);
    saveToLocalStorage();
    loadClientsTable();
    showToast("مشتری با موفقیت حذف شد", "success");
  }
}

// Project Management
function loadProjectsTable() {
  const tbody = document.getElementById("projects-table-body");
  tbody.innerHTML = projects
    .map((project) => {
      const client = clients.find((c) => c.id === project.clientId);
      return `
            <tr>
                <td>${project.title}</td>
                <td>${client ? client.name : "نامشخص"}</td>
                <td><span class="status-badge ${project.status === "تکمیل شده" ? "status-completed" : "status-progress"}">${project.status}</span></td>
                <td>${formatCurrency(project.budget)}</td>
                <td>${formatDate(project.deadline)}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <span>${project.progress}%</span>
                </td>
                <td>
                    <button class="btn-icon" onclick="editProject(${project.id})">✏️</button>
                    <button class="btn-icon" onclick="deleteProject(${project.id})">🗑️</button>
                </td>
            </tr>
        `;
    })
    .join("");
}

function filterProjects() {
  const search = document.getElementById("project-search").value.toLowerCase();
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search),
  );

  const tbody = document.getElementById("projects-table-body");
  tbody.innerHTML = filtered
    .map((project) => {
      const client = clients.find((c) => c.id === project.clientId);
      return `
            <tr>
                <td>${project.title}</td>
                <td>${client ? client.name : "نامشخص"}</td>
                <td><span class="status-badge ${project.status === "تکمیل شده" ? "status-completed" : "status-progress"}">${project.status}</span></td>
                <td>${formatCurrency(project.budget)}</td>
                <td>${formatDate(project.deadline)}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <span>${project.progress}%</span>
                </td>
                <td>
                    <button class="btn-icon" onclick="editProject(${project.id})">✏️</button>
                    <button class="btn-icon" onclick="deleteProject(${project.id})">🗑️</button>
                </td>
            </tr>
        `;
    })
    .join("");
}

function openProjectModal(projectId = null) {
  const modal = document.getElementById("project-modal");
  const form = document.getElementById("project-form");
  const clientSelect = document.getElementById("project-client");

  clientSelect.innerHTML = clients
    .map((c) => `<option value="${c.id}">${c.name}</option>`)
    .join("");

  if (projectId) {
    const project = projects.find((p) => p.id === projectId);
    document.getElementById("project-id").value = project.id;
    document.getElementById("project-title").value = project.title;
    document.getElementById("project-client").value = project.clientId;
    document.getElementById("project-status").value = project.status;
    document.getElementById("project-budget").value = project.budget;
    document.getElementById("project-deadline").value = project.deadline;
    document.getElementById("project-progress").value = project.progress;
  } else {
    form.reset();
    document.getElementById("project-id").value = "";
  }

  modal.classList.remove("hidden");
}

function closeProjectModal() {
  document.getElementById("project-modal").classList.add("hidden");
}

function saveProject(e) {
  e.preventDefault();

  const id = document.getElementById("project-id").value;
  const title = document.getElementById("project-title").value;
  const clientId = parseInt(document.getElementById("project-client").value);
  const status = document.getElementById("project-status").value;
  const budget = parseInt(document.getElementById("project-budget").value);
  const deadline = document.getElementById("project-deadline").value;
  const progress = parseInt(document.getElementById("project-progress").value);

  if (id) {
    const index = projects.findIndex((p) => p.id == id);
    projects[index] = {
      ...projects[index],
      title,
      clientId,
      status,
      budget,
      deadline,
      progress,
    };
    showToast("پروژه با موفقیت ویرایش شد", "success");
  } else {
    const newProject = {
      id: Date.now(),
      title,
      clientId,
      status,
      budget,
      deadline,
      progress,
    };
    projects.push(newProject);
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      client.projects++;
    }

    showToast("پروژه با موفقیت اضافه شد", "success");
  }

  saveToLocalStorage();
  loadProjectsTable();
  closeProjectModal();
}

function editProject(id) {
  openProjectModal(id);
}

function deleteProject(id) {
  if (confirm("آیا از حذف این پروژه اطمینان دارید؟")) {
    const project = projects.find((p) => p.id === id);
    if (project) {
      const client = clients.find((c) => c.id === project.clientId);
      if (client && client.projects > 0) {
        client.projects--;
      }
    }

    projects = projects.filter((p) => p.id !== id);
    saveToLocalStorage();
    loadProjectsTable();
    showToast("پروژه با موفقیت حذف شد", "success");
  }
}

// Payment Management
function loadPaymentsTable() {
  const tbody = document.getElementById("payments-table-body");
  tbody.innerHTML = payments
    .map((payment) => {
      const project = projects.find((p) => p.id === payment.projectId);
      return `
            <tr>
                <td>${project ? project.title : "نامشخص"}</td>
                <td>${formatCurrency(payment.amount)}</td>
                <td>${formatDate(payment.date)}</td>
                <td><span class="status-badge status-completed">${payment.status}</span></td>
                <td>${payment.method}</td>
                <td>
                    <button class="btn-icon" onclick="deletePayment(${payment.id})">🗑️</button>
                </td>
            </tr>
        `;
    })
    .join("");
}

function openPaymentModal() {
  const modal = document.getElementById("payment-modal");
  const form = document.getElementById("payment-form");
  const projectSelect = document.getElementById("payment-project");

  projectSelect.innerHTML = projects
    .map((p) => `<option value="${p.id}">${p.title}</option>`)
    .join("");

  form.reset();
  modal.classList.remove("hidden");
}

function closePaymentModal() {
  document.getElementById("payment-modal").classList.add("hidden");
}

function savePayment(e) {
  e.preventDefault();

  const projectId = parseInt(document.getElementById("payment-project").value);
  const amount = parseInt(document.getElementById("payment-amount").value);
  const date = document.getElementById("payment-date").value;
  const method = document.getElementById("payment-method").value;

  const newPayment = {
    id: Date.now(),
    projectId,
    amount,
    date,
    status: "پرداخت شده",
    method,
  };

  payments.push(newPayment);

  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const client = clients.find((c) => c.id === project.clientId);
    if (client) {
      client.totalPaid += amount;
    }
  }

  saveToLocalStorage();
  loadPaymentsTable();
  closePaymentModal();
  showToast("پرداخت با موفقیت ثبت شد", "success");
}

function deletePayment(id) {
  if (confirm("آیا از حذف این پرداخت اطمینان دارید؟")) {
    const payment = payments.find((p) => p.id === id);
    if (payment) {
      const project = projects.find((p) => p.id === payment.projectId);
      if (project) {
        const client = clients.find((c) => c.id === project.clientId);
        if (client) {
          client.totalPaid -= payment.amount;
        }
      }
    }

    payments = payments.filter((p) => p.id !== id);
    saveToLocalStorage();
    loadPaymentsTable();
    showToast("پرداخت با موفقیت حذف شد", "success");
  }
}

// Invoice Functions
function loadInvoicePreview() {
  if (projects.length === 0) {
    document.getElementById("invoice-preview").innerHTML =
      "<p>هیچ پروژه‌ای برای صدور فاکتور وجود ندارد</p>";
    return;
  }

  const project = projects[0];
  const client = clients.find((c) => c.id === project.clientId);

  document.getElementById("invoice-preview").innerHTML = `
        <div class="invoice-header">
            <h3>فاکتور پروژه: ${project.title}</h3>
            <p>تاریخ: ${formatDate(new Date().toISOString().split("T")[0])}</p>
        </div>
        <div class="invoice-details">
            <p><strong>مشتری:</strong> ${client ? client.name : "نامشخص"}</p>
            <p><strong>مبلغ:</strong> ${formatCurrency(project.budget)}</p>
            <p><strong>وضعیت:</strong> ${project.status}</p></div>
    `;
}

// Settings Functions
function loadSettings() {
  if (currentUser) {
    document.getElementById("settings-name").value = currentUser.name;
    document.getElementById("settings-email").value = currentUser.email;
    document.getElementById("settings-role").value = currentUser.role;
  }
}

function updateProfile(e) {
  e.preventDefault();

  const name = document.getElementById("settings-name").value;
  const email = document.getElementById("settings-email").value;
  const role = document.getElementById("settings-role").value;

  if (!validateEmail(email)) {
    showToast("ایمیل معتبر نیست", "error");
    return;
  }

  currentUser.name = name;
  currentUser.email = email;
  currentUser.role = role;

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  showToast("تنظیمات با موفقیت ذخیره شد", "success");
}

// Helper Functions
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.getElementById("toast-container").appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR").format(date);
}

function saveToLocalStorage() {
  localStorage.setItem("clients", JSON.stringify(clients));
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("payments", JSON.stringify(payments));
}
