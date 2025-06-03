/**
 * 网站主要交互功能脚本
 * 包含：主轮播图、学院要闻小轮播图、快速入口图标悬停效果
 */
document.addEventListener('DOMContentLoaded', function() {
    // ===== 主轮播图功能 =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    const slideCount = slides.length;

    // 设置自动轮播间隔为7秒
    const autoPlayInterval = 7000;
    let autoPlayTimer;

    /**
     * 显示指定索引的幻灯片
     * @param {number} index - 要显示的幻灯片索引
     */
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

    // 轮播控制函数
    const sliderControls = {
        next: () => showSlide(currentSlide + 1),
        prev: () => showSlide(currentSlide - 1),
        startAutoPlay: () => {
            autoPlayTimer = setInterval(sliderControls.next, autoPlayInterval);
        },
        stopAutoPlay: () => {
            clearInterval(autoPlayTimer);
        }
    };

    // 绑定按钮点击事件
    prevButton.addEventListener('click', () => {
        sliderControls.prev();
        sliderControls.stopAutoPlay();
        sliderControls.startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        sliderControls.next();
        sliderControls.stopAutoPlay();
        sliderControls.startAutoPlay();
    });

    // 绑定指示点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            sliderControls.stopAutoPlay();
            sliderControls.startAutoPlay();
        });
    });

    // 鼠标悬停时停止自动播放
    document.querySelector('.slider-container').addEventListener('mouseenter', sliderControls.stopAutoPlay);
    document.querySelector('.slider-container').addEventListener('mouseleave', sliderControls.startAutoPlay);

    // 启动自动播放
    sliderControls.startAutoPlay();
    
    // ===== 学院要闻小轮播图脚本 =====
    const newsSlides = document.querySelectorAll('.news-slide');
    const newsDots = document.querySelectorAll('.news-dot');
    let currentNewsSlide = 0;
    const newsSlideCount = newsSlides.length;

    // 设置自动轮播间隔为5秒
    const newsAutoPlayInterval = 5000;
    let newsAutoPlayTimer;

    /**
     * 显示指定索引的新闻幻灯片
     * @param {number} index - 要显示的新闻幻灯片索引
     */
    function showNewsSlide(index) {
        // 确保索引在有效范围内
        if (index >= newsSlideCount) index = 0;
        if (index < 0) index = newsSlideCount - 1;

        // 移除所有活动状态
        newsSlides.forEach(slide => slide.classList.remove('active'));
        newsDots.forEach(dot => dot.classList.remove('active'));

        // 添加新的活动状态
        newsSlides[index].classList.add('active');
        newsDots[index].classList.add('active');

        currentNewsSlide = index;
    }

    // 新闻轮播控制函数
    const newsControls = {
        next: () => showNewsSlide(currentNewsSlide + 1),
        startAutoPlay: () => {
            newsAutoPlayTimer = setInterval(newsControls.next, newsAutoPlayInterval);
        },
        stopAutoPlay: () => {
            clearInterval(newsAutoPlayTimer);
        }
    };

    // 绑定指示点点击事件
    newsDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showNewsSlide(index);
            newsControls.stopAutoPlay();
            newsControls.startAutoPlay();
        });
    });

    // 鼠标悬停时停止自动播放
    document.querySelector('.news-slider-container').addEventListener('mouseenter', newsControls.stopAutoPlay);
    document.querySelector('.news-slider-container').addEventListener('mouseleave', newsControls.startAutoPlay);

    // 启动自动播放
    newsControls.startAutoPlay();
    
    // ===== 快速入口图标悬停效果 =====
    const quickLinks = document.querySelectorAll('.quick-link');
    
    /**
     * 为快速入口链接添加图标切换效果
     * 当鼠标悬停时，切换为高亮图标
     * 当鼠标离开时，恢复为普通图标
     */
    quickLinks.forEach(link => {
        const icon = link.querySelector('img');
        const normalSrc = icon.src;
        const hoverSrc = normalSrc.replace('.png', '-hover.png');
        
        // 鼠标进入时切换为高亮图标
        link.addEventListener('mouseenter', () => {
            icon.src = hoverSrc;
        });
        
        // 鼠标离开时恢复普通图标
        link.addEventListener('mouseleave', () => {
            icon.src = normalSrc;
        });
    });
});