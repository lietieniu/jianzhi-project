// 轮播图功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播图元素
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const slidesContainer = document.querySelector('.carousel-slides');
    
    let currentIndex = 0;
    let interval;
    const slideCount = slides.length;
    
    // 初始化轮播图
    function initCarousel() {
        // 设置轮播图容器宽度
        slidesContainer.style.width = `${slideCount * 100}%`;
        
        // 为每个幻灯片设置宽度
        slides.forEach(slide => {
            slide.style.width = `${100 / slideCount}%`;
        });
        
        // 设置初始活动状态
        updateActiveState();
        
        // 启动自动轮播
        startAutoSlide();
    }
    
    // 更新活动状态
    function updateActiveState() {
        // 移除所有活动类
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 添加当前活动类
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
        
        // 更新轮播图位置
        slidesContainer.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
    }
    
    // 切换到下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateActiveState();
    }
    
    // 切换到上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateActiveState();
    }
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        updateActiveState();
    }
    
    // 启动自动轮播
    function startAutoSlide() {
        // 清除之前的定时器
        if (interval) {
            clearInterval(interval);
        }
        
        // 设置新的定时器，每3秒切换一次
        interval = setInterval(nextSlide, 3000);
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        if (interval) {
            clearInterval(interval);
        }
    }
    
    // 事件监听
    prevBtn.addEventListener('click', function() {
        prevSlide();
        // 点击后重新启动自动轮播
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        // 点击后重新启动自动轮播
        startAutoSlide();
    });
    
    // 指示器点击事件
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
            // 点击后重新启动自动轮播
            startAutoSlide();
        });
    });
    
    // 鼠标悬停时暂停自动轮播
    slidesContainer.addEventListener('mouseenter', stopAutoSlide);
    slidesContainer.addEventListener('mouseleave', startAutoSlide);
    
    // 触摸事件支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    slidesContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            // 向左滑动，显示下一张
            nextSlide();
        } else if (difference < -50) {
            // 向右滑动，显示上一张
            prevSlide();
        }
    }
    
    // 初始化轮播图
    initCarousel();
});