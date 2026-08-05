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
document.querySelectorAll(".section h2,.interest-list article,.experience-item,.design-grid article,.theater-timeline li,.project").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

const experienceWindow = document.querySelector(".experience-window");
if (experienceWindow) {
  const track = experienceWindow.querySelector(".experience-track");
  const tabs = [...experienceWindow.querySelectorAll("[data-slide]")];
  const count = experienceWindow.querySelector(".slide-count b");
  let activeSlide = 0;
  let touchStartX = 0;

  const showSlide = (index, updateHash = false) => {
    activeSlide = (index + tabs.length) % tabs.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === activeSlide;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    count.textContent = String(activeSlide + 1).padStart(2, "0");
    if (updateHash) history.replaceState(null, "", `#${experienceWindow.querySelector(`[data-slide-panel="${activeSlide}"]`).id}`);
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => showSlide(Number(tab.dataset.slide), true)));
  experienceWindow.querySelector("[data-slide-prev]").addEventListener("click", () => showSlide(activeSlide - 1, true));
  experienceWindow.querySelector("[data-slide-next]").addEventListener("click", () => showSlide(activeSlide + 1, true));
  experienceWindow.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  experienceWindow.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) showSlide(activeSlide + (distance < 0 ? 1 : -1), true);
  }, { passive: true });

  document.querySelectorAll("[data-experience-target]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    showSlide(Number(link.dataset.experienceTarget), true);
    document.querySelector("#experience").scrollIntoView();
  }));

  const hashSlides = { "#experience-projects": 0, "#experience-design": 1, "#experience-theater": 2 };
  if (window.location.hash in hashSlides) {
    showSlide(hashSlides[window.location.hash]);
    requestAnimationFrame(() => document.querySelector("#experience").scrollIntoView());
  } else showSlide(0);
}
