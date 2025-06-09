---
title: CSS3 全面指南
date: 2023-05-21
desc: 全面掌握CSS3核心技术，包括选择器、盒模型、Flexbox、Grid布局、动画效果等现代CSS特性的详细讲解和实战示例。
---

# CSS3 全面指南

## 选择器

### 基础选择器
```css
/* 元素选择器 */
p { color: blue; }

/* 类选择器 */
.class-name { font-weight: bold; }

/* ID选择器 */
#element-id { background: #f0f0f0; }

/* 通配符选择器 */
* { margin: 0; padding: 0; }
```

### 属性选择器

```css
/* 存在属性 */
[disabled] { opacity: 0.5; }

/* 精确匹配 */
[type="text"] { border: 1px solid #ccc; }

/* 包含字符串 */
[class*="btn"] { cursor: pointer; }

/* 开头匹配 */
[href^="https"] { color: green; }

/* 结尾匹配 */
[src$=".png"] { border: 1px solid #eee; }
```

### 伪类选择器
```css
/* 链接状态 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { text-decoration: underline; }
a:active { color: red; }

/* 结构伪类 */
li:first-child { font-weight: bold; }
li:nth-child(2n) { background: #f5f5f5; }
li:last-child { border-bottom: none; }

/* 表单伪类 */
input:focus { outline: 2px solid dodgerblue; }
input:checked + label { font-weight: bold; }
input:disabled { background: #eee; }
```

### 伪元素选择器
```css
/* 首字母 */
p::first-letter { font-size: 2em; }

/* 首行 */
p::first-line { font-weight: bold; }

/* 前后内容 */
blockquote::before { content: "“"; }
blockquote::after { content: "”"; }

/* 选中文本 */
::selection { background: yellow; color: black; }
```

---

## 盒模型

### 标准盒模型 vs 替代盒模型
```css
/* 标准盒模型 (默认) */
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  /* 实际宽度 = 300 + 40 + 10 = 350px */
}

/* 替代盒模型 */
.box-alt {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  /* 实际宽度 = 300px (内容自动缩小) */
}
```

### 边框与圆角
```css
/* 基本边框 */
.border {
  border: 2px solid #333;
  border-radius: 10px;
}

/* 单独设置 */
.border-sides {
  border-top: 3px dashed red;
  border-right: 1px dotted blue;
  border-bottom: 2px double green;
  border-left: 4px groove purple;
}

/* 圆角进阶 */
.rounded {
  border-radius: 15px 5px 25px 0;
  /* 椭圆角 */
  border-radius: 50% / 20%;
}
```

### 阴影
```css
/* 盒子阴影 */
.shadow {
  box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  /* 内阴影 */
  box-shadow: inset 0 0 10px #000;
  /* 多重阴影 */
  box-shadow: 
    0 0 5px #fff,
    0 0 10px #f0f,
    0 0 15px #0ff;
}

/* 文字阴影 */
.text-shadow {
  text-shadow: 1px 1px 2px black;
  /* 多重文字阴影 */
  text-shadow: 
    0 0 5px #fff,
    0 0 10px #ff0,
    0 0 20px #f0f;
}
```

---

## Flexbox布局

### 容器属性
```css
.flex-container {
  display: flex;
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */
  justify-content: center; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: stretch; /* flex-start | flex-end | center | baseline | stretch */
  align-content: flex-start; /* flex-start | flex-end | center | space-between | space-around | stretch */
  gap: 10px; /* 项目间距 */
}
```

### 项目属性
```css
.flex-item {
  order: 1; /* 调整项目顺序 */
  flex-grow: 1; /* 放大比例 */
  flex-shrink: 1; /* 缩小比例 */
  flex-basis: 100px; /* 初始大小 */
  /* 简写 */
  flex: 1 1 100px; /* grow shrink basis */
  align-self: center; /* 覆盖容器的align-items */
}
```

### 实际示例
```html
<div class="flex-container">
  <div class="flex-item" style="flex: 1 1 200px;">项目1</div>
  <div class="flex-item" style="flex: 2 1 200px;">项目2</div>
  <div class="flex-item" style="flex: 1 2 200px;">项目3</div>
</div>
```

---

## Grid布局

### 容器属性
```css
.grid-container {
  display: grid;
  grid-template-columns: 100px 1fr 2fr; /* 列定义 */
  grid-template-rows: 100px auto; /* 行定义 */
  grid-template-areas:
    "header header header"
    "sidebar main main";
  gap: 10px; /* 间距 */
  justify-items: stretch; /* start | end | center | stretch */
  align-items: stretch; /* start | end | center | stretch */
}

/* 显式命名区域 */
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
```

### 项目属性
```css
.grid-item {
  grid-column: 1 / 3; /* 跨越列 */
  grid-row: 1; /* 跨越行 */
  /* 简写 */
  grid-area: 1 / 1 / 3 / 3; /* row-start / column-start / row-end / column-end */
  justify-self: center; /* 单个项目水平对齐 */
  align-self: center; /* 单个项目垂直对齐 */
}
```

### 实际示例
```html
<div class="grid-container">
  <div class="header">页眉</div>
  <div class="sidebar">侧边栏</div>
  <div class="main">主要内容</div>
</div>
```

---

## 过渡与动画

