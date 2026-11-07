
const $ = (id) => document.getElementById(id);

// Live countdown to Bhakti's 22nd birthday (15 November 2026).
const birthdayTarget = new Date(2026, 10, 15, 0, 0, 0, 0);
function updateBirthdayCountdown() {
  const now = new Date();
  const remaining = birthdayTarget.getTime() - now.getTime();
  const message = $("countdownMessage");
  if (remaining <= 0) {
    $("countDays").textContent = "22";
    $("countHours").textContent = "♡";
    $("countMinutes").textContent = "♡";
    $("countSeconds").textContent = "♡";
    message.textContent = "Today is your day, Bhakti! Happy 22nd Birthday! 🎂✨";
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  $("countDays").textContent = String(days).padStart(2, "0");
  $("countHours").textContent = String(hours).padStart(2, "0");
  $("countMinutes").textContent = String(minutes).padStart(2, "0");
  $("countSeconds").textContent = String(seconds).padStart(2, "0");
}
updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);
$("enterUniverse").addEventListener("click", () => {
  $("welcomeScreen").classList.add("is-hidden");
  document.body.style.overflow = "";
});
document.body.style.overflow = "hidden";


function confetti(count = 100) {
  const layer = $("confettiLayer");
  const colors = ["#f5a9cf", "#f6d28c", "#c99bdf", "#fff0f6", "#9dd8e8"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.1 + "s";
    piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

$("openLetter").addEventListener("click", () => {
  const letter = $("letter");
  letter.classList.toggle("open");
  letter.setAttribute("aria-hidden", letter.classList.contains("open") ? "false" : "true");
  $("openLetter").innerHTML = letter.classList.contains("open") ? "A message, just for you ♡" : "Open your little surprise ♡";
  if (letter.classList.contains("open")) confetti(45);
});

$("blowBtn").addEventListener("click", () => {
  $("flame").style.opacity = "0";
  $("flame").style.transform = "scale(0)";
  $("cakeNote").textContent = "Wish sent to the universe! May it come true, Bhakti. 💖";
  $("blowBtn").textContent = "Your wish is on its way ✨";
  confetti(120);
});

$("celebrateBtn").addEventListener("click", () => {
  confetti(160);
  $("celebrateBtn").textContent = "Lots of love, Bhakti! ♡";
});

document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    $("lightboxImg").src = card.dataset.photo;
    $("lightbox").classList.add("show");
    $("lightbox").setAttribute("aria-hidden", "false");
  });
});
function closePhoto() {
  $("lightbox").classList.remove("show");
  $("lightbox").setAttribute("aria-hidden", "true");
}
$("closeLightbox").addEventListener("click", closePhoto);
$("lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closePhoto(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closePhoto(); });

// Gentle original synthesized ambient notes; no external song or audio file is required.
let audioContext = null, musicTimer = null, musicOn = false, noteIndex = 0;
const notes = [261.63, 329.63, 392.00, 493.88, 392.00, 329.63, 293.66, 349.23];
function playNote() {
  if (!audioContext || !musicOn) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = notes[noteIndex % notes.length];
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.1);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(); osc.stop(audioContext.currentTime + 1.15);
  noteIndex++;
}
$("musicBtn").addEventListener("click", async () => {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") await audioContext.resume();
  musicOn = !musicOn;
  $("musicBtn").innerHTML = musicOn ? "♫ <span>Music on</span>" : "♫ <span>Music off</span>";
  if (musicOn) { playNote(); musicTimer = setInterval(playNote, 620); }
  else { clearInterval(musicTimer); }
});

window.addEventListener("load", () => setTimeout(() => confetti(35), 700));