---
title: 如何往Blog中添加img和CSS样式
date: 2023-07-14
desc: Next.js博客开发实战经验分享，解决图片路径配置问题和代码块样式优化，提升博客的视觉效果和用户体验。
---

在跟着Next.js教程完成一个简易的blog后，我发现图片无法正确加载并且代码部分超出了我设定的页面最大宽度，所以在google和chatGPT的帮助下，我对代码进行了一些修改。

## 添加img

在完成了blog v1之后，我尝试把自己制作blog app时做的笔记也放到app中，但是notion在导出md文本后图片的路径是一个相对路径，而我想把图片都统一放在public/images下，所以需要对md文件中图片的路径进行修改。

图片作为公共资源，通常会选择放在public文件夹中，便于浏览器访问。而在Next.js中，由于Next.js在构建过程中将public文件夹中的内容复制到生成的构建目录的**根目录**中，所以public下的静态文件可以直接通过文件名进行访问。比如我在public/images下存了一个profile.jpg，那我在使用这个图片的时候就只需要把它当成是在根目录下。

```javascript
<Image
  priority
  src="/images/profile.jpg"
  className={utilStyles.borderCircle}
  height={144}
  width={144}
  alt=""
/>
```

于是，我将md文件放在posts文件夹下，而相关的图片则放在同名的文件夹下并存放在public/images/${filename}中。结构如下：

![截屏2023-07-14 18.46.40](/images/add-img-css.assets/截屏2023-07-14%2018.46.40.png)

然后再对md文件中的图片路径进行修改，将图片路径改为：

```
/images/${filename}/${picture-name}
```

### 补充

不知道什么原因，notion导出md文件和图片时，给的图片都是无法访问的状态，所以为了便捷的转移和上传blog到website，我决定重新使用荒废已久Typora（当初花了钱买的正版。。。）

在Typora中，我对图片路径进行了配置，我在md文件的同目录下创建了一个名为imges/${filename.assets}的文件，然后将所有的图片都放在里面。当然，这样做只是为了便于我自己管理文章与图片，尽量保持一致性。

![截屏2023-07-14 18.59.51](/images/add-img-css.assets/截屏2023-07-14_18.59.51.png)

之后在上传blog时，我就只需要把blog放入posts文件夹中，然后在md文件中所有的路径前加一个/（因为next.js默认存在根目录下，目前没想到什么更好的方法）。最后把assets文件夹放入images文件夹中就大功告成。

当然为了保证文章的title和时间能正常显示在website中，在md文件的开头，还需要加入以下信息：

```markdown
---
title: "Your Blog Title"
date: "2023-07-11"  // just an example
---
```

另一个要注意的是，在Markdown中，如果您在图片地址（URL）中包含空格，可能会导致链接不正确或无法正常显示图片。这是因为URL规范要求空格在URL中被编码为特殊字符 %20。所以为了避免这个问题，要么地址里就不要放空格，要么在URL中用 %20 代替空格。例如，如果图片地址是 "image file.jpg"，就可以将其改为为 "image%20file.jpg"。

```markdown
![Alt Text](path/to/image%20file.jpg)
```

## 添加CSS

在完成1.0版本完成后，我发现md转换的html中存放代码块的地方超出了layout中设置的最大宽度。在查看了html源码后，我发现是pre标签的问题。

pre标签用于定义预格式化文本，主要作用是保留文本中的空格、换行符和其他空白字符，同时保持其原始的格式和排列方式。由于代码中具有缩进和换行符，所以需要被pre标签包裹，便于阅读。

但正因为pre标签的这种特性，如果一行代码很长，很容易超过预设定的max-width，所以我参考notion的样式，对pre标签的css样式进行了修改。由于我想要在全局中使用我设定的属性，所以我把修改后的css样式放在了styles/global.css中：

![截屏2023-07-14 19.18.15](/images/add-img-css.assets/截屏2023-07-14_19.18.15.png)

其中，background-color用于修改背景颜色，padding用于设置内边距，width用于设置宽度，overflow-x用于控制元素在水平方向上溢出内容的处理方式，这里设置为auto，所以当内容溢出时，显示水平滚动条，但当内容未溢出时，不显示水平滚动条。

修改后的效果如下：

![截屏2023-07-14 19.21.53](/images/add-img-css.assets/截屏2023-07-14_19.21.53.png)

看着还是不错的 :3
