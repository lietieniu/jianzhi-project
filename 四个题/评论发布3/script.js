// DOM元素
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const postBtn = document.getElementById('post-btn');
const commentsList = document.getElementById('comments-list');
const commentCount = document.getElementById('comment-count');

// 存储留言的数组
let messages = [];

// 初始化
function init() {
    // 绑定发表按钮点击事件
    postBtn.addEventListener('click', postMessage);
    
    // 更新留言列表显示
    updateCommentsList();
}

// 发表留言
function postMessage() {
    // 获取输入内容
    const name = nameInput.value.trim();
    const content = messageInput.value.trim();
    
    // 检查输入
    if (!name) {
        alert('请输入您的昵称');
        nameInput.focus();
        return;
    }
    
    if (!content) {
        alert('请输入留言内容');
        messageInput.focus();
        return;
    }
    
    // 创建新留言对象
    const newMessage = {
        id: Date.now(),  // 使用时间戳作为ID
        name: name,
        content: content,
        time: formatDate(new Date())
    };
    
    // 添加到留言数组
    messages.unshift(newMessage);  // 添加到数组开头，最新的显示在前面
    
    // 清空输入框
    nameInput.value = '';
    messageInput.value = '';
    
    // 更新留言列表
    updateCommentsList();
}

// 更新留言列表显示
function updateCommentsList() {
    // 更新留言数量
    commentCount.textContent = `${messages.length}条留言`;
    
    // 如果没有留言，显示提示
    if (messages.length === 0) {
        commentsList.innerHTML = '<div class="no-comments">暂无留言，快来发表第一条吧！</div>';
        return;
    }
    
    // 生成留言HTML
    let html = '';
    messages.forEach(msg => {
        html += `
            <div class="comment-item">
                <div class="comment-user">${msg.name}</div>
                <div class="comment-time">${msg.time}</div>
                <div class="comment-text">${msg.content}</div>
            </div>
        `;
    });
    
    // 更新DOM
    commentsList.innerHTML = html;
}

// 格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 页面加载完成后初始化
init();