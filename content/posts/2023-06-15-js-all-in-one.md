---
title: JavaScript 全面指南
date: 2023-06-15
desc: 从基础语法到ES6+新特性的JavaScript完整参考手册，涵盖变量声明、箭头函数、Promise、Class等核心概念和实用代码示例。
---

# JavaScript 全面指南

## 基础语法

### 变量声明
```javascript
// ES5
var name = "张三"; // 函数作用域

// ES6+
let age = 25;     // 块级作用域
const PI = 3.14;  // 常量
```

### 数据类型
```javascript
// 原始类型
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (历史遗留问题)
typeof Symbol()   // "symbol"
typeof 10n        // "bigint"

// 引用类型
typeof []         // "object"
typeof {}         // "object"
typeof function(){} // "function"
```

### 运算符
```javascript
// 解构赋值
let [a, b] = [1, 2];
let {name, age} = {name: "李四", age: 30};

// 展开运算符
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
```

---

## ES6 核心特性

### 1. let/const 块级作用域
```javascript
{
  let x = 1;
  const y = 2;
  var z = 3;
}
console.log(z); // 3
console.log(x); // ReferenceError
```

### 2. 箭头函数
```javascript
// 传统函数
function sum(a, b) {
  return a + b;
}

// 箭头函数
const sum = (a, b) => a + b;

// this 绑定差异
const obj = {
  name: "obj",
  traditional: function() { console.log(this.name) },
  arrow: () => console.log(this.name)
};
obj.traditional(); // "obj"
obj.arrow();       // undefined (继承外层this)
```

### 3. 模板字符串
```javascript
const name = "王五";
const age = 28;

// 多行字符串
const str = `姓名: ${name}
年龄: ${age}`;

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce((prev, curr, i) => 
    `${prev}${curr}<mark>${values[i] || ''}</mark>`, '');
}
highlight`Hello ${name}, you are ${age}`;
```

### 4. 解构赋值
```javascript
// 数组解构
const [first, , third] = [1, 2, 3];

// 对象解构
const { id, ...rest } = { id: 1, name: "赵六", age: 35 };

// 函数参数解构
function greet({name, age = 18}) {
  console.log(`Hello ${name}, age ${age}`);
}
```

### 5. 默认参数
```javascript
function createUser(name = '匿名', age = 0) {
  return { name, age };
}
```

### 6. 剩余参数
```javascript
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
sum(1, 2, 3); // 6
```

### 7. 扩展运算符
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 }; // {a:1, b:2}
```

### 8. 对象字面量增强
```javascript
const name = "张三";
const age = 25;

// 属性简写
const person = { name, age };

// 方法简写
const obj = {
  sayHi() {
    console.log("Hi!");
  }
};

// 计算属性名
const prop = "firstName";
const user = {
  [prop]: "李四"
};
```

### 9. Promise
```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 
        ? resolve("数据加载成功") 
        : reject("加载失败");
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 10. Class 类
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }

  static create(name) {
    return new Person(name);
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
```

### 11. 模块化
```javascript
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add } from './math.js';
```

### 12. Map/Set
```javascript
// Map
const map = new Map();
map.set('name', '张三');
map.get('name'); // "张三"

// Set
const set = new Set([1, 2, 3, 3]);
set.size; // 3
```

### 13. Symbol
```javascript
const id = Symbol('id');
const obj = {
  [id]: 123,
  name: "李四"
};
Object.keys(obj); // ["name"] - Symbol不可枚举
```

### 14. 迭代器与生成器
```javascript
// 迭代器
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        return { value: step, done: step > 3 };
      }
    };
  }
};

// 生成器
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}
```

### 15. Proxy/Reflect
```javascript
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 37;
  }
};
const p = new Proxy({}, handler);
p.a = 1;
console.log(p.a, p.b); // 1, 37
```

---

## 异步编程

### 1. Promise 进阶
```javascript
// Promise链
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/profile/${user.id}`))
  .then(profile => console.log(profile))
  .catch(error => console.error(error));

// Promise.all
Promise.all([promise1, promise2])
  .then(values => console.log(values));

// Promise.race
Promise.race([fetch1, fetch2])
  .then(first => console.log(first));
```

### 2. async/await
```javascript
async function getUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    const profile = await fetch(`/api/profile/${user.id}`);
    console.log(profile);
  } catch (error) {
    console.error(error);
  }
}
```

### 3. 事件循环
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 输出顺序: 1, 4, 3, 2
```

---

## DOM 操作

### 1. 选择元素
```javascript
// 现代方法
document.querySelector('.class'); // 单个元素
document.querySelectorAll('div'); // NodeList

// 传统方法
document.getElementById('id');
document.getElementsByClassName('class');
```

### 2. 事件处理
```javascript
// 事件委托
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn')) {
    console.log('按钮被点击');
  }
});

// 现代事件
element.addEventListener('click', handler, { once: true });
```

### 3. 元素操作
```javascript
// 创建元素
const div = document.createElement('div');
div.classList.add('box');
div.textContent = 'Hello';
document.body.append(div);

// 现代插入方法
parent.append(...nodes); // 末尾插入
parent.prepend(...nodes); // 开头插入
```

---

## 模块化

### ES Modules
```javascript
// utils.js
export const add = (a, b) => a + b;
export default function() { console.log('default'); }

// app.js
import defaultFunc, { add } from './utils.js';
```

### CommonJS (Node.js)
```javascript
// utils.js
exports.add = (a, b) => a + b;
module.exports = function() { console.log('default'); };

// app.js
const utils = require('./utils');
```

---

## 面向对象

### 原型继承
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise`);
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
```

### Class 语法糖
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  speak() {
    console.log(`${this.name} barks`);
  }
}
```

---

## 函数进阶

### 闭包
```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
```

### 高阶函数
```javascript
function map(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

map([1, 2, 3], x => x * 2); // [2, 4, 6]
```

### 函数柯里化
```javascript
const curry = fn => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...args2) => curried.apply(this, args.concat(args2));
    }
  };
};

const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
curriedSum(1)(2)(3); // 6
```

---

## 现代 API

### Fetch API
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' })
    });
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
```

### Web Storage
```javascript
// localStorage
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');

// sessionStorage
sessionStorage.setItem('token', 'abc123');
```

### Intersection Observer
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));
```

## 学习路线建议

1. **基础语法** → 2. **ES6+特性** → 3. **异步编程** → 4. **DOM操作** → 5. **模块化** → 6. **设计模式**

## 必备工具/资源

1. [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) - 最权威的参考
2. [ES6 特性兼容表](https://kangax.github.io/compat-table/es6/) 
3. [JavaScript 30](https://javascript30.com/) - 30天实战练习
4. [现代 JavaScript 教程](https://zh.javascript.info/) - 免费优质教程