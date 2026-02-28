const { createClient } = window.supabase;
const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "pong-wasm-auth",
  },
});

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
const aiBadgeEl = document.getElementById("ai-badge");
const matchPanelTitleEl = document.getElementById("match-panel-title");
const leaderboardTitleEl = document.getElementById("leaderboard-title");
const metricLabelLatencyEl = document.getElementById("metric-label-latency");
const metricLabelHashEl = document.getElementById("metric-label-hash");
const metricLabelEntropyEl = document.getElementById("metric-label-entropy");

const authScreenTitleEl = document.getElementById("auth-screen-title");
const mainMenuTitleEl = document.getElementById("main-menu-title");
const labelEmailEl = document.getElementById("label-email");
const labelPasswordEl = document.getElementById("label-password");
const labelNicknameEl = document.getElementById("label-nickname");
const modeAiTitleEl = document.getElementById("mode-ai-title");
const modeAiDescEl = document.getElementById("mode-ai-desc");
const modeRankedTitleEl = document.getElementById("mode-ranked-title");
const modeRankedDescEl = document.getElementById("mode-ranked-desc");
const modePvpTitleEl = document.getElementById("mode-pvp-title");
const modePvpDescEl = document.getElementById("mode-pvp-desc");
const modeBlitzTitleEl = document.getElementById("mode-blitz-title");
const modeBlitzDescEl = document.getElementById("mode-blitz-desc");
const modeTrainingTitleEl = document.getElementById("mode-training-title");
const modeTrainingDescEl = document.getElementById("mode-training-desc");
const modeArcadeTitleEl = document.getElementById("mode-arcade-title");
const modeArcadeDescEl = document.getElementById("mode-arcade-desc");
const modeBetTitleEl = document.getElementById("mode-bet-title");
const modeBetDescEl = document.getElementById("mode-bet-desc");
const extrasTitleMatchEl = document.getElementById("extras-title-match");
const extrasTitleModsEl = document.getElementById("extras-title-mods");
const extrasTitleThemeEl = document.getElementById("extras-title-theme");
const extrasTitleSoundEl = document.getElementById("extras-title-sound");
const labelMatchTargetEl = document.getElementById("label-match-target");
const labelMatchAiLevelEl = document.getElementById("label-match-ai-level");
const labelMatchTempoEl = document.getElementById("label-match-tempo");
const labelMatchBetEl = document.getElementById("label-match-bet");
const modFastLabelEl = document.getElementById("mod-fast-label");
const modBigLabelEl = document.getElementById("mod-big-label");
const modNarrowLabelEl = document.getElementById("mod-narrow-label");
const hintRankedEl = document.getElementById("hint-ranked");
const launchTextEl = document.getElementById("launch-text");
const bootKickerEl = document.getElementById("boot-kicker");
const betNoteEl = document.getElementById("bet-note");
const betFieldEl = document.getElementById("bet-field");

const optTargetAutoEl = document.getElementById("opt-target-auto");
const optTarget5El = document.getElementById("opt-target-5");
const optTarget7El = document.getElementById("opt-target-7");
const optTarget11El = document.getElementById("opt-target-11");
const optTarget15El = document.getElementById("opt-target-15");
const optAiAutoEl = document.getElementById("opt-ai-auto");
const optAi0El = document.getElementById("opt-ai-0");
const optAi1El = document.getElementById("opt-ai-1");
const optAi2El = document.getElementById("opt-ai-2");
const optTempoAutoEl = document.getElementById("opt-tempo-auto");
const optTempo09El = document.getElementById("opt-tempo-09");
const optTempo10El = document.getElementById("opt-tempo-10");
const optTempo11El = document.getElementById("opt-tempo-11");
const optTempo118El = document.getElementById("opt-tempo-118");
const optBet25El = document.getElementById("opt-bet-25");
const optBet50El = document.getElementById("opt-bet-50");
const optBet100El = document.getElementById("opt-bet-100");
const optBet200El = document.getElementById("opt-bet-200");
const audioOptSoftEl = document.getElementById("audio-opt-soft");
const audioOptArcadeEl = document.getElementById("audio-opt-arcade");
const audioOptTechnoEl = document.getElementById("audio-opt-techno");

const obEmailEl = document.getElementById("ob-email");
const obPasswordEl = document.getElementById("ob-password");
const obNicknameEl = document.getElementById("ob-nickname");
const btnSignIn = document.getElementById("btn-signin");
const btnSignUp = document.getElementById("btn-signup");
const btnGuest = document.getElementById("btn-auth-guest");
const btnBackAuth = document.getElementById("btn-back-auth");
const btnStartGame = document.getElementById("btn-start-game");
const btnOpenAuth = document.getElementById("btn-open-auth");
const btnLogout = document.getElementById("btn-logout");
const sessionLineEl = document.getElementById("session-line");
const guestSessionBannerEl = document.getElementById("guest-session-banner");
const btnModeAi = document.getElementById("btn-mode-ai");
const btnModeRanked = document.getElementById("btn-mode-ranked");
const btnModePvp = document.getElementById("btn-mode-pvp");
const btnModeBlitz = document.getElementById("btn-mode-blitz");
const btnModeTraining = document.getElementById("btn-mode-training");
const btnModeArcade = document.getElementById("btn-mode-arcade");
const btnModeBet = document.getElementById("btn-mode-bet");
const modeCardEls = Array.from(document.querySelectorAll(".mode-card"));

const tabWeek = document.getElementById("tab-week");
const tabAll = document.getElementById("tab-all");
const tabRating = document.getElementById("tab-rating");
const leaderboardTabsEl = document.querySelector(".leaderboard-tabs");
const weekLabelEl = document.getElementById("week-label");
const leaderboardEl = document.getElementById("leaderboard");
const profileTitleEl = document.getElementById("profile-title");
const profileSummaryEl = document.getElementById("profile-summary");
const streakLineEl = document.getElementById("streak-line");
const badgeGridEl = document.getElementById("badge-grid");
const dailyTitleEl = document.getElementById("daily-title");
const dailyListEl = document.getElementById("daily-list");
const historyTitleEl = document.getElementById("history-title");
const historyListEl = document.getElementById("history-list");
const particleFieldEl = document.getElementById("particle-field");
const bootSequenceEl = document.getElementById("boot-sequence");
const bootLineEl = document.getElementById("boot-line");
const bootProgressFillEl = document.getElementById("boot-progress-fill");
const bootSkipEl = document.getElementById("boot-skip");
const launchTransitionEl = document.getElementById("launch-transition");

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
const matchTargetEl = document.getElementById("match-target");
const matchAiLevelEl = document.getElementById("match-ai-level");
const matchTempoEl = document.getElementById("match-tempo");
const matchBetEl = document.getElementById("match-bet");
const setupLockNoteEl = document.getElementById("setup-lock-note");
const themeNeonEl = document.getElementById("theme-neon");
const themeGhostEl = document.getElementById("theme-ghost");
const themeCircuitEl = document.getElementById("theme-circuit");
const themeMatrixEl = document.getElementById("theme-matrix");
const themeEmberEl = document.getElementById("theme-ember");
const audioProfileEl = document.getElementById("audio-profile");

const touchLeftUp = document.getElementById("touch-left-up");
const touchLeftDown = document.getElementById("touch-left-down");
const touchRightUp = document.getElementById("touch-right-up");
const touchRightDown = document.getElementById("touch-right-down");
const touchPause = document.getElementById("touch-pause");
const hudLabelModeEl = document.getElementById("hud-label-mode");
const hudLabelScoreEl = document.getElementById("hud-label-score");
const hudLabelSpeedEl = document.getElementById("hud-label-speed");
const hudLabelRallyEl = document.getElementById("hud-label-rally");
const hudLabelRankEl = document.getElementById("hud-label-rank");

const langTriggerEl = document.getElementById("lang-trigger");
const langMenuEl = document.getElementById("lang-menu");
const langCurrentEl = document.getElementById("lang-current");
const langOptionEls = Array.from(document.querySelectorAll(".lang-option"));

let currentUser = null;
let authChoice = null;
let selectedMode = null;
let activeModeId = null;
let currentMode = null;
let isRanked = false;
let runtimeReady = false;
let mainStarted = false;
let paused = false;
let leaderboardMode = "week";
let lastLeftPoints = 0;
let lastRightPoints = 0;
let lastWinner = null;
let lastRank = "";
let currentAiLevel = 1;
let lastAchievementAt = 0;
let currentTargetPoints = 7;
let matchMaxCombo = 0;
let activeBetStake = 0;
let currentBetBalance = 500;

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
let goalShockTimer = null;
const guestSessionKey = "pong_guest_mode";
const languageKey = "pong_language";
const rememberAccountKey = "pong_remember_account";
const lastEmailKey = "pong_last_email";
const ratingBase = 1000;
const supportedLanguages = ["ru", "en", "zh"];
const defaultBetBalance = 500;
const validBetStakes = new Set(["25", "50", "100", "200"]);

function normalizeLanguageCode(raw) {
  if (!raw) return null;
  const code = String(raw).toLowerCase();
  if (code.startsWith("ru")) return "ru";
  if (code.startsWith("zh")) return "zh";
  if (code.startsWith("en")) return "en";
  return null;
}

function detectInitialLanguage() {
  const saved = normalizeLanguageCode(window.localStorage.getItem(languageKey));
  if (saved) return saved;
  const browser = normalizeLanguageCode(navigator.language || "");
  return browser || "ru";
}

let currentLanguage = detectInitialLanguage();

const audioProfiles = {
  soft: { blipFreq: 560, blipGain: 0.025, blipType: "sine", thumpFreq: 140, thumpGain: 0.035, thumpType: "sine", ambientFreq: 40, ambientGain: 0.008 },
  arcade: { blipFreq: 720, blipGain: 0.035, blipType: "triangle", thumpFreq: 180, thumpGain: 0.05, thumpType: "sawtooth", ambientFreq: 48, ambientGain: 0.012 },
  techno: { blipFreq: 880, blipGain: 0.04, blipType: "square", thumpFreq: 220, thumpGain: 0.06, thumpType: "sawtooth", ambientFreq: 58, ambientGain: 0.016 },
};

const localeByLanguage = {
  ru: "ru-RU",
  en: "en-US",
  zh: "zh-CN",
};

