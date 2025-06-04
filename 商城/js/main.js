// 商城首页主要功能

// 购物车数据
let cartItems = [];

// 初始化购物车
function initCart() {
  // 从本地存储加载购物车数据
  const cartData = localStorage.getItem('mall_cart');
  if (cartData) {
    cartItems = JSON.parse(cartData);
  }
  
  renderCartCount();
  bindCartEvents();
}

// 保存购物车数据到本地存储
function saveCart() {
  localStorage.setItem('mall_cart', JSON.stringify(cartItems));
}

// 添加商品到购物车
function addToCart(product) {
  // 检查商品是否已在购物车中
  const existingItem = cartItems.find(item => item.id === product.id);
  
  if (existingItem) {
    // 如果已存在，增加数量
    existingItem.quantity += 1;
  } else {
    // 如果不存在，添加新商品
    cartItems.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart();
  renderCartCount();
  
  // 显示添加成功提示
  showNotification(`${product.name} 已添加到购物车`);
}

// 从购物车移除商品
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCart();
  renderCartCount();
}

// 更新购物车中商品数量
function updateQuantity(productId, quantity) {
  const item = cartItems.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
  renderCartCount();
}

// 清空购物车
function clearCart() {
  cartItems = [];
  saveCart();
  renderCartCount();
}

// 获取购物车中的商品总数
function getItemCount() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// 获取购物车中的商品总价
function getTotalPrice() {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 更新购物车图标上的数量显示
function renderCartCount() {
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    const count = getItemCount();
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? 'block' : 'none';
  }
}

// 显示通知
function showNotification(message) {
  // 检查是否已存在通知元素
  let notification = document.querySelector('.cart-notification');
  
  // 如果不存在，创建一个
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'cart-notification';
    document.body.appendChild(notification);
  }
  
  // 设置消息并显示
  notification.textContent = message;
  notification.classList.add('show');
  
  // 3秒后隐藏
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// 绑定购物车事件
function bindCartEvents() {
  // 为所有加入购物车按钮添加点击事件
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-cart')) {
      const productCard = e.target.closest('.product-card');
      if (productCard) {
        const productName = productCard.querySelector('h3').textContent;
        const priceText = productCard.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('¥', ''));
        const imgSrc = productCard.querySelector('img').src;
        
        const product = {
          id: Date.now().toString(), // 简单生成ID
          name: productName,
          price: price,
          image: imgSrc
        };
        
        addToCart(product);
      }
    }
  });
}

// 商品数据
const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 8999,
    originalPrice: 9999,
    image: 'img/product1.jpg',
    category: 'phone',
    brand: 'apple',
    description: '最新款iPhone，搭载A17芯片'
  },
  {
    id: '2',
    name: '华为Mate 60',
    price: 6999,
    originalPrice: 7999,
    image: 'img/product2.jpg',
    category: 'phone',
    brand: 'huawei',
    description: '麒麟芯片，强大的拍照能力'
  },
  {
    id: '3',
    name: '小米14 Ultra',
    price: 5999,
    originalPrice: 6999,
    image: 'img/product3.jpg',
    category: 'phone',
    brand: 'xiaomi',
    description: '徕卡镜头，专业摄影体验'
  },
  {
    id: '4',
    name: '三星Galaxy S24',
    price: 7999,
    originalPrice: 8999,
    image: 'img/product4.jpg',
    category: 'phone',
    brand: 'samsung',
    description: '高刷新率屏幕，极致视觉体验'
  }
];

// 根据分类获取商品
function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}

// 根据品牌获取商品
function getProductsByBrand(brand) {
  return products.filter(product => product.brand === brand);
}

// 搜索商品
function searchProducts(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerKeyword) || 
    product.description.toLowerCase().includes(lowerKeyword)
  );
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 添加购物车图标到导航栏
  const authButtons = document.querySelector('.auth-buttons');
  if (authButtons) {
    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = `
      <a href="#" class="cart-link">
        <i class="cart-icon-img">🛒</i>
        <span id="cartCount" class="cart-count">0</span>
      </a>
    `;
    authButtons.insertBefore(cartIcon, authButtons.firstChild);
  }
  
  // 为品牌专区添加点击事件
  const brandItems = document.querySelectorAll('.brand-item');
  brandItems.forEach(item => {
    item.addEventListener('click', function() {
      const brandName = this.querySelector('h3').textContent.split('专区')[0].toLowerCase();
      alert(`即将前往${brandName}品牌专区`);
      // 实际项目中应该跳转到对应的品牌页面
    });
  });
  
  // 为加入购物车按钮添加点击事件（仅显示提示，不执行实际操作）
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-cart')) {
      const productCard = e.target.closest('.product-card');
      if (productCard) {
        const productName = productCard.querySelector('h3').textContent;
        alert(`${productName} 已添加到购物车`);
      }
    }
  });
});