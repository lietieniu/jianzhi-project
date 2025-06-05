// 轮播图功能
class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // 绑定事件
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 开始自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        const banner = document.querySelector('.banner');
        banner?.addEventListener('mouseenter', () => this.stopAutoPlay());
        banner?.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide]?.classList.remove('active');
        this.dots[this.currentSlide]?.classList.remove('active');
        
        // 设置新的当前幻灯片
        this.currentSlide = index;
        
        // 添加活动状态
        this.slides[this.currentSlide]?.classList.add('active');
        this.dots[this.currentSlide]?.classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // 先清除现有的定时器
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 每5秒切换一次
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// 搜索功能
function initSearch() {
    const searchBtn = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    searchBtn?.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`搜索功能暂未开放，搜索关键词：${query}`);
        }
    });
    
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// 新闻项目悬停效果
function initNewsHover() {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 快速通道悬停效果
function initQuickLinksHover() {
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    new Slider();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化悬停效果
    initNewsHover();
    initQuickLinksHover();
    
    console.log('汕头职业技术学院网站已加载完成');
});