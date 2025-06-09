---
title: 跨域问题
date: 2024-12-30
desc: 跨域问题
---

# 跨域问题

## 前言

随着 Web 应用的快速发展，前后端分离架构已成为主流。无论是在大型企业应用还是小型项目中，跨域请求都是开发过程中避不开的一个环节。尤其是在微服务架构和分布式系统中，前端与各个服务之间的通信往往跨越不同的域，这时跨域问题就会被暴露出来。

## 1. 跨域概述

### 1.1 什么是跨域

跨域指的是在一个网页中，通过 JavaScript 向另一个不同域名、协议或端口的服务器发起请求。这种行为会被浏览器的同源策略（Same-Origin Policy）限制。简单来说，同源策略要求网页只能与与其相同域、协议和端口的资源进行交互。

### **1.2 同源策略**

同源策略（Same-Origin Policy）是一种 Web 浏览器安全策略，用于限制来自不同源（Origin）的脚本之间的交互。在 Web 安全领域中，"源"（Origin）是由协议（protocol）、主机（host）和端口（port）组成的集合，如果两个 URL 具有相同的协议、主机和端口，则它们属于相同的源。

举例：

- 同源：`https://example.com/page` 和 `https://example.com/other`
- 跨域：
  - `https://example.com` 和 `https://api.example.com` （域名不同）
  - `https://example.com` 和 `http://example.com`（协议不同）
  - `http://example.com:80` 和 `http://example.com:8088`（端口不同）

### 1.3 为什么要有同源策略的限制

1. 保护用户的隐私和安全
   - 如果没有同源策略，任何网站都可以访问用户浏览器中的数据（如 Cookie、LocalStorage），并与其他网站的服务交互，这将给用户的隐私和数据安全带来巨大的风险。
   - 例如，如果用户在 `http://example.com` 上登录了某个服务，恶意网站 `http://malicious.com` 就可以通过 JavaScript 脚本窃取用户的登录信息或进行恶意操作。
2. 防止跨站点请求伪造（CSRF）
   - 同源策略防止恶意网站通过伪造请求，利用用户的身份进行未经授权的操作。例如，如果用户在一个网站登录了账户，恶意网站通过脚本伪造请求，向用户的银行发送资金转账请求，那么银行网站需要依赖同源策略来阻止这些跨站请求。
3. 防止跨站点脚本攻击（XSS）
   - 如果没有同源策略，恶意网站可以注入 JavaScript 脚本，直接访问其他网站的资源或数据，这可能导致账户劫持、数据泄露等安全问题。通过限制脚本的访问权限，浏览器避免了很多 XSS 攻击。

## **2. 如何实现跨域请求**

### **2.1 JSONP（JSON with Padding）**

JSONP 是一种利用 `<script>` 标签来实现跨域请求的技术。它的原理是利用浏览器对 `<script>` 标签没有同源策略限制的特性。通过在页面上动态创建一个 `<script>` 标签，其 src 属性指向目标服务器上的一个接受回调函数作为参数的 JSON 数据接口，服务器返回的数据会被包裹在该回调函数中，然后在客户端通过该回调函数来处理返回的数据。

以下是一个简单的 JSONP 的工作原理示例：

假设有一个页面 `http://example.com/page1.html`，需要获取另一个域 `http://api.example.com/data.json` 中的 JSON 数据。由于存在跨域限制，普通的 Ajax 请求无法直接访问该数据。

1. 首先，在 `page1.html` 页面中，动态创建一个 `<script>` 标签，并设置其 src 属性为目标数据的 URL，同时在 URL 中添加一个回调函数的参数，例如：

```
function processData(data) {
    console.log("获取到的数据：", data);
}
</script>
<script src="<http://api.example.com/data.json?callback=processData>"></script>
```

1. 目标服务器 `http://api.example.com/data.json` 接收到请求后，将数据包装在一个函数调用中，回调函数的名称即为参数中指定的 `processData`，例如：

```
processData({"name": "John", "age": 30});
```

1. 浏览器在接收到返回的脚本内容后，会执行其中的 JavaScript 代码，从而调用 `processData` 函数，并将数据作为参数传递给该函数。

通过这种方式，页面 `page1.html` 就能够在回调函数 `processData` 中获取到从目标服务器返回的数据，从而实现了跨域请求。 JSONP 的优点是简单易用，但缺点是对服务器的要求较高，需要服务器端支持返回带有回调函数的 JSON 数据。

### **2.2 CORS（Cross-Origin Resource Sharing）**

**含义**

CORS（Cross-Origin Resource Sharing）是一种机制，用于在浏览器中处理跨域请求。它允许服务器声明哪些来源（域、协议和端口组合）可以访问其资源，从而解决了浏览器的同源策略限制。CORS 提供了一种灵活的方式来允许跨域请求，同时保护了用户的隐私和安全。CORS 通信过程是浏览器自动完成的，一旦发现请求跨域，就会自动添加一些附加的头信息，不需要用户参与。

