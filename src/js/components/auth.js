import { AppState } from '../state.js';
import { t } from '../translations.js';

let authMode = 'login'; // 'login', 'register', 'forgot', 'reset', 'verify'
let pendingRegisterData = null; // Caches registration info until verified

// Inject styles for the authentication page elements
function injectAuthStyles() {
  if (document.getElementById('auth-custom-styles')) return;

  const style = document.createElement('style');
  style.id = 'auth-custom-styles';
  style.innerHTML = `
    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .password-toggle-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      transition: color var(--transition-fast);
      user-select: none;
    }
    .password-toggle-btn:hover {
      color: var(--text-primary);
    }
    .strength-bar-container {
      display: flex;
      gap: 4px;
      margin-top: 6px;
      height: 4px;
      width: 100%;
      border-radius: 2px;
      overflow: hidden;
    }
    .strength-bar-segment {
      flex: 1;
      height: 100%;
      background: var(--border-color);
      transition: background-color var(--transition-fast);
    }
    .strength-label {
      font-size: 11px;
      font-weight: 700;
      margin-top: 4px;
      text-align: right;
      transition: color var(--transition-fast);
    }
    .verification-digit-input {
      width: 48px;
      height: 48px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      border-radius: var(--border-radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-tertiary);
      color: var(--text-primary);
      margin: 0 4px;
    }
    .verification-digit-input:focus {
      border-color: var(--accent-color);
      outline: none;
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 13px;
      color: var(--text-secondary);
      user-select: none;
    }
    .checkbox-container input {
      width: 16px;
      height: 16px;
      accent-color: var(--accent-color);
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}

export function renderAuth(container) {
  injectAuthStyles();
  
  container.innerHTML = `
    <div class="auth-page-container">
      <div class="auth-card" id="auth-card-body">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  const card = document.getElementById('auth-card-body');
  renderAuthForm(card);
}

function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('auth-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'auth-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    `;
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  const icon = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  
  const bgColor = type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)';
  
  toast.style.cssText = `
    background: ${bgColor};
    color: #ffffff;
    padding: 12px 20px;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 13px;
    font-family: var(--font-body);
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  
  toast.innerHTML = `${icon} <span>${message}</span>`;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  
  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function checkPasswordStrength(password) {
  if (password.length === 0) return { score: 0, label: 'None', color: 'transparent' };
  if (password.length < 6) return { score: 1, label: 'Weak', color: 'var(--color-loss)' };
  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  
  if (password.length >= 8 && hasLetter && hasDigit && hasSpecial && hasUpper) {
    return { score: 3, label: 'Strong', color: 'var(--color-win)' };
  }
  if (password.length >= 6 && hasLetter && hasDigit) {
    return { score: 2, label: 'Medium', color: 'var(--color-be)' };
  }
  return { score: 1, label: 'Weak', color: 'var(--color-loss)' };
}

function setupPasswordToggle(inputEl, buttonEl) {
  buttonEl.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputEl.type === 'password') {
      inputEl.type = 'text';
      buttonEl.textContent = 'Hide';
    } else {
      inputEl.type = 'password';
      buttonEl.textContent = 'Show';
    }
  });
}

function updateStrengthIndicators(password, containerEl, labelEl) {
  const strength = checkPasswordStrength(password);
  const segments = containerEl.querySelectorAll('.strength-bar-segment');
  
  segments.forEach((seg, index) => {
    if (index < strength.score) {
      seg.style.backgroundColor = strength.color;
    } else {
      seg.style.backgroundColor = 'var(--border-color)';
    }
  });
  
  labelEl.textContent = strength.label !== 'None' ? `Strength: ${strength.label}` : '';
  labelEl.style.color = strength.color;
}

