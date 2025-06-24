// 获取所有导航按钮和区域
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

// 点击导航按钮事件
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 移除所有按钮的active类
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // 给当前点击的按钮添加active类
        this.classList.add('active');
        
        // 平滑滚动到目标区域
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 监听滚动事件
window.addEventListener('scroll', function() {
    const currentPos = window.scrollY;
    
    // 检查当前滚动位置所在的区域
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (currentPos >= sectionTop - sectionHeight / 3) {
            // 更新导航按钮状态
            navItems.forEach(item => item.classList.remove('active'));
            navItems[index].classList.add('active');
        }
    });
});