// 小兔生鲜电梯导航JavaScript逻辑
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const backToTopBtn = document.getElementById('backToTop');
const elevatorNav = document.getElementById('elevatorNav');

// 导航点击事件
navItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('data-target');
        scrollToSection(targetId);
        updateActiveNav(this);
    });
});

// 滚动到指定区域
function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100; // 考虑固定头部高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 更新导航激活状态
function updateActiveNav(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

// 滚动事件监听
window.addEventListener('scroll', function() {
    handleScrollEvents();
});

// 处理滚动事件
function handleScrollEvents() {
    updateNavOnScroll();
    toggleBackToTopButton();
    toggleElevatorNav();
}

// 根据滚动位置更新导航
function updateNavOnScroll() {
    const scrollTop = window.pageYOffset;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            navItems.forEach(item => item.classList.remove('active'));
            navItems[index].classList.add('active');
        }
    });
}

// 切换返回顶部按钮显示
function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

// 切换电梯导航显示
function toggleElevatorNav() {
    if (window.pageYOffset > 200) {
        elevatorNav.style.opacity = '1';
        elevatorNav.style.visibility = 'visible';
    } else {
        elevatorNav.style.opacity = '0.7';
    }
}

// 返回顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // 清除所有导航激活状态
    navItems.forEach(item => item.classList.remove('active'));
}

// 页面加载完成后初始化
window.addEventListener('load', function() {
    initializeNavigation();
});

// 初始化导航
function initializeNavigation() {
    // 设置初始状态
    elevatorNav.style.transition = 'all 0.3s ease';
    
    // 如果页面已经滚动，更新状态
    if (window.pageYOffset > 0) {
        handleScrollEvents();
    } else {
        // 默认激活第一个导航项
        navItems[0].classList.add('active');
    }
}

// 键盘事件支持
document.addEventListener('keydown', function(event) {
    handleKeyboardNavigation(event);
});

// 键盘导航处理
function handleKeyboardNavigation(event) {
    const currentActive = document.querySelector('.nav-item.active');
    let targetIndex = -1;
    
    if (currentActive) {
        const currentIndex = Array.from(navItems).indexOf(currentActive);
        
        switch(event.key) {
            case 'ArrowUp':
                targetIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
                break;
            case 'ArrowDown':
                targetIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                scrollToTop();
                return;
        }
        
        if (targetIndex >= 0) {
            event.preventDefault();
            const targetNav = navItems[targetIndex];
            const targetId = targetNav.getAttribute('data-target');
            scrollToSection(targetId);
            updateActiveNav(targetNav);
        }
    }
}