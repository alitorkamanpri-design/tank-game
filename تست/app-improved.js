/* ═══════════════════════════════════════════════════════════════════════════════
   MANELY Beauty & Clinical Care - JavaScript Application v3.0
   Features: Shopping Cart, Modals, Form Validation, LocalStorage
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────
// 1. INITIALIZATION & GLOBAL VARIABLES
// ─────────────────────────────────────────────────────────────────────────────

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = {
  id: null,
  name: null,
  price: null,
  quantity: 1,
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  setupEventListeners();
  updateCartCount();
  setupMobileMenu();
  setupFormValidation();
  setupAccessibility();
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. EVENT LISTENERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Close modals on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Close modals on background click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
      if (e.target === this) {
        const modal = this.closest(".modal");
        if (modal) {
          closeModal(modal.id);
        }
      }
    });
  });

  // Prevent body scroll when modal is open
  const style = document.createElement("style");
  style.textContent = `
    body.modal-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      this.classList.toggle("active");
      navList.classList.toggle("active");
    });

    // Close menu when link is clicked
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
        navList.classList.remove("active");
      });
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MODAL FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Open modal by ID
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Focus the close button or first focusable element
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.focus();
    }
  }
}

/**
 * Close modal by ID
 * @param {string} modalId - The ID of the modal to close
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    // Check if any other modals are open
    const openModals = document.querySelectorAll(".modal.show");
    if (openModals.length === 0) {
      document.body.classList.remove("modal-open");
    }
  }
}

/**
 * Close all open modals
 */
function closeAllModals() {
  document.querySelectorAll(".modal.show").forEach((modal) => {
    closeModal(modal.id);
  });
}

/**
 * Show login modal
 */
function showLoginModal() {
  openModal("loginModal");
}

/**
 * Show shopping cart modal
 */
function showCartModal() {
  updateCartDisplay();
  openModal("cartModal");
}

/**
 * Show product modal (for adding to cart)
 * @param {number} productId - Product ID
 * @param {string} productName - Product name
 * @param {number} productPrice - Product price
 */
function openProductModal(productId, productName, productPrice) {
  currentProduct = {
    id: productId,
    name: productName,
    price: productPrice,
    quantity: 1,
  };

  // Reset quantity input
  const quantityInput = document.getElementById("productQuantity");
  if (quantityInput) {
    quantityInput.value = 1;
  }

  openModal("productModal");
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. FORM HANDLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handle login form submission
 * @param {Event} event - Form submit event
 */
function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Basic validation
  if (!email || !password) {
    showErrorMessage("لطفاً تمام فیلدها را پر کنید");
    return;
  }

  if (!isValidEmail(email)) {
    showErrorMessage("ایمیل وارد شده معتبر نیست");
    return;
  }

  // Simulate successful login
  console.log("Login attempt:", { email, password });

  // Close login modal
  closeModal("loginModal");

  // Show success modal
  openModal("successModal");

  // Reset form
  form.reset();

  // Auto close success modal after 3 seconds
  setTimeout(() => {
    closeModal("successModal");
  }, 3000);
}

/**
 * Handle product form submission (add to cart)
 * @param {Event} event - Form submit event
 */
function handleProductSubmit(event) {
  event.preventDefault();

  const quantityInput = document.getElementById("productQuantity");
  const quantity = parseInt(quantityInput.value) || 1;

  if (quantity < 1) {
    showErrorMessage("تعداد باید بیشتر از ۰ باشد");
    return;
  }

  // Add to cart
  addToCart(
    currentProduct.id,
    currentProduct.name,
    currentProduct.price,
    quantity,
  );

  // Close modal
  closeModal("productModal");

  // Show cart automatically
  setTimeout(() => {
    showSuccessMessage(`${currentProduct.name} به سبد خرید اضافه شد`);
  }, 300);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SHOPPING CART FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Add product to cart
 * @param {number} productId - Product ID
 * @param {string} productName - Product name
 * @param {number} productPrice - Product price
 * @param {number} quantity - Quantity to add
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

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  console.log("Product added to cart:", { productId, productName, quantity });
}

/**
 * Remove product from cart
 * @param {number} productId - Product ID to remove
 */
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartCount();

  showSuccessMessage("محصول از سبد خرید حذف شد");
}

/**
 * Update product quantity in cart
 * @param {number} productId - Product ID
 * @param {number} newQuantity - New quantity value
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
 * Update cart count badge in header
 */
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountBadge = document.getElementById("cartCount");

  if (cartCountBadge) {
    cartCountBadge.textContent = count;
    cartCountBadge.setAttribute("aria-label", `تعداد محصولات: ${count}`);
  }
}

/**
 * Update cart display in modal
 */
