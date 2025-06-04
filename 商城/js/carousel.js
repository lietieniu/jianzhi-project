// 轮播图功能实现

// 轮播图状态
let slides = [];
let indicators = [];
let currentIndex = 0;
let autoPlayInterval = null;
let autoPlayDelay = 3000; // 3秒自动切换

// 初始化轮播图
function initCarousel(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  slides = container.querySelectorAll('.slide');
  indicators = container.querySelectorAll('.indicator');
  const prevBtn = container.querySelector('.prev');
  const nextBtn = container.querySelector('.next');
  
  if (slides.length === 0) return;
  
  // 绑定事件
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // 指示器点击事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // 鼠标悬停时暂停自动播放
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  
  // 显示第一张幻灯片
  showSlide(0);
  
  // 开始自动播放
  startAutoPlay();
}

// 显示指定索引的幻灯片
function showSlide(index) {
  // 移除所有活动状态
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // 添加当前活动状态
  slides[index].classList.add('active');
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
  
  currentIndex = index;
}

// 下一张幻灯片
function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

// 上一张幻灯片
function prevSlide() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

// 跳转到指定幻灯片
function goToSlide(index) {
  if (index >= 0 && index < slides.length) {
    showSlide(index);
  }
}

// 开始自动播放
function startAutoPlay() {
  stopAutoPlay(); // 先清除之前的定时器
  autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
}

// 停止自动播放
function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', function() {
  // 初始化首页轮播图
  initCarousel('.carousel-container');
});