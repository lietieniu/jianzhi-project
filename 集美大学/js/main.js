document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    const slideCount = slides.length;

    // 设置自动轮播间隔为7秒（7000毫秒）
    const autoPlayInterval = 7000;
    let autoPlayTimer;

    // 显示指定索引的幻灯片
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;

        // 移除所有活动状态
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 添加新的活动状态
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    // 下一张幻灯片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // 上一张幻灯片
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 设置自动播放
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // 绑定按钮点击事件
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // 绑定指示点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // 鼠标悬停时停止自动播放
    document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.slider-container').addEventListener('mouseleave', startAutoPlay);

    // 启动自动播放
    startAutoPlay();
});