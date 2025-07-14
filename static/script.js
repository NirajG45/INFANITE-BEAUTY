// Smooth scroll for navbar links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Show thank you popup after order placed
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const product = form.querySelector('select[name="product"]');
    
    if (name.value && email.value && product.value) {
      setTimeout(() => {
        alert(`✅ Thank you ${name.value}! Your order for "${product.value}" has been placed.`);
      }, 100);
    }
  });
}

// Scroll-to-top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerText = "↑";
scrollTopBtn.id = "scrollTopBtn";
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

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
