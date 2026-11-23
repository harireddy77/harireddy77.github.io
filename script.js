// Enable reveal animations only when JavaScript is running
document.documentElement.classList.add("js");

document.getElementById("year").textContent = new Date().getFullYear();

// Typewriter effect for the role line in the terminal
const roles = [
  "SOC Analyst Intern",
  "Detection Engineer in training",
  "Alert triage & incident response",
  "Microsoft Sentinel · Wazuh · Splunk",
];
const typedEl = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      return setTimeout(typeLoop, 1600);
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 70);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeLoop();
} else {
  typedEl.textContent = roles[0];
}

// Count-up animation for the stats
function countUp(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// Trigger reveals and counters when elements scroll into view
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add("in");
    entry.target.querySelectorAll(".num[data-target]").forEach(countUp);
    observer.unobserve(entry.target);
  }
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .stats").forEach((el) => observer.observe(el));
