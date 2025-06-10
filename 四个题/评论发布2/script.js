// 获取DOM元素
const usernameInput = document.getElementById('username');
const locationSelect = document.getElementById('location');
const ratingSelect = document.getElementById('rating');
const commentText = document.getElementById('comment-text');
const submitBtn = document.getElementById('submit-btn');
const commentsContainer = document.getElementById('comments-container');
const commentCount = document.getElementById('comment-count');

// 评论数组
let comments = [];

// 添加评论事件
submitBtn.addEventListener('click', addComment);

// 添加评论函数
function addComment() {
    // 获取输入值
    const username = usernameInput.value.trim();
    const location = locationSelect.value.trim();
    const rating = ratingSelect.value.trim();
    const content = commentText.value.trim();
    
    // 验证输入
    if (!username) {
        alert('请输入昵称');
        return;
    }
    
    if (!location) {
        alert('请选择景点');
        return;
    }
    
    if (!rating) {
        alert('请选择评分');
        return;
    }
    
    if (!content) {
        alert('请输入评论内容');
        return;
    }
    
    // 创建评论对象
    const comment = {
        username: username,
        location: location,
        rating: rating,
        content: content,
        time: getTime()
    };
    
    // 添加到数组
    comments.push(comment);
    
    // 更新显示
    renderComments();
    
    // 清空输入
    usernameInput.value = '';
    locationSelect.value = '';
    ratingSelect.value = '';
    commentText.value = '';
}

// 获取当前时间
function getTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

// 渲染评论列表
function renderComments() {
    // 更新评论数量
    commentCount.textContent = comments.length;
    
    // 如果没有评论，显示提示
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p class="empty-tip">暂无评论</p>';
        return;
    }
    
    // 清空容器
    commentsContainer.innerHTML = '';
    
    // 添加所有评论
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        // 生成星星评分显示
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < comment.rating) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <span>${comment.username}</span>
                <span>${comment.time}</span>
            </div>
            <div>
                <span class="location-tag">${comment.location}</span>
                <span class="rating-display">${stars}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
        `;
        
        commentsContainer.appendChild(commentElement);
    });
}