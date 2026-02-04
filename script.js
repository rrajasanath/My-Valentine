// ===== Helpers =====
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const note = document.getElementById("note");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalOk = document.getElementById("modalOk");
const modalCopy = document.getElementById("modalCopy");

// ===== Background elements =====

// Hearts
const HEARTS = 10;
for (let i = 0; i < HEARTS; i++) {
  const h = document.createElement("div");
  h.className = "heart";

  const left = Math.random() * 100;
  const delay = Math.random() * 8;
  const dur = 10 + Math.random() * 12;
  const size = 12 + Math.random() * 18;

  h.style.left = left + "vw";
  h.style.animationDelay = delay + "s";
  h.style.animationDuration = dur + "s";
  h.style.width = size + "px";
  h.style.height = size + "px";
  h.style.opacity = (0.10 + Math.random() * 0.22).toFixed(2);

  document.body.appendChild(h);
}

// Butterflies
for (let i = 0; i < 7; i++) {
  const b = document.createElement("div");
  b.className = "butterfly";
  b.dataset.variant = (i % 2) ? "1" : "2";

  b.style.left = (Math.random() * 100) + "vw";
  b.style.animationDuration = (10 + Math.random() * 10) + "s";
  b.style.animationDelay = (Math.random() * 5) + "s";

  const s = 28 + Math.random() * 26;
  b.style.width = s + "px";
  b.style.height = s + "px";
  b.style.opacity = (0.50 + Math.random() * 0.35).toFixed(2);

  document.body.appendChild(b);
}

// Sparkles
for (let i = 0; i < 26; i++) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = (Math.random() * 100) + "vw";
  s.style.animationDuration = (4 + Math.random() * 5) + "s";
  s.style.animationDelay = (Math.random() * 3) + "s";
  s.style.opacity = (0.35 + Math.random() * 0.5).toFixed(2);
  document.body.appendChild(s);
}

// Petals
for (let i = 0; i < 18; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.style.left = (Math.random() * 100) + "vw";
  p.style.animationDuration = (7 + Math.random() * 8) + "s";
  p.style.animationDelay = (Math.random() * 5) + "s";
  p.style.opacity = (0.25 + Math.random() * 0.55).toFixed(2);

  const w = 10 + Math.random() * 18;
  const h = 7 + Math.random() * 14;
  p.style.width = w + "px";
  p.style.height = h + "px";

  document.body.appendChild(p);
}

// ===== Music (starts from best part when YES clicked) =====
let musicStarted = false;

function startMusic(){
  if (musicStarted) return;
  musicStarted = true;

  const wrap = document.createElement("div");
  wrap.style.position = "fixed";
  wrap.style.right = "16px";
  wrap.style.bottom = "16px";
  wrap.style.width = "280px";
  wrap.style.height = "158px";
  wrap.style.borderRadius = "14px";
  wrap.style.overflow = "hidden";
  wrap.style.boxShadow = "0 18px 40px rgba(0,0,0,.18)";
  wrap.style.zIndex = "9999";
  wrap.style.background = "#000";

  wrap.innerHTML = `
    <iframe
      width="280"
      height="158"
      src="https://www.youtube.com/embed/o_1aF54DO60?start=65&autoplay=1&loop=1&playlist=o_1aF54DO60"
      title="Young and Beautiful"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;

  document.body.appendChild(wrap);
}


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
  for (let i = 0; i < 14; i++) {
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

// ===== Button Logic (respectful playful NO) =====
const dodgeLines = [
  "Hehe… are you sure? 😇",
  "Not so fast 😌",
  "My heart says try again 💗",
  "Okay okay… but hear me out 🥺",
  "I’m blushing… just a little 🫶",
  "One more time…? 🌹"
];

let dodgesLeft = 5;

function dodgeNo() {
  if (dodgesLeft <= 0) return;

  dodgesLeft--;
  note.textContent = dodgeLines[Math.floor(Math.random() * dodgeLines.length)];

  const x = (Math.random() * 240 - 120);
  const y = (Math.random() * 120 - 60);
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (dodgesLeft === 0) {
    note.textContent = "Okay, I’ll stop teasing 😊 You can choose freely.";
    noBtn.style.transform = "translate(0,0)";
    noBtn.textContent = "No (it’s okay) 💛";
  }
}

noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("touchstart", (e) => {
  if (dodgesLeft > 0) {
    e.preventDefault();
    dodgeNo();
  }
}, { passive: false });

noBtn.addEventListener("click", () => {
  if (dodgesLeft > 0) {
    dodgeNo();
    return;
  }
  showModal("no");
});

// YES click
yesBtn.addEventListener("click", () => {
  startMusic();
  burstHearts();
  note.textContent = "I knew it 💘";
  showModal("yes");
});

// Copy
modalCopy.addEventListener("click", async () => {
  const text =
`Will you be my Valentine? 💌

I don’t need a perfect day. I just want you — your smile, your laugh, and the way you make everything feel like home.

— (Your Name)`;

  try {
    await navigator.clipboard.writeText(text);
    modalCopy.textContent = "Copied ✅";
    setTimeout(() => (modalCopy.textContent = "Copy message"), 1200);
  } catch {
    modalCopy.textContent = "Copy failed";
    setTimeout(() => (modalCopy.textContent = "Copy message"), 1200);
  }
});
