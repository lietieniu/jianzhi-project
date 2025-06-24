/**
 * 后台管理系统功能实现
 * 包含：就业信息管理（增删改查、批量操作）、系统日志筛选、标签页切换等功能
 */

// 模拟数据库中的就业信息数据
let jobData = [
    { id: 1, title: "前端开发工程师", company: "腾讯科技", location: "深圳", salary: "15k-25k", date: "2023-06-15", type: "fulltime", industry: "it", description: "负责公司产品的前端开发工作，使用HTML、CSS、JavaScript等技术实现产品界面和交互功能。", requirements: "本科及以上学历，计算机相关专业，熟悉前端开发技术，有1年以上相关工作经验。" },
    { id: 2, title: "Java后端开发工程师", company: "阿里巴巴", location: "杭州", salary: "20k-35k", date: "2023-06-10", type: "fulltime", industry: "it", description: "负责公司核心系统的后端开发，使用Java语言进行服务端开发。", requirements: "本科及以上学历，计算机相关专业，熟悉Java开发，了解Spring框架，有2年以上相关工作经验。" },
    { id: 3, title: "数据分析师", company: "字节跳动", location: "北京", salary: "15k-25k", date: "2023-06-08", type: "fulltime", industry: "it", description: "负责公司数据的收集、分析和可视化，为业务决策提供数据支持。", requirements: "本科及以上学历，统计学或计算机相关专业，熟悉数据分析工具，有相关项目经验。" },
    { id: 4, title: "产品经理", company: "百度", location: "北京", salary: "18k-30k", date: "2023-06-05", type: "fulltime", industry: "it", description: "负责产品的规划、设计和迭代，协调各部门推进产品落地。", requirements: "本科及以上学历，有互联网产品经验，良好的沟通能力和团队协作能力。" },
    { id: 5, title: "人力资源专员", company: "京东", location: "北京", salary: "8k-15k", date: "2023-06-01", type: "fulltime", industry: "service", description: "负责公司的招聘、培训和员工关系管理等人力资源工作。", requirements: "本科及以上学历，人力资源管理相关专业，有相关工作经验优先。" }
];

// 模拟系统日志数据
let logData = [
    { id: 1, time: "2023-06-15 10:30:45", user: "admin", action: "添加就业信息", type: "info", details: "添加了新的就业信息：前端开发工程师 - 腾讯科技" },
    { id: 2, time: "2023-06-15 10:25:12", user: "admin", action: "登录系统", type: "info", details: "管理员登录系统" },
    { id: 3, time: "2023-06-14 16:45:30", user: "admin", action: "修改就业信息", type: "info", details: "修改了就业信息：Java后端开发工程师 - 阿里巴巴" },
    { id: 4, time: "2023-06-14 15:20:18", user: "user1", action: "登录失败", type: "warning", details: "用户名或密码错误" },
    { id: 5, time: "2023-06-13 09:15:22", user: "admin", action: "删除就业信息", type: "warning", details: "删除了就业信息：UI设计师 - 网易" },
    { id: 6, time: "2023-06-12 14:30:45", user: "system", action: "系统错误", type: "error", details: "数据库连接失败，错误代码：500" }
];

// 当前正在编辑的就业信息ID，-1表示新增
let currentEditingJobId = -1;

// DOM加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页切换功能
    initTabSwitching();
    
    // 初始化就业信息管理功能
    initJobManagement();
    
    // 初始化系统日志功能
    initLogManagement();
});

/**
 * 初始化标签页切换功能
 */
function initTabSwitching() {
    const menuItems = document.querySelectorAll('.admin-menu li');
    const tabContents = document.querySelectorAll('.admin-tab');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有菜单项的active类
            menuItems.forEach(i => i.classList.remove('active'));
            // 为当前点击的菜单项添加active类
            this.classList.add('active');
            
            // 获取目标标签页ID
            const targetTabId = this.getAttribute('data-tab');
            
            // 隐藏所有标签页内容
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // 显示目标标签页内容
            document.getElementById(targetTabId).classList.add('active');
        });
    });
}

/**
 * 初始化就业信息管理功能
 */
function initJobManagement() {
    // 渲染就业信息表格
    renderJobTable();
    
    // 添加就业信息按钮点击事件
    document.getElementById('add-job-btn').addEventListener('click', function() {
        showJobForm();
    });
    
    // 取消按钮点击事件
    document.getElementById('cancel-job-form').addEventListener('click', function() {
        hideJobForm();
    });
    
    // 表单提交事件
    document.getElementById('job-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveJobInfo();
    });
    
    // 全选/取消全选
    document.getElementById('select-all').addEventListener('change', function() {
        const isChecked = this.checked;
        document.querySelectorAll('.job-select').forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });
    
    // 批量删除按钮点击事件
    document.getElementById('batch-delete-btn').addEventListener('click', function() {
        batchDeleteJobs();
    });
}