### 过渡效果
```css
.transition {
  transition-property: all; /* 指定属性 */
  transition-duration: 0.3s; /* 持续时间 */
  transition-timing-function: ease-in-out; /* 时间函数 */
  transition-delay: 0.1s; /* 延迟 */
  /* 简写 */
  transition: all 0.3s ease-in-out 0.1s;
}

/* 悬停效果 */
.button {
  background: blue;
  transition: background 0.3s;
}
.button:hover {
  background: darkblue;
}
```

### 关键帧动画
```css
@keyframes slide {
  0% { transform: translateX(0); }
  50% { transform: translateX(100px); }
  100% { transform: translateX(0); }
}

.animate {
  animation-name: slide;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
  /* 简写 */
  animation: slide 2s ease-in-out 0s infinite alternate both;
}
```

### 实际示例
```html
<div class="box animate"></div>
```

---

## 变形

### 2D变形
```css
.transform {
  transform: translate(50px, 100px); /* 位移 */
  transform: rotate(45deg); /* 旋转 */
  transform: scale(1.5); /* 缩放 */
  transform: skew(20deg, 10deg); /* 倾斜 */
  /* 组合变形 */
  transform: translateX(50px) rotate(45deg) scale(1.2);
}
```

### 3D变形
```css
.perspective {
  perspective: 1000px; /* 透视距离 */
}

.cube {
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(45deg);
}

.face {
  transform: translateZ(100px);
}
```

### 实际示例
```html
<div class="perspective">
  <div class="cube">
    <div class="face front">前面</div>
    <div class="face back">后面</div>
  </div>
</div>
```

---

## 媒体查询

### 响应式断点
```css
/* 小屏幕 (手机) */
@media (max-width: 576px) {
  .container { padding: 10px; }
}

/* 中等屏幕 (平板) */
@media (min-width: 577px) and (max-width: 992px) {
  .container { max-width: 720px; }
}

/* 大屏幕 (桌面) */
@media (min-width: 993px) {
  .container { max-width: 1140px; }
}

/* 设备方向 */
@media (orientation: portrait) { /* 竖屏 */ }
@media (orientation: landscape) { /* 横屏 */ }

/* 高分辨率屏幕 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo { background-image: url("logo@2x.png"); }
}
```

### 实际应用
```css
/* 移动优先策略 */
.component {
  /* 默认样式 (小屏幕) */
  padding: 10px;
  
  /* 中等屏幕 */
  @media (min-width: 768px) {
    padding: 20px;
  }
  
  /* 大屏幕 */
  @media (min-width: 1024px) {
    padding: 30px;
  }
}
```

---

## 自定义属性

### 定义与使用
```css
:root {
  --primary-color: #4285f4;
  --secondary-color: #34a853;
  --spacing-unit: 8px;
}

.element {
  color: var(--primary-color);
  margin: calc(var(--spacing-unit) * 2);
}

/* 动态修改 */
.dark-mode {
  --primary-color: #8ab4f8;
}
```

### JavaScript交互
```javascript
// 获取
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// 设置
document.documentElement.style
  .setProperty('--primary-color', '#ff0000');
```

### 实际示例
```html
<button onclick="toggleTheme()">切换主题</button>

<script>
function toggleTheme() {
  const root = document.documentElement;
  const current = getComputedStyle(root).getPropertyValue('--primary-color');
  root.style.setProperty('--primary-color', 
    current === '#4285f4' ? '#8ab4f8' : '#4285f4');
}
</script>
```

---

## 滤镜与混合模式

### 滤镜效果
```css
.filter {
  filter: blur(5px);
  filter: brightness(150%);
  filter: contrast(200%);
  filter: grayscale(50%);
  filter: hue-rotate(90deg);
  filter: invert(100%);
  filter: opacity(50%);
  filter: saturate(200%);
  filter: sepia(100%);
  /* 组合滤镜 */
  filter: brightness(120%) contrast(110%) saturate(150%);
}
```

### 混合模式
```css
.blend {
  background-color: red;
  background-image: url("pattern.png");
  background-blend-mode: multiply;
}

.image-blend {
  mix-blend-mode: screen;
}
```

### 实际示例
```html
<div class="hero">
  <img src="background.jpg" class="blur">
  <h1 class="text">标题</h1>
</div>

<style>
.hero {
  position: relative;
}
.blur {
  filter: brightness(70%) blur(3px);
}
.text {
  mix-blend-mode: overlay;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
```

---

## 字体与排版

### Web字体
```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2'),
       url('font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* 避免布局偏移 */
}

body {
  font-family: 'CustomFont', sans-serif;
}
```

### 高级排版
```css
.typography {
  /* 字体属性 */
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: 700; /* 100-900 */
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.5rem); /* 响应式字体 */
  
  /* 文本属性 */
  line-height: 1.6;
  letter-spacing: 0.05em;
  word-spacing: 0.1em;
  text-align: justify;
  text-transform: capitalize;
  text-decoration: underline wavy blue;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  
  /* 高级特性 */
  hyphens: auto; /* 自动断字 */
  hanging-punctuation: first; /* 悬挂标点 */
}
```

### 实际示例
```html
<p class="responsive-text">
  这是一段响应式文本，会根据视口大小自动调整字号
</p>

<style>
.responsive-text {
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.5;
}
</style>
```