function renderAuthForm(card) {
  if (authMode === 'login') {
    card.innerHTML = `
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">${t('welcomeBack')}</h3>
        <p class="auth-subtitle">${t('loginSubtitle')}</p>
      </div>

      <form id="login-form">
        <div class="form-group">
          <label class="form-label" for="login-email">${t('emailLabel')}</label>
          <input type="email" id="login-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label class="form-label" for="login-password">${t('passwordLabel')}</label>
            <a href="#" id="goto-forgot" style="font-size:12px; color: var(--accent-color); text-decoration:none; margin-bottom:8px;">${t('forgotLink')}</a>
          </div>
          <div class="password-input-wrapper">
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="login-pwd-toggle">Show</button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <label class="checkbox-container">
            <input type="checkbox" id="login-remember">
            <span>Remember Me</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${t('accessAccount')}</button>
      </form>

      <div class="auth-footer-link">
        ${t('dontHaveAccount')} <a href="#" class="auth-link" id="goto-register">${t('createOne')}</a>
      </div>
    `;

    // Prefill if remember me was used
    const rememberedEmail = localStorage.getItem('trademaster-remember-email');
    if (rememberedEmail) {
      document.getElementById('login-email').value = rememberedEmail;
      document.getElementById('login-remember').checked = true;
    }

    setupPasswordToggle(
      document.getElementById('login-password'),
      document.getElementById('login-pwd-toggle')
    );

    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const remember = document.getElementById('login-remember').checked;

      try {
        await AppState.login(email, password, remember);
        if (remember) {
          localStorage.setItem('trademaster-remember-email', email);
        } else {
          localStorage.removeItem('trademaster-remember-email');
        }
        showToast('Login successful! Welcoming you back...', 'success');
        setTimeout(() => AppState.setView('dashboard'), 800);
      } catch (err) {
        showToast(t(err.message) || err.message, 'error');
      }
    });

    document.getElementById('goto-register').addEventListener('click', (e) => {
      e.preventDefault();
      authMode = 'register';
      renderAuthForm(card);
    });

    document.getElementById('goto-forgot').addEventListener('click', (e) => {
      e.preventDefault();
      authMode = 'forgot';
      renderAuthForm(card);
    });

  } else if (authMode === 'register') {
    card.innerHTML = `
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">${t('createAccount')}</h3>
        <p class="auth-subtitle">${t('registerSubtitle')}</p>
      </div>

      <form id="register-form">
        <div class="form-group">
          <label class="form-label" for="reg-fullname">Full Name</label>
          <input type="text" id="reg-fullname" class="form-control" placeholder="Alex Sterling" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-username">${t('usernameLabel')}</label>
          <input type="text" id="reg-username" class="form-control" placeholder="AlexTrader" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-email">${t('emailLabel')}</label>
          <input type="email" id="reg-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 12px;">
          <label class="form-label" for="reg-password">${t('passwordLabel')}</label>
          <div class="password-input-wrapper">
            <input type="password" id="reg-password" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reg-pwd-toggle">Show</button>
          </div>
          <div class="strength-bar-container" id="reg-strength-container">
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
          </div>
          <div class="strength-label" id="reg-strength-lbl"></div>
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label" for="reg-confirm">Confirm Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="reg-confirm" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reg-confirm-toggle">Show</button>
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="checkbox-container">
            <input type="checkbox" id="reg-terms" required>
            <span>I accept the Terms and Conditions of maaroTrading</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${t('registerAccount')}</button>
      </form>

      <div class="auth-footer-link">
        ${t('alreadyHaveAccount')} <a href="#" class="auth-link" id="goto-login">${t('signIn')}</a>
      </div>
    `;

    const pwdInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm');
    const strengthContainer = document.getElementById('reg-strength-container');
    const strengthLabel = document.getElementById('reg-strength-lbl');

    setupPasswordToggle(pwdInput, document.getElementById('reg-pwd-toggle'));
    setupPasswordToggle(confirmInput, document.getElementById('reg-confirm-toggle'));

    pwdInput.addEventListener('input', () => {
      updateStrengthIndicators(pwdInput.value, strengthContainer, strengthLabel);
    });

    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullname = document.getElementById('reg-fullname').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = pwdInput.value;
      const confirm = confirmInput.value;
      const acceptTerms = document.getElementById('reg-terms').checked;

      // Front-end validations
      if (!acceptTerms) {
        showToast('You must accept the Terms and Conditions to proceed.', 'error');
        return;
      }
      if (password !== confirm) {
        showToast('Passwords do not match.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      try {
        // Double check email uniqueness before moving to verification step
        const { getUser } = await import('../db.js');
        const existing = await getUser(email);
        if (existing) {
          showToast(t('emailExists'), 'error');
          return;
        }

        // Cache details and navigate to verification code step
        pendingRegisterData = { username, email, password, fullname };
        authMode = 'verify';
        showToast('Verification code sent to email!', 'success');
        renderAuthForm(card);
      } catch (err) {
        showToast(t(err.message) || err.message, 'error');
      }
    });

    document.getElementById('goto-login').addEventListener('click', (e) => {
      e.preventDefault();
      authMode = 'login';
      renderAuthForm(card);
    });

  } else if (authMode === 'verify') {
    // If there is no pending registration data, redirect back to register
    if (!pendingRegisterData) {
      showToast('No registration in progress. Redirecting to register.', 'error');
      authMode = 'register';
      renderAuthForm(card);
      return;
    }
    card.innerHTML = `
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">Verify Your Email</h3>
        <p class="auth-subtitle">We have sent a verification code to <strong>${pendingRegisterData?.email || 'your email'}</strong>.</p>
      </div>

      <form id="verify-form" style="text-align: center;">
        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-1">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-2">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-3">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-4">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-5">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-6">
        </div>

        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 24px;">
          Simulation Hint: Enter <strong>123456</strong> to verify successfully.
        </p>
        <p style="font-size: 13px; margin-top: -12px; margin-bottom: 20px;">
          <a href="#" id="use-hint-btn" class="auth-link">Use Simulation Hint</a>
        </p>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">Verify Code</button>
      </form>

      <div class="auth-footer-link">
        Didn't receive code? <a href="#" class="auth-link" id="resend-code-btn">Resend Code</a>
      </div>
    `;

    // Auto-focus logic for digit boxes
    const inputs = document.querySelectorAll('.verification-digit-input');
    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });

    // Autofill the hint when user clicks the helper link
    const useHintBtn = document.getElementById('use-hint-btn');
    if (useHintBtn) {
      useHintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const hint = '123456';
        inputs.forEach((inp, i) => { inp.value = hint[i]; });
        // Move focus to last input then submit
        inputs[inputs.length - 1].focus();
        const verifyForm = document.getElementById('verify-form');
        if (verifyForm.requestSubmit) {
          verifyForm.requestSubmit();
        } else {
          verifyForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      });
    }

    document.getElementById('resend-code-btn').addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Simulating: Verification code resent to email.', 'success');
    });

    document.getElementById('verify-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = Array.from(inputs).map(inp => inp.value).join('');

      if (code === '123456') {
        try {
          const { username, email, password, fullname } = pendingRegisterData;
          await AppState.register(username, email, password, fullname);
          showToast('Account successfully verified & activated!', 'success');
          setTimeout(() => AppState.setView('dashboard'), 800);
        } catch (err) {
          showToast(t(err.message) || err.message, 'error');
        }
      } else {
        showToast('Invalid verification code. Enter 123456.', 'error');
      }
    });

  } else if (authMode === 'forgot') {
    card.innerHTML = `
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">${t('resetPassword')}</h3>
        <p class="auth-subtitle">${t('resetSubtitle')}</p>
      </div>

      <form id="forgot-form">
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" for="forgot-email">${t('emailLabel')}</label>
          <input type="email" id="forgot-email" class="form-control" placeholder="trader@forex.com" required>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${t('sendInstructions')}</button>
      </form>

      <div class="auth-footer-link">
        <a href="#" class="auth-link" id="goto-login-back">${t('backToSignIn')}</a>
      </div>
    `;

    document.getElementById('forgot-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('forgot-email').value.trim();

      // Check if user exists
      const { getUser } = await import('../db.js');
      const user = await getUser(email);

      if (user) {
        showToast('Instructions and reset link successfully sent to your email.', 'success');
        // Automatically switch to reset mode for simulation
        setTimeout(() => {
          authMode = 'reset';
          renderAuthForm(card);
        }, 1200);
      } else {
        showToast('No account registered with this email address.', 'error');
      }
    });

    document.getElementById('goto-login-back').addEventListener('click', (e) => {
      e.preventDefault();
      authMode = 'login';
      renderAuthForm(card);
    });

  } else if (authMode === 'reset') {
    card.innerHTML = `
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
            <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">Create New Password</h3>
        <p class="auth-subtitle">Enter your new credentials below to restore account access.</p>
      </div>

      <form id="reset-form">
        <div class="form-group">
          <label class="form-label" for="reset-email">Verify Email</label>
          <input type="email" id="reset-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reset-pwd">New Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="reset-pwd" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reset-pwd-toggle">Show</button>
          </div>
          <div class="strength-bar-container" id="reset-strength-container">
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
          </div>
          <div class="strength-label" id="reset-strength-lbl"></div>
        </div>
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" for="reset-confirm">Confirm New Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="reset-confirm" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reset-confirm-toggle">Show</button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">Save Password</button>
      </form>

      <div class="auth-footer-link">
        <a href="#" class="auth-link" id="goto-login-back">${t('backToSignIn')}</a>
      </div>
    `;

    const pwdInput = document.getElementById('reset-pwd');
    const confirmInput = document.getElementById('reset-confirm');
    const strengthContainer = document.getElementById('reset-strength-container');
    const strengthLabel = document.getElementById('reset-strength-lbl');

    setupPasswordToggle(pwdInput, document.getElementById('reset-pwd-toggle'));
    setupPasswordToggle(confirmInput, document.getElementById('reset-confirm-toggle'));

    pwdInput.addEventListener('input', () => {
      updateStrengthIndicators(pwdInput.value, strengthContainer, strengthLabel);
    });

    document.getElementById('reset-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('reset-email').value.trim();
      const password = pwdInput.value;
      const confirm = confirmInput.value;

      if (password !== confirm) {
        showToast('Passwords do not match.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      try {
        const { getUser, updateUser } = await import('../db.js');
        const user = await getUser(email);
        if (user) {
          user.password = password;
          await updateUser(user);
          showToast('Password updated! Redirecting to login...', 'success');
          setTimeout(() => {
            authMode = 'login';
            renderAuthForm(card);
          }, 1200);
        } else {
          showToast('Account email verification failed.', 'error');
        }
      } catch (err) {
        showToast(t(err.message) || err.message, 'error');
      }
    });

    document.getElementById('goto-login-back').addEventListener('click', (e) => {
      e.preventDefault();
      authMode = 'login';
      renderAuthForm(card);
    });
  }
}
