const { createClient } = window.supabase;
const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const statusEl = document.getElementById("auth-status");
const overlayEl = document.getElementById("overlay");
const canvasEl = document.getElementById("canvas");
const controlHintEl = document.getElementById("control-hint");
const overlayTitleEl = document.getElementById("overlay-title");
const overlayScoreEl = document.getElementById("overlay-score");
const stepAuthEl = document.getElementById("step-auth");
const stepSetupEl = document.getElementById("step-setup");
const stepPillAuthEl = document.getElementById("step-pill-auth");
const stepPillSetupEl = document.getElementById("step-pill-setup");
const authMessageEl = document.getElementById("auth-message");
const guestWarnEl = document.getElementById("guest-warn");
const seasonSummaryEl = document.getElementById("season-summary");
const modeSummaryEl = document.getElementById("mode-summary");

const obEmailEl = document.getElementById("ob-email");
const obPasswordEl = document.getElementById("ob-password");
const obNicknameEl = document.getElementById("ob-nickname");
const btnSignIn = document.getElementById("btn-signin");
const btnSignUp = document.getElementById("btn-signup");
const btnGuest = document.getElementById("btn-auth-guest");
const btnBackAuth = document.getElementById("btn-back-auth");
const btnStartGame = document.getElementById("btn-start-game");
const btnModeAi = document.getElementById("btn-mode-ai");
const btnModeRanked = document.getElementById("btn-mode-ranked");
const btnModePvp = document.getElementById("btn-mode-pvp");

const tabWeek = document.getElementById("tab-week");
const tabAll = document.getElementById("tab-all");
const leaderboardTabsEl = document.querySelector(".leaderboard-tabs");
const weekLabelEl = document.getElementById("week-label");
const leaderboardEl = document.getElementById("leaderboard");
const particleFieldEl = document.getElementById("particle-field");
const bootSequenceEl = document.getElementById("boot-sequence");
const bootLineEl = document.getElementById("boot-line");
const bootProgressFillEl = document.getElementById("boot-progress-fill");
const bootSkipEl = document.getElementById("boot-skip");

const hudModeEl = document.getElementById("hud-mode");
const hudScoreEl = document.getElementById("hud-score");
const hudTargetEl = document.getElementById("hud-target");
const hudSpeedEl = document.getElementById("hud-speed");
const hudSpeedBarEl = document.getElementById("hud-speed-bar");
const hudRallyEl = document.getElementById("hud-rally");
const hudRankEl = document.getElementById("hud-rank");
const mobileModeEl = document.getElementById("mobile-mode");
const mobileScoreEl = document.getElementById("mobile-score");
const terminalLogEl = document.getElementById("terminal-log");
const speedGlowEl = document.getElementById("speed-glow");

const badgeSyncEl = document.getElementById("badge-sync");
const badgeLedgerEl = document.getElementById("badge-ledger");
const badgeTxEl = document.getElementById("badge-tx");

const metricLatencyEl = document.getElementById("metric-latency");
const metricHashEl = document.getElementById("metric-hash");
const metricEntropyEl = document.getElementById("metric-entropy");

const soundToggleEl = document.getElementById("sound-toggle");
const pauseToggleEl = document.getElementById("btn-pause-desktop");
const toastLayerEl = document.getElementById("toast-layer");

const modFastEl = document.getElementById("mod-fast");
const modBigEl = document.getElementById("mod-big");
const modNarrowEl = document.getElementById("mod-narrow");
const themeNeonEl = document.getElementById("theme-neon");
const themeGhostEl = document.getElementById("theme-ghost");
const themeCircuitEl = document.getElementById("theme-circuit");
const audioProfileEl = document.getElementById("audio-profile");

const touchLeftUp = document.getElementById("touch-left-up");
const touchLeftDown = document.getElementById("touch-left-down");
const touchRightUp = document.getElementById("touch-right-up");
const touchRightDown = document.getElementById("touch-right-down");
const touchPause = document.getElementById("touch-pause");

let currentUser = null;
let authChoice = null;
let selectedMode = null;
let currentMode = null;
let isRanked = false;
let runtimeReady = false;
let mainStarted = false;
let paused = false;
let leaderboardMode = "week";
let lastLeftPoints = 0;
let lastRightPoints = 0;
let lastWinner = null;
let lastRank = "Kernel";
let currentAiLevel = 1;
let lastAchievementAt = 0;

let inputLeftUp = false;
let inputLeftDown = false;
let inputRightUp = false;
let inputRightDown = false;

