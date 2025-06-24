// 小米搜索框JavaScript逻辑
const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

// 模拟搜索建议数据
const searchData = [
    '小米14', '小米14 Pro', '小米13', '小米13 Pro',
    '红米Note12', '红米Note12 Pro', '红米K60',
    '小米平板6', '小米平板5', '小米笔记本',
    '小米手环8', '小米手环7', '小米手表',
    '小米电视', '小米音箱', '小米路由器',
    '小米充电宝', '小米耳机', '小米摄像头'
];

// 搜索输入事件处理
searchInput.addEventListener('input', function() {
    const inputValue = this.value.trim();
    
    if (inputValue === '') {
        hideSuggestions();
        return;
    }
    
    const filteredData = filterSearchData(inputValue);
    showSuggestions(filteredData);
});

// 焦点事件处理
searchInput.addEventListener('focus', function() {
    const inputValue = this.value.trim();
    if (inputValue !== '') {
        const filteredData = filterSearchData(inputValue);
        showSuggestions(filteredData);
    }
});

// 失去焦点事件处理
searchInput.addEventListener('blur', function() {
    // 延迟隐藏，允许点击建议项
    setTimeout(hideSuggestions, 200);
});

// 过滤搜索数据
function filterSearchData(keyword) {
    return searchData.filter(item => 
        item.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 8); // 最多显示8个建议
}

// 显示搜索建议
function showSuggestions(data) {
    if (data.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestions.innerHTML = '';
    
    data.forEach(item => {
        const suggestionItem = createSuggestionItem(item);
        suggestions.appendChild(suggestionItem);
    });
    
    suggestions.style.display = 'block';
}

// 创建建议项元素
function createSuggestionItem(text) {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.textContent = text;
    
    // 点击建议项事件
    item.addEventListener('click', function() {
        searchInput.value = text;
        hideSuggestions();
        performSearch();
    });
    
    return item;
}

// 隐藏搜索建议
function hideSuggestions() {
    suggestions.style.display = 'none';
}

// 执行搜索
function performSearch() {
    const keyword = searchInput.value.trim();
    
    if (keyword === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 模拟搜索结果
    alert(`正在搜索: ${keyword}`);
    hideSuggestions();
}

// 填充搜索框（热门搜索标签点击）
function fillSearch(keyword) {
    searchInput.value = keyword;
    searchInput.focus();
    const filteredData = filterSearchData(keyword);
    showSuggestions(filteredData);
}

// 键盘事件处理
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    } else if (event.key === 'Escape') {
        hideSuggestions();
    }
});

// 点击页面其他地方隐藏建议
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-container')) {
        hideSuggestions();
    }
});