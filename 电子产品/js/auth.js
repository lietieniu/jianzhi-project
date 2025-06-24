// 用户认证功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 登录表单处理
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单默认提交行为
            
            // 获取表单数据
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked;
            
            // 验证用户名
            if (username.trim() === '') {
                showError('username', '用户名不能为空');
                return;
            } else if (username.length < 6) {
                showError('username', '用户名长度不能少于6位');
                return;
            } else {
                clearError('username');
            }
            
            // 验证密码
            if (password.trim() === '') {
                showError('password', '密码不能为空');
                return;
            } else if (password.length < 6) {
                showError('password', '密码长度不能少于6位');
                return;
            } else {
                clearError('password');
            }
            
            // 模拟登录请求
            simulateLogin(username, password, remember);
        });
    }
    
    // 注册表单处理
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // 为每个输入框添加 onchange 事件监听
        const inputs = registerForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                if (window.validateInput) {
                    window.validateInput(this);
                }
            });
        });
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单默认提交行为
            
            // 获取表单数据
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const birthdate = document.getElementById('birthdate').value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
            const phone = document.getElementById('phone').value;
            const terms = document.getElementById('terms').checked;
            
            // 验证用户名
            if (username.trim() === '') {
                showError('username', '用户名不能为空');
                return;
            } else if (username.length < 6) {
                showError('username', '用户名长度不能少于6位');
                return;
            } else {
                clearError('username');
            }
            
            // 验证密码
            if (password.trim() === '') {
                showError('password', '密码不能为空');
                return;
            } else if (password.length < 6) {
                showError('password', '密码长度不能少于6位');
                return;
            } else {
                clearError('password');
            }
            
            // 验证确认密码
            if (confirmPassword !== password) {
                showError('confirm-password', '两次输入的密码不一致');
                return;
            } else {
                clearError('confirm-password');
            }
            
            // 验证出生日期
            if (birthdate === '') {
                showError('birthdate', '出生日期不能为空');
                return;
            } else {
                clearError('birthdate');
            }
            
            // 验证性别
            if (gender === '') {
                showError('gender', '请选择性别');
                return;
            } else {
                clearError('gender');
            }
            
            // 验证手机号
            if (phone.trim() === '') {
                showError('phone', '手机号不能为空');
                return;
            } else if (phone.length !== 11) {
                showError('phone', '手机号码必须为11位');
                return;
            } else {
                clearError('phone');
            }
            
            // 验证服务条款
            if (!terms) {
                showError('terms', '请阅读并同意服务条款');
                return;
            } else {
                clearError('terms');
            }
            
            // 模拟注册请求
            simulateRegister(username, birthdate, gender, phone);
        });
    }
    
    // 显示错误信息
    function showError(field, message) {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        const inputElement = document.getElementById(field);
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    // 清除错误信息
    function clearError(field) {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        const inputElement = document.getElementById(field);
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
    
    // 模拟登录请求
    function simulateLogin(username, password, remember) {
        // 显示加载状态
        const loginBtn = loginForm.querySelector('.auth-btn');
        const originalText = loginBtn.textContent;
        loginBtn.textContent = '登录中...';
        loginBtn.disabled = true;
        
        // 模拟网络请求延迟
        setTimeout(function() {
            // 假设登录成功
            alert(`登录成功！欢迎回来，${username}`);
            
            // 如果选择了记住我，可以设置本地存储
            if (remember) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            
            // 重定向到首页
            window.location.href = 'index.html';
            
            // 恢复按钮状态
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
        }, 1500);
    }
    
    // 模拟注册请求
    function simulateRegister(username, birthdate, gender, phone) {
        // 显示加载状态
        const registerBtn = registerForm.querySelector('.auth-btn');
        const originalText = registerBtn.textContent;
        registerBtn.textContent = '注册中...';
        registerBtn.disabled = true;
        
        // 模拟网络请求延迟
        setTimeout(function() {
            // 假设注册成功
            alert(`注册成功！欢迎加入，${username}`);
            
            // 重定向到登录页面
            window.location.href = 'login.html';
            
            // 恢复按钮状态
            registerBtn.textContent = originalText;
            registerBtn.disabled = false;
        }, 1500);
    }
    
    // 检查是否有记住的用户名
    function checkRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser && loginForm) {
            const usernameInput = document.getElementById('username');
            const rememberCheckbox = document.getElementById('remember');
            
            if (usernameInput) {
                usernameInput.value = rememberedUser;
            }
            
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }
    }
    
    // 页面加载时检查记住的用户名
    checkRememberedUser();
});