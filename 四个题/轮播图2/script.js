// 轮播图2 JavaScript逻辑
let index = 0;
const wrapper = document.querySelector('.slider-wrapper');
const dots = document.querySelectorAll('.dot');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const totalSlides = 4;

// 更新轮播图显示
function updateSlider() {
    wrapper.style.transform = `translateX(-${index * 25}%)`;
    
    dots.forEach(dot => dot.classList.remove('current'));
    dots[index].classList.add('current');
}

// 下一张
function nextSlide() {
    index = (index + 1) % totalSlides;
    updateSlider();
}

// 上一张
function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// 跳转到指定张
function goToSlide(targetIndex) {
    index = targetIndex;
    updateSlider();
}

// 事件绑定
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const targetIndex = parseInt(this.dataset.index);
        goToSlide(targetIndex);
    });
});

// 自动轮播
setInterval(nextSlide, 2500);