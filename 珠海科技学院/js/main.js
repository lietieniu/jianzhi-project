/**
 * 珠海科技学院学生门户网站 - 主要JavaScript功能
 * 作者：大学生开发团队
 * 功能：图片轮播、时间显示等基础交互
 */

// 图片轮播类 - 负责首页轮播图的自动切换
class Carousel {
    constructor() {
        // 获取所有轮播图片元素
        this.images = document.querySelectorAll('.carousel-img');
        this.currentIndex = 0; // 当前显示的图片索引
        this.intervalTime = 3000; // 切换间隔时间（3秒）
        this.init(); // 初始化轮播
    }

    // 初始化轮播功能
    init() {
        if (this.images.length > 0) {
            this.startAutoPlay(); // 开始自动播放
        }
    }

    // 显示指定索引的图片
    showImage(index) {
        // 隐藏所有图片
        this.images.forEach(img => {
            img.classList.remove('active');
        });
        
        // 显示当前图片
        this.images[index].classList.add('active');
    }

    // 切换到下一张图片
    nextImage() {
        // 计算下一张图片的索引（循环播放）
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    }

    // 开始自动播放
    startAutoPlay() {
        setInterval(() => {
            this.nextImage();
        }, this.intervalTime);
    }
}

// 获取当前日期的工具函数
function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份补零
    const day = String(now.getDate()).padStart(2, '0'); // 日期补零
    return `${year}-${month}-${day}`;
}

// 更新通知时间为当前时间（可选功能）
function updateNoticeTime() {
    const noticeDates = document.querySelectorAll('.notice-date');
    const currentTime = getCurrentTime();
    
    // 为所有通知日期元素设置当前时间
    noticeDates.forEach(dateElement => {
        if (dateElement.textContent.trim() === '') {
            dateElement.textContent = currentTime;
        }
    });
}

// 页面加载完成后执行的初始化函数
function initPage() {
    // 初始化轮播功能
    new Carousel();
    
    // 更新通知时间（可选）
    updateNoticeTime();
    
    // 添加页面加载动画效果
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// 等待页面DOM加载完成后执行初始化
document.addEventListener('DOMContentLoaded', initPage);

// 导航菜单交互增强（可选）
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a');
    
    // 为导航链接添加点击效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 为当前点击的链接添加active类
            this.classList.add('active');
        });
    });
});

// 平滑滚动效果
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}