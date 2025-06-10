// 获取所有电梯按钮和区域
const links = document.querySelectorAll('.elevator a');
const sections = document.querySelectorAll('.section');

// 点击事件处理
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 移除所有active类
        links.forEach(item => item.classList.remove('active'));
        
        // 添加active类到当前点击的按钮
        this.classList.add('active');
        
        // 滚动到目标位置
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 滚动事件处理
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    
    // 检查每个区域的位置
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // 如果当前滚动位置在该区域内
        if (scrollTop >= sectionTop - 200 && scrollTop < sectionBottom - 200) {
            // 更新电梯按钮状态
            links.forEach(link => link.classList.remove('active'));
            links[index].classList.add('active');
        }
    });
});