let audioCtx = null;
let audioReady = false;
let audioEnabled = true;
let currentAudioProfile = "arcade";
let ambientNode = null;
let ambientGain = null;
let ambientTarget = 0;
let ambientLfo = null;
let overlayParticlesTimer = null;
let speedEnergyTarget = 0;
let speedEnergyCurrent = 0;
let introPlayed = false;
let lowFxMode = false;

const audioProfiles = {
  soft: { blipFreq: 560, blipGain: 0.025, blipType: "sine", thumpFreq: 140, thumpGain: 0.035, thumpType: "sine", ambientFreq: 40, ambientGain: 0.008 },
  arcade: { blipFreq: 720, blipGain: 0.035, blipType: "triangle", thumpFreq: 180, thumpGain: 0.05, thumpType: "sawtooth", ambientFreq: 48, ambientGain: 0.012 },
  techno: { blipFreq: 880, blipGain: 0.04, blipType: "square", thumpFreq: 220, thumpGain: 0.06, thumpType: "sawtooth", ambientFreq: 58, ambientGain: 0.016 },
};

function ccall(name, returnType = null, types = [], args = []) {
  if (!window.Module || !Module.ccall) return;
  Module.ccall(name, returnType, types, args);
}

function ensureMainStarted() {
  if (mainStarted || !window.Module || !Module.callMain) return;
  Module.callMain([]);
  mainStarted = true;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function setAuthMessage(text) {
  authMessageEl.textContent = text || "";
}

function formatAuthError(error) {
  if (!error) return "Неизвестная ошибка авторизации.";
  const code = (error.error_code || "").toLowerCase();
  const msg = (error.message || "").toLowerCase();

  if (code === "over_email_send_rate_limit" || msg.includes("rate limit")) {
    return "Слишком много попыток. Подождите 1-2 минуты и попробуйте снова.";
  }
  if (code === "email_address_invalid" || msg.includes("invalid email")) {
    return "Некорректный email. Введите реальный адрес (например, Gmail/Mail).";
  }
  if (msg.includes("user already registered")) {
    return "Этот email уже зарегистрирован. Нажмите «Войти».";
  }
  if (msg.includes("email not confirmed")) {
    return "Почта не подтверждена. Проверьте письмо и подтвердите аккаунт.";
  }
  if (msg.includes("invalid login credentials")) {
    return "Неверный email или пароль.";
  }
  return error.message || "Ошибка авторизации.";
}

function setAuthBusy(busy) {
  btnSignIn.disabled = busy;
  btnSignUp.disabled = busy;
}

function setStep(step) {
  const auth = step === "auth";
  stepAuthEl.classList.toggle("hidden", !auth);
  stepSetupEl.classList.toggle("hidden", auth);
  stepPillAuthEl.classList.toggle("active", auth);
  stepPillSetupEl.classList.toggle("active", !auth);
}

function describeMode(mode) {
  if (mode === "ai") return "Соло-режим: один игрок против нейросети.";
  if (mode === "ranked") return "Рейтинг: сложность Hard, результат попадет в таблицу лидеров.";
  if (mode === "pvp") return "Локальный матч: A/D для левого, стрелки для правого игрока.";
  return "Выберите режим, чтобы продолжить.";
}

function updateModeSummary(mode = selectedMode) {
  if (!modeSummaryEl) return;
  modeSummaryEl.textContent = describeMode(mode);
}

function updatePauseButton() {
  if (!pauseToggleEl) return;
  pauseToggleEl.textContent = paused ? "Продолжить" : "Пауза";
  pauseToggleEl.classList.toggle("active", paused);
}

function updateControlHint() {
  if (!controlHintEl) return;
  if (currentMode === 0) {
    controlHintEl.textContent = "A/D — левая ракетка, стрелки — правая. Пробел или кнопка «Пауза».";
    return;
  }
  controlHintEl.textContent = "A/D — управление игрока. Пробел или кнопка «Пауза».";
}

function applyPerformanceProfile() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileViewport = window.matchMedia("(max-width: 900px)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  lowFxMode = reduceMotion || mobileViewport || coarsePointer;
  document.body.classList.toggle("mobile-lite", lowFxMode);
}

function updateLeaderboardTabIndicator() {
  if (!leaderboardTabsEl) return;
  const active = leaderboardTabsEl.querySelector(".tab.active");
  if (!active) {
    leaderboardTabsEl.style.setProperty("--tab-visible", "0");
    return;
  }
  leaderboardTabsEl.style.setProperty("--tab-x", `${active.offsetLeft}px`);
  leaderboardTabsEl.style.setProperty("--tab-w", `${active.offsetWidth}px`);
  leaderboardTabsEl.style.setProperty("--tab-visible", "1");
}

function initParallax() {
  if (lowFxMode) return;
  let raf = 0;
  window.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 18;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 16;
      document.body.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
      document.body.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    });
  }, { passive: true });
  window.addEventListener("pointerleave", () => {
    document.body.style.setProperty("--parallax-x", "0px");
    document.body.style.setProperty("--parallax-y", "0px");
  });
}

