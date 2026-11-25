// Wedding countdown: 24 December 2026, 8:00 PM (India Standard Time).
// Change the time below if the family's confirmed ceremony time is different.
const weddingDate = new Date("2026-12-24T20:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const difference = weddingDate - now;

  if (difference <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    document.querySelector(".countdown-note").textContent =
      "Today, their forever begins. ♥";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Soft reveal as the visitor scrolls.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

// Gentle falling rose petals.
function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > 0.5 ? "✦" : "♥";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = (10 + Math.random() * 10) + "px";
  petal.style.animationDuration = (7 + Math.random() * 7) + "s";
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 15000);
}
setInterval(createPetal, 850);

// Music plays only after the visitor presses the button (browser permission).
const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add("playing");
      musicIcon.textContent = "Ⅱ";
    } catch (error) {
      alert("Please add a royalty-free music file named music.mp3 to this website folder.");
    }
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicIcon.textContent = "♫";
  }
});