const translations = {
  ru: {
    lang_current: "RU",
    lang_switch_label: "Сменить язык",
    lang_menu_label: "Выбор языка",
    lang_ru: "Русский",
    lang_en: "English",
    lang_zh: "中文",
    auth_not_logged_in: "Не выполнен вход",
    auth_logged_in: "Вход: {email}",
    overlay_prepare: "Подготовим игру по шагам.",
    step_auth: "Экран входа",
    step_setup: "Главное меню",
    auth_screen_title: "Экран входа",
    main_menu_title: "Главное меню",
    label_email: "Почта",
    label_password: "Пароль",
    label_nickname: "Ник",
    placeholder_password: "Минимум 6 символов",
    placeholder_nickname: "Игрок",
    button_signin: "Войти",
    button_signup: "Регистрация",
    button_guest: "Играть как гость",
    button_start: "Запустить игру",
    button_back_auth: "Экран входа",
    button_logout: "Выйти",
    button_pause: "Пауза",
    button_resume: "Продолжить",
    button_skip: "Пропустить",
    button_open_auth_login: "Войти в аккаунт",
    button_open_auth_switch: "Сменить аккаунт",
    guest_warn: "Гость: результаты и прогресс не сохраняются.",
    guest_banner: "Вы зашли как гость. Чтобы сохранить результат — войдите в аккаунт в настройках.",
    session_account: "Аккаунт: {email}",
    session_guest: "Сессия: гость",
    session_none: "Сессия: без входа",
    mode_select_prompt: "Выберите режим, чтобы продолжить.",
    mode_ai_label: "Нейросеть",
    mode_ai_card_title: "С роботом",
    mode_ai_desc: "Соло-режим: гибкие настройки сложности и темпа.",
    mode_ai_card_desc: "Базовый соло-матч против нейросети",
    mode_ranked_label: "Рейтинг",
    mode_ranked_card_title: "Рейтинг",
    mode_ranked_desc: "Турнирный режим: Hard-ИИ и сохранение в лидерборд.",
    mode_ranked_card_desc: "Сложный режим с отправкой в таблицу",
    mode_pvp_label: "2 игрока",
    mode_pvp_card_title: "2 игрока",
    mode_pvp_desc: "Локальный матч 1v1: A/D против стрелок.",
    mode_pvp_card_desc: "Локальная дуэль на одной клавиатуре",
    mode_blitz_label: "Блиц",
    mode_blitz_card_title: "Блиц",
    mode_blitz_desc: "Короткий и агрессивный матч до 5 очков.",
    mode_blitz_card_desc: "Быстрый матч до 5 с агрессивным темпом",
    mode_training_label: "Тренировка",
    mode_training_card_title: "Тренировка",
    mode_training_desc: "Спокойный режим для разогрева и тренировки реакции.",
    mode_training_card_desc: "Длинный матч с мягким ИИ и большим мячом",
    mode_arcade_label: "Аркада+",
    mode_arcade_card_title: "Аркада+",
    mode_arcade_desc: "PvP с повышенным темпом и длинным матчем до 11.",
    mode_arcade_card_desc: "PvP до 11, темп выше и плотная динамика",
    mode_bet_label: "Bet Mode",
    mode_bet_card_title: "Bet Mode",
    mode_bet_desc: "Ставка токенов на исход матча против Hard ИИ.",
    mode_bet_card_desc: "Ставка токенов на исход матча против Hard ИИ",
    match_panel_title: "Статус матча",
    leaderboard_title: "Таблица лидеров",
    tab_week: "Эта неделя",
    tab_all: "За все время",
    tab_rating: "Рейтинг",
    week_from: "Неделя с {date}",
    leaderboard_error: "Ошибка загрузки",
    leaderboard_empty: "Пока пусто",
    leaderboard_ranked_missing: "Таблица рейтинга не настроена в Supabase",
    player_default: "Игрок",
    leaderboard_rating_row: "{name} • {rating} ELO • W{wins}/L{losses}",
    profile_title: "Профиль игрока",
    daily_title: "Ежедневные челленджи",
    history_title: "История матчей",
    profile_guest: "Войдите, чтобы видеть прогресс.",
    profile_rating_line: "Рейтинг: {rating} ELO ({division})",
    profile_record_line: "Матчи: {games} • Победы: {wins} • Поражения: {losses}",
    profile_balance_line: "Баланс: {balance} TOK",
    profile_streak_line: "Серия побед: {current} • Рекорд: {best}",
    daily_guest: "Войдите, чтобы получать ежедневные задания.",
    daily_done: "Выполнено",
    daily_progress: "{value}/{target}",
    history_guest: "Войдите, чтобы видеть историю матчей.",
    history_empty: "Пока нет матчей.",
    history_row: "{mode} • {score} • {result}{rating}{bet} • {time}",
    history_bet_delta: " • Ставка {delta} TOK",
    history_result_win: "Победа",
    history_result_loss: "Поражение",
    history_result_left: "Победа левого",
    history_result_right: "Победа правого",
    challenge_play3_title: "Сыграть 3 матча",
    challenge_play3_desc: "Любые режимы за сегодня",
    challenge_win2_title: "Победить 2 раза",
    challenge_win2_desc: "Победы против нейросети",
    challenge_combo10_title: "Сделать серию 10+",
    challenge_combo10_desc: "Макс. серия отбиваний за день",
    badge_first_win_name: "First Blood",
    badge_first_win_desc: "Первая победа против нейросети",
    badge_streak_3_name: "Heat x3",
    badge_streak_3_desc: "Серия из 3 побед",
    badge_streak_7_name: "Dominance x7",
    badge_streak_7_desc: "Серия из 7 побед",
    badge_combo_20_name: "Combo Master",
    badge_combo_20_desc: "Серия 20+ за матч",
    badge_rating_1200_name: "ELO 1200",
    badge_rating_1200_desc: "Дойти до Silver дивизиона",
    badge_rating_1400_name: "ELO 1400",
    badge_rating_1400_desc: "Дойти до Platinum дивизиона",
    badge_daily_hero_name: "Daily Hero",
    badge_daily_hero_desc: "Закрыть все ежедневные задания",
    toast_badge_unlocked: "НОВЫЙ БЕЙДЖ: {badge}",
    hud_mode: "Режим",
    hud_score: "Счет",
    hud_speed: "Скорость",
    hud_rally: "Серия",
    hud_rank: "Ранг",
    to_points: "До {points}",
    metric_latency: "Задержка",
    metric_hash: "Хэшрейт",
    metric_entropy: "Энтропия",
    badge_sync_ok: "SYNC OK",
    badge_ledger_ready: "LEDGER READY",
    badge_ledger_locked: "LEDGER LOCKED",
    badge_tx_idle: "TX IDLE",
    badge_tx_confirmed: "TX CONFIRMED",
    terminal_session_idle: "SESSION: IDLE",
    terminal_mode: "РЕЖИМ: {mode}",
    terminal_rank: "РАНГ: {rank}",
    terminal_goal_confirmed: "ГОЛ: ПОДТВЕРЖДЕН",
    terminal_combo: "СЕРИЯ: {combo}",
    rank_kernel: "Kernel",
    rank_root: "Root",
    rank_node: "Node",
    rank_cipher: "Cipher",
    rank_zero: "Zero",
    control_hint_pvp: "A/D — левая ракетка, стрелки — правая. Пробел или кнопка «Пауза».",
    control_hint_ai: "A/D — управление игрока. Пробел или кнопка «Пауза».",
    ai_badge: "НЕЙРОСЕТЬ АКТИВНА",
    launch_sync: "СИНХРОНИЗАЦИЯ АРЕНЫ...",
    boot_kicker: "NEURAL ARENA",
    boot_line_0: "Инициализация ядра...",
    boot_line_1: "Подключение телеметрии...",
    boot_line_2: "Калибровка арены...",
    boot_line_3: "Готово к запуску.",
    toast_audio_profile: "ПРОФИЛЬ ЗВУКА: {name}",
    toast_tx_confirmed: "TX CONFIRMED",
    toast_zero_latency: "НУЛЕВАЯ ЗАДЕРЖКА",
    toast_perfect_deflect: "ИДЕАЛЬНЫЙ ОТБИВ",
    toast_rank_up: "Новый ранг: {rank}",
    toast_combo: "Серия x{combo}",
    toast_guest_mode: "ВЫ ВОШЛИ КАК ГОСТЬ",
    toast_signed_out: "ВЫХОД ВЫПОЛНЕН",
    toast_rating_delta: "РЕЙТИНГ {delta} • {rating}",
    toast_bet_result: "BET {delta} TOK • БАЛАНС {balance}",
    toast_engine_loading: "Движок еще загружается",
    toast_select_mode: "Сначала выберите режим",
    toast_ranked_login: "Для Ranked нужен вход",
    toast_bet_login: "Для Bet Mode нужен вход",
    toast_setup_error: "Ошибка конфигурации режима",
    toast_guest_no_save: "ГОСТЬ: ПРОГРЕСС НЕ СОХРАНЯЕТСЯ",
    toast_launch_error: "ОШИБКА ЗАПУСКА: ОБНОВИТЕ СТРАНИЦУ",
    toast_login_to_save: "Войдите, чтобы сохранять прогресс и рейтинг.",
    auth_guest_enabled: "Режим гостя активирован.",
    auth_unknown_error: "Неизвестная ошибка авторизации.",
    auth_rate_limit: "Слишком много попыток. Подождите 1-2 минуты и попробуйте снова.",
    auth_invalid_email: "Некорректный email. Введите реальный адрес (например, Gmail/Mail).",
    auth_already_registered: "Этот email уже зарегистрирован. Нажмите «Войти».",
    auth_email_not_confirmed: "Почта не подтверждена. Проверьте письмо и подтвердите аккаунт.",
    auth_invalid_credentials: "Неверный email или пароль.",
    auth_generic_error: "Ошибка авторизации.",
    auth_signing_up: "Регистрация...",
    auth_signing_in: "Вход...",
    auth_signup_done_loggedin: "Аккаунт создан, вход выполнен.",
    auth_signup_done_confirm: "Аккаунт создан. Подтвердите почту и потом нажмите «Войти».",
    auth_signin_done: "Вход выполнен.",
    auth_resume_prompt: "Аккаунт сохранен на этом устройстве. Войдите, чтобы включить рейтинг и Bet Mode.",
    auth_network_error: "Сетевая ошибка. Проверьте интернет и попробуйте снова.",
    setup_lock_ranked: "Рейтинг фиксирует настройки: честные условия для лидерборда.",
    setup_lock_bet: "Bet Mode фиксирует параметры матча: Hard ИИ и ставку токенов.",
    setup_lock_ai: "Можно менять цель матча, темп и сложность ИИ.",
    setup_lock_pvp: "PvP: сложность ИИ отключена, остальные параметры можно менять.",
    summary_target: "До {points}",
    summary_tempo: "Темп x{value}",
    summary_ai: "ИИ: {level}",
    summary_bet: "Ставка: {stake} TOK",
    summary_mods_default: "Стандартные модификаторы",
    summary_ranked: "Результат попадет в таблицу лидеров",
    winner_finished: "Матч завершен",
    winner_you: "Победа",
    winner_ai: "Neural Net победил",
    winner_left: "Победа левого игрока",
    winner_right: "Победа правого игрока",
    overlay_match_style: "Матч: {left}-{right} | Стиль: {score}",
    overlay_match: "Матч: {left}-{right}",
    mode_ranked_hard: "Рейтинг (Hard)",
    mode_neural_fallback: "Нейросеть",
    mode_pvp_fallback: "2 игрока",
    ai_easy: "Легко",
    ai_normal: "Нормально",
    ai_hard: "Сложно",
    extras_match: "Параметры матча",
    extras_mods: "Модификаторы",
    extras_theme: "Тема",
    extras_sound: "Звук",
    match_target: "Цель матча",
    match_ai: "Сложность нейросети",
    match_tempo: "Темп матча",
    match_bet: "Ставка",
    bet_note: "Выиграй матч и получи +{win} TOK. Проигрыш: {lose} TOK.",
    toast_bet_insufficient: "Недостаточно TOK для ставки",
    opt_auto_mode: "Авто (по режиму)",
    tempo_calm: "Спокойный",
    tempo_standard: "Стандарт",
    tempo_fast: "Быстрый",
    tempo_turbo: "Турбо",
    mod_fast: "Скоростной мяч",
    mod_big: "Большой мяч",
    mod_narrow: "Узкие ракетки",
    theme_neon: "Неон",
    theme_ghost: "Гоуст",
    theme_circuit: "Схема",
    theme_matrix: "Matrix",
    theme_ember: "Ember",
    audio_soft: "Мягкий",
    audio_arcade: "Аркада",
    audio_techno: "Техно",
    hint_ranked: "В рейтинге используется нейросеть на сложности Hard.",
    sound_toggle: "Звук: {state}",
    state_on: "Вкл",
    state_off: "Выкл",
    rating_division_bronze: "Бронза",
    rating_division_silver: "Серебро",
    rating_division_gold: "Золото",
    rating_division_platinum: "Платина",
    rating_division_diamond: "Алмаз",
  },
  en: {
    lang_current: "EN",
    lang_switch_label: "Change language",
    lang_menu_label: "Language selection",
    lang_ru: "Русский",
    lang_en: "English",
    lang_zh: "中文",
    auth_not_logged_in: "Not signed in",
    auth_logged_in: "Signed in: {email}",
    overlay_prepare: "Let's set up the match step by step.",
    step_auth: "Login Screen",
    step_setup: "Main Menu",
    auth_screen_title: "Login Screen",
    main_menu_title: "Main Menu",
    label_email: "Email",
    label_password: "Password",
    label_nickname: "Nickname",
    placeholder_password: "At least 6 characters",
    placeholder_nickname: "Player",
    button_signin: "Sign In",
    button_signup: "Sign Up",
    button_guest: "Play as Guest",
    button_start: "Start Match",
    button_back_auth: "Back to Login",
    button_logout: "Sign Out",
    button_pause: "Pause",
    button_resume: "Resume",
    button_skip: "Skip",
    button_open_auth_login: "Sign in",
    button_open_auth_switch: "Switch account",
    guest_warn: "Guest mode: progress and scores will not be saved.",
    guest_banner: "You are playing as guest. Sign in from settings to save results.",
    session_account: "Account: {email}",
    session_guest: "Session: guest",
    session_none: "Session: not signed in",
    mode_select_prompt: "Choose a mode to continue.",
    mode_ai_label: "Neural AI",
    mode_ai_card_title: "Vs AI",
    mode_ai_desc: "Solo mode with flexible AI and pace settings.",
    mode_ai_card_desc: "Classic solo match against neural AI",
    mode_ranked_label: "Ranked",
    mode_ranked_card_title: "Ranked",
    mode_ranked_desc: "Tournament mode: Hard AI and leaderboard submission.",
    mode_ranked_card_desc: "Competitive mode with leaderboard upload",
    mode_pvp_label: "2 Players",
    mode_pvp_card_title: "2 Players",
    mode_pvp_desc: "Local 1v1: A/D vs arrow keys.",
    mode_pvp_card_desc: "Local duel on one keyboard",
    mode_blitz_label: "Blitz",
    mode_blitz_card_title: "Blitz",
    mode_blitz_desc: "Short aggressive match to 5 points.",
    mode_blitz_card_desc: "Fast 5-point match with high tempo",
    mode_training_label: "Training",
    mode_training_card_title: "Training",
    mode_training_desc: "Calm mode to warm up and train reactions.",
    mode_training_card_desc: "Long match with softer AI and bigger ball",
    mode_arcade_label: "Arcade+",
    mode_arcade_card_title: "Arcade+",
    mode_arcade_desc: "PvP with increased pace, race to 11.",
    mode_arcade_card_desc: "PvP to 11 with denser dynamics",
    mode_bet_label: "Bet Mode",
    mode_bet_card_title: "Bet Mode",
    mode_bet_desc: "Wager tokens on a Hard AI match result.",
    mode_bet_card_desc: "Wager tokens on a Hard AI match result",
    match_panel_title: "Match Status",
    leaderboard_title: "Leaderboard",
    tab_week: "This Week",
    tab_all: "All Time",
    tab_rating: "Rating",
    week_from: "Week from {date}",
    leaderboard_error: "Load error",
    leaderboard_empty: "No entries yet",
    leaderboard_ranked_missing: "Rating table is not configured in Supabase",
    player_default: "Player",
    leaderboard_rating_row: "{name} • {rating} ELO • W{wins}/L{losses}",
    profile_title: "Player Profile",
    daily_title: "Daily Challenges",
    history_title: "Match History",
    profile_guest: "Sign in to see your progress.",
    profile_rating_line: "Rating: {rating} ELO ({division})",
    profile_record_line: "Matches: {games} • Wins: {wins} • Losses: {losses}",
    profile_balance_line: "Balance: {balance} TOK",
    profile_streak_line: "Win streak: {current} • Best: {best}",
    daily_guest: "Sign in to unlock daily challenges.",
    daily_done: "Completed",
    daily_progress: "{value}/{target}",
    history_guest: "Sign in to view match history.",
    history_empty: "No matches yet.",
    history_row: "{mode} • {score} • {result}{rating}{bet} • {time}",
    history_bet_delta: " • Stake {delta} TOK",
    history_result_win: "Win",
    history_result_loss: "Loss",
    history_result_left: "Left wins",
    history_result_right: "Right wins",
    challenge_play3_title: "Play 3 matches",
    challenge_play3_desc: "Any mode, today",
    challenge_win2_title: "Win 2 matches",
    challenge_win2_desc: "Wins vs neural AI",
    challenge_combo10_title: "Reach combo 10+",
    challenge_combo10_desc: "Daily max rally",
    badge_first_win_name: "First Blood",
    badge_first_win_desc: "First victory vs neural AI",
    badge_streak_3_name: "Heat x3",
    badge_streak_3_desc: "3-win streak",
    badge_streak_7_name: "Dominance x7",
    badge_streak_7_desc: "7-win streak",
    badge_combo_20_name: "Combo Master",
    badge_combo_20_desc: "Reach 20+ combo in one match",
    badge_rating_1200_name: "ELO 1200",
    badge_rating_1200_desc: "Reach Silver division",
    badge_rating_1400_name: "ELO 1400",
    badge_rating_1400_desc: "Reach Platinum division",
    badge_daily_hero_name: "Daily Hero",
    badge_daily_hero_desc: "Complete all daily challenges",
    toast_badge_unlocked: "NEW BADGE: {badge}",
    hud_mode: "Mode",
    hud_score: "Score",
    hud_speed: "Speed",
    hud_rally: "Rally",
    hud_rank: "Rank",
    to_points: "To {points}",
    metric_latency: "Latency",
    metric_hash: "Hash Rate",
    metric_entropy: "Entropy",
    badge_sync_ok: "SYNC OK",
    badge_ledger_ready: "LEDGER READY",
    badge_ledger_locked: "LEDGER LOCKED",
    badge_tx_idle: "TX IDLE",
    badge_tx_confirmed: "TX CONFIRMED",
    terminal_session_idle: "SESSION: IDLE",
    terminal_mode: "MODE: {mode}",
    terminal_rank: "RANK: {rank}",
    terminal_goal_confirmed: "GOAL: CONFIRMED",
    terminal_combo: "COMBO: {combo}",
    rank_kernel: "Kernel",
    rank_root: "Root",
    rank_node: "Node",
    rank_cipher: "Cipher",
    rank_zero: "Zero",
    control_hint_pvp: "A/D controls left paddle, arrows control right. Space or Pause button.",
    control_hint_ai: "A/D controls your paddle. Space or Pause button.",
    ai_badge: "NEURAL AI ACTIVE",
    launch_sync: "SYNCHRONIZING ARENA...",
    boot_kicker: "NEURAL ARENA",
    boot_line_0: "Initializing core...",
    boot_line_1: "Connecting telemetry...",
    boot_line_2: "Calibrating arena...",
    boot_line_3: "Ready to launch.",
    toast_audio_profile: "AUDIO PROFILE: {name}",
    toast_tx_confirmed: "TX CONFIRMED",
    toast_zero_latency: "ZERO LATENCY",
    toast_perfect_deflect: "PERFECT DEFLECT",
    toast_rank_up: "Rank up: {rank}",
    toast_combo: "Combo x{combo}",
    toast_guest_mode: "GUEST MODE ENABLED",
    toast_signed_out: "SIGNED OUT",
    toast_rating_delta: "RATING {delta} • {rating}",
    toast_bet_result: "BET {delta} TOK • BALANCE {balance}",
    toast_engine_loading: "Engine is still loading",
    toast_select_mode: "Choose a mode first",
    toast_ranked_login: "Ranked requires login",
    toast_bet_login: "Bet Mode requires login",
    toast_setup_error: "Mode configuration error",
    toast_guest_no_save: "GUEST: PROGRESS IS NOT SAVED",
    toast_launch_error: "LAUNCH ERROR: REFRESH PAGE",
    toast_login_to_save: "Sign in to save progress and ranking.",
    auth_guest_enabled: "Guest mode enabled.",
    auth_unknown_error: "Unknown authorization error.",
    auth_rate_limit: "Too many attempts. Wait 1-2 minutes and try again.",
    auth_invalid_email: "Invalid email. Enter a real address.",
    auth_already_registered: "This email is already registered. Click “Sign In”.",
    auth_email_not_confirmed: "Email not confirmed. Check inbox and confirm account.",
    auth_invalid_credentials: "Invalid email or password.",
    auth_generic_error: "Authorization error.",
    auth_signing_up: "Signing up...",
    auth_signing_in: "Signing in...",
    auth_signup_done_loggedin: "Account created and signed in.",
    auth_signup_done_confirm: "Account created. Confirm email, then click “Sign In”.",
    auth_signin_done: "Signed in successfully.",
    auth_resume_prompt: "Account is remembered on this device. Sign in to unlock Ranked and Bet Mode.",
    auth_network_error: "Network error. Check internet and try again.",
    setup_lock_ranked: "Ranked locks settings for fair leaderboard conditions.",
    setup_lock_bet: "Bet Mode locks match setup: Hard AI with token stake.",
    setup_lock_ai: "Target score, tempo, and AI difficulty can be changed.",
    setup_lock_pvp: "PvP: AI difficulty disabled, other settings are editable.",
    summary_target: "To {points}",
    summary_tempo: "Tempo x{value}",
    summary_ai: "AI: {level}",
    summary_bet: "Stake: {stake} TOK",
    summary_mods_default: "Standard modifiers",
    summary_ranked: "Result will be submitted to leaderboard",
    winner_finished: "Match finished",
    winner_you: "Victory",
    winner_ai: "Neural Net won",
    winner_left: "Left player wins",
    winner_right: "Right player wins",
    overlay_match_style: "Match: {left}-{right} | Style: {score}",
    overlay_match: "Match: {left}-{right}",
    mode_ranked_hard: "Ranked (Hard)",
    mode_neural_fallback: "Neural AI",
    mode_pvp_fallback: "2 Players",
    ai_easy: "Easy",
    ai_normal: "Normal",
    ai_hard: "Hard",
    extras_match: "Match Settings",
    extras_mods: "Modifiers",
    extras_theme: "Theme",
    extras_sound: "Sound",
    match_target: "Target score",
    match_ai: "Neural AI difficulty",
    match_tempo: "Match tempo",
    match_bet: "Stake",
    bet_note: "Win the match for +{win} TOK. Loss: {lose} TOK.",
    toast_bet_insufficient: "Not enough TOK for this stake",
    opt_auto_mode: "Auto (by mode)",
    tempo_calm: "Calm",
    tempo_standard: "Standard",
    tempo_fast: "Fast",
    tempo_turbo: "Turbo",
    mod_fast: "Fast ball",
    mod_big: "Big ball",
    mod_narrow: "Narrow paddles",
    theme_neon: "Neon",
    theme_ghost: "Ghost",
    theme_circuit: "Circuit",
    theme_matrix: "Matrix",
    theme_ember: "Ember",
    audio_soft: "Soft",
    audio_arcade: "Arcade",
    audio_techno: "Techno",
    hint_ranked: "Ranked uses neural AI at Hard difficulty.",
    sound_toggle: "Sound: {state}",
    state_on: "On",
    state_off: "Off",
    rating_division_bronze: "Bronze",
    rating_division_silver: "Silver",
    rating_division_gold: "Gold",
    rating_division_platinum: "Platinum",
    rating_division_diamond: "Diamond",
  },
  zh: {
    lang_current: "中文",
    lang_switch_label: "切换语言",
    lang_menu_label: "语言选择",
    lang_ru: "Русский",
    lang_en: "English",
    lang_zh: "中文",
    auth_not_logged_in: "未登录",
    auth_logged_in: "已登录: {email}",
    overlay_prepare: "我们先分步骤设置比赛。",
    step_auth: "登录界面",
    step_setup: "主菜单",
    auth_screen_title: "登录界面",
    main_menu_title: "主菜单",
    label_email: "邮箱",
    label_password: "密码",
    label_nickname: "昵称",
    placeholder_password: "至少 6 个字符",
    placeholder_nickname: "玩家",
    button_signin: "登录",
    button_signup: "注册",
    button_guest: "游客模式",
    button_start: "开始比赛",
    button_back_auth: "返回登录",
    button_logout: "退出登录",
    button_pause: "暂停",
    button_resume: "继续",
    button_skip: "跳过",
    button_open_auth_login: "登录账号",
    button_open_auth_switch: "切换账号",
    guest_warn: "游客模式：成绩和进度不会保存。",
    guest_banner: "你当前是游客。若要保存成绩，请在设置中登录账号。",
    session_account: "账号: {email}",
    session_guest: "会话: 游客",
    session_none: "会话: 未登录",
    mode_select_prompt: "请选择一个模式继续。",
    mode_ai_label: "神经网络",
    mode_ai_card_title: "对战 AI",
    mode_ai_desc: "单人模式：可调整 AI 难度与节奏。",
    mode_ai_card_desc: "基础单人对战神经网络",
    mode_ranked_label: "排位",
    mode_ranked_card_title: "排位",
    mode_ranked_desc: "竞技模式：Hard AI 并上传排行榜。",
    mode_ranked_card_desc: "高难模式并提交排行榜",
    mode_pvp_label: "双人对战",
    mode_pvp_card_title: "双人对战",
    mode_pvp_desc: "本地 1v1：A/D 对方向键。",
    mode_pvp_card_desc: "一台键盘本地对战",
    mode_blitz_label: "闪电战",
    mode_blitz_card_title: "闪电战",
    mode_blitz_desc: "快节奏短局，先到 5 分。",
    mode_blitz_card_desc: "激进节奏，先到 5 分",
    mode_training_label: "训练",
    mode_training_card_title: "训练",
    mode_training_desc: "平稳节奏，用于热身和反应训练。",
    mode_training_card_desc: "更温和 AI 与更大球体的长局",
    mode_arcade_label: "街机+",
    mode_arcade_card_title: "街机+",
    mode_arcade_desc: "PvP 加速节奏，目标 11 分。",
    mode_arcade_card_desc: "PvP 到 11 分，节奏更快",
    mode_bet_label: "Bet Mode",
    mode_bet_card_title: "Bet Mode",
    mode_bet_desc: "与 Hard AI 对战并押注代币。",
    mode_bet_card_desc: "与 Hard AI 对战并押注代币",
    match_panel_title: "比赛状态",
    leaderboard_title: "排行榜",
    tab_week: "本周",
    tab_all: "总榜",
    tab_rating: "评级",
    week_from: "周起始: {date}",
    leaderboard_error: "加载失败",
    leaderboard_empty: "暂无记录",
    leaderboard_ranked_missing: "Supabase 中未配置评级表",
    player_default: "玩家",
    leaderboard_rating_row: "{name} • {rating} ELO • 胜{wins}/负{losses}",
    profile_title: "玩家资料",
    daily_title: "每日挑战",
    history_title: "对局历史",
    profile_guest: "登录后可查看你的进度。",
    profile_rating_line: "评级: {rating} ELO（{division}）",
    profile_record_line: "对局: {games} • 胜: {wins} • 负: {losses}",
    profile_balance_line: "余额: {balance} TOK",
    profile_streak_line: "连胜: {current} • 最佳: {best}",
    daily_guest: "登录后可解锁每日挑战。",
    daily_done: "已完成",
    daily_progress: "{value}/{target}",
    history_guest: "登录后可查看历史记录。",
    history_empty: "还没有对局记录。",
    history_row: "{mode} • {score} • {result}{rating}{bet} • {time}",
    history_bet_delta: " • 押注 {delta} TOK",
    history_result_win: "胜利",
    history_result_loss: "失败",
    history_result_left: "左侧获胜",
    history_result_right: "右侧获胜",
    challenge_play3_title: "完成 3 场比赛",
    challenge_play3_desc: "今天任意模式",
    challenge_win2_title: "赢下 2 场",
    challenge_win2_desc: "对战神经 AI 胜利",
    challenge_combo10_title: "达成 10+ 连击",
    challenge_combo10_desc: "当天最大回合数",
    badge_first_win_name: "First Blood",
    badge_first_win_desc: "首次击败神经 AI",
    badge_streak_3_name: "Heat x3",
    badge_streak_3_desc: "达成 3 连胜",
    badge_streak_7_name: "Dominance x7",
    badge_streak_7_desc: "达成 7 连胜",
    badge_combo_20_name: "Combo Master",
    badge_combo_20_desc: "单局达成 20+ 连击",
    badge_rating_1200_name: "ELO 1200",
    badge_rating_1200_desc: "达到白银段位",
    badge_rating_1400_name: "ELO 1400",
    badge_rating_1400_desc: "达到白金段位",
    badge_daily_hero_name: "Daily Hero",
    badge_daily_hero_desc: "完成全部每日挑战",
    toast_badge_unlocked: "新徽章: {badge}",
    hud_mode: "模式",
    hud_score: "比分",
    hud_speed: "速度",
    hud_rally: "回合",
    hud_rank: "等级",
    to_points: "到 {points} 分",
    metric_latency: "延迟",
    metric_hash: "哈希率",
    metric_entropy: "熵值",
    badge_sync_ok: "同步正常",
    badge_ledger_ready: "账本就绪",
    badge_ledger_locked: "账本锁定",
    badge_tx_idle: "等待交易",
    badge_tx_confirmed: "交易确认",
    terminal_session_idle: "会话: 空闲",
    terminal_mode: "模式: {mode}",
    terminal_rank: "等级: {rank}",
    terminal_goal_confirmed: "进球: 已确认",
    terminal_combo: "连击: {combo}",
    rank_kernel: "Kernel",
    rank_root: "Root",
    rank_node: "Node",
    rank_cipher: "Cipher",
    rank_zero: "Zero",
    control_hint_pvp: "A/D 控制左拍，方向键控制右拍。空格或“暂停”按钮。",
    control_hint_ai: "A/D 控制你的球拍。空格或“暂停”按钮。",
    ai_badge: "神经网络已激活",
    launch_sync: "正在同步竞技场...",
    boot_kicker: "神经竞技场",
    boot_line_0: "初始化核心中...",
    boot_line_1: "连接遥测中...",
    boot_line_2: "校准场地中...",
    boot_line_3: "准备完成。",
    toast_audio_profile: "音频配置: {name}",
    toast_tx_confirmed: "交易确认",
    toast_zero_latency: "零延迟",
    toast_perfect_deflect: "完美反弹",
    toast_rank_up: "等级提升: {rank}",
    toast_combo: "连击 x{combo}",
    toast_guest_mode: "已进入游客模式",
    toast_signed_out: "已退出登录",
    toast_rating_delta: "评级 {delta} • {rating}",
    toast_bet_result: "BET {delta} TOK • 余额 {balance}",
    toast_engine_loading: "引擎仍在加载",
    toast_select_mode: "请先选择模式",
    toast_ranked_login: "排位模式需要登录",
    toast_bet_login: "Bet Mode 需要登录",
    toast_setup_error: "模式配置错误",
    toast_guest_no_save: "游客模式：进度不会保存",
    toast_launch_error: "启动错误：请刷新页面",
    toast_login_to_save: "登录后可保存进度和排行。",
    auth_guest_enabled: "游客模式已启用。",
    auth_unknown_error: "未知授权错误。",
    auth_rate_limit: "请求过多。请等待 1-2 分钟后重试。",
    auth_invalid_email: "邮箱无效，请输入真实地址。",
    auth_already_registered: "该邮箱已注册，请点击“登录”。",
    auth_email_not_confirmed: "邮箱未验证。请先在邮件中完成验证。",
    auth_invalid_credentials: "邮箱或密码错误。",
    auth_generic_error: "授权失败。",
    auth_signing_up: "注册中...",
    auth_signing_in: "登录中...",
    auth_signup_done_loggedin: "账号已创建并登录。",
    auth_signup_done_confirm: "账号已创建。请先验证邮箱后再登录。",
    auth_signin_done: "登录成功。",
    auth_resume_prompt: "此设备已记住账号。登录后可使用排位和 Bet Mode。",
    auth_network_error: "网络错误，请检查网络后重试。",
    setup_lock_ranked: "排位模式锁定参数，确保排行榜公平。",
    setup_lock_bet: "Bet Mode 锁定参数：Hard AI + 固定押注。",
    setup_lock_ai: "可修改目标分、节奏和 AI 难度。",
    setup_lock_pvp: "PvP：AI 难度不可用，其余参数可修改。",
    summary_target: "到 {points} 分",
    summary_tempo: "节奏 x{value}",
    summary_ai: "AI: {level}",
    summary_bet: "押注: {stake} TOK",
    summary_mods_default: "标准修饰项",
    summary_ranked: "结果将写入排行榜",
    winner_finished: "比赛结束",
    winner_you: "你赢了",
    winner_ai: "神经网络获胜",
    winner_left: "左侧玩家获胜",
    winner_right: "右侧玩家获胜",
    overlay_match_style: "比分: {left}-{right} | 风格: {score}",
    overlay_match: "比分: {left}-{right}",
    mode_ranked_hard: "排位 (Hard)",
    mode_neural_fallback: "神经网络",
    mode_pvp_fallback: "双人对战",
    ai_easy: "简单",
    ai_normal: "普通",
    ai_hard: "困难",
    extras_match: "比赛参数",
    extras_mods: "修饰项",
    extras_theme: "主题",
    extras_sound: "声音",
    match_target: "目标分",
    match_ai: "神经网络难度",
    match_tempo: "比赛节奏",
    match_bet: "押注",
    bet_note: "获胜可得 +{win} TOK，失败: {lose} TOK。",
    toast_bet_insufficient: "TOK 不足，无法押注",
    opt_auto_mode: "自动（按模式）",
    tempo_calm: "平稳",
    tempo_standard: "标准",
    tempo_fast: "快速",
    tempo_turbo: "涡轮",
    mod_fast: "高速球",
    mod_big: "大球",
    mod_narrow: "窄球拍",
    theme_neon: "霓虹",
    theme_ghost: "幽灵",
    theme_circuit: "电路",
    theme_matrix: "矩阵",
    theme_ember: "余烬",
    audio_soft: "柔和",
    audio_arcade: "街机",
    audio_techno: "电子",
    hint_ranked: "排位模式固定为 Hard 难度神经网络。",
    sound_toggle: "声音: {state}",
    state_on: "开",
    state_off: "关",
    rating_division_bronze: "青铜",
    rating_division_silver: "白银",
    rating_division_gold: "黄金",
    rating_division_platinum: "白金",
    rating_division_diamond: "钻石",
  },
};

