// ===== Elements =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const note = document.getElementById("note");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalOk = document.getElementById("modalOk");
const modalCopy = document.getElementById("modalCopy");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const volume = document.getElementById("volume");

const soundOverlay = document.getElementById("soundOverlay");
const soundOverlayBtn = document.getElementById("soundOverlayBtn");

// ===== Background visuals (lightweight for mobile) =====
const HEARTS = 12;
for (let i = 0; i < HEARTS; i++) {
  const h = document.createElement("div");
  h.className = "heart";

  h.style.left = (Math.random() * 100) + "vw";
  h.style.animationDelay = (Math.random() * 8) + "s";
  h.style.animationDuration = (10 + Math.random() * 12) + "s";

  const size = 12 + Math.random() * 18;
  h.style.width = size + "px";
  h.style.height = size + "px";
  h.style.opacity = (0.10 + Math.random() * 0.18).toFixed(2);

  document.body.appendChild(h);
}

for (let i = 0; i < 6; i++) {
  const b = document.createElement("div");
  b.className = "butterfly";
  b.dataset.variant = (i % 2) ? "1" : "2";

  b.style.left = (Math.random() * 100) + "vw";
  b.style.animationDuration = (12 + Math.random() * 10) + "s";
  b.style.animationDelay = (Math.random() * 4) + "s";

  const s = 28 + Math.random() * 22;
  b.style.width = s + "px";
  b.style.height = s + "px";
  b.style.opacity = (0.45 + Math.random() * 0.35).toFixed(2);

  document.body.appendChild(b);
}

for (let i = 0; i < 18; i++) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = (Math.random() * 100) + "vw";
  s.style.animationDuration = (4 + Math.random() * 5) + "s";
  s.style.animationDelay = (Math.random() * 3) + "s";
  s.style.opacity = (0.30 + Math.random() * 0.55).toFixed(2);
  document.body.appendChild(s);
}

for (let i = 0; i < 14; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.style.left = (Math.random() * 100) + "vw";
  p.style.animationDuration = (7 + Math.random() * 8) + "s";
  p.style.animationDelay = (Math.random() * 5) + "s";
  p.style.opacity = (0.20 + Math.random() * 0.55).toFixed(2);

  const w = 10 + Math.random() * 18;
  const h = 7 + Math.random() * 14;
  p.style.width = w + "px";
  p.style.height = h + "px";

  document.body.appendChild(p);
}

// ===== Music logic (local MP3) =====
// Reality check: phones block autoplay WITH SOUND.
// Best UX: try autoplay; if blocked, show a one-tap overlay.

function setVolumeFromSlider() {
  const v = Number(volume.value) / 100;
  bgMusic.volume = Math.min(Math.max(v, 0), 1);
}

function setMusicUI(isOn) {
  musicBtn.setAttribute("aria-pressed", String(isOn));
  musicBtn.classList.toggle("isOn", isOn);
  musicLabel.textContent = isOn ? "Music: On" : "Music: Off";
}

async function tryPlayMusic({ showOverlayOnFail = true } = {}) {
  setVolumeFromSlider();
  bgMusic.muted = false;

  try {
    await bgMusic.play();
    setMusicUI(true);
    hideOverlay();
    return true;
  } catch {
    // Autoplay blocked (common on mobile). Show overlay.
    setMusicUI(false);
    if (showOverlayOnFail) showOverlay();
    return false;
  }
}

function pauseMusic() {
  bgMusic.pause();
  setMusicUI(false);
}

function showOverlay() {
  soundOverlay.classList.add("show");
  soundOverlay.setAttribute("aria-hidden", "false");
}

function hideOverlay() {
  soundOverlay.classList.remove("show");
  soundOverlay.setAttribute("aria-hidden", "true");
}

// Try to autoplay once on load (works on many desktops)
window.addEventListener("load", () => {
  // Start a little softer for romance
  bgMusic.volume = 0.6;
  tryPlayMusic({ showOverlayOnFail: true });
});

// Overlay button: one tap to enable sound
soundOverlayBtn.addEventListener("click", () => {
  tryPlayMusic({ showOverlayOnFail: false });
});

// If user taps anywhere, try enabling music once (nice on mobile)
const enableOnFirstTap = async () => {
  await tryPlayMusic({ showOverlayOnFail: false });
  document.removeEventListener("pointerdown", enableOnFirstTap);
};
document.addEventListener("pointerdown", enableOnFirstTap);

// Music toggle
musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await tryPlayMusic({ showOverlayOnFail: true });
  } else {
    pauseMusic();
  }
});

// Volume control
volume.addEventListener("input", () => {
  setVolumeFromSlider();
  // if music is off and user adjusts volume, don't auto-start; keep it simple
});

// ===== Modal =====
function showModal(type) {
  if (type === "yes") {
    modalTitle.textContent = "YAY!! 💖";
    modalText.textContent =
      "Okay… I’m officially the happiest person today. I’ll plan something sweet—just you and me. 🌹";
  } else {
    modalTitle.textContent = "Always respected 💛";
    modalText.textContent =
      "Thank you for being honest. No pressure, no bad feelings—I'm still lucky to have you in my life.";
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

modalOk.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
});

