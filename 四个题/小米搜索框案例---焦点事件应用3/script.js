// 获取元素
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const searchList = document.querySelector('.search-list');
const hotTags = document.querySelectorAll('.hot-tag');

// 模拟搜索数据
const searchData = [
    '小米手机', '小米电视', '小米平板', '小米笔记本',
    '红米手机', '红米耳机', '小米手环', '小米手表'
];

// 显示搜索列表
function showSearchList(keyword) {
    // 如果关键词为空，隐藏列表
    if (!keyword) {
        searchList.style.display = 'none';
        return;
    }
    
    // 过滤匹配的数据
    const filteredData = searchData.filter(item => 
        item.includes(keyword)
    );
    
    // 如果没有匹配结果，隐藏列表
    if (filteredData.length === 0) {
        searchList.style.display = 'none';
        return;
    }
    
    // 清空列表
    searchList.innerHTML = '';
    
    // 添加匹配项到列表
    filteredData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-item';
        div.textContent = item;
        
        // 点击搜索项
        div.addEventListener('click', () => {
            searchInput.value = item;
            searchList.style.display = 'none';
        });
        
        searchList.appendChild(div);
    });
    
    // 显示列表
    searchList.style.display = 'block';
}

// 执行搜索
function doSearch() {
    const keyword = searchInput.value.trim();
    if (keyword) {
        alert('搜索: ' + keyword);
    } else {
        alert('请输入搜索内容');
    }
}

// 输入框输入事件
searchInput.addEventListener('input', function() {
    const keyword = this.value.trim();
    showSearchList(keyword);
});

// 输入框获得焦点事件
searchInput.addEventListener('focus', function() {
    const keyword = this.value.trim();
    if (keyword) {
        showSearchList(keyword);
    }
});

// 输入框失去焦点事件
searchInput.addEventListener('blur', function() {
    // 延迟隐藏，以便可以点击搜索项
    setTimeout(() => {
        searchList.style.display = 'none';
    }, 200);
});

// 搜索按钮点击事件
searchBtn.addEventListener('click', doSearch);

// 热门标签点击事件
hotTags.forEach(tag => {
    tag.addEventListener('click', function() {
        searchInput.value = this.textContent;
        doSearch();
    });
});