function t(key, params = {}) {
  const dict = translations[currentLanguage] || translations.ru;
  const fallback = translations.ru[key] || key;
  const template = dict[key] || fallback;
  return template.replace(/\{(\w+)\}/g, (_, token) => String(params[token] ?? ""));
}

function localeTag() {
  return localeByLanguage[currentLanguage] || "ru-RU";
}

function aiLevelLabel(level) {
  const labels = [t("ai_easy"), t("ai_normal"), t("ai_hard")];
  return labels[level] || labels[1];
}

function modeLabel(mode) {
  const preset = modeCatalog[mode];
  return preset ? t(preset.labelKey) : t("mode_select_prompt");
}

function modeDescription(mode) {
  const preset = modeCatalog[mode];
  return preset ? t(preset.descKey) : t("mode_select_prompt");
}

function rankLabelByKey(key) {
  return t(key);
}

function setText(el, text) {
  if (el) el.textContent = text;
}

function setPlaceholder(el, text) {
  if (el) el.placeholder = text;
}

const modeCatalog = {
  ai: {
    labelKey: "mode_ai_label",
    descKey: "mode_ai_desc",
    runtimeMode: 1,
    ranked: false,
    requiresAuth: false,
    target: 7,
    aiLevel: 1,
    speedScale: 1.0,
    mods: { fast: false, big: false, narrow: false },
  },
  ranked: {
    labelKey: "mode_ranked_label",
    descKey: "mode_ranked_desc",
    runtimeMode: 1,
    ranked: true,
    requiresAuth: true,
    target: 7,
    aiLevel: 2,
    speedScale: 1.0,
    mods: { fast: false, big: false, narrow: false },
    lockSetup: true,
  },
  pvp: {
    labelKey: "mode_pvp_label",
    descKey: "mode_pvp_desc",
    runtimeMode: 0,
    ranked: false,
    requiresAuth: false,
    target: 7,
    aiLevel: 1,
    speedScale: 1.0,
    mods: { fast: false, big: false, narrow: false },
  },
  blitz: {
    labelKey: "mode_blitz_label",
    descKey: "mode_blitz_desc",
    runtimeMode: 1,
    ranked: false,
    requiresAuth: false,
    target: 5,
    aiLevel: 2,
    speedScale: 1.18,
    mods: { fast: true, big: false, narrow: true },
  },
  training: {
    labelKey: "mode_training_label",
    descKey: "mode_training_desc",
    runtimeMode: 1,
    ranked: false,
    requiresAuth: false,
    target: 15,
    aiLevel: 0,
    speedScale: 0.9,
    mods: { fast: false, big: true, narrow: false },
  },
  arcade: {
    labelKey: "mode_arcade_label",
    descKey: "mode_arcade_desc",
    runtimeMode: 0,
    ranked: false,
    requiresAuth: false,
    target: 11,
    aiLevel: 1,
    speedScale: 1.1,
    mods: { fast: true, big: false, narrow: false },
  },
  bet: {
    labelKey: "mode_bet_label",
    descKey: "mode_bet_desc",
    runtimeMode: 1,
    ranked: false,
    requiresAuth: true,
    betMode: true,
    target: 7,
    aiLevel: 2,
    speedScale: 1.0,
    mods: { fast: false, big: false, narrow: false },
    lockSetup: true,
  },
};

