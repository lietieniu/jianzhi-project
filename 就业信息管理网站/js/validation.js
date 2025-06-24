/**
 * 表单验证功能
 * 用于验证后台管理系统中的各种表单输入
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要验证的表单
    const forms = document.querySelectorAll('.admin-form');
    
    forms.forEach(form => {
        // 为每个表单添加验证
        initFormValidation(form);
    });
});

/**
 * 初始化表单验证
 * @param {HTMLFormElement} form - 要验证的表单元素
 */
function initFormValidation(form) {
    // 获取表单中所有的输入元素
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // 为每个输入元素添加验证事件
    inputs.forEach(input => {
        // 失去焦点时验证
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // 输入时验证（对于文本输入）
        if (input.tagName === 'INPUT' && (input.type === 'text' || input.type === 'password' || input.type === 'email')) {
            input.addEventListener('input', function() {
                validateInput(this);
            });
        }
        
        // 选择改变时验证（对于下拉菜单）
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                validateInput(this);
            });
        }
    });
    
    // 表单提交时验证所有字段
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault(); // 阻止表单提交
        }
    });
}

/**
 * 验证单个输入元素
 * @param {HTMLElement} input - 要验证的输入元素
 * @returns {boolean} 验证是否通过
 */
function validateInput(input) {
    // 获取错误消息容器
    const errorContainer = input.nextElementSibling;
    if (!errorContainer || !errorContainer.classList.contains('error-message')) {
        return true; // 如果没有错误消息容器，则跳过验证
    }
    
    // 重置错误消息
    errorContainer.textContent = '';
    input.classList.remove('invalid');
    
    // 如果输入为空且是必填字段
    if (input.hasAttribute('required') && !input.value.trim()) {
        errorContainer.textContent = '此字段不能为空';
        input.classList.add('invalid');
        return false;
    }
    
    // 验证最小长度
    if (input.hasAttribute('minlength') && input.value.length < parseInt(input.getAttribute('minlength'))) {
        const minLength = input.getAttribute('minlength');
        errorContainer.textContent = `最少需要 ${minLength} 个字符`;
        input.classList.add('invalid');
        return false;
    }
    
    // 验证最大长度
    if (input.hasAttribute('maxlength') && input.value.length > parseInt(input.getAttribute('maxlength'))) {
        const maxLength = input.getAttribute('maxlength');
        errorContainer.textContent = `最多允许 ${maxLength} 个字符`;
        input.classList.add('invalid');
        return false;
    }
    
    // 验证电子邮件格式
    if (input.type === 'email' && input.value) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(input.value)) {
            errorContainer.textContent = '请输入有效的电子邮件地址';
            input.classList.add('invalid');
            return false;
        }
    }
    
    // 验证薪资格式（例如：10k-15k）
    if (input.id === 'job-salary') {
        const salaryPattern = /^\d+[k]?-\d+[k]?$/;
        if (!salaryPattern.test(input.value)) {
            errorContainer.textContent = '请输入正确的薪资范围格式，例如：10k-15k';
            input.classList.add('invalid');
            return false;
        }
    }
    
    return true; // 验证通过
}