#include <SDL.h>
#include <emscripten.h>
#include <cmath>
#include <cstdlib>
#include <ctime>
#include <cstdio>

static const int kWidth = 800;
static const int kHeight = 600;
static const float kPaddleSpeed = 420.0f;
static const float kBallSpeed = 360.0f;
static const float kBallSpeedIncrease = 18.0f;
static const float kBallMaxSpeed = 760.0f;
static const float kMaxBounceAngleDeg = 60.0f;
static const int kDefaultWinPoints = 7;
static const int kMinWinPoints = 3;
static const int kMaxWinPoints = 21;
static const float kBasePaddleHeight = 90.0f;
static const float kNarrowPaddleHeight = 70.0f;
static const float kBallRadiusNormal = 8.0f;
static const float kBallRadiusBig = 12.0f;

struct Paddle {
  float x;
  float y;
  float w;
  float h;
  float vy;
};

struct Ball {
  float x;
  float y;
  float r;
  float vx;
  float vy;
};

struct Pulse {
  float x;
  float y;
  float t;
  bool active;
};

struct TrailPoint {
  float x;
  float y;
  float life;
};

static SDL_Window* gWindow = nullptr;
static SDL_Renderer* gRenderer = nullptr;
static Paddle gLeft;
static Paddle gRight;
static Ball gBall;
static bool gRunning = true;
static bool gGameOver = false;
static bool gPaused = false;
static bool gRanked = false;
static bool gServing = true;
static float gServeTimer = 0.0f;
static int gServeDir = 1;
static int gMode = 0; // 0 = PVP, 1 = AI
static int gScore = 0;
static int gRally = 0;
static int gLongestRally = 0;
static int gLeftPoints = 0;
static int gRightPoints = 0;
static int gAiLevel = 1; // 0 easy, 1 normal, 2 hard
static bool gModFast = false;
static bool gModBig = false;
static bool gModNarrow = false;
static float gSpeedScale = 1.0f;
static float gSpeedMult = 1.0f;
static float gPaddleHeight = kBasePaddleHeight;
static float gBallRadius = kBallRadiusNormal;
static int gTargetPoints = kDefaultWinPoints;
static float gLastTick = 0.0f;
static Pulse gPulses[8];
static int gPulseIndex = 0;
static TrailPoint gTrail[24];
static int gTrailCount = 0;
static float gTrailTimer = 0.0f;
static float gImpactFlash = 0.0f;
static const float kImpactFlashMax = 0.18f;
static float gAiTimer = 0.0f;
static float gAiTargetY = 0.0f;
static bool gInputLeftUp = false;
static bool gInputLeftDown = false;
static bool gInputRightUp = false;
static bool gInputRightDown = false;
static bool gInputLock = false;

static void refresh_tuning() {
  gSpeedMult = gSpeedScale * (gModFast ? 1.35f : 1.0f);
  gBallRadius = gModBig ? kBallRadiusBig : kBallRadiusNormal;
  gPaddleHeight = gModNarrow ? kNarrowPaddleHeight : kBasePaddleHeight;
}

EM_JS(void, js_report_score, (int score), {
  if (Module && Module.onGameOver) {
    Module.onGameOver(score);
  }
});

EM_JS(void, js_report_speed, (float speed), {
  if (Module && Module.onBallSpeed) {
    Module.onBallSpeed(speed);
  }
});

EM_JS(void, js_report_combo, (int combo), {
  if (Module && Module.onCombo) {
    Module.onCombo(combo);
  }
});

EM_JS(void, js_report_mode, (int mode), {
  if (Module && Module.onMode) {
    Module.onMode(mode);
  }
});

EM_JS(void, js_report_points, (int leftPoints, int rightPoints), {
  if (Module && Module.onPoints) {
    Module.onPoints(leftPoints, rightPoints);
  }
});

EM_JS(void, js_report_winner, (int winner), {
  if (Module && Module.onWinner) {
    Module.onWinner(winner);
  }
});

EM_JS(void, js_report_target, (int targetPoints), {
  if (Module && Module.onTarget) {
    Module.onTarget(targetPoints);
  }
});

EM_JS(void, js_report_ai, (int level), {
  if (Module && Module.onAiLevel) {
    Module.onAiLevel(level);
  }
});

