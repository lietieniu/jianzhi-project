// 表单验证功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要验证的输入框
    const inputs = document.querySelectorAll('input[required]');
    
    // 为每个输入框添加事件监听
    inputs.forEach(input => {
        // 内容改变时验证
        input.addEventListener('change', function() {
            validateInput(this);
        });
        
        // 失去焦点时验证
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // 输入时验证（实时反馈）
        input.addEventListener('input', function() {
            validateInput(this, true);
        });
    });
    
    // 验证输入框函数
    function validateInput(input, isTyping = false) {
        const id = input.id;
        const value = input.value.trim();
        
        // 正在输入时，某些字段不验证
        if (isTyping && (id === 'phone')) {
            return;
        }
        
        // 根据不同输入框类型进行验证
        switch (id) {
            // 用户名验证
            case 'username':
                if (value === '') {
                    showError(id, '用户名不能为空');
                    return false;
                } else if (value.length < 6) {
                    showError(id, '用户名长度不能少于6位');
                    return false;
                } else {
                    clearError(id);
                    return true;
                }
                
            // 密码验证
            case 'password':
                if (value === '') {
                    showError(id, '密码不能为空');
                    return false;
                } else if (value.length < 6) {
                    showError(id, '密码长度不能少于6位');
                    return false;
                } else {
                    clearError(id);
                    
                    // 如果确认密码已填写，同时验证确认密码
                    const confirmPassword = document.getElementById('confirm-password');
                    if (confirmPassword && confirmPassword.value.trim() !== '') {
                        validateInput(confirmPassword);
                    }
                    return true;
                }
                
            // 确认密码验证
            case 'confirm-password':
                const password = document.getElementById('password').value;
                if (value === '') {
                    showError(id, '确认密码不能为空');
                    return false;
                } else if (value !== password) {
                    showError(id, '两次输入的密码不一致');
                    return false;
                } else {
                    clearError(id);
                    return true;
                }
                
            // 出生日期验证
            case 'birthdate':
                if (value === '') {
                    showError(id, '出生日期不能为空');
                    return false;
                } else {
                    // 检查是否为有效日期
                    const birthDate = new Date(value);
                    const today = new Date();
                    if (isNaN(birthDate.getTime())) {
                        showError(id, '请输入有效的日期');
                        return false;
                    } else if (birthDate > today) {
                        showError(id, '出生日期不能晚于今天');
                        return false;
                    } else {
                        clearError(id);
                        return true;
                    }
                }
                
            // 手机号验证
            case 'phone':
                if (value === '') {
                    showError(id, '手机号不能为空');
                    return false;
                } else if (value.length !== 11) {
                    showError(id, '手机号码必须为11位');
                    return false;
                } else {
                    clearError(id);
                    return true;
                }
                
            // 服务条款验证
            case 'terms':
                if (!input.checked) {
                    showError(id, '请阅读并同意服务条款');
                    return false;
                } else {
                    clearError(id);
                    return true;
                }
                
            // 性别验证
            case 'male':
            case 'female':
                const maleChecked = document.getElementById('male').checked;
                const femaleChecked = document.getElementById('female').checked;
                if (!maleChecked && !femaleChecked) {
                    showError('gender', '请选择性别');
                    return false;
                } else {
                    clearError('gender');
                    return true;
                }
                
            // 默认验证
            default:
                if (value === '') {
                    showError(id, '此字段不能为空');
                    return false;
                } else {
                    clearError(id);
                    return true;
                }
        }
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
            inputElement.classList.add('valid'); // 添加验证成功的样式
        }
    }
    
    // 密码强度检测
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // 检查密码长度
            if (password.length >= 6) strength += 1;
            if (password.length >= 10) strength += 1;
            
            // 检查是否包含数字
            if (/\d/.test(password)) strength += 1;
            
            // 检查是否包含小写字母
            if (/[a-z]/.test(password)) strength += 1;
            
            // 检查是否包含大写字母
            if (/[A-Z]/.test(password)) strength += 1;
            
            // 检查是否包含特殊字符
            if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
            
            // 根据强度显示不同的提示
            const errorElement = document.getElementById('password-error');
            if (errorElement) {
                if (password.length < 6) {
                    errorElement.textContent = '密码长度不能少于6位';
                    errorElement.style.color = '#e53935';
                } else {
                    switch (strength) {
                        case 1:
                        case 2:
                            errorElement.textContent = '密码强度：弱';
                            errorElement.style.color = '#e53935';
                            break;
                        case 3:
                        case 4:
                            errorElement.textContent = '密码强度：中';
                            errorElement.style.color = '#ff9800';
                            break;
                        case 5:
                        case 6:
                            errorElement.textContent = '密码强度：强';
                            errorElement.style.color = '#4caf50';
                            break;
                    }
                }
            }
        });
    }
    
    // 导出验证函数供其他脚本使用
    window.validateInput = validateInput;
});