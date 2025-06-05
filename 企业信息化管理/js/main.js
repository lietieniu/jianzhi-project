// 企业信息化管理专业网站主要JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    initNavigation();
    initVideoPlayers();
    initAnimations();
});

// 导航功能初始化
function initNavigation() {
    // 获取当前页面路径
    const currentPage = window.location.pathname.split('/').pop();
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // 为每个导航链接设置活动状态
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 添加平滑滚动效果（针对页面内锚点）
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 视频播放器功能初始化
function initVideoPlayers() {
    // 主视频播放器
    const mainVideoPlaceholder = document.querySelector('.video-placeholder');
    if (mainVideoPlaceholder) {
        mainVideoPlaceholder.addEventListener('click', function() {
            // 这里可以添加实际的视频播放逻辑
            alert('视频播放功能\n\n在实际项目中，这里会播放专业介绍视频。\n您可以将视频文件放在videos文件夹中，\n然后使用HTML5的video标签来播放。');
        });
    }
    
    // 视频列表项点击事件
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            // 这里可以添加实际的视频播放逻辑
            alert(`播放视频: ${title}\n\n在实际项目中，这里会播放对应的视频内容。`);
        });
    });
}

// 页面动画效果初始化
function initAnimations() {
    // 添加滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 创建交叉观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.goal-item, .feature-card, .video-item, .facility-item');
    animatedElements.forEach(element => {
        // 设置初始状态
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // 添加到观察器
        observer.observe(element);
    });
}

// 统计数字动画效果
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number, .number');
    
    numberElements.forEach(element => {
        const finalNumber = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        if (finalNumber) {
            let currentNumber = 0;
            const increment = finalNumber / 50; // 50步完成动画
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }
                
                // 保持原有的格式（如百分号、加号等）
                const originalText = element.textContent;
                const numberPart = Math.floor(currentNumber);
                const newText = originalText.replace(/[0-9]+/, numberPart);
                element.textContent = newText;
            }, 50);
        }
    });
}

// 页面滚动时的导航栏效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.backgroundColor = '#2c3e50';
    }
});

// 移动端菜单切换（如果需要的话）
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// 表单验证功能（如果页面中有表单的话）
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 页面性能优化：图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面发生错误:', e.error);
    // 在实际项目中，这里可以发送错误信息到服务器
});

// 页面离开前的清理工作
window.addEventListener('beforeunload', function() {
    // 清理定时器、事件监听器等
    console.log('页面即将离开，执行清理工作');
});