function spawnOverlayParticle() {
  if (lowFxMode) return;
  if (!particleFieldEl || overlayEl.classList.contains("hidden")) return;
  const particle = document.createElement("span");
  particle.className = Math.random() > 0.45 ? "particle blue" : "particle";

  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const angle = Math.random() * Math.PI * 2;
  const dist = 24 + Math.random() * 84;

  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.setProperty("--x", "0px");
  particle.style.setProperty("--y", "0px");
  particle.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
  particle.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
  particle.style.animationDuration = `${1.1 + Math.random() * 1.1}s`;
  particleFieldEl.appendChild(particle);

  setTimeout(() => particle.remove(), 2400);
}

function toggleOverlayParticles(active) {
  if (!particleFieldEl) return;
  if (lowFxMode) {
    particleFieldEl.innerHTML = "";
    if (overlayParticlesTimer) {
      clearInterval(overlayParticlesTimer);
      overlayParticlesTimer = null;
    }
    return;
  }
  if (active) {
    if (overlayParticlesTimer) return;
    for (let i = 0; i < 10; i += 1) spawnOverlayParticle();
    overlayParticlesTimer = setInterval(() => {
      for (let i = 0; i < 3; i += 1) spawnOverlayParticle();
    }, 340);
    return;
  }
  if (overlayParticlesTimer) {
    clearInterval(overlayParticlesTimer);
    overlayParticlesTimer = null;
  }
  particleFieldEl.innerHTML = "";
}

function setSpeedEnergy(speed) {
  const next = Math.min(Math.max(speed / 700, 0), 1);
  speedEnergyTarget = lowFxMode ? next * 0.35 : next;
}

function tickVisualEnergy() {
  speedEnergyCurrent += (speedEnergyTarget - speedEnergyCurrent) * 0.12;
  document.body.style.setProperty("--speed-energy", speedEnergyCurrent.toFixed(3));
  requestAnimationFrame(tickVisualEnergy);
}

