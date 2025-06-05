#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 验证构建配置...\n");

// 检查必要的文件
const requiredFiles = [
  "out/index.html",
  "out/blog/index.html",
  "out/about/index.html",
  "out/.nojekyll",
];

console.log("✅ 检查必要文件:");
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ✗ ${file} (缺失)`);
  }
});

// 检查 index.html 中的路径配置
console.log("\n📄 检查路径配置:");
if (fs.existsSync("out/index.html")) {
  const indexContent = fs.readFileSync("out/index.html", "utf8");

  if (indexContent.includes("/yizi-space/")) {
    console.log("   ✓ basePath 配置正确");
  } else {
    console.log("   ✗ basePath 配置错误");
  }

  if (indexContent.includes('href="/yizi-space/blog/"')) {
    console.log("   ✓ 博客链接正确");
  } else {
    console.log("   ✗ 博客链接错误");
  }
}

// 检查博客页面
console.log("\n📝 检查博客页面:");
const blogFiles = [
  "out/blog/2024-06-01-first-blog/index.html",
  "out/blog/2024-05-28-second-blog/index.html",
  "out/blog/2024-05-20-third-blog/index.html",
  "out/blog/2024-05-10-fourth-blog/index.html",
];

blogFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✓ ${path.basename(path.dirname(file))}`);
  } else {
    console.log(`   ✗ ${path.basename(path.dirname(file))} (缺失)`);
  }
});

console.log("\n🚀 验证完成!");
console.log("\n如果所有项目都显示 ✓，那么您的构建配置是正确的。");
console.log("您可以安全地推送到GitHub，GitHub Pages将正常工作。");
