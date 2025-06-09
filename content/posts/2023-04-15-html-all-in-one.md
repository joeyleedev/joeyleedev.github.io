---
title: HTML5 全面指南
date: 2023-04-15
desc: 详细的HTML5技术参考文档，涵盖核心特性和API，包括语义化标签、表单增强、多媒体支持、Canvas/SVG图形、Web存储等现代Web开发技术。
---

# HTML5 全面指南

## 基础结构

### 文档类型声明
```html
<!DOCTYPE html>
```

### 基本文档结构

```html
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文档标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 常用元信息
```html
<!-- 设置字符编码 -->
<meta charset="UTF-8">

<!-- 响应式视口设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 页面描述 -->
<meta name="description" content="页面描述内容">

<!-- 引入CSS -->
<link rel="stylesheet" href="styles.css">

<!-- 引入favicon -->
<link rel="icon" href="favicon.ico">
```

---

## 语义化标签

### 页面结构标签
```html
<header>
    <h1>网站标题</h1>
    <nav>
        <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">关于</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>文章标题</h2>
        <p>文章内容...</p>
    </article>
    
    <aside>
        <h3>相关链接</h3>
        <ul>
            <li><a href="#">链接1</a></li>
        </ul>
    </aside>
</main>

<footer>
    <p>&copy; 2023 公司名称</p>
</footer>
```

### 文本级语义标签
```html
<p>这是一段包含<mark>高亮</mark>的文本。</p>

<figure>
    <img src="image.jpg" alt="示例图片">
    <figcaption>图片说明文字</figcaption>
</figure>

<time datetime="2023-10-01">2023年10月1日</time>
```

---

## 表单增强

### 新的输入类型
```html
<input type="email" placeholder="请输入邮箱">
<input type="url" placeholder="请输入网址">
<input type="number" min="1" max="10" step="1">
<input type="range" min="0" max="100" value="50">
<input type="date">
<input type="color" value="#ff0000">
<input type="search" placeholder="搜索...">
```

### 表单属性
```html
<input type="text" required placeholder="必填字段">
<input type="password" autocomplete="current-password">
<input type="text" pattern="[A-Za-z]{3}" title="三个字母">
<input type="text" autofocus>
```

### 新表单元素
```html
<!-- datalist输入建议列表 -->
<label for="browser">选择浏览器：</label> 
<input list="browsers" id="browser" name="browser">  <!-- 绑定datalist -->
<datalist id="browsers">  <!-- 预定义选项列表 -->
    <option value="Chrome">  <!-- 浏览器建议选项 -->
    <option value="Firefox">
    <option value="Safari">
</datalist>

<!-- 进度条控件 -->
<progress value="70" max="100">70%</progress>  <!-- 显示任务进度（不可交互） -->

<!-- 度量器控件 --> 
<meter value="0.6">60%</meter>  <!-- 显示标量测量值（如容量/评分） -->
```

---

## 多媒体支持

### 音频
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频元素。
</audio>
```

### 视频
```html
<video width="320" height="240" controls poster="poster.jpg">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持视频标签。
</video>
```

### 字幕
```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
</video>
```

---

## 图形与动画

### Canvas基础
```html
<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // 绘制矩形
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 50, 50);
    
    // 绘制文本
    ctx.font = '20px Arial';
    ctx.fillText('Hello Canvas', 10, 80);
</script>
```

### SVG示例
```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

---

## 存储相关

### Web Storage
```javascript
// localStorage
localStorage.setItem('username', 'John');
const user = localStorage.getItem('username');
localStorage.removeItem('username');

// sessionStorage
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');
```

### IndexedDB基础
```javascript
// 打开数据库
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const store = db.createObjectStore('users', { keyPath: 'id' });
    store.createIndex('name', 'name', { unique: false });
};

request.onsuccess = (event) => {
    const db = event.target.result;
    // 数据库操作...
};
```

---

## 性能与集成API

### Web Workers
```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage('Hello Worker');
worker.onmessage = (e) => {
    console.log('Message from worker:', e.data);
};

// worker.js
onmessage = (e) => {
    console.log('Message from main:', e.data);
    postMessage('Hello Main');
};
```

### Geolocation
```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
    },
    (error) => {
        console.error('Error getting location:', error);
    }
);
```

### History API

History API 是浏览器提供的用于操作浏览器会话历史的 JavaScript API

```javascript
// 添加历史记录
history.pushState({ page: 1 }, 'Page 1', '/page1');

// 监听popstate事件
window.onpopstate = (event) => {
    console.log('Location changed to:', document.location.href);
};
```

---

## 其他重要特性

### 响应式设计
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 微数据

微数据（Microdata）是HTML5中的一种语义化标记规范，用于在网页中嵌入机器可读的结构化数据。

```html
<div itemscope itemtype="http://schema.org/Person">
    <span itemprop="name">张三</span>
    <span itemprop="jobTitle">Web开发者</span>
</div>
```

### ARIA无障碍
```html
<button aria-label="关闭" onclick="closeDialog()">X</button>
<div role="alert">重要通知内容</div>
```