const modeButtons = {
  ai: btnModeAi,
  ranked: btnModeRanked,
  pvp: btnModePvp,
  blitz: btnModeBlitz,
  training: btnModeTraining,
  arcade: btnModeArcade,
  bet: btnModeBet,
};

const dailyChallengeDefs = [
  { id: "play3", key: "daily_matches", target: 3, titleKey: "challenge_play3_title", descKey: "challenge_play3_desc" },
  { id: "win2", key: "daily_wins", target: 2, titleKey: "challenge_win2_title", descKey: "challenge_win2_desc" },
  { id: "combo10", key: "daily_best_combo", target: 10, titleKey: "challenge_combo10_title", descKey: "challenge_combo10_desc" },
];

const badgeDefs = [
  { id: "first_win", nameKey: "badge_first_win_name", descKey: "badge_first_win_desc" },
  { id: "streak_3", nameKey: "badge_streak_3_name", descKey: "badge_streak_3_desc" },
  { id: "streak_7", nameKey: "badge_streak_7_name", descKey: "badge_streak_7_desc" },
  { id: "combo_20", nameKey: "badge_combo_20_name", descKey: "badge_combo_20_desc" },
  { id: "rating_1200", nameKey: "badge_rating_1200_name", descKey: "badge_rating_1200_desc" },
  { id: "rating_1400", nameKey: "badge_rating_1400_name", descKey: "badge_rating_1400_desc" },
  { id: "daily_hero", nameKey: "badge_daily_hero_name", descKey: "badge_daily_hero_desc" },
];

