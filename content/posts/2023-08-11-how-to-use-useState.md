---
title: 如何正确使用useState
date: 2023-08-11
desc: React Hook useState的完整使用指南，包括状态初始化、函数式更新、对象状态管理以及组件重新渲染机制详解。
---

## useState

#### 创建一个 state

```react
const [count, setCount] = useState(0);
```

- count 代表当前状态
- setState 是一个更新 count 的函数

#### 初始化 state

```react
//直接赋值
function App() {
	const [count, setCount] = useState(0);
}

//函数初始化
function countInitial() {
  console.log('run function')
  return 4
}

function App() {
  const [count, setCount] = useState(() => countInitial())
}
```

- 第一种方式直接赋值，适用于初始状态不依赖于其他状态或属性的情况。
- 第二种方式将初始状态通过函数返回。这个函数只在组件初始渲染时被调用一次，适用于初始状态需要根据组件的属性或其他状态进行计算的情况。

#### 更新 state

```react
//重新赋值
function decrement() {
	setCount(count - 1)
}

//函数式更新
function decrement() {
	setCount(prevCount => prevCount - 1)
}
```

- 第一种方法可能会导致不正确的递减，因为当我们调用`setState`方法时，React 会将更新请求添加到一个队列中，而不会立即执行状态更新，也就是说如果我们连续调用`setState(count - 1)`，方法中的 count 始终是当前的状态，react 并不会在其中的每一步更新之间重新计算状态。
- 所以，在实际使用中，建议采用`函数式更新`，确保在更新状态时使用最新的状态值。具体来说，函数式更新是通过传递一个函数给状态更新函数来实现的，这个函数接受当前状态作为参数，并返回一个新的状态。React 会在适当的时候调用这个函数，从而获得最新的状态值。

#### 使用 useState 存储对象

```react
const [person, setPerson] = useState({
  name: 'John',
  age: 30,
  email: 'john@example.com'
});

const updateAge = () => {
  setPerson(prevPerson => ({
    ...prevPerson,
    age: prevPerson.age + 1
  }));
};
```

- 更新某个字段时，需要带上所有其他的字段

### setState 之后的组件 rerendering

在 React 中，当使用 `setState` 或类似的状态更新函数来改变组件的状态后，React 会自动执行以下步骤来进行重新渲染（rerendering）：

1. **触发状态更新：** 当你调用 `setState` 或类似的状态更新函数时，React 会将更新请求添加到一个队列中，而不会立即执行状态更新。
2. **合并更新：** 如果在同一个事件循环中多次调用了 `setState`，React 会将这些更新合并成一个单一的更新，以减少渲染的次数。这可以提高性能和效率。
3. **计算新虚拟 DOM 树：** React 使用 Virtual DOM（虚拟 DOM）来表示组件的层次结构和状态。当状态更新被触发时，React 会使用组件的定义以及新的状态来计算新的虚拟 DOM 树。
4. **进行对比（Reconciliation）：** React 将新的虚拟 DOM 树与之前的虚拟 DOM 树进行比较，找出哪些部分需要更新。这个过程被称为 "协调" 或 "对比"，它帮助确定实际需要进行 DOM 更新的地方。
5. **生成 DOM 更新：** 根据比较的结果，React 会生成一个最小化的 DOM 更新操作序列，这样只有真正需要改变的部分才会被更新。
6. **应用 DOM 更新：** 最后，React 会将生成的 DOM 更新操作应用到实际的 DOM 中，更新显示内容。这个过程是非常高效的，因为只有真正发生变化的部分才会被更新。
