---
title: 什么是Callback
date: 2023-07-22
desc: 深入理解JavaScript中的回调函数概念，学习如何使用callback处理异步操作，以及如何避免回调地狱问题。
---

## Callback

JavaScript 提供了许多 fucntions 用于进行异步操作，比如 setTimeout 函数。而在实际的开发中，也有一些常见的异步操作，比如加载 scripts 或 modules。

下面是一个 loadScript 的例子：

```javascript
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement("script");
  script.src = src;
  document.head.append(script);
}

// load and execute the script at the given path
loadScript("/my/script.js");
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
```

在这个代码中，我们执行了 loadScript 函数，它会创建一个 `<script>` 标签，并将其添加到页面中，然后浏览器会开始加载指定的脚本文件。在脚本加载的过程中，JavaScript 引擎会继续执行后续的代码，而不会等待脚本加载和执行的完成。

如果在这个新添加的脚本中有一个函数 newFunction()，我们想在 loadScript 执行后调用，但直接执行此函数会发现没有改函数。而这就是因为在脚本还在加载过程中，newFunction 函数就已经执行了。

```javascript
loadScript("/my/script.js"); // the script has "function newFunction() {…}"

newFunction(); // no such function!
```

因此，我们才需要引入 callback 函数，从而在后面的函数中使用之前异步获取的新功能和变量。

## 如何使用 callback

我们可以将 callback 函数作为第二个参数放入到 loadScript 函数中，这样就可以在脚本加载完成后在 callback 函数中使用新获取的函数或变量。

```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}

loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  newFunction(); // so now it works
  ...
});
```

换句话说，如果我们想要使用异步获取的函数或变量，我们应该把方法写在 callback 里，所以本质上第二个参数就是一个在异步操作完成后执行的 function。

## Handling errors

如果方法在异步加载过程中发生了错误，callback 应该要返回这一错误。

```javascript
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

loadScript("/my/script.js", function (error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```

- 通过 callback(null, script)来处理成功的 load
- 通过 callback(error)来处理失败的情况

## Callback in callback

如果我们需要按顺序加载两个脚本呢？通常我们能想到的办法就是在回调函数中再放入一个回调函数，但如果有很多个回调函数，就会出现回调地狱的情况，造成代码混乱，难以维护。

为了避免这一情况的出现，可以采用 Promise 或 async/await 来进行异步编程，从而使异步代码更为简洁和易于理解。

## Reference

- [Promises, async/await](https://javascript.info/async)
