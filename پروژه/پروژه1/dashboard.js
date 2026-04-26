// بررسی ورود کاربر
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

// نمایش اطلاعات کاربر
document.getElementById('userName').textContent = currentUser.name;
document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();

// خروج از حساب
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// مدیریت داده‌ها
let clients = JSON.parse(localStorage.getItem('clients') || '[]');
let projects = JSON.parse(localStorage.getItem('projects') || '[]');
let payments = JSON.parse(localStorage.getItem('payments') || '[]');
let invoices = JSON.parse(localStorage.getItem('invoices') || '[]');

// داده‌های نمونه
if (clients.length === 0) {
    clients = [
        { id: 1, name: 'شرکت آلفا', email: 'alpha@example.com', phone: '09121234567' },
        { id: 2, name: 'شرکت بتا', email: 'beta@example.com', phone: '09129876543' }
    ];localStorage.setItem('clients', JSON.stringify(clients));
}

if (projects.length === 0) {
    projects = [
        { id: 1, name: 'پروژه وب‌سایت', client: 'شرکت آلفا', status: 'در حال انجام', budget: 15000000 },
        { id: 2, name: 'اپلیکیشن موبایل', client: 'شرکت بتا', status: 'تکمیل شده', budget: 30000000 }
    ];
    localStorage.setItem('projects', JSON.stringify(projects));
}

if (payments.length === 0) {
    payments = [
        { id: 1, project: 'پروژه وب‌سایت', amount: 7500000, date: '1405/01/01', status: 'پرداخت شده' },
        { id: 2, project: 'اپلیکیشن موبایل', amount: 30000000, date: '1405/01/05', status: 'پرداخت شده' }
    ];
    localStorage.setItem('payments', JSON.stringify(payments));
}

// محاسبه آمار
function updateStats() {
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const activeProjects = projects.filter(p => p.status === 'در حال انجام').length;
    const pendingPayments = invoices.filter(i => i.status === 'معلق').length;
    
    document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString('fa-IR');
    document.getElementById('activeProjects').textContent = activeProjects.toLocaleString('fa-IR');
    document.getElementById('totalClients').textContent = clients.length.toLocaleString('fa-IR');
    document.getElementById('pendingPayments').textContent = pendingPayments.toLocaleString('fa-IR');
}

// نمودار درآمد
function renderChart() {
    const chartContainer = document.getElementById('revenueChart');
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'];
    const data = [6000000, 8000000, 5000000, 9000000, 7000000, 10000000, 8500000];
    
    chartContainer.innerHTML = months.map((month, i) => {
        const height = (data[i] / Math.max(...data)) * 100;
        return `<div class="chart-bar" style="height: ${height}%" title="${month}: ${data[i].toLocaleString('fa-IR')} تومان"></div>`;
    }).join('');
}

// فعالیت‌های اخیر
function renderActivities() {
    const activities = [
        { text: 'پرداخت جدید از شرکت آلفا', time: '۲ ساعت پیش' },
        { text: 'پروژه جدید اضافه شد', time: '۵ ساعت پیش' },
        { text: 'مشتری جدید ثبت شد', time: '۱ روز پیش' },
        { text: 'فاکتور صادر شد', time: '۲ روز پیش' }
    ];
    
    document.getElementById('recentActivities').innerHTML = activities.map(a => `
        <div class="activity-item">
            <div class="activity-text">${a.text}</div>
            <div class="activity-time">${a.time}</div>
        </div>
    `).join('');
}

// نمایش بخش‌ها
function showSection(section) {
    document.querySelectorAll('.section-content').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    if (section === 'dashboard') {
        document.querySelector('.stats-grid').style.display = 'grid';
        document.querySelector('.content-grid').style.display = 'grid';
    } else {
        document.querySelector('.stats-grid').style.display = 'none';
        document.querySelector('.content-grid').style.display = 'none';document.getElementById(`${section}Section`).style.display = 'block';
        
        if (section === 'clients') renderClients();
        if (section === 'projects') renderProjects();
        if (section === 'payments') renderPayments();
        if (section === 'invoices') renderInvoices();
    }
    
    event.target.classList.add('active');
}

// رندر مشتریان
function renderClients() {
    document.getElementById('clientsList').innerHTML = clients.map(c => `
        <div class="data-item">
            <div class="data-item-info">
                <h3>${c.name}</h3>
                <p>📧 ${c.email} | 📱 ${c.phone}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editClient(${c.id})">ویرایش</button>
                <button class="btn-delete" onclick="deleteClient(${c.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

// رندر پروژه‌ها
function renderProjects() {
    document.getElementById('projectsList').innerHTML = projects.map(p => `
        <div class="data-item">
            <div class="data-item-info">
                <h3>${p.name}</h3>
                <p>👤 ${p.client} | 💰 ${p.budget.toLocaleString('fa-IR')} تومان | 📊 ${p.status}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-edit" onclick="editProject(${p.id})">ویرایش</button>
                <button class="btn-delete" onclick="deleteProject(${p.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

// رندر پرداخت‌ها
function renderPayments() {
    document.getElementById('paymentsList').innerHTML = payments.map(p => `
        <div class="data-item">
            <div class="data-item-info">
                <h3>${p.project}</h3>
                <p>💰 ${p.amount.toLocaleString('fa-IR')} تومان | 📅 ${p.date} | ✅ ${p.status}</p>
            </div>
            <div class="data-item-actions">
                <button class="btn-delete" onclick="deletePayment(${p.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

// رندر فاکتورها
function renderInvoices() {
    document.getElementById('invoicesList').innerHTML = invoices.map(i => `
        <div class="data-item">
            <div class="data-item-info">
                <h3>فاکتور #${