function ccall(name, returnType = null, types = [], args = []) {
  if (!window.Module || !Module.ccall) return false;
  try {
    Module.ccall(name, returnType, types, args);
    return true;
  } catch (error) {
    console.warn(`[ccall] ${name} unavailable`, error);
    return false;
  }
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

function localizeStaticUi() {
  document.documentElement.lang = currentLanguage;
  setText(stepPillAuthEl, t("step_auth"));
  setText(stepPillSetupEl, t("step_setup"));
  setText(overlayScoreEl, t("overlay_prepare"));
  setText(authScreenTitleEl, t("auth_screen_title"));
  setText(mainMenuTitleEl, t("main_menu_title"));
  setText(labelEmailEl, t("label_email"));
  setText(labelPasswordEl, t("label_password"));
  setText(labelNicknameEl, t("label_nickname"));
  setPlaceholder(obPasswordEl, t("placeholder_password"));
  setPlaceholder(obNicknameEl, t("placeholder_nickname"));
  setText(btnSignIn, t("button_signin"));
  setText(btnSignUp, t("button_signup"));
  setText(btnGuest, t("button_guest"));
  setText(btnBackAuth, t("button_back_auth"));
  setText(btnStartGame, t("button_start"));
  setText(btnLogout, t("button_logout"));
  setText(guestWarnEl, t("guest_warn"));
  setText(guestSessionBannerEl, t("guest_banner"));
  setText(modeAiTitleEl, t("mode_ai_card_title"));
  setText(modeAiDescEl, t("mode_ai_card_desc"));
  setText(modeRankedTitleEl, t("mode_ranked_card_title"));
  setText(modeRankedDescEl, t("mode_ranked_card_desc"));
  setText(modePvpTitleEl, t("mode_pvp_card_title"));
  setText(modePvpDescEl, t("mode_pvp_card_desc"));
  setText(modeBlitzTitleEl, t("mode_blitz_card_title"));
  setText(modeBlitzDescEl, t("mode_blitz_card_desc"));
  setText(modeTrainingTitleEl, t("mode_training_card_title"));
  setText(modeTrainingDescEl, t("mode_training_card_desc"));
  setText(modeArcadeTitleEl, t("mode_arcade_card_title"));
  setText(modeArcadeDescEl, t("mode_arcade_card_desc"));
  setText(modeBetTitleEl, t("mode_bet_card_title"));
  setText(modeBetDescEl, t("mode_bet_card_desc"));
  setText(extrasTitleMatchEl, t("extras_match"));
  setText(extrasTitleModsEl, t("extras_mods"));
  setText(extrasTitleThemeEl, t("extras_theme"));
  setText(extrasTitleSoundEl, t("extras_sound"));
  setText(labelMatchTargetEl, t("match_target"));
  setText(labelMatchAiLevelEl, t("match_ai"));
  setText(labelMatchTempoEl, t("match_tempo"));
  setText(labelMatchBetEl, t("match_bet"));
  setText(modFastLabelEl, t("mod_fast"));
  setText(modBigLabelEl, t("mod_big"));
  setText(modNarrowLabelEl, t("mod_narrow"));
  setText(themeNeonEl, t("theme_neon"));
  setText(themeGhostEl, t("theme_ghost"));
  setText(themeCircuitEl, t("theme_circuit"));
  setText(themeMatrixEl, t("theme_matrix"));
  setText(themeEmberEl, t("theme_ember"));
  setText(audioOptSoftEl, t("audio_soft"));
  setText(audioOptArcadeEl, t("audio_arcade"));
  setText(audioOptTechnoEl, t("audio_techno"));
  setText(optTargetAutoEl, t("opt_auto_mode"));
  setText(optTarget5El, t("to_points", { points: 5 }));
  setText(optTarget7El, t("to_points", { points: 7 }));
  setText(optTarget11El, t("to_points", { points: 11 }));
  setText(optTarget15El, t("to_points", { points: 15 }));
  setText(optAiAutoEl, t("opt_auto_mode"));
  setText(optAi0El, t("ai_easy"));
  setText(optAi1El, t("ai_normal"));
  setText(optAi2El, t("ai_hard"));
  setText(optTempoAutoEl, t("opt_auto_mode"));
  setText(optTempo09El, t("tempo_calm"));
  setText(optTempo10El, t("tempo_standard"));
  setText(optTempo11El, t("tempo_fast"));
  setText(optTempo118El, t("tempo_turbo"));
  setText(optBet25El, "25 TOK");
  setText(optBet50El, "50 TOK");
  setText(optBet100El, "100 TOK");
  setText(optBet200El, "200 TOK");
  updateBetNote();
  setText(hintRankedEl, t("hint_ranked"));
  setText(leaderboardTitleEl, t("leaderboard_title"));
  setText(tabWeek, t("tab_week"));
  setText(tabAll, t("tab_all"));
  setText(tabRating, t("tab_rating"));
  setText(matchPanelTitleEl, t("match_panel_title"));
  setText(profileTitleEl, t("profile_title"));
  setText(dailyTitleEl, t("daily_title"));
  setText(historyTitleEl, t("history_title"));
  setText(hudLabelModeEl, t("hud_mode"));
  setText(hudLabelScoreEl, t("hud_score"));
  setText(hudLabelSpeedEl, t("hud_speed"));
  setText(hudLabelRallyEl, t("hud_rally"));
  setText(hudLabelRankEl, t("hud_rank"));
  setText(metricLabelLatencyEl, t("metric_latency"));
  setText(metricLabelHashEl, t("metric_hash"));
  setText(metricLabelEntropyEl, t("metric_entropy"));
  setText(aiBadgeEl, t("ai_badge"));
  setText(launchTextEl, t("launch_sync"));
  setText(bootKickerEl, t("boot_kicker"));
  setText(bootLineEl, t("boot_line_0"));
  setText(bootSkipEl, t("button_skip"));
  setText(touchPause, t("button_pause"));
}

function updateLanguageMenuUi() {
  if (!langTriggerEl || !langCurrentEl || !langMenuEl) return;
  langCurrentEl.textContent = t("lang_current");
  langTriggerEl.setAttribute("aria-label", t("lang_switch_label"));
  langTriggerEl.setAttribute("aria-expanded", langMenuEl.classList.contains("hidden") ? "false" : "true");
  langMenuEl.setAttribute("aria-label", t("lang_menu_label"));
  for (const option of langOptionEls) {
    const code = option.dataset.lang;
    option.classList.toggle("active", code === currentLanguage);
    if (code === "ru") option.textContent = t("lang_ru");
    if (code === "en") option.textContent = t("lang_en");
    if (code === "zh") option.textContent = t("lang_zh");
  }
}

function retranslateRuntimeUi() {
  if (currentUser) {
    setStatus(t("auth_logged_in", { email: currentUser.email }));
  } else {
    setStatus(t("auth_not_logged_in"));
  }

  if (!overlayEl.classList.contains("hidden") && overlayTitleEl.textContent === "Pong") {
    setText(overlayScoreEl, t("overlay_prepare"));
  }

  soundToggleEl.textContent = t("sound_toggle", {
    state: audioEnabled ? t("state_on") : t("state_off"),
  });
  setText(pauseToggleEl, paused ? t("button_resume") : t("button_pause"));
  updateSessionPanel();
  updateRankedAvailability();
  updateSetupAvailability();
  updateModeSummary();
  updateControlHint();
  hudTargetEl.textContent = t("to_points", { points: currentTargetPoints });
  if (currentMode !== null) {
    updateModeHud(currentMode);
  } else {
    hudModeEl.textContent = modeLabel("pvp");
    if (mobileModeEl) mobileModeEl.textContent = modeLabel("pvp");
  }
  hudScoreEl.textContent = `${lastLeftPoints} - ${lastRightPoints}`;
  if (mobileScoreEl) mobileScoreEl.textContent = `${lastLeftPoints} - ${lastRightPoints}`;
  hudRankEl.textContent = lastRank || rankLabelByKey("rank_kernel");
  void loadProgressPanels();
}

function applyLanguage(lang, persist = true) {
  if (!supportedLanguages.includes(lang)) return;
  currentLanguage = lang;
  if (persist) {
    window.localStorage.setItem(languageKey, lang);
  }
  localizeStaticUi();
  updateLanguageMenuUi();
  retranslateRuntimeUi();
  loadLeaderboard();
}

function formatAuthError(error) {
  if (!error) return t("auth_unknown_error");
  const code = (error.error_code || "").toLowerCase();
  const msg = (error.message || "").toLowerCase();

  if (code === "over_email_send_rate_limit" || msg.includes("rate limit")) {
    return t("auth_rate_limit");
  }
  if (code === "email_address_invalid" || msg.includes("invalid email")) {
    return t("auth_invalid_email");
  }
  if (msg.includes("user already registered")) {
    return t("auth_already_registered");
  }
  if (msg.includes("email not confirmed")) {
    return t("auth_email_not_confirmed");
  }
  if (msg.includes("invalid login credentials")) {
    return t("auth_invalid_credentials");
  }
  return error.message || t("auth_generic_error");
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
  if (!auth) updateSessionPanel();
}

function isGuestSession() {
  return authChoice === "guest" || window.localStorage.getItem(guestSessionKey) === "1";
}

function isRememberedAccount() {
  return window.localStorage.getItem(rememberAccountKey) === "1";
}

function rememberAccount(email = "") {
  window.localStorage.setItem(rememberAccountKey, "1");
  if (email) {
    window.localStorage.setItem(lastEmailKey, email);
  }
}

function clearRememberedAccount() {
  window.localStorage.removeItem(rememberAccountKey);
  window.localStorage.removeItem(lastEmailKey);
}

function updateSessionPanel() {
  if (!sessionLineEl || !guestSessionBannerEl || !btnOpenAuth || !btnLogout) return;
  if (currentUser) {
    sessionLineEl.textContent = t("session_account", { email: currentUser.email });
    guestSessionBannerEl.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    btnOpenAuth.textContent = t("button_open_auth_switch");
    return;
  }
  if (isGuestSession()) {
    sessionLineEl.textContent = t("session_guest");
    guestSessionBannerEl.classList.remove("hidden");
    btnLogout.classList.add("hidden");
    btnOpenAuth.textContent = t("button_open_auth_login");
    return;
  }
  sessionLineEl.textContent = t("session_none");
  guestSessionBannerEl.classList.add("hidden");
  btnLogout.classList.add("hidden");
  btnOpenAuth.textContent = t("button_open_auth_login");
}

function enterGuestSession(showToast = true) {
  authChoice = "guest";
  window.localStorage.setItem(guestSessionKey, "1");
  guestWarnEl.classList.add("active");
  if (showToast) {
    setAuthMessage(t("auth_guest_enabled"));
    spawnToast(t("toast_guest_mode"), true);
  }
  setStep("setup");
  updateSessionPanel();
}

function playLaunchTransition() {
  if (!launchTransitionEl || lowFxMode) return Promise.resolve();
  launchTransitionEl.classList.remove("hidden");
  launchTransitionEl.classList.add("active");
  return new Promise((resolve) => {
    setTimeout(() => {
      launchTransitionEl.classList.remove("active");
      launchTransitionEl.classList.add("hidden");
      resolve();
    }, 760);
  });
}

function describeMode(mode) {
  if (!mode || !modeCatalog[mode]) return t("mode_select_prompt");
  return modeDescription(mode);
}

function clampNumber(v, lo, hi, fallback) {
  if (!Number.isFinite(v)) return fallback;
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

function parseSelectNumber(el) {
  if (!el) return null;
  if (el.value === "auto") return null;
  const n = Number(el.value);
  return Number.isFinite(n) ? n : null;
}

function sanitizeBetStakeValue(raw) {
  const value = String(raw || "100");
  return validBetStakes.has(value) ? value : "100";
}

function getSelectedBetStake() {
  if (!matchBetEl) return 100;
  matchBetEl.value = sanitizeBetStakeValue(matchBetEl.value);
  return Number(matchBetEl.value);
}

function updateBetNote() {
  if (!betNoteEl) return;
  const stake = getSelectedBetStake();
  betNoteEl.textContent = t("bet_note", { win: stake, lose: stake });
}

function modeNeedsAuth(mode) {
  const preset = modeCatalog[mode];
  return !!preset?.requiresAuth;
}

function modeAuthToast(mode) {
  return mode === "bet" ? t("toast_bet_login") : t("toast_ranked_login");
}

function applyModePresetToSetup(mode) {
  const preset = modeCatalog[mode];
  if (!preset) return;
  if (matchTargetEl) matchTargetEl.value = "auto";
  if (matchAiLevelEl) matchAiLevelEl.value = "auto";
  if (matchTempoEl) matchTempoEl.value = "auto";
  if (matchBetEl) matchBetEl.value = sanitizeBetStakeValue(matchBetEl.value);
  if (modFastEl) modFastEl.checked = !!preset.mods.fast;
  if (modBigEl) modBigEl.checked = !!preset.mods.big;
  if (modNarrowEl) modNarrowEl.checked = !!preset.mods.narrow;
}

function updateSetupAvailability(mode = selectedMode) {
  const preset = modeCatalog[mode];
  if (!preset) {
    if (betFieldEl) betFieldEl.classList.add("is-hidden");
    if (betNoteEl) betNoteEl.textContent = "";
    if (setupLockNoteEl) setupLockNoteEl.textContent = "";
    return;
  }
  const lockAll = !!preset.lockSetup;
  const aiRelevant = preset.runtimeMode === 1;
  const betMode = !!preset.betMode;

  if (matchTargetEl) matchTargetEl.disabled = lockAll;
  if (matchTempoEl) matchTempoEl.disabled = lockAll;
  if (matchAiLevelEl) matchAiLevelEl.disabled = lockAll || !aiRelevant;
  if (modFastEl) modFastEl.disabled = lockAll;
  if (modBigEl) modBigEl.disabled = lockAll;
  if (modNarrowEl) modNarrowEl.disabled = lockAll;
  if (betFieldEl) betFieldEl.classList.toggle("is-hidden", !betMode);
  if (matchBetEl) matchBetEl.disabled = !betMode;
  if (betMode) {
    updateBetNote();
  } else if (betNoteEl) {
    betNoteEl.textContent = "";
  }

  if (lockAll) {
    if (matchTargetEl) matchTargetEl.value = String(preset.target);
    if (matchAiLevelEl) matchAiLevelEl.value = String(preset.aiLevel);
    if (matchTempoEl) matchTempoEl.value = String(preset.speedScale);
    if (modFastEl) modFastEl.checked = !!preset.mods.fast;
    if (modBigEl) modBigEl.checked = !!preset.mods.big;
    if (modNarrowEl) modNarrowEl.checked = !!preset.mods.narrow;
    if (setupLockNoteEl) {
      setupLockNoteEl.textContent = betMode ? t("setup_lock_bet") : t("setup_lock_ranked");
    }
    return;
  }

  if (!aiRelevant && matchAiLevelEl) {
    matchAiLevelEl.value = "auto";
  }

  if (setupLockNoteEl) {
    setupLockNoteEl.textContent = aiRelevant
      ? t("setup_lock_ai")
      : t("setup_lock_pvp");
  }
}

function resolveModeSetup(mode = selectedMode) {
  const preset = modeCatalog[mode];
  if (!preset) return null;

  let targetPoints = preset.target;
  let aiLevel = preset.aiLevel;
  let speedScale = preset.speedScale;
  let betStake = preset.betMode ? getSelectedBetStake() : 0;
  let mods = { ...preset.mods };

  if (!preset.lockSetup) {
    const targetOverride = parseSelectNumber(matchTargetEl);
    const aiOverride = parseSelectNumber(matchAiLevelEl);
    const tempoOverride = parseSelectNumber(matchTempoEl);
    if (targetOverride !== null) {
      targetPoints = Math.round(clampNumber(targetOverride, 3, 21, preset.target));
    }
    if (preset.runtimeMode === 1 && aiOverride !== null) {
      aiLevel = Math.round(clampNumber(aiOverride, 0, 2, preset.aiLevel));
    }
    if (tempoOverride !== null) {
      speedScale = clampNumber(tempoOverride, 0.75, 1.35, preset.speedScale);
    }
    if (preset.betMode) {
      betStake = getSelectedBetStake();
    }
    mods = getMods();
  }

  return {
    id: mode,
    label: modeLabel(mode),
    ranked: preset.ranked,
    betMode: !!preset.betMode,
    requiresAuth: !!preset.requiresAuth,
    runtimeMode: preset.runtimeMode,
    targetPoints,
    aiLevel,
    speedScale,
    betStake,
    mods,
  };
}

function updateModeSummary(mode = selectedMode) {
  if (!modeSummaryEl) return;
  const setup = resolveModeSetup(mode);
  if (!setup) {
    modeSummaryEl.textContent = describeMode(mode);
    return;
  }
  const parts = [
    t("summary_target", { points: setup.targetPoints }),
    t("summary_tempo", { value: setup.speedScale.toFixed(2) }),
  ];
  if (setup.runtimeMode === 1) {
    parts.push(t("summary_ai", { level: aiLevelLabel(setup.aiLevel) }));
  }
  if (setup.betMode) {
    parts.push(t("summary_bet", { stake: setup.betStake }));
  }
  const modNames = [];
  if (setup.mods.fast) modNames.push(t("mod_fast"));
  if (setup.mods.big) modNames.push(t("mod_big"));
  if (setup.mods.narrow) modNames.push(t("mod_narrow"));
  parts.push(modNames.length ? modNames.join(", ") : t("summary_mods_default"));
  if (setup.ranked) {
    parts.push(t("summary_ranked"));
  }
  modeSummaryEl.textContent = `${describeMode(mode)} ${parts.join(" • ")}`;
}

function updatePauseButton() {
  if (!pauseToggleEl) return;
  pauseToggleEl.textContent = paused ? t("button_resume") : t("button_pause");
  pauseToggleEl.classList.toggle("active", paused);
}

function updateControlHint() {
  if (!controlHintEl) return;
  if (currentMode === 0) {
    controlHintEl.textContent = t("control_hint_pvp");
    return;
  }
  controlHintEl.textContent = t("control_hint_ai");
}

function applyPerformanceProfile() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileViewport = window.matchMedia("(max-width: 900px)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  lowFxMode = reduceMotion || mobileViewport || coarsePointer;
  document.body.classList.toggle("mobile-lite", lowFxMode);
  if (lowFxMode) {
    for (const card of modeCardEls) {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.classList.remove("is-tilting");
    }
  }
}

function triggerGoalShock() {
  if (goalShockTimer) {
    clearTimeout(goalShockTimer);
    goalShockTimer = null;
  }
  document.body.classList.remove("goal-shock");
  // Force restart of CSS animation for rapid consecutive goals.
  void document.body.offsetWidth;
  document.body.classList.add("goal-shock");
  goalShockTimer = setTimeout(() => {
    document.body.classList.remove("goal-shock");
    goalShockTimer = null;
  }, lowFxMode ? 220 : 420);
}

function bindButtonRipples() {
  const buttons = document.querySelectorAll("button");
  for (const button of buttons) {
    button.addEventListener("pointerdown", (event) => {
      if (button.disabled) return;
      if (lowFxMode && window.matchMedia("(pointer: coarse)").matches) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.35;
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });
  }
}

function bindModeCardTilt() {
  for (const card of modeCardEls) {
    const reset = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.classList.remove("is-tilting");
    };
    card.addEventListener("pointermove", (event) => {
      if (lowFxMode || window.matchMedia("(hover: none)").matches) {
        reset();
        return;
      }
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * 9;
      const tiltY = (x - 0.5) * 12;
      card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      card.classList.add("is-tilting");
    });
    card.addEventListener("pointerleave", reset);
    card.addEventListener("blur", reset);
  }
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

function setLeaderboardMode(mode) {
  leaderboardMode = mode;
  if (tabWeek) tabWeek.classList.toggle("active", mode === "week");
  if (tabAll) tabAll.classList.toggle("active", mode === "all");
  if (tabRating) tabRating.classList.toggle("active", mode === "rating");
  updateLeaderboardTabIndicator();
  loadLeaderboard();
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
    t("boot_line_0"),
    t("boot_line_1"),
    t("boot_line_2"),
    t("boot_line_3"),
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
  overlayScoreEl.textContent = t("overlay_prepare");
  seasonSummaryEl.classList.remove("active");
  seasonSummaryEl.innerHTML = "";
  if (obEmailEl && !obEmailEl.value) {
    obEmailEl.value = window.localStorage.getItem(lastEmailKey) || "";
  }
  if (currentUser) {
    authChoice = "signed";
    setStep("setup");
  } else if (isGuestSession() && !isRememberedAccount()) {
    enterGuestSession(false);
  } else {
    setStep("auth");
    if (isRememberedAccount()) {
      setAuthMessage(t("auth_resume_prompt"));
    }
  }
  updateModeSummary();
  updateSetupAvailability();
  btnStartGame.disabled = !selectedMode;
  updateRankedAvailability();
}

function hideOverlay() {
  overlayEl.classList.add("hidden");
  document.body.classList.remove("overlay-open");
  toggleOverlayParticles(false);
  setInputLock(false);
  if (launchTransitionEl) {
    launchTransitionEl.classList.remove("active");
    launchTransitionEl.classList.add("hidden");
  }
}

function updateRankedAvailability() {
  btnModeRanked.disabled = !currentUser;
  if (btnModeBet) btnModeBet.disabled = !currentUser;
  btnModeRanked.title = currentUser ? "" : t("toast_ranked_login");
  if (btnModeBet) btnModeBet.title = currentUser ? "" : t("toast_bet_login");
  if (!currentUser && (selectedMode === "ranked" || selectedMode === "bet")) {
    selectedMode = null;
    for (const card of modeCardEls) {
      card.classList.remove("mode-active");
    }
    document.body.classList.remove("mode-ai", "mode-ranked", "mode-pvp", "mode-blitz", "mode-training", "mode-arcade", "mode-bet");
    btnStartGame.disabled = true;
    updateSetupAvailability();
    updateModeSummary();
  }
}

function selectMode(mode, options = {}) {
  if (!modeCatalog[mode]) return;
  const preserveSetup = !!options.preserveSetup;
  if (modeNeedsAuth(mode) && !currentUser) {
    spawnToast(modeAuthToast(mode), true);
    setStep("auth");
    return;
  }
  selectedMode = mode;
  for (const [id, button] of Object.entries(modeButtons)) {
    if (!button) continue;
    button.classList.toggle("mode-active", id === mode);
  }
  document.body.classList.remove("mode-ai", "mode-ranked", "mode-pvp", "mode-blitz", "mode-training", "mode-arcade", "mode-bet");
  document.body.classList.add(`mode-${mode}`);
  if (!preserveSetup) {
    applyModePresetToSetup(mode);
  }
  updateSetupAvailability(mode);
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
  const shortDate = date.toLocaleDateString(localeTag(), { month: "short", day: "numeric" });
  return t("week_from", { date: shortDate });
}

function isMissingTableError(error) {
  if (!error) return false;
  const code = String(error.code || "");
  const msg = String(error.message || "").toLowerCase();
  return code === "42P01" || msg.includes("does not exist") || msg.includes("could not find the table");
}

function isMissingColumnError(error, columnName) {
  if (!error) return false;
  const code = String(error.code || "");
  const msg = String(error.message || "").toLowerCase();
  const name = String(columnName || "").toLowerCase();
  return code === "42703" || (name && msg.includes("column") && msg.includes(name));
}

function formatSignedNumber(n) {
  return n >= 0 ? `+${n}` : `${n}`;
}

function ratingDivisionName(rating) {
  if (rating >= 1700) return t("rating_division_diamond");
  if (rating >= 1450) return t("rating_division_platinum");
  if (rating >= 1250) return t("rating_division_gold");
  if (rating >= 1080) return t("rating_division_silver");
  return t("rating_division_bronze");
}

function computeRatingDelta(currentRating, didWin, aiLevel, styleScore) {
  const aiRatings = [920, 1020, 1140];
  const opponent = aiRatings[aiLevel] || aiRatings[1];
  const expected = 1 / (1 + Math.pow(10, (opponent - currentRating) / 400));
  const scoreValue = didWin ? 1 : 0;
  const k = Math.min(36, 24 + Math.floor(Math.max(0, styleScore) / 220));
  let delta = Math.round(k * (scoreValue - expected));
  if (didWin) delta = Math.max(8, delta);
  else delta = Math.min(-6, delta);
  return delta;
}

async function submitRankedRating(styleScore) {
  if (!currentUser) return null;
  const playerName = obNicknameEl.value.trim() || currentUser.email.split("@")[0];
  const didWin = lastWinner === 0;

  const { data: existing, error } = await supa
    .from("ranked_stats")
    .select("id,rating,games_played,wins,losses,best_style")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error && !isMissingTableError(error)) {
    console.error("ranked_stats query failed", error);
    return null;
  }
  if (error && isMissingTableError(error)) {
    spawnToast(t("leaderboard_ranked_missing"), true);
    return null;
  }

  const currentRating = existing?.rating ?? ratingBase;
  const delta = computeRatingDelta(currentRating, didWin, currentAiLevel, styleScore);
  const nextRating = Math.max(0, currentRating + delta);
  const nextGames = (existing?.games_played ?? 0) + 1;
  const nextWins = (existing?.wins ?? 0) + (didWin ? 1 : 0);
  const nextLosses = (existing?.losses ?? 0) + (didWin ? 0 : 1);
  const nextBestStyle = Math.max(existing?.best_style ?? 0, styleScore);

  let writeError = null;
  if (!existing) {
    const { error: e } = await supa.from("ranked_stats").insert({
      user_id: currentUser.id,
      player_name: playerName,
      rating: nextRating,
      games_played: nextGames,
      wins: nextWins,
      losses: nextLosses,
      best_style: nextBestStyle,
    });
    writeError = e;
  } else {
    const { error: e } = await supa.from("ranked_stats").update({
      player_name: playerName,
      rating: nextRating,
      games_played: nextGames,
      wins: nextWins,
      losses: nextLosses,
      best_style: nextBestStyle,
      updated_at: new Date().toISOString(),
    }).eq("id", existing.id);
    writeError = e;
  }

  if (writeError) {
    console.error("ranked_stats write failed", writeError);
    return null;
  }

  spawnToast(t("toast_rating_delta", {
    delta: formatSignedNumber(delta),
    rating: `${nextRating} (${ratingDivisionName(nextRating)})`,
  }), didWin);

  if (leaderboardMode === "rating") {
    await loadLeaderboard();
  }

  return {
    delta,
    rating: nextRating,
    wins: nextWins,
    losses: nextLosses,
    games: nextGames,
  };
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function defaultProgress() {
  return {
    user_id: currentUser?.id || null,
    total_wins: 0,
    total_losses: 0,
    current_streak: 0,
    best_streak: 0,
    max_combo_ever: 0,
    badges: [],
    daily_date: todayIsoDate(),
    daily_matches: 0,
    daily_wins: 0,
    daily_best_combo: 0,
    bet_balance: defaultBetBalance,
    bet_peak: defaultBetBalance,
  };
}

function normalizeBadges(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((v) => typeof v === "string");
}

async function fetchRatingStats() {
  if (!currentUser) return null;
  const { data, error } = await supa
    .from("ranked_stats")
    .select("rating,games_played,wins,losses,best_style")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (error) {
    if (!isMissingTableError(error)) {
      console.error("fetchRatingStats failed", error);
    }
    return null;
  }
  return data || null;
}

function evaluateNewBadges(progress, ratingValue) {
  const unlocked = new Set(normalizeBadges(progress.badges));
  const toAdd = [];
  const add = (id) => {
    if (unlocked.has(id)) return;
    unlocked.add(id);
    toAdd.push(id);
  };

  if ((progress.total_wins || 0) >= 1) add("first_win");
  if ((progress.best_streak || 0) >= 3) add("streak_3");
  if ((progress.best_streak || 0) >= 7) add("streak_7");
  if ((progress.max_combo_ever || 0) >= 20) add("combo_20");
  if ((ratingValue || 0) >= 1200) add("rating_1200");
  if ((ratingValue || 0) >= 1400) add("rating_1400");
  if ((progress.daily_matches || 0) >= 3 && (progress.daily_wins || 0) >= 2 && (progress.daily_best_combo || 0) >= 10) {
    add("daily_hero");
  }

  return toAdd;
}

function badgeNameById(id) {
  const def = badgeDefs.find((b) => b.id === id);
  return def ? t(def.nameKey) : id;
}

function renderBadges(unlockedBadges) {
  if (!badgeGridEl) return;
  const unlocked = new Set(normalizeBadges(unlockedBadges));
  badgeGridEl.innerHTML = "";
  for (const def of badgeDefs) {
    const item = document.createElement("div");
    const isUnlocked = unlocked.has(def.id);
    item.className = `badge-item ${isUnlocked ? "unlocked" : "locked"}`;
    const name = document.createElement("span");
    name.className = "badge-name";
    name.textContent = t(def.nameKey);
    const desc = document.createElement("span");
    desc.className = "badge-desc";
    desc.textContent = t(def.descKey);
    item.appendChild(name);
    item.appendChild(desc);
    badgeGridEl.appendChild(item);
  }
}

function renderDailyChallenges(progress) {
  if (!dailyListEl) return;
  dailyListEl.innerHTML = "";
  for (const challenge of dailyChallengeDefs) {
    const value = Math.min(challenge.target, Number(progress[challenge.key] || 0));
    const done = value >= challenge.target;
    const li = document.createElement("li");
    li.className = `daily-item${done ? " done" : ""}`;

    const title = document.createElement("div");
    title.className = "daily-title";
    title.textContent = t(challenge.titleKey);

    const desc = document.createElement("div");
    desc.className = "daily-progress-text";
    desc.textContent = `${t(challenge.descKey)} • ${t("daily_progress", { value, target: challenge.target })}${done ? ` • ${t("daily_done")}` : ""}`;

    const bar = document.createElement("div");
    bar.className = "daily-bar";
    const barFill = document.createElement("div");
    barFill.className = "daily-bar-fill";
    barFill.style.width = `${Math.round((value / challenge.target) * 100)}%`;
    bar.appendChild(barFill);

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(bar);
    dailyListEl.appendChild(li);
  }
}

function historyResultLabel(result) {
  if (result === "win") return t("history_result_win");
  if (result === "loss") return t("history_result_loss");
  if (result === "left") return t("history_result_left");
  if (result === "right") return t("history_result_right");
  return result || "-";
}

function historyModeLabel(modeId) {
  if (modeCatalog[modeId]) return modeLabel(modeId);
  return modeId || t("mode_select_prompt");
}

function formatHistoryTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(localeTag(), {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function loadMatchHistory() {
  if (!historyListEl) return;
  if (!currentUser) {
    historyListEl.innerHTML = `<li>${t("history_guest")}</li>`;
    return;
  }
  const { data, error } = await supa
    .from("match_history")
    .select("*")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    if (!isMissingTableError(error)) {
      console.error("match_history query failed", error);
    }
    historyListEl.innerHTML = `<li>${t("leaderboard_error")}</li>`;
    return;
  }
  if (!data || data.length === 0) {
    historyListEl.innerHTML = `<li>${t("history_empty")}</li>`;
    return;
  }
  historyListEl.innerHTML = "";
  for (const row of data) {
    const li = document.createElement("li");
    const ratingPart = row.rating_delta ? ` • ${formatSignedNumber(Number(row.rating_delta))} ELO` : "";
    const betPart = row.bet_delta ? t("history_bet_delta", { delta: formatSignedNumber(Number(row.bet_delta)) }) : "";
    li.textContent = t("history_row", {
      mode: historyModeLabel(row.mode_id),
      score: `${row.left_points}-${row.right_points}`,
      result: historyResultLabel(row.result),
      rating: ratingPart,
      bet: betPart,
      time: formatHistoryTime(row.created_at),
    });
    historyListEl.appendChild(li);
  }
}

async function loadProgressPanels() {
  if (!profileSummaryEl || !streakLineEl || !badgeGridEl || !dailyListEl) return;
  if (!currentUser) {
    currentBetBalance = defaultBetBalance;
    profileSummaryEl.textContent = t("profile_guest");
    streakLineEl.textContent = "";
    renderBadges([]);
    dailyListEl.innerHTML = `<li>${t("daily_guest")}</li>`;
    await loadMatchHistory();
    return;
  }

  const [{ data: rawProgress, error: progressError }, ratingStats] = await Promise.all([
    supa.from("player_progress")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle(),
    fetchRatingStats(),
  ]);

  if (progressError && !isMissingTableError(progressError)) {
    console.error("player_progress query failed", progressError);
  }

  const progress = rawProgress || defaultProgress();
  progress.badges = normalizeBadges(progress.badges);
  if (progress.daily_date !== todayIsoDate()) {
    progress.daily_matches = 0;
    progress.daily_wins = 0;
    progress.daily_best_combo = 0;
  }
  currentBetBalance = Number(progress.bet_balance || defaultBetBalance);

  const ratingValue = ratingStats?.rating || ratingBase;
  const games = progress.total_wins + progress.total_losses;

  profileSummaryEl.textContent = `${t("profile_rating_line", {
    rating: ratingValue,
    division: ratingDivisionName(ratingValue),
  })}\n${t("profile_record_line", {
    games,
    wins: progress.total_wins,
    losses: progress.total_losses,
  })}\n${t("profile_balance_line", { balance: currentBetBalance })}`;

  streakLineEl.textContent = t("profile_streak_line", {
    current: progress.current_streak,
    best: progress.best_streak,
  });

  renderBadges(progress.badges);
  renderDailyChallenges(progress);
  await loadMatchHistory();
}

async function recordMatchHistory(styleScore, matchData, ratingInfo = null, betDelta = 0) {
  if (!currentUser) return;
  const modeId = matchData?.modeId || (selectedMode || "ai");
  let result = "left";
  if (matchData?.runtimeMode === 1) {
    result = matchData.winner === 0 ? "win" : "loss";
  } else {
    result = matchData?.winner === 0 ? "left" : "right";
  }

  const payload = {
    user_id: currentUser.id,
    mode_id: modeId,
    left_points: matchData?.leftPoints ?? 0,
    right_points: matchData?.rightPoints ?? 0,
    style_score: styleScore,
    result,
    rating_delta: ratingInfo?.delta || 0,
    bet_delta: betDelta,
    rating_after: ratingInfo?.rating || null,
    rally_peak: matchData?.maxCombo ?? 0,
  };
  let { error } = await supa.from("match_history").insert(payload);
  if (error && isMissingColumnError(error, "bet_delta")) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.bet_delta;
    const retry = await supa.from("match_history").insert(fallbackPayload);
    error = retry.error;
  }
  if (error && !isMissingTableError(error)) {
    console.error("match_history insert failed", error);
  }
}

async function updatePlayerProgress(styleScore, matchData, ratingInfo = null, betDelta = 0) {
  if (!currentUser) return;
  const today = todayIsoDate();
  const { data: existing, error } = await supa
    .from("player_progress")
    .select("*")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    if (!isMissingTableError(error)) {
      console.error("player_progress query failed", error);
    }
    return;
  }

  const progress = existing || defaultProgress();
  let totalWins = Number(progress.total_wins || 0);
  let totalLosses = Number(progress.total_losses || 0);
  let currentStreak = Number(progress.current_streak || 0);
  let bestStreak = Number(progress.best_streak || 0);
  let maxComboEver = Number(progress.max_combo_ever || 0);
  let dailyMatches = progress.daily_date === today ? Number(progress.daily_matches || 0) : 0;
  let dailyWins = progress.daily_date === today ? Number(progress.daily_wins || 0) : 0;
  let dailyBestCombo = progress.daily_date === today ? Number(progress.daily_best_combo || 0) : 0;
  let betBalance = Number(progress.bet_balance || defaultBetBalance);
  let betPeak = Number(progress.bet_peak || betBalance || defaultBetBalance);
  let badges = normalizeBadges(progress.badges);

  const aiMatch = matchData?.runtimeMode === 1;
  const didWin = aiMatch && matchData?.winner === 0;
  const didLose = aiMatch && matchData?.winner === 1;

  if (didWin) {
    totalWins += 1;
    currentStreak += 1;
    bestStreak = Math.max(bestStreak, currentStreak);
  } else if (didLose) {
    totalLosses += 1;
    currentStreak = 0;
  }

  dailyMatches += 1;
  if (didWin) dailyWins += 1;
  dailyBestCombo = Math.max(dailyBestCombo, matchData?.maxCombo ?? 0);
  maxComboEver = Math.max(maxComboEver, matchData?.maxCombo ?? 0);
  if (matchData?.modeId === "bet" && betDelta !== 0) {
    betBalance = Math.max(0, betBalance + betDelta);
    betPeak = Math.max(betPeak, betBalance);
  }
  currentBetBalance = betBalance;

  const ratingValue = ratingInfo?.rating ?? (await fetchRatingStats())?.rating ?? ratingBase;
  const nextProgress = {
    user_id: currentUser.id,
    total_wins: totalWins,
    total_losses: totalLosses,
    current_streak: currentStreak,
    best_streak: bestStreak,
    max_combo_ever: maxComboEver,
    badges,
    daily_date: today,
    daily_matches: dailyMatches,
    daily_wins: dailyWins,
    daily_best_combo: dailyBestCombo,
    bet_balance: betBalance,
    bet_peak: betPeak,
    updated_at: new Date().toISOString(),
  };

  const newBadgeIds = evaluateNewBadges(nextProgress, ratingValue);
  if (newBadgeIds.length) {
    badges = [...new Set([...badges, ...newBadgeIds])];
    nextProgress.badges = badges;
    for (const badgeId of newBadgeIds) {
      spawnToast(t("toast_badge_unlocked", { badge: badgeNameById(badgeId) }), true);
    }
  }

  let writeError = null;
  if (existing?.id) {
    const { error: e } = await supa.from("player_progress").update(nextProgress).eq("id", existing.id);
    writeError = e;
  } else {
    const { error: e } = await supa.from("player_progress").insert(nextProgress);
    writeError = e;
  }
  if (writeError && (isMissingColumnError(writeError, "bet_balance") || isMissingColumnError(writeError, "bet_peak"))) {
    const fallbackProgress = { ...nextProgress };
    delete fallbackProgress.bet_balance;
    delete fallbackProgress.bet_peak;
    if (existing?.id) {
      const { error: e } = await supa.from("player_progress").update(fallbackProgress).eq("id", existing.id);
      writeError = e;
    } else {
      const { error: e } = await supa.from("player_progress").insert(fallbackProgress);
      writeError = e;
    }
  }

  if (writeError && !isMissingTableError(writeError)) {
    console.error("player_progress write failed", writeError);
  }
}

async function persistPostMatch(styleScore) {
  if (!currentUser) return;
  const matchData = {
    modeId: activeModeId || selectedMode || (currentMode === 1 ? "ai" : "pvp"),
    runtimeMode: currentMode,
    winner: lastWinner,
    leftPoints: lastLeftPoints,
    rightPoints: lastRightPoints,
    maxCombo: matchMaxCombo,
    betStake: activeBetStake,
  };
  const matchWasRanked = isRanked;
  const betDelta = matchData.modeId === "bet"
    ? (matchData.winner === 0 ? matchData.betStake : (matchData.winner === 1 ? -matchData.betStake : 0))
    : 0;
  let ratingInfo = null;
  if (matchData.runtimeMode === 1 && matchWasRanked) {
    await submitScore(styleScore);
    ratingInfo = await submitRankedRating(styleScore);
  }
  await recordMatchHistory(styleScore, matchData, ratingInfo, betDelta);
  await updatePlayerProgress(styleScore, matchData, ratingInfo, betDelta);
  if (betDelta !== 0) {
    spawnToast(t("toast_bet_result", {
      delta: formatSignedNumber(betDelta),
      balance: currentBetBalance,
    }), betDelta > 0);
  }
  await loadProgressPanels();
}

async function refreshUser() {
  const { data } = await supa.auth.getSession();
  currentUser = data?.session?.user || null;
  if (currentUser) {
    authChoice = "signed";
    window.localStorage.removeItem(guestSessionKey);
    rememberAccount(currentUser.email || "");
    setStatus(t("auth_logged_in", { email: currentUser.email }));
  } else {
    authChoice = isGuestSession() ? "guest" : null;
    setStatus(t("auth_not_logged_in"));
  }
  updateRankedAvailability();
  updateSessionPanel();
  await loadProgressPanels();
}

async function signUp() {
  setAuthBusy(true);
  try {
    setAuthMessage(t("auth_signing_up"));
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
      rememberAccount(currentUser.email || obEmailEl.value.trim());
      setAuthMessage(t("auth_signup_done_loggedin"));
      guestWarnEl.classList.remove("active");
      setStep("setup");
      await loadLeaderboard();
    } else {
      setAuthMessage(t("auth_signup_done_confirm"));
    }
  } catch (_) {
    setAuthMessage(t("auth_network_error"));
  } finally {
    setAuthBusy(false);
  }
}

