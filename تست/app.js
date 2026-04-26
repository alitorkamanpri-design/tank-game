// ========== Shopping Cart Storage ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ========== Modal Functions ==========

/**
 * Close modal by ID
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

/**
 * Open modal by ID
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

/**
 * Show login modal
 */
function showLoginModal() {
  openModal("loginModal");
}

/**
 * Show product modal
 */
function openProductModal(productId, productName, productPrice) {
  document.getElementById("productForm").dataset.productId = productId;
  document.getElementById("productForm").dataset.productName = productName;
  document.getElementById("productForm").dataset.productPrice = productPrice;
  openModal("productModal");
}

/**
 * Show shopping cart modal
 */
function showCartModal() {
  updateCartDisplay();
  openModal("cartModal");
}

// ========== Cart Functions ==========

/**
 * Add product to cart
 */
function addToCart(productId, productName, productPrice, quantity = 1) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showSuccessMessage("محصول به سبد خرید اضافه شد");
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();
}

/**
 * Update product quantity
 */
function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
      updateCartCount();
    }
  }
}

/**
 * Update cart count badge
 */
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountBadge = document.getElementById("cartCount");
  if (cartCountBadge) {
    cartCountBadge.textContent = count;
  }
}

/**
 * Update cart display in modal
 */
function updateCartDisplay() {
  const cartContent = document.getElementById("cartContent");
  const cartSummary = document.getElementById("cartSummary");

  if (cart.length === 0) {
    cartContent.innerHTML = '<p class="empty-cart">سبد خرید شما خالی است</p>';
    cartSummary.style.display = "none";
  } else {
    let html = '<div class="cart-items-list">';
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">${formatPrice(item.price)} تومان</p>
          </div>
          <div class="cart-item-quantity">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, parseInt(this.value))" min="1">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-total">${formatPrice(itemTotal)} تومان</div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">حذف</button>
        </div>
      `;
    });

    html += "</div>";
    cartContent.innerHTML = html;

    // Update summary
    document.getElementById("cartTotal").textContent =
      formatPrice(total) + " تومان";
    cartSummary.style.display = "block";
  }
}

/**
 * Checkout function
 */
function checkout() {
  if (cart.length === 0) {
    alert("سبد خرید شما خالی است");
    return;
  }

  // Simulate order placement
  closeModal("cartModal");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  openModal("checkoutSuccessModal");
}

/**
 * Format price with Persian numerals and thousands separator
 */
function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
  const messageEl = document.createElement("div");
  messageEl.className = "success-message-toast";
  messageEl.textContent = message;
  document.body.appendChild(messageEl);

  setTimeout(() => {
    messageEl.classList.add("show");
  }, 10);

  setTimeout(() => {
    messageEl.classList.remove("show");
    setTimeout(() => messageEl.remove(), 300);
  }, 3000);
}

// ========== Event Listeners ==========

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("nav-open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Cart button
const cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", showCartModal);
}

// Login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    // Simulate login
    closeModal("loginModal");
    openModal("successModal");

    // Reset form
    loginForm.reset();
  });
}

// Product form
const productForm = document.getElementById("productForm");
if (productForm) {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productId = parseInt(productForm.dataset.productId);
    const productName = productForm.dataset.productName;
    const productPrice = parseInt(productForm.dataset.productPrice);
    const quantity = parseInt(document.getElementById("productQuantity").value);

    if (quantity <= 0) {
      alert("لطفاً تعداد معتبری انتخاب کنید");
      return;
    }

    addToCart(productId, productName, productPrice, quantity);

    closeModal("productModal");

    // Reset form
    productForm.reset();
  });
}

// Modal close on overlay click
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// Escape key to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.show").forEach((modal) => {
      closeModal(modal.id);
    });
  }
});

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