CORS 允许服务器在响应中添加一个或多个特定的 HTTP 头来声明是否允许来自其他域的请求。常见的请求头包括：

- `Access-Control-Allow-Origin`：指定允许访问资源的域。可以是一个具体的域名，也可以是 `` 表示允许所有域访问。
- `Access-Control-Allow-Methods`：指定允许的 HTTP 方法。
- `Access-Control-Allow-Headers`：指定允许的请求头。
- `Access-Control-Allow-Credentials`：指定是否允许发送凭据（如 Cookie）。

**对于简单请求**

简单请求（Simple Request）是指符合一定条件的跨域请求，它们不会触发浏览器发送预检请求（Preflight Request）。为了被视为简单请求，请求必须同时满足以下条件：

1. 请求方法为以下之一：
   - GET
   - HEAD
   - POST
2. 请求头仅限于以下几种标准的请求头：
   - Accept
   - Accept-Language
   - Content-Language
   - Content-Type（仅限于 application/x-www-form-urlencoded、multipart/form-data、text/plain）

以下是简单请求的基本流程：

![same-origin](./assets/same-origin.png)

1. 当浏览器发现简单请求跨域后，就会向请求头信息里面自动添加一个 `origin`字段，说明本次请求来自哪个域。

   ```
   GET /resources/public-data/ HTTP/1.1
   Host: bar.other
   User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
   Accept-Language: en-us,en;q=0.5
   Accept-Encoding: gzip,deflate
   Connection: keep-alive
   Origin: <https://foo.example>
   ```

2. 如果发现 `Origin`为指定的源 （白名单中），服务器会响应成功，如果发现 `Origin`不在许可的范围内，服务器会返回一个正常的 http 回应，并且抛出错误。

   ```
   HTTP/1.1 200 OK
   Date: Mon, 01 Dec 2008 00:23:53 GMT
   Server: Apache/2
   Access-Control-Allow-Origin: *
   Keep-Alive: timeout=2, max=100
   Connection: Keep-Alive
   Transfer-Encoding: chunked
   Content-Type: application/xml
   
   […XML Data…]
   ```

**对于预检请求**

CORS 中的预检请求（Preflight Request）是一种用于验证是否允许跨域请求的特殊类型的请求，通常在实际请求之前发起。预检请求是一种 OPTIONS 请求，用于向服务器询问是否允许特定类型的跨域请求。

预检请求的目的是为了确保服务器端明确地知道客户端将要发送的实际请求是否被允许。这种机制通常适用于那些可能影响服务器状态或者需要特殊授权的请求，比如使用非简单请求方法（如 PUT、DELETE）、自定义请求头（Auth）等。

以下是预检请求的基本流程：

![cross-origin](./assets/cross-origin.png)

1. 浏览器发送一个 OPTIONS 请求，向目标服务器询问是否允许跨域请求。
2. 预检请求中包含一些额外的头部信息，包括 Origin（表示请求的来源）、Access-Control-Request-Method（表示实际请求将要使用的 HTTP 方法）、Access-Control-Request-Headers（表示实际请求将要携带的自定义头部）等。
3. 服务器接收到预检请求后，根据请求头中的信息来判断是否允许跨域请求。
4. 如果服务器允许跨域请求，则返回带有 CORS 头的响应，其中包括 Access-Control-Allow-Origin、Access-Control-Allow-Methods、Access-Control-Allow-Headers 等头部。
5. 浏览器收到预检请求的响应后，会检查其中的 CORS 头信息，如果符合要求，则允许客户端继续发送实际请求；否则阻止实际请求的发送，并在控制台中显示相应的错误信息。

### **2.3 代理服务器**

通过代理实现跨域请求的基本思路是，客户端向同源服务器发送请求，然后同源服务器将该请求转发给目标服务器，获取目标服务器的响应后再返回给客户端。这样，客户端就能够间接地访问目标服务器上的资源，绕过了浏览器的同源策略限制。

以下是一个简单的使用代理实现跨域请求的示例：

假设有两个网站：

1. 网站 A：`http://example.com/page1.html`（客户端）
2. 网站 B：`http://api.example.com/data.json`（目标服务器）

现在，网站 A 的页面 `page1.html` 需要获取网站 B 上的 `data.json` 数据，但由于跨域限制，直接在客户端发起请求会被阻止。

为了解决这个问题，我们可以在网站 A 的同源服务器上设置一个代理，用于转发客户端的请求。代理服务器收到客户端的请求后，再向目标服务器发起请求，获取数据后再返回给客户端。这样，客户端就能够获取到目标服务器上的数据了。

![proxy](./assets/proxy.png)

## **Resources**

- [什么是跨域？](https://blog.csdn.net/fudaihb/article/details/140187291)
- [跨域资源共享 (CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [OPTIONS请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)
- [什么是同源策略](https://juejin.cn/post/7262548641701019704)
