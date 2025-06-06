# 图片资源目录结构说明

## 目录组织

```
public/images/
├── posts/          # 博客文章相关图片
├── common/         # 网站通用图片（logo、头像、图标等）
├── gallery/        # 图库/相册图片
└── README.md       # 本说明文件
```

## 使用规范

### 1. 博客文章图片 (`posts/`)
- 为每篇博客文章创建独立的子目录，目录名建议与文章文件名保持一致
- 例如：`posts/2023-07-22-what-is-callback/` 
- 图片命名建议使用有意义的名称，避免中文和特殊字符
- 支持的格式：`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### 2. 通用图片 (`common/`)
- 存放网站logo、头像、导航图标等共用图片
- 建议按功能分类创建子目录：
  - `common/icons/` - 图标文件
  - `common/avatars/` - 头像文件
  - `common/logos/` - Logo文件

### 3. 图库图片 (`gallery/`)
- 存放相册、作品展示等图片
- 可按主题或时间创建子目录

## Markdown中的引用方式

在Markdown文章中引用图片时，使用相对于网站根目录的路径：

```markdown
![图片描述](/images/posts/your-post-name/image-name.jpg)
![通用图标](/images/common/icons/icon-name.png)
![图库图片](/images/gallery/category/image-name.jpg)
```

## 注意事项

1. **文件命名**：使用英文、数字、连字符，避免空格和特殊字符
2. **图片优化**：建议在上传前压缩图片以提高加载速度
3. **格式选择**：
   - 照片类图片推荐使用 `.jpg`
   - 图标、截图推荐使用 `.png`
   - 动图使用 `.gif` 或 `.webp`
4. **尺寸控制**：建议控制图片宽度在800-1200px范围内
5. **备份管理**：重要图片建议在本地保留备份

## 示例

```
public/images/
├── posts/
│   ├── 2023-07-22-what-is-callback/
│   │   ├── callback-diagram.png
│   │   └── error-handling-example.jpg
│   └── 2023-07-25-what-is-promise/
│       ├── promise-states.png
│       └── async-flow.jpg
├── common/
│   ├── icons/
│   │   ├── github.svg
│   │   └── email.svg
│   └── avatars/
│       └── profile.jpg
└── gallery/
    └── 2024/
        ├── project-showcase-1.jpg
        └── project-showcase-2.jpg
``` 