// ===== Cute burst hearts on YES =====
function burstHearts() {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = (45 + (Math.random() * 14 - 7)) + "vw";
    h.style.top = (45 + (Math.random() * 14 - 7)) + "vh";
    h.style.position = "fixed";
    h.style.opacity = "0.50";

    const size = 10 + Math.random() * 14;
    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.animationDuration = (4 + Math.random() * 2) + "s";

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5200);
  }
}

// ===== Button logic (playful NO, still respectful) =====
const dodgeLines = [
  "Hehe… are you sure? 😇",
  "Not so fast 😌",
  "My heart says try again 💗",
  "Okay okay… but hear me out 🥺",
  "I’m blushing… just a little 🫶",
  "One more time…? 🌹",
  "You almost got me 😏",
  "My heart is running away 💞",
  "Catch me if you can 💘",
  "No button is shy today 🙈",
  "Are you really saying no? 😜",
  "Think again, beautiful 💖",
  "My butterflies say yes 🦋",
  "I’ll stop soon… maybe 😇",
  "Last chance to chase me 😌",
  "Nope—too cute to click 😅",
  "Try again, my love 💕",
  "You’re chasing my heart 😍"
];

let dodgesLeft = 10;

// Keep the NO button inside the button area (works better than translate())
const btnArea = document.getElementById("btnArea");
let noButtonAnchored = false;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function anchorNoButton() {
  if (noButtonAnchored) return;

  // Make NO absolutely-positioned within the btnArea, so we can place it safely.
  // Keep YES in normal flow; only NO becomes absolute.
  btnArea.style.position = "relative";
  noBtn.style.position = "absolute";

  // Put it near its original spot
  const areaRect = btnArea.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const left = clamp(noRect.left - areaRect.left, 0, areaRect.width - noRect.width);
  const top  = clamp(noRect.top  - areaRect.top,  0, areaRect.height - noRect.height);

  noBtn.style.left = left + "px";
  noBtn.style.top = top + "px";
  noBtn.style.transform = "none";

  noButtonAnchored = true;
}

function moveNoButtonRandom() {
  anchorNoButton();

  const areaRect = btnArea.getBoundingClientRect();

  // Button sizes AFTER anchoring
  const btnW = noBtn.offsetWidth || 120;
  const btnH = noBtn.offsetHeight || 44;

  // Give extra vertical room so it can dodge without overlapping too weirdly.
  // (We temporarily increase the area height if needed.)
  const minAreaH = Math.max(areaRect.height, 120);
  if (btnArea.offsetHeight < minAreaH) btnArea.style.height = minAreaH + "px";

  const maxLeft = Math.max(0, btnArea.clientWidth - btnW);
  const maxTop = Math.max(0, btnArea.clientHeight - btnH);

  const left = Math.random() * maxLeft;
  const top  = Math.random() * maxTop;

  noBtn.style.left = left + "px";
  noBtn.style.top  = top + "px";

  // tiny playful scale
  const scale = 0.9 + Math.random() * 0.35;
  noBtn.style.scale = String(scale);
}

function finishNoDodges() {
  note.textContent = "Okay, I’ll stop teasing 😊 You can choose freely.";
  noBtn.textContent = "No (it’s okay) 💛";
  noBtn.style.scale = "1";
  // Keep it in a nice stable spot
  if (noButtonAnchored) {
    noBtn.style.left = "50%";
    noBtn.style.top = "50%";
    noBtn.style.transform = "translate(-50%, -50%)";
  }
}

function dodgeNo() {
  if (dodgesLeft <= 0) return;

  dodgesLeft--;
  note.textContent = dodgeLines[Math.floor(Math.random() * dodgeLines.length)];
  moveNoButtonRandom();

  if (dodgesLeft === 0) finishNoDodges();
}

// Desktop: hover near the button
noBtn.addEventListener("pointerenter", () => {
  // On touch screens, pointerenter can trigger oddly; only dodge if it's a mouse.
  if (window.matchMedia && window.matchMedia("(hover: hover)").matches) dodgeNo();
});

// Mobile: first taps should dodge (prevent click)
noBtn.addEventListener(
  "touchstart",
  (e) => {
    if (dodgesLeft > 0) {
      e.preventDefault();
      dodgeNo();
    }
  },
  { passive: false }
);

// If user somehow clicks while dodging, keep dodging
noBtn.addEventListener("click", (e) => {
  if (dodgesLeft > 0) {
    e.preventDefault();
    dodgeNo();
    return;
  }
  showModal("no");
});

// YES click

yesBtn.addEventListener("click", async () => {
  // Ensure music starts (mobile-friendly)
  await tryPlayMusic({ showOverlayOnFail: true });

  burstHearts();
  note.textContent = "I knew it 💘";
  showModal("yes");
});

// Copy
modalCopy.addEventListener("click", async () => {
  const text =
`Will you be my Valentine? 💌

I don’t need a perfect day. I just want you — your smile, your laugh, and the way you make everything feel like home.

— Sanath`;

  try {
    await navigator.clipboard.writeText(text);
    modalCopy.textContent = "Copied ✅";
    setTimeout(() => (modalCopy.textContent = "Copy message"), 1200);
  } catch {
    modalCopy.textContent = "Copy failed";
    setTimeout(() => (modalCopy.textContent = "Copy message"), 1200);
  }
});