function playBootSequence() {
  if (lowFxMode) return Promise.resolve();
  if (!bootSequenceEl || introPlayed) return Promise.resolve();
  introPlayed = true;
  bootSequenceEl.classList.remove("hidden");

  const lines = [
    "Инициализация ядра...",
    "Подключение телеметрии...",
    "Калибровка арены...",
    "Готово к запуску.",
  ];
  const start = performance.now();
  const durationMs = 2700;

  return new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      bootSequenceEl.classList.add("hidden");
      if (bootSkipEl) bootSkipEl.removeEventListener("click", finish);
      setTimeout(resolve, 280);
    };

    if (bootSkipEl) bootSkipEl.addEventListener("click", finish);

    const tick = (now) => {
      if (finished) return;
      const progress = Math.min((now - start) / durationMs, 1);
      if (bootProgressFillEl) {
        bootProgressFillEl.style.width = `${Math.round(progress * 100)}%`;
      }
      if (bootLineEl) {
        const idx = Math.min(lines.length - 1, Math.floor(progress * lines.length));
        bootLineEl.textContent = lines[idx];
      }
      if (progress >= 1) {
        finish();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function clearTouchInput() {
  inputLeftUp = false;
  inputLeftDown = false;
  inputRightUp = false;
  inputRightDown = false;
  flushInput();
}

function showOverlayForOnboarding() {
  overlayEl.classList.remove("hidden");
  document.body.classList.add("overlay-open");
  overlayEl.classList.remove("victory");
  toggleOverlayParticles(true);
  setSpeedEnergy(0);
  paused = true;
  updatePauseButton();
  ccall("set_paused", null, ["number"], [1]);
  clearTouchInput();
  setInputLock(true);
  if (canvasEl) {
    canvasEl.blur();
  }
  overlayTitleEl.textContent = "Pong";
  overlayScoreEl.textContent = "Подготовим игру по шагам.";
  seasonSummaryEl.classList.remove("active");
  seasonSummaryEl.innerHTML = "";
  if (currentUser) {
    authChoice = "signed";
    setStep("setup");
  } else {
    setStep("auth");
  }
  updateModeSummary();
  btnStartGame.disabled = !selectedMode;
  updateRankedAvailability();
}

function hideOverlay() {
  overlayEl.classList.add("hidden");
  document.body.classList.remove("overlay-open");
  toggleOverlayParticles(false);
  setInputLock(false);
}

function updateRankedAvailability() {
  btnModeRanked.disabled = !currentUser;
  btnModeRanked.title = currentUser ? "" : "Для Ranked нужен вход";
}

function selectMode(mode) {
  selectedMode = mode;
  btnModeAi.classList.toggle("theme-active", mode === "ai");
  btnModeRanked.classList.toggle("theme-active", mode === "ranked");
  btnModePvp.classList.toggle("theme-active", mode === "pvp");
  updateModeSummary(mode);
  btnStartGame.disabled = false;
}

function weekStartISO(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay();
  const diff = (day + 6) % 7;
  d.setUTCDate(d.getUTCDate() - diff);
  return d.toISOString().slice(0, 10);
}

function formatWeekLabel(weekStart) {
  const [y, m, d] = weekStart.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return `Неделя с ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

async function refreshUser() {
  const { data } = await supa.auth.getUser();
  currentUser = data.user || null;
  if (currentUser) {
    authChoice = "signed";
    setStatus(`Вход: ${currentUser.email}`);
  } else {
    setStatus("Не выполнен вход");
  }
  updateRankedAvailability();
}

async function signUp() {
  setAuthBusy(true);
  try {
    setAuthMessage("Регистрация...");
    const { error } = await supa.auth.signUp({
      email: obEmailEl.value.trim(),
      password: obPasswordEl.value.trim(),
    });
    if (error) {
      setAuthMessage(formatAuthError(error));
      return;
    }

    await refreshUser();
    if (currentUser) {
      setAuthMessage("Аккаунт создан, вход выполнен.");
      guestWarnEl.classList.remove("active");
      setStep("setup");
      await loadLeaderboard();
    } else {
      setAuthMessage("Аккаунт создан. Подтвердите почту и потом нажмите «Войти».");
    }
  } catch (_) {
    setAuthMessage("Сетевая ошибка. Проверьте интернет и попробуйте снова.");
  } finally {
    setAuthBusy(false);
  }
}

async function signIn() {
  setAuthBusy(true);
  try {
    setAuthMessage("Вход...");
    const { error } = await supa.auth.signInWithPassword({
      email: obEmailEl.value.trim(),
      password: obPasswordEl.value.trim(),
    });
    if (error) {
      setAuthMessage(formatAuthError(error));
      return;
    }
    await refreshUser();
    setAuthMessage("Вход выполнен.");
    guestWarnEl.classList.remove("active");
    setStep("setup");
    await loadLeaderboard();
  } catch (_) {
    setAuthMessage("Сетевая ошибка. Проверьте интернет и попробуйте снова.");
  } finally {
    setAuthBusy(false);
  }
}

function continueAsGuest() {
  authChoice = "guest";
  guestWarnEl.classList.add("active");
  setAuthMessage("Режим гостя активирован.");
  setStep("setup");
}

function getMods() {
  return {
    fast: !!modFastEl.checked,
    big: !!modBigEl.checked,
    narrow: !!modNarrowEl.checked,
  };
}

function applyModifiersToRuntime() {
  const mods = getMods();
  ccall("set_modifiers", null, ["number", "number", "number"], [mods.fast ? 1 : 0, mods.big ? 1 : 0, mods.narrow ? 1 : 0]);
}

function saveMods() {
  window.localStorage.setItem("pong_mods", JSON.stringify(getMods()));
}

function loadMods() {
  const raw = window.localStorage.getItem("pong_mods");
  if (!raw) return;
  try {
    const m = JSON.parse(raw);
    modFastEl.checked = !!m.fast;
    modBigEl.checked = !!m.big;
    modNarrowEl.checked = !!m.narrow;
  } catch (_) {}
}

function setTheme(name) {
  document.body.classList.remove("theme-ghost", "theme-circuit");
  if (name === "ghost") document.body.classList.add("theme-ghost");
  if (name === "circuit") document.body.classList.add("theme-circuit");
  themeNeonEl.classList.toggle("theme-active", name === "neon");
  themeGhostEl.classList.toggle("theme-active", name === "ghost");
  themeCircuitEl.classList.toggle("theme-active", name === "circuit");
  window.localStorage.setItem("pong_theme", name);
}

function loadTheme() {
  setTheme(window.localStorage.getItem("pong_theme") || "neon");
}

function setAudioProfile(name) {
  currentAudioProfile = name;
  audioProfileEl.value = name;
  window.localStorage.setItem("pong_audio_profile", name);
  if (ambientNode) {
    ambientNode.frequency.value = audioProfiles[currentAudioProfile].ambientFreq;
  }
  spawnToast(`AUDIO: ${name.toUpperCase()}`);
}

function loadAudioProfile() {
  setAudioProfile(window.localStorage.getItem("pong_audio_profile") || "arcade");
}

function ensureAudio() {
  if (audioReady) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  audioCtx = new AudioContext();
  audioReady = true;
}

function playTone(freq, duration = 0.12, type = "sine", gainValue = 0.04) {
  if (!audioEnabled || !audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function blip() {
  const p = audioProfiles[currentAudioProfile];
  playTone(p.blipFreq, 0.08, p.blipType, p.blipGain);
}

function goalThump() {
  const p = audioProfiles[currentAudioProfile];
  playTone(p.thumpFreq, 0.16, p.thumpType, p.thumpGain);
}

function ensureAmbient() {
  if (!audioCtx || ambientNode) return;
  const p = audioProfiles[currentAudioProfile];
  ambientNode = audioCtx.createOscillator();
  ambientGain = audioCtx.createGain();
  ambientNode.type = "sine";
  ambientNode.frequency.value = p.ambientFreq;
  ambientGain.gain.value = 0;
  ambientNode.connect(ambientGain).connect(audioCtx.destination);
  ambientNode.start();

  ambientLfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  ambientLfo.frequency.value = 0.12;
  lfoGain.gain.value = 0.006;
  ambientLfo.connect(lfoGain).connect(ambientGain.gain);
  ambientLfo.start();
}

function ambientBase() {
  return audioProfiles[currentAudioProfile].ambientGain;
}

function setAmbientTarget(v) {
  if (!ambientGain || !audioEnabled) return;
  ambientTarget = v;
}

function tickAmbient() {
  if (ambientGain) {
    ambientGain.gain.value += (ambientTarget - ambientGain.gain.value) * 0.08;
  }
  requestAnimationFrame(tickAmbient);
}

function spawnToast(text, blue = false) {
  const toast = document.createElement("div");
  toast.className = blue ? "toast blue" : "toast";
  toast.textContent = text;
  toastLayerEl.appendChild(toast);
  setTimeout(() => toast.remove(), 1200);
}

function spawnAchievement(text) {
  const now = Date.now();
  if (now - lastAchievementAt < 2500) return;
  lastAchievementAt = now;
  spawnToast(text, true);
  writeTerminal(text);
}

function writeTerminal(text) {
  terminalLogEl.textContent = `> ${text}`;
}

function flashBadge(el, text) {
  if (text) el.textContent = text;
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 220);
}

function updateSpeedHud(speed) {
  const rounded = Math.round(speed);
  hudSpeedEl.textContent = `${rounded}`;
  const normalized = Math.min(speed / 700, 1);
  setSpeedEnergy(speed);
  hudSpeedBarEl.style.width = `${Math.round(normalized * 100)}%`;

  const scale = 1 + normalized * 0.08;
  speedGlowEl.style.opacity = (0.12 + normalized * 0.35).toFixed(3);
  speedGlowEl.style.transform = `scale(${scale.toFixed(3)})`;
  speedGlowEl.style.background = normalized > 0.6
    ? "radial-gradient(circle, rgba(32, 184, 255, 0.45), transparent 70%)"
    : "radial-gradient(circle, rgba(61, 255, 182, 0.35), transparent 70%)";

  updateMetrics(speed);
}

function updateMetrics(speed) {
  metricLatencyEl.textContent = `${Math.max(4, 28 - Math.round(speed / 40))}ms`;
  metricHashEl.textContent = `${(0.6 + speed / 900).toFixed(2)} GH/s`;
  metricEntropyEl.textContent = `${Math.min(0.98, 0.5 + speed / 1200).toFixed(2)}`;
}

function rankForRally(r) {
  if (r >= 18) return "Zero";
  if (r >= 14) return "Cipher";
  if (r >= 10) return "Node";
  if (r >= 6) return "Root";
  return "Kernel";
}

function updateRallyHud(rally) {
  hudRallyEl.textContent = `${rally}`;
  const nextRank = rankForRally(rally);
  if (nextRank !== lastRank) {
    lastRank = nextRank;
    hudRankEl.textContent = nextRank;
    spawnToast(`Rank Up: ${nextRank}`, currentMode === 1);
    writeTerminal(`RANK: ${nextRank}`);
  } else {
    hudRankEl.textContent = nextRank;
  }
}

function updateModeHud(mode) {
  let modeText = "2 игрока";
  if (mode === 1) {
    if (isRanked) {
      modeText = "Нейросеть (Рейтинг, Hard)";
      writeTerminal("MODE: RANKED");
      flashBadge(badgeLedgerEl, "LEDGER LOCKED");
    } else {
      const labels = ["Легко", "Нормально", "Сложно"];
      modeText = `Нейросеть (${labels[currentAiLevel]})`;
      writeTerminal("MODE: NEURAL");
      flashBadge(badgeLedgerEl, "LEDGER READY");
    }
  } else {
    modeText = "2 игрока";
    writeTerminal("MODE: PVP");
    flashBadge(badgeLedgerEl, "LEDGER READY");
  }
  hudModeEl.textContent = modeText;
  if (mobileModeEl) mobileModeEl.textContent = modeText;
  updateControlHint();
}

function updateScoreHud(left, right) {
  const scoreText = `${left} - ${right}`;
  hudScoreEl.textContent = scoreText;
  if (mobileScoreEl) mobileScoreEl.textContent = scoreText;
  if (left > lastLeftPoints || right > lastRightPoints) {
    document.body.classList.add("glitch");
    spawnToast("TX CONFIRMED", currentMode === 1);
    spawnToast("REPLAY", true);
    writeTerminal("GOAL: CONFIRMED");
    flashBadge(badgeTxEl, "TX CONFIRMED");
    goalThump();
    setTimeout(() => document.body.classList.remove("glitch"), 180);
  }
  lastLeftPoints = left;
  lastRightPoints = right;
}

function winnerTitle() {
  if (lastWinner === null) return "Матч завершен";
  if (currentMode === 1) return lastWinner === 0 ? "Победа" : "Neural Net победил";
  return lastWinner === 0 ? "Победа левого игрока" : "Победа правого игрока";
}

async function loadLeaderboard() {
  let query = supa
    .from(leaderboardMode === "week" ? "leaderboard_weekly" : "leaderboard")
    .select("player_name,score,created_at")
    .order("score", { ascending: false })
    .limit(10);

  if (leaderboardMode === "week") {
    const weekStart = weekStartISO(new Date());
    query = query.eq("week_start", weekStart);
    weekLabelEl.textContent = formatWeekLabel(weekStart);
  } else {
    weekLabelEl.textContent = "";
  }

  const { data, error } = await query;
  if (error || !data) {
    leaderboardEl.innerHTML = "<li>Ошибка загрузки</li>";
    return;
  }
  if (data.length === 0) {
    leaderboardEl.innerHTML = "<li>Пока пусто</li>";
    return;
  }
  leaderboardEl.innerHTML = "";
  for (const row of data) {
    const li = document.createElement("li");
    li.textContent = `${row.player_name || "Игрок"} - ${row.score}`;
    leaderboardEl.appendChild(li);
  }
}

async function submitScore(score) {
  if (!currentUser) return false;
  const playerName = obNicknameEl.value.trim() || currentUser.email.split("@")[0];
  const weekStart = weekStartISO(new Date());

  const { data: existing } = await supa.from("leaderboard").select("id,score").eq("user_id", currentUser.id).maybeSingle();
  if (!existing) {
    await supa.from("leaderboard").insert({ user_id: currentUser.id, score, player_name: playerName });
  } else if (score > existing.score) {
    await supa.from("leaderboard").update({ score, player_name: playerName }).eq("id", existing.id);
  }

  const { data: weeklyExisting } = await supa
    .from("leaderboard_weekly")
    .select("id,score")
    .eq("user_id", currentUser.id)
    .eq("week_start", weekStart)
    .maybeSingle();
  if (!weeklyExisting) {
    await supa.from("leaderboard_weekly").insert({ user_id: currentUser.id, score, player_name: playerName, week_start: weekStart });
  } else if (score > weeklyExisting.score) {
    await supa.from("leaderboard_weekly").update({ score, player_name: playerName }).eq("id", weeklyExisting.id);
  }

  await loadLeaderboard();
  return true;
}

function isTypingInField() {
  const el = document.activeElement;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT");
}

function setInputLock(locked) {
  ccall("set_input_lock", null, ["number"], [locked ? 1 : 0]);
}

function flushInput() {
  ccall("set_input", null, ["number", "number", "number", "number"], [
    inputLeftUp ? 1 : 0,
    inputLeftDown ? 1 : 0,
    inputRightUp ? 1 : 0,
    inputRightDown ? 1 : 0,
  ]);
}

function togglePauseFromUi() {
  if (!overlayEl.classList.contains("hidden")) return;
  paused = !paused;
  ccall("set_paused", null, ["number"], [paused ? 1 : 0]);
  if (paused) setSpeedEnergy(0);
  setAmbientTarget(paused ? 0.003 : ambientBase() + (isRanked ? 0.004 : 0));
  updatePauseButton();
}

function bindAuthInputSafeTyping() {
  const authInputs = [obEmailEl, obPasswordEl, obNicknameEl];
  for (const input of authInputs) {
    if (!input) continue;
    input.addEventListener("focus", () => {
      setInputLock(true);
    });
    input.addEventListener("pointerdown", () => {
      setInputLock(true);
    });
    input.addEventListener("keydown", (event) => {
      event.stopPropagation();
    });
    input.addEventListener("keyup", (event) => {
      event.stopPropagation();
    });
  }
}

function bindTouchButton(el, onPress, onRelease) {
  if (!el) return;
  el.addEventListener("touchstart", (e) => { e.preventDefault(); onPress(); }, { passive: false });
  el.addEventListener("touchend", (e) => { e.preventDefault(); onRelease(); }, { passive: false });
  el.addEventListener("touchcancel", onRelease);
  el.addEventListener("mousedown", (e) => { e.preventDefault(); onPress(); });
  el.addEventListener("mouseup", onRelease);
  el.addEventListener("mouseleave", onRelease);
}

function startSelectedGame() {
  if (!runtimeReady) {
    spawnToast("Движок еще загружается", true);
    return;
  }
  if (!selectedMode) {
    spawnToast("Сначала выберите режим", true);
    return;
  }
  if (selectedMode === "ranked" && !currentUser) {
    spawnToast("Для Ranked нужен вход", true);
    setStep("auth");
    return;
  }

  saveMods();
  ensureAudio();
  ensureAmbient();
  ensureMainStarted();
  setSpeedEnergy(0);
  paused = false;
  updatePauseButton();

  currentMode = selectedMode === "pvp" ? 0 : 1;
  isRanked = selectedMode === "ranked";
  if (isRanked) currentAiLevel = 2;

  applyModifiersToRuntime();
  ccall("set_game_mode", null, ["number"], [currentMode]);
  ccall("set_ranked", null, ["number"], [isRanked ? 1 : 0]);
  if (currentMode === 1) {
    ccall("set_ai_level", null, ["number"], [currentAiLevel]);
  }
  ccall("set_paused", null, ["number"], [0]);
  ccall("reset_game_api", null, [], []);
  clearTouchInput();
  setInputLock(false);

  setAmbientTarget(ambientBase() + (isRanked ? 0.004 : 0));
  updateModeHud(currentMode);
  hideOverlay();
  if (canvasEl) {
    requestAnimationFrame(() => canvasEl.focus());
  }
}

function wireModuleCallbacks() {
  const onGameOver = (score) => {
    overlayEl.classList.remove("hidden");
    document.body.classList.add("overlay-open");
    toggleOverlayParticles(true);
    setSpeedEnergy(0);
    paused = true;
    updatePauseButton();
    ccall("set_paused", null, ["number"], [1]);
    clearTouchInput();
    setInputLock(true);
    if (canvasEl) {
      canvasEl.blur();
    }
    setStep("setup");
    overlayTitleEl.textContent = winnerTitle();
    overlayScoreEl.textContent = currentMode === 1
      ? `Матч: ${lastLeftPoints}-${lastRightPoints} | Стиль: ${score}`
      : `Матч: ${lastLeftPoints}-${lastRightPoints}`;

    if (currentMode === 1 && isRanked) {
      submitScore(score);
    }

    setAmbientTarget(0.003);
  };

  const onBallSpeed = (speed) => {
    updateSpeedHud(speed);
    if (speed > 520) spawnAchievement("ZERO LATENCY");
  };

  const onCombo = (combo) => {
    updateRallyHud(combo);
    if (combo > 0 && combo % 5 === 0) {
      spawnToast(`Combo x${combo}`, currentMode === 1);
      writeTerminal(`COMBO: ${combo}`);
    }
    if (combo >= 12) spawnAchievement("PERFECT DEFLECT");
    if (combo > 0) blip();
  };

  const onMode = (mode) => updateModeHud(mode);
  const onPoints = (left, right) => updateScoreHud(left, right);
  const onTarget = (target) => { hudTargetEl.textContent = `До ${target}`; };
  const onAiLevel = (level) => { currentAiLevel = level; updateModeHud(1); };
  const onWinner = (winner) => { lastWinner = winner; };

  window.Module.onGameOver = onGameOver;
  window.Module.onBallSpeed = onBallSpeed;
  window.Module.onCombo = onCombo;
  window.Module.onMode = onMode;
  window.Module.onPoints = onPoints;
  window.Module.onTarget = onTarget;
  window.Module.onAiLevel = onAiLevel;
  window.Module.onWinner = onWinner;
}

function initEvents() {
  applyPerformanceProfile();
  bindAuthInputSafeTyping();
  initParallax();
  window.addEventListener("resize", () => {
    applyPerformanceProfile();
    updateLeaderboardTabIndicator();
  });
  window.addEventListener("orientationchange", applyPerformanceProfile);

  btnSignIn.addEventListener("click", signIn);
  btnSignUp.addEventListener("click", signUp);
  btnGuest.addEventListener("click", continueAsGuest);
  btnBackAuth.addEventListener("click", () => setStep("auth"));
  btnStartGame.addEventListener("click", startSelectedGame);

  btnModeAi.addEventListener("click", () => selectMode("ai"));
  btnModeRanked.addEventListener("click", () => selectMode("ranked"));
  btnModePvp.addEventListener("click", () => selectMode("pvp"));

  themeNeonEl.addEventListener("click", () => setTheme("neon"));
  themeGhostEl.addEventListener("click", () => setTheme("ghost"));
  themeCircuitEl.addEventListener("click", () => setTheme("circuit"));

  audioProfileEl.addEventListener("change", (e) => setAudioProfile(e.target.value));

  soundToggleEl.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    soundToggleEl.textContent = `Звук: ${audioEnabled ? "Вкл" : "Выкл"}`;
    soundToggleEl.classList.toggle("off", !audioEnabled);
    if (!audioEnabled && ambientGain) {
      ambientGain.gain.value = 0;
      ambientTarget = 0;
    }
  });

  if (pauseToggleEl) {
    pauseToggleEl.addEventListener("click", () => {
      ensureAudio();
      ensureAmbient();
      togglePauseFromUi();
    });
  }

  tabWeek.addEventListener("click", () => {
    leaderboardMode = "week";
    tabWeek.classList.add("active");
    tabAll.classList.remove("active");
    updateLeaderboardTabIndicator();
    loadLeaderboard();
  });

  tabAll.addEventListener("click", () => {
    leaderboardMode = "all";
    tabAll.classList.add("active");
    tabWeek.classList.remove("active");
    updateLeaderboardTabIndicator();
    loadLeaderboard();
  });

  document.addEventListener("keydown", (event) => {
    if (isTypingInField()) return;
    ensureAudio();
    ensureAmbient();

    if (event.code === "Space") {
      event.preventDefault();
      togglePauseFromUi();
    }
  });

  document.addEventListener("focusin", () => {
    if (isTypingInField() || !overlayEl.classList.contains("hidden")) {
      setInputLock(true);
    }
  });
  document.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      const shouldLock = isTypingInField() || !overlayEl.classList.contains("hidden");
      setInputLock(shouldLock);
    });
  });

  if (canvasEl) {
    canvasEl.addEventListener("click", () => {
      if (overlayEl.classList.contains("hidden")) {
        canvasEl.focus();
      }
    });
  }

  bindTouchButton(touchLeftUp, () => { inputLeftUp = true; flushInput(); }, () => { inputLeftUp = false; flushInput(); });
  bindTouchButton(touchLeftDown, () => { inputLeftDown = true; flushInput(); }, () => { inputLeftDown = false; flushInput(); });
  bindTouchButton(touchRightUp, () => { inputRightUp = true; flushInput(); }, () => { inputRightUp = false; flushInput(); });
  bindTouchButton(touchRightDown, () => { inputRightDown = true; flushInput(); }, () => { inputRightDown = false; flushInput(); });
  bindTouchButton(touchPause, () => {
    ensureAudio();
    ensureAmbient();
    togglePauseFromUi();
  }, () => {});

  supa.auth.onAuthStateChange(async () => {
    await refreshUser();
  });
}

async function init() {
  initEvents();
  wireModuleCallbacks();
  loadMods();
  loadTheme();
  loadAudioProfile();
  await refreshUser();
  await loadLeaderboard();
  updateLeaderboardTabIndicator();

  hudModeEl.textContent = "2 игрока";
  hudScoreEl.textContent = "0 - 0";
  hudTargetEl.textContent = "До 7";
  hudSpeedEl.textContent = "0";
  hudRallyEl.textContent = "0";
  hudRankEl.textContent = "Kernel";
  badgeSyncEl.textContent = "SYNC OK";
  badgeLedgerEl.textContent = "LEDGER READY";
  badgeTxEl.textContent = "TX IDLE";
  soundToggleEl.textContent = `Звук: ${audioEnabled ? "Вкл" : "Выкл"}`;
  btnStartGame.disabled = !selectedMode;
  updateModeSummary();
  updatePauseButton();
  updateControlHint();
  if (mobileModeEl) mobileModeEl.textContent = "2 игрока";
  if (mobileScoreEl) mobileScoreEl.textContent = "0 - 0";

  await playBootSequence();
  showOverlayForOnboarding();
  requestAnimationFrame(tickAmbient);
  requestAnimationFrame(tickVisualEnergy);
  requestAnimationFrame(updateLeaderboardTabIndicator);
}

if (window.Module) {
  window.Module.onRuntimeInitialized = () => {
    runtimeReady = true;
    setInputLock(!overlayEl.classList.contains("hidden"));
  };
}

init();