static void reset_ball(int direction) {
  gBall.x = kWidth * 0.5f;
  gBall.y = kHeight * 0.5f;
  gBall.r = gBallRadius;
  float angle = (float)(30 + (std::rand() % 40)) * (float)M_PI / 180.0f;
  float baseSpeed = kBallSpeed * gSpeedMult;
  gBall.vx = baseSpeed * direction * std::cos(angle);
  gBall.vy = baseSpeed * (std::rand() % 2 ? 1.0f : -1.0f) * std::sin(angle);
}

static void reset_game() {
  gLeft = {40.0f, kHeight * 0.5f - (gPaddleHeight * 0.5f), 12.0f, gPaddleHeight, 0.0f};
  gRight = {kWidth - 52.0f, kHeight * 0.5f - (gPaddleHeight * 0.5f), 12.0f, gPaddleHeight, 0.0f};
  gScore = 0;
  gRally = 0;
  gLongestRally = 0;
  gLeftPoints = 0;
  gRightPoints = 0;
  gGameOver = false;
  gServing = true;
  gServeTimer = 0.9f;
  gServeDir = 1;
  gBall.vx = 0.0f;
  gBall.vy = 0.0f;
  gBall.x = kWidth * 0.5f;
  gBall.y = kHeight * 0.5f;
  gBall.r = gBallRadius;
  js_report_combo(gRally);
  js_report_points(gLeftPoints, gRightPoints);
  js_report_target(gTargetPoints);
  for (auto& p : gPulses) {
    p.active = false;
  }
  gTrailCount = 0;
  gTrailTimer = 0.0f;
  gImpactFlash = 0.0f;
  gAiTimer = 0.0f;
  gAiTargetY = kHeight * 0.5f - (gRight.h * 0.5f);
  gPaused = false;
}

extern "C" {
EMSCRIPTEN_KEEPALIVE void set_game_mode(int mode) {
  gMode = mode;
  js_report_mode(gMode);
  if (gMode != 1) {
    gAiLevel = 1;
    gRanked = false;
  }
  js_report_ai(gAiLevel);
}

EMSCRIPTEN_KEEPALIVE void set_ai_level(int level) {
  if (level < 0) level = 0;
  if (level > 2) level = 2;
  gAiLevel = level;
  js_report_ai(gAiLevel);
}

EMSCRIPTEN_KEEPALIVE void set_ranked(int ranked) {
  gRanked = ranked != 0;
}

EMSCRIPTEN_KEEPALIVE void set_modifiers(int fast, int big, int narrow) {
  gModFast = fast != 0;
  gModBig = big != 0;
  gModNarrow = narrow != 0;
  refresh_tuning();
}

EMSCRIPTEN_KEEPALIVE void set_speed_scale(float scale) {
  if (scale < 0.75f) scale = 0.75f;
  if (scale > 1.35f) scale = 1.35f;
  gSpeedScale = scale;
  refresh_tuning();
}

EMSCRIPTEN_KEEPALIVE void set_target_points(int points) {
  if (points < kMinWinPoints) points = kMinWinPoints;
  if (points > kMaxWinPoints) points = kMaxWinPoints;
  gTargetPoints = points;
  js_report_target(gTargetPoints);
}

EMSCRIPTEN_KEEPALIVE void set_input(int leftUp, int leftDown, int rightUp, int rightDown) {
  gInputLeftUp = leftUp != 0;
  gInputLeftDown = leftDown != 0;
  gInputRightUp = rightUp != 0;
  gInputRightDown = rightDown != 0;
}

EMSCRIPTEN_KEEPALIVE void set_paused(int paused) {
  gPaused = paused != 0;
}

EMSCRIPTEN_KEEPALIVE void set_input_lock(int locked) {
  gInputLock = locked != 0;
}

EMSCRIPTEN_KEEPALIVE void reset_game_api() {
  reset_game();
}
}

static void clamp_paddle(Paddle& p) {
  if (p.y < 0) p.y = 0;
  if (p.y + p.h > kHeight) p.y = kHeight - p.h;
}

