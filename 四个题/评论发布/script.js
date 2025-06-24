// 评论发布系统JavaScript逻辑
let comments = [];
let commentId = 1;

// 获取DOM元素
const commentForm = document.getElementById('commentForm');
const usernameInput = document.getElementById('username');
const contentInput = document.getElementById('content');
const submitBtn = document.getElementById('submitBtn');
const commentsList = document.getElementById('commentsList');
const commentCount = document.getElementById('commentCount');

// 表单提交事件
commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    publishComment();
});

// 发布评论函数
function publishComment() {
    const username = usernameInput.value.trim();
    const content = contentInput.value.trim();
    
    // 验证输入
    if (!validateInput(username, content)) {
        return;
    }
    
    // 创建评论对象
    const comment = createComment(username, content);
    
    // 添加到评论数组
    comments.unshift(comment);
    
    // 更新显示
    updateCommentsDisplay();
    
    // 清空表单
    clearForm();
    
    // 显示成功提示
    showMessage('评论发布成功！');
}

// 验证输入
function validateInput(username, content) {
    if (username === '') {
        alert('请输入用户名');
        usernameInput.focus();
        return false;
    }
    
    if (content === '') {
        alert('请输入评论内容');
        contentInput.focus();
        return false;
    }
    
    if (content.length > 200) {
        alert('评论内容不能超过200字');
        contentInput.focus();
        return false;
    }
    
    return true;
}

// 创建评论对象
function createComment(username, content) {
    return {
        id: commentId++,
        username: username,
        content: content,
        time: getCurrentTime()
    };
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    return now.getFullYear() + '-' + 
           String(now.getMonth() + 1).padStart(2, '0') + '-' + 
           String(now.getDate()).padStart(2, '0') + ' ' + 
           String(now.getHours()).padStart(2, '0') + ':' + 
           String(now.getMinutes()).padStart(2, '0');
}

// 更新评论显示
function updateCommentsDisplay() {
    if (comments.length === 0) {
        showEmptyMessage();
    } else {
        renderComments();
    }
    
    updateCommentCount();
}

// 显示空消息
function showEmptyMessage() {
    commentsList.innerHTML = '<div class="empty-message">暂无评论，快来发表第一条评论吧！</div>';
}

// 渲染评论列表
function renderComments() {
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });
}

// 创建评论元素
function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    commentDiv.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.username}</span>
            <div>
                <span class="comment-time">${comment.time}</span>
                <button class="delete-btn" onclick="deleteComment(${comment.id})">删除</button>
            </div>
        </div>
        <div class="comment-content">${comment.content}</div>
    `;
    
    return commentDiv;
}

// 删除评论
function deleteComment(id) {
    if (confirm('确定要删除这条评论吗？')) {
        comments = comments.filter(comment => comment.id !== id);
        updateCommentsDisplay();
        showMessage('评论删除成功！');
    }
}

// 更新评论数量
function updateCommentCount() {
    commentCount.textContent = comments.length;
}

// 清空表单
function clearForm() {
    usernameInput.value = '';
    contentInput.value = '';
}

// 显示消息提示
function showMessage(message) {
    alert(message);
}

// 输入框字符计数
contentInput.addEventListener('input', function() {
    const length = this.value.length;
    if (length > 200) {
        this.style.borderColor = '#dc3545';
    } else {
        this.style.borderColor = '#ccc';
    }
});