function updateCartDisplay() {
  const cartContent = document.getElementById("cartContent");
  const cartSummary = document.getElementById("cartSummary");

  if (!cartContent) return;

  if (cart.length === 0) {
    cartContent.innerHTML = '<p class="empty-cart">سبد خرید شما خالی است</p>';
    if (cartSummary) {
      cartSummary.style.display = "none";
    }
    return;
  }

  let html = '<div class="cart-items-list">';
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="cart-item" role="listitem">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${escapeHtml(item.name)}</h4>
          <p class="cart-item-price">${formatPrice(item.price)} تومان</p>
        </div>
        <div class="cart-item-quantity">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" aria-label="کاهش تعداد">−</button>
          <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, parseInt(this.value) || 1)" min="1" aria-label="تعداد ${item.name}">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})" aria-label="افزایش تعداد">+</button>
        </div>
        <div class="cart-item-total">${formatPrice(itemTotal)} تومان</div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="حذف ${item.name}">حذف</button>
      </div>
    `;
  });

  html += "</div>";
  cartContent.innerHTML = html;

  // Update summary
  if (cartSummary) {
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
    showErrorMessage("سبد خرید شما خالی است");
    return;
  }

  // Close cart modal
  closeModal("cartModal");

  // Clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Show success modal
  openModal("checkoutSuccessModal");

  // Auto close success modal after 3 seconds
  setTimeout(() => {
    closeModal("checkoutSuccessModal");
  }, 3000);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format price with Persian numerals and thousands separator
 * @param {number} price - Price to format
 * @returns {string} Formatted price
 */
function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Escape HTML special characters (prevent XSS)
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Show success message toast
 * @param {string} message - Message to display
 */
function showSuccessMessage(message) {
  const messageEl = document.createElement("div");
  messageEl.className = "success-message-toast";
  messageEl.setAttribute("role", "status");
  messageEl.setAttribute("aria-live", "polite");
  messageEl.textContent = message;
  document.body.appendChild(messageEl);

  // Add styles if not already present
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      .success-message-toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #27AE60;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(26, 67, 65, 0.16);
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        animation: slideInUp 0.3s ease-out forwards;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideOutDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
      
      .success-message-toast.hide {
        animation: slideOutDown 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }

  // Auto remove after 3 seconds
  setTimeout(() => {
    messageEl.classList.add("hide");
    setTimeout(() => {
      messageEl.remove();
    }, 300);
  }, 3000);
}

/**
 * Show error message toast
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
  const messageEl = document.createElement("div");
  messageEl.className = "error-message-toast";
  messageEl.setAttribute("role", "alert");
  messageEl.textContent = message;
  document.body.appendChild(messageEl);

  // Add styles if not already present
  if (!document.getElementById("error-toast-styles")) {
    const style = document.createElement("style");
    style.id = "error-toast-styles";
    style.textContent = `
      .error-message-toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #C0392B;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(192, 57, 43, 0.2);
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        animation: slideInUp 0.3s ease-out forwards;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideOutDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
      
      .error-message-toast.hide {
        animation: slideOutDown 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }

  // Auto remove after 4 seconds
  setTimeout(() => {
    messageEl.classList.add("hide");
    setTimeout(() => {
      messageEl.remove();
    }, 300);
  }, 4000);
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. FORM VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Setup form validation
 */
function setupFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      // Validate on blur
      input.addEventListener("blur", function () {
        validateField(this);
      });

      // Validate on input for better UX
      input.addEventListener("input", function () {
        if (this.classList.contains("invalid")) {
          validateField(this);
        }
      });
    });
  });
}

/**
 * Validate a single field
 * @param {HTMLElement} field - Form field to validate
 */
function validateField(field) {
  let isValid = true;

  if (field.required && !field.value.trim()) {
    isValid = false;
  } else if (
    field.type === "email" &&
    field.value &&
    !isValidEmail(field.value)
  ) {
    isValid = false;
  } else if (field.type === "number" && field.value && isNaN(field.value)) {
    isValid = false;
  }

  if (isValid) {
    field.classList.remove("invalid");
    field.setAttribute("aria-invalid", "false");
  } else {
    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");
  }

  return isValid;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. ACCESSIBILITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Setup accessibility features
 */
function setupAccessibility() {
  // Announce cart updates to screen readers
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function () {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (count === 0) {
        announceToScreenReader("سبد خرید خالی است");
      } else {
        announceToScreenReader(`سبد خرید شما ${count} محصول دارد`);
      }
    });
  }
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => announcement.remove(), 1000);
}

// Add screen reader only styles
if (!document.getElementById("sr-only-styles")) {
  const style = document.createElement("style");
  style.id = "sr-only-styles";
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `;
  document.head.appendChild(style);
}

// ═══════════════════════════════════════════════════════════════════════════════
// END OF APPLICATION
// ═════════════════════════════════════════════════════════════════════════════════
