// ===== Scroll to Section Smoothly =====
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== Highlight Active Nav Item on Scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function handleScrollHighlight() {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

// Debounced scroll handler
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    handleScrollHighlight();
    toggleScrollButton();
  }, 50);
});

// ===== Scroll-to-Top Button =====
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scrollTopBtn";
scrollTopBtn.innerText = "↑";
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 20px;
  background-color: #ff69b4;
  color: black;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: none;
  z-index: 999;
  cursor: pointer;
`;
document.body.appendChild(scrollTopBtn);

function toggleScrollButton() {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Thank You Toast Message =====
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 20px;
    background: #ff69b4;
    color: #000;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: bold;
    z-index: 999;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = 1), 100);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// ===== Form Submission Alert (Order) =====
const orderForm = document.querySelector('#order form');
if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    const name = orderForm.querySelector('input[name="name"]');
    const email = orderForm.querySelector('input[name="email"]');
    const product = orderForm.querySelector('select[name="product"]');

    if (!name.value || !email.value || !product.value) {
      e.preventDefault();
      showToast("❌ Please fill out all fields.");
      return;
    }

    // Let backend handle storing. Toast for user.
    setTimeout(() => {
      showToast(`✅ Thank you ${name.value}! Your order for "${product.value}" has been placed.`);
    }, 200);
  });
}

// ===== Newsletter Form Alert =====
const newsletterForm = document.querySelector('#newsletter form');
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]');
    if (!email.value) {
      showToast("❌ Please enter a valid email!");
      return;
    }
    showToast("✅ Thanks for subscribing to beauty offers!");
    newsletterForm.reset();
  });
}

// ===== Auto Year Update in Footer =====
const footer = document.querySelector("footer");
if (footer && footer.innerHTML.includes("2025")) {
  const year = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace("2025", year);
}
