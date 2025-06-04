// 用户认证相关功能

// 用户数据
let users = [];
let currentUser = null;

// 初始化：从本地存储加载数据
function initAuth() {
  // 加载用户数据
  const storedUsers = localStorage.getItem('mall_users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
  
  // 加载当前用户
  const storedUser = localStorage.getItem('mall_current_user');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    updateUIForLoggedInUser();
  } else {
    updateUIForLoggedOutUser();
  }
}

// 注册新用户
function register(userData) {
  // 检查用户名是否已存在
  if (users.some(user => user.username === userData.username)) {
    throw new Error('用户名已存在');
  }
  
  // 检查邮箱是否已存在
  if (users.some(user => user.email === userData.email)) {
    throw new Error('邮箱已被注册');
  }
  
  // 创建新用户
  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    password: btoa(userData.password + 'mall_salt'), // 简单加密
    createdAt: new Date().toISOString()
  };
  
  // 添加到用户列表
  users.push(newUser);
  
  // 保存到本地存储
  localStorage.setItem('mall_users', JSON.stringify(users));
  
  return { success: true, message: '注册成功！' };
}

// 用户登录
function login(username, password) {
  // 查找用户
  const user = users.find(u => u.username === username);
  
  // 验证用户名和密码
  if (!user || user.password !== btoa(password + 'mall_salt')) {
    throw new Error('用户名或密码错误');
  }
  
  // 设置当前用户
  currentUser = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  
  // 保存登录状态
  localStorage.setItem('mall_current_user', JSON.stringify(currentUser));
  
  // 更新UI
  updateUIForLoggedInUser();
  
  return { success: true, message: '登录成功！' };
}

// 用户登出
function logout() {
  currentUser = null;
  localStorage.removeItem('mall_current_user');
  updateUIForLoggedOutUser();
}

// 更新已登录用户的UI
function updateUIForLoggedInUser() {
  const authButtons = document.querySelector('.auth-buttons');
  if (authButtons && currentUser) {
    authButtons.innerHTML = `
      <span class="user-welcome">欢迎，${currentUser.username}</span>
      <button class="btn btn-logout" onclick="logout()">退出</button>
    `;
  }
}

// 用户认证相关功能

// 更新未登录用户的UI
function updateUIForLoggedOutUser() {
  const authButtons = document.querySelector('.auth-buttons');
  if (authButtons) {
    authButtons.innerHTML = `
      <a href="login.html" class="btn btn-login">登录</a>
      <a href="register.html" class="btn btn-register">注册</a>
    `;
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化UI
  updateUIForLoggedOutUser();
  
  // 如果是登录页面，绑定登录表单
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 简单验证表单不为空
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (!username || !password) {
        alert('用户名和密码不能为空');
        return;
      }
      
      // 直接跳转到首页
      alert('登录成功！');
      window.location.href = 'index.html';
    });
  }
  
  // 如果是注册页面，绑定注册表单
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 简单验证表单不为空
      const username = document.getElementById('regUsername').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (!username || !email || !phone || !password) {
        alert('请填写所有必填字段');
        return;
      }
      
      // 确认密码验证
      if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }
      
      // 同意条款验证
      const agreeTerms = document.getElementById('agreeTerms');
      if (!agreeTerms.checked) {
        alert('请同意用户协议和隐私政策');
        return;
      }
      
      // 直接跳转到登录页面
      alert('注册成功！');
      window.location.href = 'login.html';
    });
  }
});

// 获取当前用户
function getCurrentUser() {
  return currentUser;
}

// 检查是否已登录
function isLoggedIn() {
  return currentUser !== null;
}