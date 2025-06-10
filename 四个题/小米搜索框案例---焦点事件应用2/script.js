// 小米搜索框案例2 JavaScript逻辑
const input = document.querySelector('.search-input');
const dropdown = document.querySelector('.dropdown');
const searchBtn = document.querySelector('.search-button');
const quickBtns = document.querySelectorAll('.quick-btn');

// 搜索数据
const products = [
    '小米14 Ultra', '小米14 Pro', '小米14',
    '红米K70', '红米K60 Pro', '红米Note13',
    '小米平板6 Max', '小米平板6', '小米笔记本Pro',
    '小米手环8 Pro', '小米手环8', '小米手表S3',
    '小米电视A65', '小米音箱Pro', '小米路由器AX6000'
];

let selectedIndex = -1;
let currentResults = [];

// 搜索匹配
function searchProducts(keyword) {
    if (!keyword) return [];
    return products.filter(item => 
        item.toLowerCase().includes(keyword.toLowerCase())
    );
}

// 显示下拉列表
function showDropdown(results) {
    if (results.length === 0) {
        hideDropdown();
        return;
    }
    
    dropdown.innerHTML = '';
    currentResults = results;
    selectedIndex = -1;
    
    results.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.textContent = item;
        div.addEventListener('click', () => selectItem(item));
        dropdown.appendChild(div);
    });
    
    dropdown.style.display = 'block';
}

// 隐藏下拉列表
function hideDropdown() {
    dropdown.style.display = 'none';
    selectedIndex = -1;
}

// 选择项目
function selectItem(item) {
    input.value = item;
    hideDropdown();
}

// 执行搜索
function performSearch() {
    const keyword = input.value.trim();
    if (keyword) {
        alert(`搜索: ${keyword}`);
        hideDropdown();
    }
}

// 更新选中状态
function updateSelection() {
    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

// 输入事件
input.addEventListener('input', function() {
    const results = searchProducts(this.value);
    showDropdown(results);
});

// 键盘事件
input.addEventListener('keydown', function(e) {
    const items = dropdown.querySelectorAll('.dropdown-item');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
            selectItem(items[selectedIndex].textContent);
        } else {
            performSearch();
        }
    } else if (e.key === 'Escape') {
        hideDropdown();
    }
});

// 失去焦点隐藏
input.addEventListener('blur', function() {
    setTimeout(hideDropdown, 150);
});

// 搜索按钮
searchBtn.addEventListener('click', performSearch);

// 快速搜索按钮
quickBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        input.value = this.textContent;
        performSearch();
    });
});