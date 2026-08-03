// ============================================================
// 🎥 REEL VIDEO LINKS — paste your own video URLs here (.mp4 links)
// Order = left-back, mid, front (matches data-reel="0,1,2" in index.html)
// ============================================================
const reelVideos = [
  "videos/reel1.mp4",   // reel--back
  "videos/reel2.mp4",   // reel--mid
  "videos/reel3.mp4"    // reel--front
];

document.querySelectorAll(".reel__video").forEach((video) => {
  const index = video.dataset.reel;
  const src = reelVideos[index];
  if (src) {
    video.src = src;
    // Autoplay can be blocked by the browser until it's muted — we already set muted in HTML.
    video.play().catch(() => {
      // If autoplay is still blocked, play on first user interaction with the page.
      const resume = () => { video.play(); document.removeEventListener("click", resume); };
      document.addEventListener("click", resume);
    });
  }
});

// ============================================================
// FLOATING LABELS — reliable JS-driven toggle (fixes text/label overlap)
// ============================================================
function setupFloatingLabels() {
  document.querySelectorAll(".field input").forEach((input) => {
    const sync = () => {
      if (input.value.trim().length > 0) {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    };
    input.addEventListener("input", sync);
    input.addEventListener("blur", sync);
    input.addEventListener("focus", sync);
    sync(); // run once in case of pre-filled/autofilled values
  });
}
setupFloatingLabels();

// ============================================================
// SMALL HELPERS
// ============================================================
const $ = (id) => document.getElementById(id);

function enableSubmitWhenFilled(inputs, submitBtn) {
  const check = () => {
    const allFilled = inputs.every((el) => el.value.trim().length > 0);
    submitBtn.disabled = !allFilled;
  };
  inputs.forEach((el) => el.addEventListener("input", check));
  check();
}

function togglePasswordField(toggleBtnId, inputId) {
  const btn = $(toggleBtnId);
  const input = $(inputId);
  btn.addEventListener("click", () => {
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.textContent = isHidden ? "Hide" : "Show";
  });
}

// ============================================================
// LOGIN FORM
// ============================================================
const loginUser = $("loginUser");
const loginPass = $("loginPass");
const loginSubmit = $("loginSubmit");
const loginForm = $("loginForm");
const loginMsg = $("loginMsg");

enableSubmitWhenFilled([loginUser, loginPass], loginSubmit);
togglePasswordField("toggleLoginPass", "loginPass");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginMsg.textContent = "";
  loginMsg.className = "form-msg";

  if (loginUser.value.trim().length < 3) {
    loginMsg.textContent = "Please enter a valid username, phone, or email.";
    loginMsg.classList.add("error");
    return;
  }
  if (loginPass.value.length < 6) {
    loginMsg.textContent = "Password must be at least 6 characters.";
    loginMsg.classList.add("error");
    return;
  }

  loginMsg.textContent = "Logged in successfully!";
  loginMsg.classList.add("success");
  loginForm.reset();
  loginSubmit.disabled = true;
});

// ============================================================
// SIGN UP FORM
// ============================================================
const suEmail = $("suEmail");
const suFullname = $("suFullname");
const suUsername = $("suUsername");
const suPass = $("suPass");
const signupSubmit = $("signupSubmit");
const signupForm = $("signupForm");
const signupMsg = $("signupMsg");

enableSubmitWhenFilled([suEmail, suFullname, suUsername, suPass], signupSubmit);
togglePasswordField("toggleSignupPass", "suPass");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupMsg.textContent = "";
  signupMsg.className = "form-msg";

  const emailValid = /\S+@\S+\.\S+/.test(suEmail.value) || /^[0-9+\-\s]{7,}$/.test(suEmail.value);
  if (!emailValid) {
    signupMsg.textContent = "Enter a valid email or mobile number.";
    signupMsg.classList.add("error");
    return;
  }
  if (suPass.value.length < 6) {
    signupMsg.textContent = "Password must be at least 6 characters.";
    signupMsg.classList.add("error");
    return;
  }

  signupMsg.textContent = "Account created! Welcome to Instagram.";
  signupMsg.classList.add("success");
  signupForm.reset();
  signupSubmit.disabled = true;
});

// ============================================================
// SWITCH BETWEEN LOGIN / SIGNUP CARDS
// ============================================================
const loginCard = $("loginCard");
const signupCard = $("signupCard");
const switchToSignup = $("switchToSignup");
const switchToLogin = $("switchToLogin");

document.querySelectorAll(".link-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    if (target === "signup") {
      loginCard.classList.add("card--hidden");
      signupCard.classList.remove("card--hidden");
      switchToSignup.classList.add("hidden");
      switchToLogin.classList.remove("hidden");
    } else {
      signupCard.classList.add("card--hidden");
      loginCard.classList.remove("card--hidden");
      switchToLogin.classList.add("hidden");
      switchToSignup.classList.remove("hidden");
    }
  });
});