async function signIn() {
  setAuthBusy(true);
  try {
    setAuthMessage(t("auth_signing_in"));
    const { error } = await supa.auth.signInWithPassword({
      email: obEmailEl.value.trim(),
      password: obPasswordEl.value.trim(),
    });
    if (error) {
      setAuthMessage(formatAuthError(error));
      return;
    }
    await refreshUser();
    if (currentUser) {
      rememberAccount(currentUser.email || obEmailEl.value.trim());
    }
    setAuthMessage(t("auth_signin_done"));
    guestWarnEl.classList.remove("active");
    setStep("setup");
    await loadLeaderboard();
  } catch (_) {
    setAuthMessage(t("auth_network_error"));
  } finally {
    setAuthBusy(false);
  }
}

function continueAsGuest() {
  enterGuestSession(true);
}

function getMods() {
  return {
    fast: !!modFastEl.checked,
    big: !!modBigEl.checked,
    narrow: !!modNarrowEl.checked,
  };
}

function applySetupToRuntime(setup) {
  if (!setup) return;
  ccall("set_speed_scale", null, ["number"], [setup.speedScale]);
  ccall("set_target_points", null, ["number"], [setup.targetPoints]);
  ccall("set_modifiers", null, ["number", "number", "number"], [
    setup.mods.fast ? 1 : 0,
    setup.mods.big ? 1 : 0,
    setup.mods.narrow ? 1 : 0,
  ]);
}