static bool check_collision(const Paddle& p) {
  float nearestX = std::fmax(p.x, std::fmin(gBall.x, p.x + p.w));
  float nearestY = std::fmax(p.y, std::fmin(gBall.y, p.y + p.h));
  float dx = gBall.x - nearestX;
  float dy = gBall.y - nearestY;
  return (dx * dx + dy * dy) <= (gBall.r * gBall.r);
}

static float clampf(float v, float lo, float hi) {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

static float random_range(float minVal, float maxVal) {
  float t = (float)std::rand() / (float)RAND_MAX;
  return minVal + (maxVal - minVal) * t;
}

static float predict_ball_y(float targetX) {
  if (gBall.vx <= 0.0f) return kHeight * 0.5f;
  float t = (targetX - gBall.x) / gBall.vx;
  if (t < 0.0f) t = 0.0f;
  float radius = gBall.r;
  float height = kHeight - 2.0f * radius;
  float pos = (gBall.y - radius) + gBall.vy * t;
  float period = 2.0f * height;
  float m = std::fmod(pos, period);
  if (m < 0.0f) m += period;
  if (m > height) m = period - m;
  return m + radius;
}

static int hit_points(float speed, int rally) {
  int base = 10;
  int speedBonus = (int)(speed / 120.0f);
  float mult = 1.0f + (float)(rally / 4) * 0.25f;
  return (int)((base + speedBonus) * mult);
}

static void add_pulse(float x, float y) {
  gPulses[gPulseIndex] = {x, y, 0.0f, true};
  gPulseIndex = (gPulseIndex + 1) % 8;
}

static void add_trail_point(float x, float y) {
  if (gTrailCount < 24) {
    gTrail[gTrailCount++] = {x, y, 0.35f};
  } else {
    for (int i = 1; i < gTrailCount; ++i) {
      gTrail[i - 1] = gTrail[i];
    }
    gTrail[gTrailCount - 1] = {x, y, 0.35f};
  }
}

static void update_pulses(float dt) {
  for (auto& p : gPulses) {
    if (!p.active) continue;
    p.t += dt;
    if (p.t > 0.7f) {
      p.active = false;
    }
  }
}

static void update_trail(float dt) {
  gTrailTimer += dt;
  if (gTrailTimer >= 0.03f) {
    gTrailTimer = 0.0f;
    add_trail_point(gBall.x, gBall.y);
  }
  int writeIndex = 0;
  for (int i = 0; i < gTrailCount; ++i) {
    gTrail[i].life -= dt;
    if (gTrail[i].life > 0.0f) {
      gTrail[writeIndex++] = gTrail[i];
    }
  }
  gTrailCount = writeIndex;
}

static void draw_circle(SDL_Renderer* renderer, int32_t centreX, int32_t centreY, int32_t radius) {
  int32_t x = radius - 1;
  int32_t y = 0;
  int32_t dx = 1;
  int32_t dy = 1;
  int32_t err = dx - (radius << 1);

  while (x >= y) {
    SDL_RenderDrawPoint(renderer, centreX + x, centreY + y);
    SDL_RenderDrawPoint(renderer, centreX + y, centreY + x);
    SDL_RenderDrawPoint(renderer, centreX - y, centreY + x);
    SDL_RenderDrawPoint(renderer, centreX - x, centreY + y);
    SDL_RenderDrawPoint(renderer, centreX - x, centreY - y);
    SDL_RenderDrawPoint(renderer, centreX - y, centreY - x);
    SDL_RenderDrawPoint(renderer, centreX + y, centreY - x);
    SDL_RenderDrawPoint(renderer, centreX + x, centreY - y);

    if (err <= 0) {
      y++;
      err += dy;
      dy += 2;
    }
    if (err > 0) {
      x--;
      dx += 2;
      err += dx - (radius << 1);
    }
  }
}

static void draw_filled_circle(SDL_Renderer* renderer, int32_t centreX, int32_t centreY, int32_t radius) {
  for (int32_t dy = -radius; dy <= radius; ++dy) {
    int32_t dx = (int32_t)std::sqrt((radius * radius) - (dy * dy));
    SDL_RenderDrawLine(renderer, centreX - dx, centreY + dy, centreX + dx, centreY + dy);
  }
}

static void update(float dt) {
  SDL_Event e;
  while (SDL_PollEvent(&e)) {
    if (e.type == SDL_QUIT) {
      gRunning = false;
    }
    if (e.type == SDL_KEYDOWN && !gInputLock && e.key.keysym.sym == SDLK_SPACE) {
      if (gGameOver) {
        reset_game();
      } else {
        gPaused = !gPaused;
      }
    }
    if (e.type == SDL_KEYDOWN && !gInputLock && gMode == 1 && !gRanked) {
      if (e.key.keysym.sym == SDLK_1) {
        gAiLevel = 0;
        js_report_ai(gAiLevel);
      } else if (e.key.keysym.sym == SDLK_2) {
        gAiLevel = 1;
        js_report_ai(gAiLevel);
      } else if (e.key.keysym.sym == SDLK_3) {
        gAiLevel = 2;
        js_report_ai(gAiLevel);
      }
    }
  }

  const Uint8* keys = SDL_GetKeyboardState(nullptr);
  gLeft.vy = 0.0f;
  gRight.vy = 0.0f;
  if ((!gInputLock && keys[SDL_SCANCODE_A]) || gInputLeftUp) gLeft.vy = -kPaddleSpeed;
  if ((!gInputLock && keys[SDL_SCANCODE_D]) || gInputLeftDown) gLeft.vy = kPaddleSpeed;
  if (gMode == 0) {
    if ((!gInputLock && keys[SDL_SCANCODE_UP]) || gInputRightUp) gRight.vy = -kPaddleSpeed;
    if ((!gInputLock && keys[SDL_SCANCODE_DOWN]) || gInputRightDown) gRight.vy = kPaddleSpeed;
  }

  if (!gGameOver && !gPaused) {
    gLeft.y += gLeft.vy * dt;
    if (gMode == 1) {
      struct AiProfile { float reaction; float speed; float error; };
      static const AiProfile profiles[3] = {
        {0.24f, 0.65f, 46.0f},
        {0.14f, 0.85f, 28.0f},
        {0.07f, 1.05f, 14.0f},
      };
      const AiProfile& profile = profiles[gAiLevel];
      gAiTimer -= dt;
      if (gAiTimer <= 0.0f) {
        gAiTimer = profile.reaction;
        float target = kHeight * 0.5f - (gRight.h * 0.5f);
        if (!gServing && gBall.vx > 0.0f) {
          float predicted = predict_ball_y(gRight.x);
          target = predicted - (gRight.h * 0.5f);
        }
        target += random_range(-profile.error, profile.error);
        gAiTargetY = clampf(target, 0.0f, kHeight - gRight.h);
      }
      float diff = gAiTargetY - gRight.y;
      if (std::fabs(diff) > 4.0f) {
        gRight.vy = (diff > 0 ? 1.0f : -1.0f) * (kPaddleSpeed * profile.speed);
      } else {
        gRight.vy = 0.0f;
      }
    }
    gRight.y += gRight.vy * dt;
    clamp_paddle(gLeft);
    clamp_paddle(gRight);

    if (gServing) {
      gServeTimer -= dt;
      if (gServeTimer <= 0.0f) {
        gServing = false;
        reset_ball(gServeDir);
      }
    } else {
      gBall.x += gBall.vx * dt;
      gBall.y += gBall.vy * dt;
    }

    if (!gServing && gBall.y - gBall.r < 0) {
      gBall.y = gBall.r;
      gBall.vy = -gBall.vy;
      add_pulse(gBall.x, gBall.y);
      gImpactFlash = kImpactFlashMax;
    }
    if (!gServing && gBall.y + gBall.r > kHeight) {
      gBall.y = kHeight - gBall.r;
      gBall.vy = -gBall.vy;
      add_pulse(gBall.x, gBall.y);
      gImpactFlash = kImpactFlashMax;
    }

    if (!gServing && check_collision(gLeft) && gBall.vx < 0) {
      float speed = std::sqrt(gBall.vx * gBall.vx + gBall.vy * gBall.vy);
      speed = std::fmin(speed + kBallSpeedIncrease * gSpeedMult, kBallMaxSpeed * gSpeedMult);
      float offset = (gBall.y - (gLeft.y + gLeft.h * 0.5f)) / (gLeft.h * 0.5f);
      offset = clampf(offset + (gLeft.vy / kPaddleSpeed) * 0.35f, -1.0f, 1.0f);
      float angle = offset * (kMaxBounceAngleDeg * (float)M_PI / 180.0f);
      gBall.vx = std::cos(angle) * speed;
      gBall.vy = std::sin(angle) * speed;
      gBall.x = gLeft.x + gLeft.w + gBall.r + 1.0f;
      gRally += 1;
      if (gRally > gLongestRally) gLongestRally = gRally;
      js_report_combo(gRally);
      gScore += hit_points(speed, gRally);
      add_pulse(gBall.x, gBall.y);
      gImpactFlash = kImpactFlashMax;
    }
    if (!gServing && check_collision(gRight) && gBall.vx > 0) {
      float speed = std::sqrt(gBall.vx * gBall.vx + gBall.vy * gBall.vy);
      speed = std::fmin(speed + kBallSpeedIncrease * gSpeedMult, kBallMaxSpeed * gSpeedMult);
      float offset = (gBall.y - (gRight.y + gRight.h * 0.5f)) / (gRight.h * 0.5f);
      offset = clampf(offset + (gRight.vy / kPaddleSpeed) * 0.35f, -1.0f, 1.0f);
      float angle = offset * (kMaxBounceAngleDeg * (float)M_PI / 180.0f);
      gBall.vx = -std::cos(angle) * speed;
      gBall.vy = std::sin(angle) * speed;
      gBall.x = gRight.x - gBall.r - 1.0f;
      gRally += 1;
      if (gRally > gLongestRally) gLongestRally = gRally;
      js_report_combo(gRally);
      add_pulse(gBall.x, gBall.y);
      gImpactFlash = kImpactFlashMax;
    }

    float speed = std::sqrt(gBall.vx * gBall.vx + gBall.vy * gBall.vy);
    js_report_speed(gServing ? 0.0f : speed);

    if (!gServing && (gBall.x + gBall.r < 0 || gBall.x - gBall.r > kWidth)) {
      bool leftScored = gBall.x - gBall.r > kWidth;
      if (leftScored) {
        gLeftPoints += 1;
        gScore += 100 + gRally * 2;
      } else {
        gRightPoints += 1;
      }
      js_report_points(gLeftPoints, gRightPoints);
      gRally = 0;
      js_report_combo(gRally);
      gServing = true;
      gServeTimer = 0.9f;
      gServeDir = leftScored ? 1 : -1;
      gBall.vx = 0.0f;
      gBall.vy = 0.0f;
      gBall.x = kWidth * 0.5f;
      gBall.y = kHeight * 0.5f;

      if (gLeftPoints >= gTargetPoints || gRightPoints >= gTargetPoints) {
        gGameOver = true;
        int winner = (gLeftPoints >= gTargetPoints) ? 0 : 1;
        js_report_winner(winner);
        int finalScore = gScore + gLongestRally * 5;
        js_report_score(finalScore);
      }
    }
  }
  update_pulses(dt);
  update_trail(dt);
  if (gImpactFlash > 0.0f) {
    gImpactFlash -= dt;
    if (gImpactFlash < 0.0f) gImpactFlash = 0.0f;
  }
}

static void draw_text_placeholder(int x, int y) {
  SDL_Rect r = {x, y, 5, 5};
  SDL_RenderFillRect(gRenderer, &r);
}

static void render() {
  SDL_SetRenderDrawColor(gRenderer, 18, 18, 28, 255);
  SDL_RenderClear(gRenderer);

  SDL_SetRenderDrawColor(gRenderer, 255, 255, 255, 255);
  SDL_Rect l = {(int)gLeft.x, (int)gLeft.y, (int)gLeft.w, (int)gLeft.h};
  SDL_Rect r = {(int)gRight.x, (int)gRight.y, (int)gRight.w, (int)gRight.h};
  SDL_RenderFillRect(gRenderer, &l);
  SDL_RenderFillRect(gRenderer, &r);

  for (int y = 12; y < kHeight; y += 20) {
    SDL_SetRenderDrawColor(gRenderer, 120, 240, 200, 140);
    draw_filled_circle(gRenderer, kWidth / 2, y, 3);
    SDL_SetRenderDrawColor(gRenderer, 70, 140, 120, 60);
    draw_circle(gRenderer, kWidth / 2, y, 7);
  }

  SDL_SetRenderDrawBlendMode(gRenderer, SDL_BLENDMODE_BLEND);
  for (int i = 0; i < gTrailCount; ++i) {
    float t = gTrail[i].life / 0.35f;
    Uint8 alpha = (Uint8)(120.0f * t);
    if (gMode == 1) {
      SDL_SetRenderDrawColor(gRenderer, 32, 184, 255, alpha);
    } else {
      SDL_SetRenderDrawColor(gRenderer, 61, 255, 182, alpha);
    }
    int radius = (int)(gBall.r * (0.6f + 0.6f * t));
    draw_filled_circle(gRenderer, (int)gTrail[i].x, (int)gTrail[i].y, radius);
  }
  for (auto& p : gPulses) {
    if (!p.active) continue;
    float t = p.t / 0.7f;
    int radius = (int)(gBall.r + t * 60.0f);
    Uint8 alpha = (Uint8)(160.0f * (1.0f - t));
    if (gMode == 1) {
      SDL_SetRenderDrawColor(gRenderer, 32, 184, 255, alpha);
    } else {
      SDL_SetRenderDrawColor(gRenderer, 61, 255, 182, alpha);
    }
    draw_circle(gRenderer, (int)p.x, (int)p.y, radius);
  }
  SDL_SetRenderDrawBlendMode(gRenderer, SDL_BLENDMODE_NONE);

  SDL_Rect b = {(int)(gBall.x - gBall.r), (int)(gBall.y - gBall.r), (int)(gBall.r * 2), (int)(gBall.r * 2)};
  SDL_RenderFillRect(gRenderer, &b);

  if (gImpactFlash > 0.0f) {
    float t = gImpactFlash / kImpactFlashMax;
    Uint8 alpha = (Uint8)(90.0f * t);
    SDL_SetRenderDrawBlendMode(gRenderer, SDL_BLENDMODE_BLEND);
    if (gMode == 1) {
      SDL_SetRenderDrawColor(gRenderer, 32, 184, 255, alpha);
    } else {
      SDL_SetRenderDrawColor(gRenderer, 61, 255, 182, alpha);
    }
    SDL_Rect flash = {0, 0, kWidth, kHeight};
    SDL_RenderFillRect(gRenderer, &flash);
    SDL_SetRenderDrawBlendMode(gRenderer, SDL_BLENDMODE_NONE);
  }

  SDL_SetRenderDrawColor(gRenderer, 200, 200, 200, 255);
  draw_text_placeholder(12, 12);

  SDL_RenderPresent(gRenderer);
}

static void main_loop() {
  if (!gRunning) {
    emscripten_cancel_main_loop();
    return;
  }

  float now = (float)SDL_GetTicks() / 1000.0f;
  float dt = now - gLastTick;
  if (dt > 0.05f) dt = 0.05f;
  gLastTick = now;

  update(dt);
  render();
}

int main() {
  std::srand((unsigned)std::time(nullptr));
#ifdef __EMSCRIPTEN__
  SDL_SetHint(SDL_HINT_EMSCRIPTEN_KEYBOARD_ELEMENT, "#canvas");
#endif
  if (SDL_Init(SDL_INIT_VIDEO) != 0) {
    std::printf("SDL init failed: %s\n", SDL_GetError());
    return 1;
  }

  gWindow = SDL_CreateWindow("Pong WASM", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, kWidth, kHeight, SDL_WINDOW_SHOWN);
  if (!gWindow) {
    std::printf("Window creation failed: %s\n", SDL_GetError());
    return 1;
  }

  gRenderer = SDL_CreateRenderer(gWindow, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
  if (!gRenderer) {
    std::printf("Renderer creation failed: %s\n", SDL_GetError());
    return 1;
  }

  refresh_tuning();
  reset_game();
  gLastTick = (float)SDL_GetTicks() / 1000.0f;
  emscripten_set_main_loop(main_loop, 0, 1);
  return 0;
}
