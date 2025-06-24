// 获取元素
const imgs = document.querySelectorAll('.img-box img');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// 当前显示的图片索引
let currentIndex = 0;

// 切换到指定索引的图片
function showImage(index) {
    // 隐藏所有图片
    imgs.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 显示当前索引的图片
    imgs[index].classList.add('active');
    dots[index].classList.add('active');
}

// 下一张图片
function nextImage() {
    currentIndex++;
    if (currentIndex >= imgs.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

// 上一张图片
function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imgs.length - 1;
    }
    showImage(currentIndex);
}

// 绑定按钮点击事件
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// 绑定指示点点击事件
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});