/**
 * 初始化系统日志管理功能
 */
function initLogManagement() {
    // 筛选按钮点击事件
    document.getElementById('filter-log-btn').addEventListener('click', function() {
        filterLogs();
    });
}

/**
 * 渲染就业信息表格
 */
function renderJobTable() {
    const tableBody = document.querySelector('#job-management .admin-table tbody');
    tableBody.innerHTML = '';
    
    jobData.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="job-select" data-id="${job.id}"></td>
            <td>${job.id}</td>
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td>${job.location}</td>
            <td>${job.salary}</td>
            <td>${job.date}</td>
            <td>
                <button class="btn btn-sm btn-edit" data-id="${job.id}">编辑</button>
                <button class="btn btn-sm btn-delete" data-id="${job.id}">删除</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // 为编辑按钮添加点击事件
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.getAttribute('data-id'));
            editJob(jobId);
        });
    });
    
    // 为删除按钮添加点击事件
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobId = parseInt(this.getAttribute('data-id'));
            deleteJob(jobId);
        });
    });
}

/**
 * 显示就业信息表单（新增或编辑）
 */
function showJobForm() {
    // 重置表单
    document.getElementById('job-form').reset();
    currentEditingJobId = -1; // 设置为新增模式
    
    // 显示表单容器
    document.querySelector('.job-form-container').style.display = 'block';
    // 隐藏表格容器
    document.querySelector('.job-table-container').style.display = 'none';
    // 隐藏操作按钮
    document.querySelector('.action-buttons').style.display = 'none';
}

/**
 * 隐藏就业信息表单
 */
function hideJobForm() {
    // 隐藏表单容器
    document.querySelector('.job-form-container').style.display = 'none';
    // 显示表格容器
    document.querySelector('.job-table-container').style.display = 'block';
    // 显示操作按钮
    document.querySelector('.action-buttons').style.display = 'flex';
}

/**
 * 编辑就业信息
 * @param {number} jobId - 要编辑的就业信息ID
 */
function editJob(jobId) {
    // 查找要编辑的就业信息
    const job = jobData.find(item => item.id === jobId);
    if (!job) return;
    
    // 设置当前正在编辑的ID
    currentEditingJobId = jobId;
    
    // 填充表单数据
    document.getElementById('job-title').value = job.title;
    document.getElementById('company-name').value = job.company;
    document.getElementById('job-location').value = job.location;
    document.getElementById('job-salary').value = job.salary;
    document.getElementById('job-type').value = job.type;
    document.getElementById('job-industry').value = job.industry;
    document.getElementById('job-description').value = job.description;
    document.getElementById('job-requirements').value = job.requirements;
    
    // 显示表单
    showJobForm();
}

/**
 * 保存就业信息（新增或更新）
 */
function saveJobInfo() {
    // 获取表单数据
    const jobTitle = document.getElementById('job-title').value;
    const companyName = document.getElementById('company-name').value;
    const jobLocation = document.getElementById('job-location').value;
    const jobSalary = document.getElementById('job-salary').value;
    const jobType = document.getElementById('job-type').value;
    const jobIndustry = document.getElementById('job-industry').value;
    const jobDescription = document.getElementById('job-description').value;
    const jobRequirements = document.getElementById('job-requirements').value;
    
    // 创建就业信息对象
    const jobInfo = {
        title: jobTitle,
        company: companyName,
        location: jobLocation,
        salary: jobSalary,
        type: jobType,
        industry: jobIndustry,
        description: jobDescription,
        requirements: jobRequirements,
        date: new Date().toISOString().split('T')[0] // 当前日期
    };
    
    if (currentEditingJobId === -1) {
        // 新增模式
        const newId = jobData.length > 0 ? Math.max(...jobData.map(job => job.id)) + 1 : 1;
        jobInfo.id = newId;
        jobData.push(jobInfo);
        
        // 添加系统日志
        addLog({
            action: "添加就业信息",
            type: "info",
            details: `添加了新的就业信息：${jobInfo.title} - ${jobInfo.company}`
        });
    } else {
        // 编辑模式
        const index = jobData.findIndex(job => job.id === currentEditingJobId);
        if (index !== -1) {
            jobInfo.id = currentEditingJobId;
            jobData[index] = jobInfo;
            
            // 添加系统日志
            addLog({
                action: "修改就业信息",
                type: "info",
                details: `修改了就业信息：${jobInfo.title} - ${jobInfo.company}`
            });
        }
    }
    
    // 重新渲染表格
    renderJobTable();
    
    // 隐藏表单
    hideJobForm();
    
    // 显示成功提示
    alert(currentEditingJobId === -1 ? "添加成功！" : "更新成功！");
}