function saveSetupOptions() {
  const payload = {
    mods: getMods(),
    target: matchTargetEl ? matchTargetEl.value : "auto",
    aiLevel: matchAiLevelEl ? matchAiLevelEl.value : "auto",
    tempo: matchTempoEl ? matchTempoEl.value : "auto",
    bet: matchBetEl ? sanitizeBetStakeValue(matchBetEl.value) : "100",
  };
  window.localStorage.setItem("pong_setup_options", JSON.stringify(payload));
}

function loadSetupOptions() {
  const raw = window.localStorage.getItem("pong_setup_options");
  if (!raw) return;
  try {
    const options = JSON.parse(raw);
    if (options.mods) {
      modFastEl.checked = !!options.mods.fast;
      modBigEl.checked = !!options.mods.big;
      modNarrowEl.checked = !!options.mods.narrow;
    }
    if (matchTargetEl && typeof options.target === "string") {
      matchTargetEl.value = options.target;
    }
    if (matchAiLevelEl && typeof options.aiLevel === "string") {
      matchAiLevelEl.value = options.aiLevel;
    }
    if (matchTempoEl && typeof options.tempo === "string") {
      matchTempoEl.value = options.tempo;
    }
    if (matchBetEl && typeof options.bet === "string") {
      matchBetEl.value = sanitizeBetStakeValue(options.bet);
    }
  } catch (_) {}
}

