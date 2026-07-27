const button = document.querySelector(".menu");
const nav = document.querySelector("nav");
button.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible"));
}, { threshold: .12 });
document.querySelectorAll(".section h2,.interest-list article,.project").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