/**
 * 删除就业信息
 * @param {number} jobId - 要删除的就业信息ID
 */
function deleteJob(jobId) {
    if (!confirm("确定要删除这条就业信息吗？")) return;
    
    // 查找要删除的就业信息
    const jobIndex = jobData.findIndex(job => job.id === jobId);
    if (jobIndex === -1) return;
    
    const deletedJob = jobData[jobIndex];
    
    // 从数组中删除
    jobData.splice(jobIndex, 1);
    
    // 添加系统日志
    addLog({
        action: "删除就业信息",
        type: "warning",
        details: `删除了就业信息：${deletedJob.title} - ${deletedJob.company}`
    });
    
    // 重新渲染表格
    renderJobTable();
    
    // 显示成功提示
    alert("删除成功！");
}

/**
 * 批量删除就业信息
 */
function batchDeleteJobs() {
    // 获取所有选中的复选框
    const selectedCheckboxes = document.querySelectorAll('.job-select:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert("请至少选择一条记录！");
        return;
    }
    
    if (!confirm(`确定要删除选中的 ${selectedCheckboxes.length} 条记录吗？`)) return;
    
    // 获取所有选中的ID
    const selectedIds = Array.from(selectedCheckboxes).map(checkbox => 
        parseInt(checkbox.getAttribute('data-id'))
    );
    
    // 批量删除
    let deletedCount = 0;
    selectedIds.forEach(id => {
        const jobIndex = jobData.findIndex(job => job.id === id);
        if (jobIndex !== -1) {
            const deletedJob = jobData[jobIndex];
            jobData.splice(jobIndex, 1);
            deletedCount++;
            
            // 添加系统日志
            addLog({
                action: "删除就业信息",
                type: "warning",
                details: `删除了就业信息：${deletedJob.title} - ${deletedJob.company}`
            });
        }
    });
    
    // 重新渲染表格
    renderJobTable();
    
    // 取消全选
    document.getElementById('select-all').checked = false;
    
    // 显示成功提示
    alert(`成功删除 ${deletedCount} 条记录！`);
}

/**
 * 筛选系统日志
 */
function filterLogs() {
    const startDate = document.getElementById('log-date-start').value;
    const endDate = document.getElementById('log-date-end').value;
    const logType = document.getElementById('log-type').value;
    
    // 筛选日志
    let filteredLogs = [...logData];
    
    if (startDate) {
        filteredLogs = filteredLogs.filter(log => {
            const logDate = log.time.split(' ')[0];
            return logDate >= startDate;
        });
    }
    
    if (endDate) {
        filteredLogs = filteredLogs.filter(log => {
            const logDate = log.time.split(' ')[0];
            return logDate <= endDate;
        });
    }
    
    if (logType) {
        filteredLogs = filteredLogs.filter(log => log.type === logType);
    }
    
    // 渲染筛选后的日志表格
    renderLogTable(filteredLogs);
}

/**
 * 渲染系统日志表格
 * @param {Array} logs - 要渲染的日志数据
 */
function renderLogTable(logs = logData) {
    const tableBody = document.querySelector('#log-management .admin-table tbody');
    tableBody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.id}</td>
            <td>${log.time}</td>
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td><span class="log-type ${log.type}">${getLogTypeName(log.type)}</span></td>
            <td>${log.details}</td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * 获取日志类型名称
 * @param {string} type - 日志类型代码
 * @returns {string} 日志类型名称
 */
function getLogTypeName(type) {
    const typeMap = {
        'info': '信息',
        'warning': '警告',
        'error': '错误'
    };
    return typeMap[type] || type;
}

/**
 * 添加系统日志
 * @param {Object} logInfo - 日志信息
 */
function addLog(logInfo) {
    const newLog = {
        id: logData.length > 0 ? Math.max(...logData.map(log => log.id)) + 1 : 1,
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
        user: 'admin', // 假设当前用户是admin
        action: logInfo.action,
        type: logInfo.type,
        details: logInfo.details
    };
    
    logData.unshift(newLog); // 添加到数组开头
    
    // 如果当前在日志管理标签页，则刷新日志表格
    if (document.getElementById('log-management').classList.contains('active')) {
        renderLogTable();
    }
}