function setTheme(name) {
  document.body.classList.remove("theme-ghost", "theme-circuit", "theme-matrix", "theme-ember");
  if (name === "ghost") document.body.classList.add("theme-ghost");
  if (name === "circuit") document.body.classList.add("theme-circuit");
  if (name === "matrix") document.body.classList.add("theme-matrix");
  if (name === "ember") document.body.classList.add("theme-ember");
  themeNeonEl.classList.toggle("theme-active", name === "neon");
  themeGhostEl.classList.toggle("theme-active", name === "ghost");
  themeCircuitEl.classList.toggle("theme-active", name === "circuit");
  if (themeMatrixEl) themeMatrixEl.classList.toggle("theme-active", name === "matrix");
  if (themeEmberEl) themeEmberEl.classList.toggle("theme-active", name === "ember");
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
  const audioNameKey = `audio_${name}`;
  spawnToast(t("toast_audio_profile", { name: t(audioNameKey).toUpperCase() }));
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
  if (r >= 18) return rankLabelByKey("rank_zero");
  if (r >= 14) return rankLabelByKey("rank_cipher");
  if (r >= 10) return rankLabelByKey("rank_node");
  if (r >= 6) return rankLabelByKey("rank_root");
  return rankLabelByKey("rank_kernel");
}

function updateRallyHud(rally) {
  hudRallyEl.textContent = `${rally}`;
  const nextRank = rankForRally(rally);
  if (nextRank !== lastRank) {
    lastRank = nextRank;
    hudRankEl.textContent = nextRank;
    spawnToast(t("toast_rank_up", { rank: nextRank }), currentMode === 1);
    writeTerminal(t("terminal_rank", { rank: nextRank }));
  } else {
    hudRankEl.textContent = nextRank;
  }
}

function updateModeHud(mode) {
  const preset = modeCatalog[selectedMode] || null;
  let modeText = preset ? modeLabel(selectedMode) : (mode === 1 ? t("mode_neural_fallback") : t("mode_pvp_fallback"));
  if (mode === 1) {
    if (isRanked) {
      modeText = t("mode_ranked_hard");
      writeTerminal(t("terminal_mode", { mode: t("mode_ranked_label").toUpperCase() }));
      flashBadge(badgeLedgerEl, t("badge_ledger_locked"));
    } else {
      modeText = `${modeText} (${aiLevelLabel(currentAiLevel)})`;
      writeTerminal(t("terminal_mode", { mode: modeText.toUpperCase() }));
      flashBadge(badgeLedgerEl, t("badge_ledger_ready"));
    }
  } else {
    writeTerminal(t("terminal_mode", { mode: modeText.toUpperCase() }));
    flashBadge(badgeLedgerEl, t("badge_ledger_ready"));
  }
  hudModeEl.textContent = modeText;
  if (mobileModeEl) mobileModeEl.textContent = modeText;
  hudTargetEl.textContent = t("to_points", { points: currentTargetPoints });
  updateControlHint();
}

function updateScoreHud(left, right) {
  const scoreText = `${left} - ${right}`;
  hudScoreEl.textContent = scoreText;
  if (mobileScoreEl) mobileScoreEl.textContent = scoreText;
  if (left > lastLeftPoints || right > lastRightPoints) {
    if (!lowFxMode) {
      document.body.classList.add("glitch");
    }
    triggerGoalShock();
    spawnToast(t("toast_tx_confirmed"), currentMode === 1);
    writeTerminal(t("terminal_goal_confirmed"));
    flashBadge(badgeTxEl, t("badge_tx_confirmed"));
    goalThump();
    if (!lowFxMode) {
      setTimeout(() => document.body.classList.remove("glitch"), 140);
    }
  }
  lastLeftPoints = left;
  lastRightPoints = right;
}

function winnerTitle() {
  if (lastWinner === null) return t("winner_finished");
  if (currentMode === 1) return lastWinner === 0 ? t("winner_you") : t("winner_ai");
  return lastWinner === 0 ? t("winner_left") : t("winner_right");
}

async function loadLeaderboard() {
  if (leaderboardMode === "rating") {
    weekLabelEl.textContent = "";
    const { data, error } = await supa
      .from("ranked_stats")
      .select("player_name,rating,wins,losses,games_played")
      .order("rating", { ascending: false })
      .limit(10);

    if (error) {
      leaderboardEl.innerHTML = `<li>${isMissingTableError(error) ? t("leaderboard_ranked_missing") : t("leaderboard_error")}</li>`;
      return;
    }
    if (!data || data.length === 0) {
      leaderboardEl.innerHTML = `<li>${t("leaderboard_empty")}</li>`;
      return;
    }
    leaderboardEl.innerHTML = "";
    for (const row of data) {
      const li = document.createElement("li");
      const name = row.player_name || t("player_default");
      const rating = Math.round(row.rating || ratingBase);
      const wins = row.wins || 0;
      const losses = row.losses || 0;
      const division = ratingDivisionName(rating);
      li.textContent = t("leaderboard_rating_row", { name, rating: `${rating} ${division}`, wins, losses });
      leaderboardEl.appendChild(li);
    }
    return;
  }

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
    leaderboardEl.innerHTML = `<li>${t("leaderboard_error")}</li>`;
    return;
  }
  if (data.length === 0) {
    leaderboardEl.innerHTML = `<li>${t("leaderboard_empty")}</li>`;
    return;
  }
  leaderboardEl.innerHTML = "";
  for (const row of data) {
    const li = document.createElement("li");
    li.textContent = `${row.player_name || t("player_default")} - ${row.score}`;
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

async function startSelectedGame() {
  if (!runtimeReady) {
    spawnToast(t("toast_engine_loading"), true);
    return;
  }
  if (!selectedMode) {
    spawnToast(t("toast_select_mode"), true);
    return;
  }
  if (modeNeedsAuth(selectedMode) && !currentUser) {
    spawnToast(modeAuthToast(selectedMode), true);
    setStep("auth");
    return;
  }
  const setup = resolveModeSetup(selectedMode);
  if (!setup) {
    spawnToast(t("toast_setup_error"), true);
    return;
  }
  if (setup.betMode && currentBetBalance < setup.betStake) {
    spawnToast(t("toast_bet_insufficient"), true);
    return;
  }
  try {
    saveSetupOptions();
    ensureAudio();
    ensureAmbient();
    ensureMainStarted();
    setSpeedEnergy(0);
    paused = false;
    matchMaxCombo = 0;
    updatePauseButton();

    currentMode = setup.runtimeMode;
    isRanked = !!setup.ranked;
    currentAiLevel = setup.aiLevel;
    currentTargetPoints = setup.targetPoints;
    activeModeId = setup.id;
    activeBetStake = setup.betMode ? setup.betStake : 0;

    applySetupToRuntime(setup);
    ccall("set_game_mode", null, ["number"], [currentMode]);
    ccall("set_ranked", null, ["number"], [isRanked ? 1 : 0]);
    if (currentMode === 1) {
      ccall("set_ai_level", null, ["number"], [setup.aiLevel]);
    }
    ccall("set_paused", null, ["number"], [0]);
    ccall("reset_game_api", null, [], []);
    clearTouchInput();
    setInputLock(false);

    setAmbientTarget(ambientBase() + (isRanked ? 0.004 : 0));
    updateModeHud(currentMode);
    if (isGuestSession()) {
      spawnToast(t("toast_guest_no_save"), true);
    }
    await playLaunchTransition();
    hideOverlay();
    if (canvasEl) {
      requestAnimationFrame(() => canvasEl.focus());
    }
  } catch (error) {
    console.error("startSelectedGame failed", error);
    spawnToast(t("toast_launch_error"), true);
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
      ? t("overlay_match_style", { left: lastLeftPoints, right: lastRightPoints, score })
      : t("overlay_match", { left: lastLeftPoints, right: lastRightPoints });

    void persistPostMatch(score);

    setAmbientTarget(0.003);
  };

  const onBallSpeed = (speed) => {
    updateSpeedHud(speed);
    if (speed > 520) spawnAchievement(t("toast_zero_latency"));
  };

  const onCombo = (combo) => {
    if (combo > matchMaxCombo) matchMaxCombo = combo;
    updateRallyHud(combo);
    if (combo > 0 && combo % 5 === 0) {
      spawnToast(t("toast_combo", { combo }), currentMode === 1);
      writeTerminal(t("terminal_combo", { combo }));
    }
    if (combo >= 12) spawnAchievement(t("toast_perfect_deflect"));
    if (combo > 0) blip();
  };

  const onMode = (mode) => updateModeHud(mode);
  const onPoints = (left, right) => updateScoreHud(left, right);
  const onTarget = (target) => {
    currentTargetPoints = target;
    hudTargetEl.textContent = t("to_points", { points: target });
  };
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
  bindButtonRipples();
  bindModeCardTilt();
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
  if (btnOpenAuth) {
    btnOpenAuth.addEventListener("click", () => {
      setStep("auth");
      setAuthMessage(t("toast_login_to_save"));
    });
  }
  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      await supa.auth.signOut();
      currentUser = null;
      authChoice = null;
      clearRememberedAccount();
      setStatus(t("auth_not_logged_in"));
      setStep("auth");
      updateRankedAvailability();
      updateSessionPanel();
      spawnToast(t("toast_signed_out"), true);
    });
  }
  btnStartGame.addEventListener("click", startSelectedGame);

  btnModeAi.addEventListener("click", () => selectMode("ai"));
  btnModeRanked.addEventListener("click", () => selectMode("ranked"));
  btnModePvp.addEventListener("click", () => selectMode("pvp"));
  if (btnModeBlitz) btnModeBlitz.addEventListener("click", () => selectMode("blitz"));
  if (btnModeTraining) btnModeTraining.addEventListener("click", () => selectMode("training"));
  if (btnModeArcade) btnModeArcade.addEventListener("click", () => selectMode("arcade"));
  if (btnModeBet) btnModeBet.addEventListener("click", () => selectMode("bet"));

  const setupControls = [matchTargetEl, matchAiLevelEl, matchTempoEl, matchBetEl, modFastEl, modBigEl, modNarrowEl];
  for (const control of setupControls) {
    if (!control) continue;
    control.addEventListener("change", () => {
      if (control === matchBetEl) {
        updateBetNote();
      }
      updateModeSummary();
      saveSetupOptions();
    });
  }

  themeNeonEl.addEventListener("click", () => setTheme("neon"));
  themeGhostEl.addEventListener("click", () => setTheme("ghost"));
  themeCircuitEl.addEventListener("click", () => setTheme("circuit"));
  if (themeMatrixEl) themeMatrixEl.addEventListener("click", () => setTheme("matrix"));
  if (themeEmberEl) themeEmberEl.addEventListener("click", () => setTheme("ember"));

  audioProfileEl.addEventListener("change", (e) => setAudioProfile(e.target.value));

  soundToggleEl.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    soundToggleEl.textContent = t("sound_toggle", {
      state: audioEnabled ? t("state_on") : t("state_off"),
    });
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

  if (tabWeek) tabWeek.addEventListener("click", () => setLeaderboardMode("week"));
  if (tabAll) tabAll.addEventListener("click", () => setLeaderboardMode("all"));
  if (tabRating) tabRating.addEventListener("click", () => setLeaderboardMode("rating"));

  if (langTriggerEl && langMenuEl) {
    langTriggerEl.addEventListener("click", (event) => {
      event.stopPropagation();
      const isHidden = langMenuEl.classList.contains("hidden");
      langMenuEl.classList.toggle("hidden", !isHidden);
      langTriggerEl.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
    for (const option of langOptionEls) {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        const lang = option.dataset.lang;
        applyLanguage(lang, true);
        langMenuEl.classList.add("hidden");
        langTriggerEl.setAttribute("aria-expanded", "false");
      });
    }
    document.addEventListener("click", () => {
      langMenuEl.classList.add("hidden");
      langTriggerEl.setAttribute("aria-expanded", "false");
    });
  }

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
  applyLanguage(currentLanguage, false);
  wireModuleCallbacks();
  loadSetupOptions();
  loadTheme();
  loadAudioProfile();
  await refreshUser();
  await loadLeaderboard();
  updateLeaderboardTabIndicator();

  hudModeEl.textContent = modeLabel("pvp");
  hudScoreEl.textContent = "0 - 0";
  hudTargetEl.textContent = t("to_points", { points: currentTargetPoints });
  hudSpeedEl.textContent = "0";
  hudRallyEl.textContent = "0";
  lastRank = rankLabelByKey("rank_kernel");
  hudRankEl.textContent = lastRank;
  badgeSyncEl.textContent = t("badge_sync_ok");
  badgeLedgerEl.textContent = t("badge_ledger_ready");
  badgeTxEl.textContent = t("badge_tx_idle");
  soundToggleEl.textContent = t("sound_toggle", { state: audioEnabled ? t("state_on") : t("state_off") });
  btnStartGame.disabled = !selectedMode;
  updateSetupAvailability();
  updateModeSummary();
  updatePauseButton();
  updateControlHint();
  writeTerminal(t("terminal_session_idle"));
  if (mobileModeEl) mobileModeEl.textContent = modeLabel("pvp");
  if (mobileScoreEl) mobileScoreEl.textContent = "0 - 0";

  if (!selectedMode) {
    selectMode("ai", { preserveSetup: true });
  }

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
