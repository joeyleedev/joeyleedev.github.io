---
title: 什么是Promise
date: 2023-07-25
desc: 通过生动的比喻学习JavaScript Promise的核心概念，掌握then、catch、finally等方法的使用，解决异步编程难题。
---

## Promise

想象你是一个歌手，你有很多的粉丝时刻等待着你的新专。为了缓解粉丝的焦虑情绪，你保证（promise）一旦新专发布就告诉他们。你给了他们一个表单填写邮箱，当专辑发布的时候，所有订阅者都会立即收到。即使出了意外无法发布，也可以给订阅者发送消息，告知情况。

在程序中：

- 歌手：一段需要花费一些时间做事情的代码（producing code），比如通过网络加载数据
- 粉丝：需要 producing code 的结果的代码（consuming code）

## Promise 对象的构造器句法

```javascript
let promise = new Promise(function (resolve, reject) {
  // executor (the producing code, "singer")
});
```

- executor（执行函数）：当一个 Promise 被创造时，executor 就会自动运行。这个函数应该会返回一个结果。

- 两个参数 resolve 和 reject：Javascript 提供的 callbacks

  - resolve(value)：代表事件完成，返回 value
  - reject(error)：代表出现错误，error 是一个 error 对象

- promise 对象有两个内在属性

  - state：初始值为“pending”，resolve 后状态变为“fulfilled”，reject 后变为”rejected“
  - result：初始值为“undefined”，resolve 后变为 resolve(value)里的 value，reject 后变为 reject(error)里的 error

  ![截屏2023-07-22 23.38.56](/images/posts/what-is-promise.assets/截屏2023-07-22_23.38.56.png)

- 总的来说，executor 会完成一件任务（通常需要花费一些时间），然后会告诉 resolve 或 reject 来改变状态并输出结果。

## Consumers: then, catch

一个 Promise 对象可以看作是 executor 和 consuming functions 之间的纽带。consuming functions 使用.then 和.catch 方法来使用 executor 返回的结果。

### then

```javascript
promise.then(
  function (result) {
    /* handle a successful result */
  },
  function (error) {
    /* handle an error */
  }
);
```

### catch

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
```

## Cleanup: finally

finally 代表在 promise 结束后一定会执行的内容，通常用于关闭连接等。

```javascript
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
  .then(result => show result, err => show error)
```

- finally handler 没有参数，没有返回值，通常只做一些常规清理，不管 promise 返回的结果是什么。

## Reference

- [Promises, async/await](https://javascript.info/async)
