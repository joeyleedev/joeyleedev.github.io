#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 验证构建配置...\n");

// 检查必要的文件
const requiredFiles = ["out/index.html", "out/.nojekyll"];

console.log("✅ 检查必要文件:");
let allFilesExist = true;
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ✗ ${file} (缺失)`);
    allFilesExist = false;
  }
});

// 检查 out 目录中的页面
console.log("\n📄 检查生成的页面:");
if (fs.existsSync("out")) {
  const outDir = fs.readdirSync("out", { withFileTypes: true });
  const pages = outDir
    .filter((dirent) => dirent.isDirectory() || dirent.name.endsWith(".html"))
    .map((dirent) => dirent.name);

  if (pages.length > 0) {
    pages.forEach((page) => {
      console.log(`   ✓ ${page}`);
    });
  } else {
    console.log("   ✗ 没有找到生成的页面");
    allFilesExist = false;
  }
}

console.log("\n🚀 验证完成!");
if (allFilesExist) {
  console.log("✅ 构建配置正确，可以安全部署到GitHub Pages。");
} else {
  console.log("❌ 发现问题，请检查构建配置。");
  process.exit(1);
}
