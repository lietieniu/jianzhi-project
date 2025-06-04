// 表单验证功能

// 验证规则
const validationRules = {
  username: {
    required: true,
    minLength: 6,
    pattern: /^[a-zA-Z0-9_]{6,}$/,
    message: '用户名至少6个字符，只能包含字母、数字和下划线'
  },
  password: {
    required: true,
    minLength: 6,
    message: '密码至少6个字符'
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    message: '请输入有效的邮箱地址'
  },
  phone: {
    required: true,
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入有效的11位手机号码'
  }
};

// 验证单个字段
function validateField(field, value, ruleName) {
  const rule = validationRules[ruleName];
  if (!rule) return { valid: true };
  
  // 必填验证
  if (rule.required && (!value || value.trim() === '')) {
    return { valid: false, message: '此字段不能为空' };
  }
  
  // 如果字段为空且不是必填，则跳过其他验证
  if (!value || value.trim() === '') {
    return { valid: true };
  }
  
  // 最小长度验证
  if (rule.minLength && value.length < rule.minLength) {
    return { valid: false, message: `至少需要${rule.minLength}个字符` };
  }
  
  // 正则表达式验证
  if (rule.pattern && !rule.pattern.test(value)) {
    return { valid: false, message: rule.message };
  }
  
  return { valid: true };
}

// 验证密码确认
function validatePasswordConfirm(password, confirmPassword) {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { valid: false, message: '请确认密码' };
  }
  
  if (password !== confirmPassword) {
    return { valid: false, message: '两次输入的密码不一致' };
  }
  
  return { valid: true };
}

// 显示错误信息
function showError(field, message) {
  const errorElement = document.getElementById(field.id + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  field.classList.add('error');
  field.classList.remove('success');
}

// 显示成功状态
function showSuccess(field) {
  const errorElement = document.getElementById(field.id + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  field.classList.remove('error');
  field.classList.add('success');
}

// 清除验证状态
function clearValidation(field) {
  const errorElement = document.getElementById(field.id + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  field.classList.remove('error', 'success');
}

// 初始化注册表单验证
function initRegisterValidation() {
  const usernameField = document.getElementById('regUsername');
  const emailField = document.getElementById('email');
  const phoneField = document.getElementById('phone');
  const passwordField = document.getElementById('regPassword');
  const confirmPasswordField = document.getElementById('confirmPassword');
  
  // 用户名验证
  if (usernameField) {
    usernameField.addEventListener('change', function() {
      const result = validateField(this, this.value, 'username');
      if (result.valid) {
        showSuccess(this);
      } else {
        showError(this, result.message);
      }
    });
  }
  
  // 邮箱验证
  if (emailField) {
    emailField.addEventListener('change', function() {
      const result = validateField(this, this.value, 'email');
      if (result.valid) {
        showSuccess(this);
      } else {
        showError(this, result.message);
      }
    });
  }
  
  // 手机号验证
  if (phoneField) {
    phoneField.addEventListener('change', function() {
      const result = validateField(this, this.value, 'phone');
      if (result.valid) {
        showSuccess(this);
      } else {
        showError(this, result.message);
      }
    });
  }
  
  // 密码验证
  if (passwordField) {
    passwordField.addEventListener('change', function() {
      const result = validateField(this, this.value, 'password');
      if (result.valid) {
        showSuccess(this);
      } else {
        showError(this, result.message);
      }
      
      // 如果确认密码已填写，重新验证确认密码
      if (confirmPasswordField && confirmPasswordField.value) {
        const confirmResult = validatePasswordConfirm(this.value, confirmPasswordField.value);
        if (confirmResult.valid) {
          showSuccess(confirmPasswordField);
        } else {
          showError(confirmPasswordField, confirmResult.message);
        }
      }
    });
  }
  
  // 确认密码验证
  if (confirmPasswordField) {
    confirmPasswordField.addEventListener('change', function() {
      const password = passwordField ? passwordField.value : '';
      const result = validatePasswordConfirm(password, this.value);
      if (result.valid) {
        showSuccess(this);
      } else {
        showError(this, result.message);
      }
    });
  }
  
  // 表单提交验证
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // 验证所有字段
      const fields = [
        { field: usernameField, rule: 'username' },
        { field: emailField, rule: 'email' },
        { field: phoneField, rule: 'phone' },
        { field: passwordField, rule: 'password' }
      ];
      
      fields.forEach(({ field, rule }) => {
        if (field) {
          const result = validateField(field, field.value, rule);
          if (!result.valid) {
            showError(field, result.message);
            isValid = false;
          }
        }
      });
      
      // 验证确认密码
      if (passwordField && confirmPasswordField) {
        const confirmResult = validatePasswordConfirm(passwordField.value, confirmPasswordField.value);
        if (!confirmResult.valid) {
          showError(confirmPasswordField, confirmResult.message);
          isValid = false;
        }
      }
      
      // 验证协议同意
      const agreeTermsField = document.getElementById('agreeTerms');
      if (agreeTermsField && !agreeTermsField.checked) {
        const errorElement = document.getElementById('agreeTermsError');
        if (errorElement) {
          errorElement.textContent = '请同意用户协议和隐私政策';
          errorElement.style.display = 'block';
        }
        isValid = false;
      }
      
      if (isValid) {
        // 注册成功，跳转到登录页面
        alert('注册成功！即将跳转到登录页面');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
    });
  }
}

// 初始化登录表单验证
function initLoginValidation() {
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  
  // 登录表单提交验证
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // 验证用户名
      if (usernameField) {
        const usernameResult = validateField(usernameField, usernameField.value, 'username');
        if (!usernameResult.valid) {
          showError(usernameField, usernameResult.message);
          isValid = false;
        } else {
          showSuccess(usernameField);
        }
      }
      
      // 验证密码
      if (passwordField) {
        const passwordResult = validateField(passwordField, passwordField.value, 'password');
        if (!passwordResult.valid) {
          showError(passwordField, passwordResult.message);
          isValid = false;
        } else {
          showSuccess(passwordField);
        }
      }
      
      if (isValid) {
        // 登录成功，跳转到首页
        alert('登录成功！即将跳转到首页');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }
    });
  }
}

// 页面加载完成后初始化验证
document.addEventListener('DOMContentLoaded', function() {
  // 注册页面验证
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    initRegisterValidation();
  }
  
  // 登录页面验证
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    initLoginValidation();
  }
});