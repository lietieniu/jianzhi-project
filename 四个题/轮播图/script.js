// 轮播图JavaScript逻辑
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const controlBtns = document.querySelectorAll('.control-btn');
const totalSlides = slides.length;

// 显示指定索引的幻灯片
function showSlide(index) {
    // 移除所有active类
    slides.forEach(slide => slide.classList.remove('active'));
    controlBtns.forEach(btn => btn.classList.remove('active'));
    
    // 添加active类到当前幻灯片
    slides[index].classList.add('active');
    controlBtns[index].classList.add('active');
}

// 切换到下一张或上一张
function changeSlide(direction) {
    currentSlide += direction;
    
    // 循环处理
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

// 直接跳转到指定幻灯片
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// 自动播放功能
function autoPlay() {
    changeSlide(1);
}

// 启动自动播放，每3秒切换一次
setInterval(autoPlay, 3000);

// 鼠标悬停时暂停自动播放
const container = document.querySelector('.carousel-container');
let autoPlayInterval = setInterval(autoPlay, 3000);

container.addEventListener('mouseenter', function() {
    clearInterval(autoPlayInterval);
});

container.addEventListener('mouseleave', function() {
    autoPlayInterval = setInterval(autoPlay, 3000);
});