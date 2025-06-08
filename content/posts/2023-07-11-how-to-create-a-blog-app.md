---
title: How to Create a Blog App
date: 2023-07-11
desc: 使用Next.js从零开始构建博客应用的完整教程，涵盖路由、预渲染、CSS样式、图片优化等核心功能实现。
---

## Introduction

Next.js aims to have best-in-class developer experience and many built-in features, such as:

- An intuitive [page-based](https://nextjs.org/docs/basic-features/pages) routing system (with support for [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes))
- [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering), both [static generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) (SSG) and [server-side rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) (SSR) are supported on a per-page basis
- Automatic code splitting for faster page loads
- [Client-side routing](https://nextjs.org/docs/routing/introduction#linking-between-pages) with optimized prefetching
- [Built-in CSS](https://nextjs.org/docs/basic-features/built-in-css-support) and [Sass support](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support), and support for any [CSS-in-JS](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js) library
- Development environment with [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) support
- [API routes](https://nextjs.org/docs/api-routes/introduction) to build API endpoints with Serverless Functions
- Fully extendable

## Setup

```tsx
npx create-next-app@latest app-name
```

## Navigate Between Pages

### Create a New Page

Pages 根据文件名进行关联

- `pages/index.js` is associated with the `/` route.
- `pages/posts/first-post.js` is associated with the `/posts/first-post` route.

### Link Component

使用 Link 组件来 link 各页面

```tsx
<h1 className="title">
  Read <Link href="/posts/first-post">this page!</Link>
</h1>
```

### Client-Side Navigation

Link 组件使用 client-side navigation，即通过 javascript 来进行页面切换，这种方式比浏览器导航快，因为不需要刷新页面。

### Code splitting and prefetching

Next.js 自动进行代码分割，因此每个页面仅加载该页面所需的内容。这意味着当呈现主页时，最初不会提供其他页面的代码。

这可以确保即使您有数百个页面，主页也能快速加载。

仅加载您请求的页面的代码也意味着页面变得孤立。如果某个页面抛出错误，应用程序的其余部分仍然可以工作。

此外，在 Next.js 的生产版本中，只要`[Link](https://nextjs.org/docs/api-reference/next/link)`组件出现在浏览器的视口中，Next.js 就会自动在后台**预取链接页面的代码。**当您单击链接时，目标页面的代码将已在后台加载，并且页面转换几乎是即时的！

## Assets, Metadata, and CSS

### Assets

Next.js 可以在顶级目录下提供静态资源

![asset-pic.png](/images/posts/how-to-create-a-blog-app/asset-pic.png)

### Image Component

- next/image 是对 html 里的 img 的拓展，默认对图片进行优化
- 默认使用懒加载，只有当图片划到 viewpoint 之后才会 load

### Metadata

Next 可以通过 Head 组件修改 html head 里的 title

```tsx
import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
```

### **Third-Party JavaScript**

使用 next/scirpt 来进行操作

```tsx
import Script from "next/script";

export default function FirstPost() {
  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
    </>
  );
}
```

### CSS Styling

文件结构：

![截屏2023-07-10 23.43.47.png](/images/posts/how-to-create-a-blog-app/style-structure.png)

在 Next 中，可以使用 CSS Modules，CSS 文件名需要以.module.css 结尾

- CSS Modules scope styles at the component level
- CSS Modules 会自动生成 unique 的 class name
- Next.js 也会对 CSS Modules 进行 code splitting，从而保证每一页面只要加载必要的 CSS

### Global Styles

在 page 文件夹中添加\_app.js 并重启 server

- 这是一个顶层组件包裹了所有的 pages

```tsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

在顶层文件夹 styles 中添加一个叫做 global.css 的文件，并 import 到\_app.js 文件中

```tsx
// `pages/_app.js`
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Styling Tips

1. 使用 clsx library 来切换 classes

```tsx
import styles from "./alert.module.css";
import { clsx } from "clsx";

export default function Alert({ children, type }) {
  return (
    <div
      className={clsx({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  );
}
```

1. Next.js 使用 PostCSS 编译 CSS，我们可以自己 customize，便于使用 Tailwind CSS
2. 支持使用使用 Sass

## Pre-rendering and Data Fetching

### Pre-rendering

Next.js 默认提前渲染每一页，有助于更好的性能和 SEO。并且每一页仅与必要的 javascript 进行关联

![截屏2023-07-11 17.04.19.png](/images/posts/how-to-create-a-blog-app/pre-rendering.png)

### Two Forms of Pre-rendering

1. **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then *reused* on each request.
2. **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

![截屏2023-07-11 17.07.43.png](/images/posts/how-to-create-a-blog-app/two-forms.png)

### When to Use SSG v.s. SSR

You can use [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

即可以在用户发送请求前预加载的

相反，如果页面需要频繁更新数据，或每次请求都会更新数据，那么就建议 SSR 或者 CSR

### SSG with and without Data

![截屏2023-07-11 17.14.19.png](/images/posts/how-to-create-a-blog-app/ssg-data.png)

![截屏2023-07-11 17.14.28.png](/images/posts/how-to-create-a-blog-app/ssg-with-data.png)

### SSG with Data using getStaticProps

- `[getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)` runs at build time in production, and…
- Inside the function, you can fetch external data and send it as props to the page.

```tsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

### Implement getStaticProps

![截屏2023-07-11 17.30.01.png](/images/posts/how-to-create-a-blog-app/getStaticProps-intro.png)

### getStaticProps Details

[https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)

### Fetch External API or Query Database

由于 getStaticProps 只在服务端跑，可以可以直接访问数据库。

```tsx
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  return res.json();
}
```

```tsx
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

### Fetching Data at Request Time

可以使用 SSR

![截屏2023-07-11 17.36.28.png](/images/posts/how-to-create-a-blog-app/ssr-data.png)

### Using getServerSideProps

```tsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

### Client-side Rendering

适用于 user dashboard pages

![截屏2023-07-11 17.39.02.png](/images/posts/how-to-create-a-blog-app/csr-data.png)

### SWR

Next.js 团队开发的用于在客户端获取数据时使用的 hook

```tsx
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## Dynamic Routes

### **Page Path Depends on External Data**

![截屏2023-07-11 17.55.27.png](/images/posts/how-to-create-a-blog-app/render-external.png)

### **Generate Pages with Dynamic Routes**

1. [] means dynamic routes here

![截屏2023-07-11 20.48.59.png](/images/posts/how-to-create-a-blog-app/page-dynamic-routes.png)

### Fetch External API or Query Database

getStaticPaths 可以从任何 data source 去获取数据

```tsx
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

### Fallback

getStaticPaths 里有一个 fallback

- 如果设为 false，那么任何没有被 getStaticPaths 返回的路径都会传到 404 page
- 如果设为 true，构建时未生成的路径不会**导致** 404 页面。相反，Next.js 将在第一次请求此类路径时提供页面的“后备”版本。在后台，Next.js 将静态生成请求的路径。对同一路径的后续请求将提供生成的页面，就像构建时预渲染的其他页面一样。

## API Routes

创建一个简单的 API endpoint

- 在 page 下创建 api 文件夹
- api 文件夹下创建一个 hello.js

```tsx
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

### API Routes Details

- 不从 getStaticProps 和 getStaticPaths 里获取 API Route
- 好的用法：使用 API routes 来处理 form input

```tsx
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

## Deploying Next.js App

使用 vercel 对 next.js 项目进行部署
