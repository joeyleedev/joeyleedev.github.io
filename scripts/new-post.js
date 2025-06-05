#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function createNewPost() {
  console.log("📝 创建新博客文章\n");

  const title = await question("文章标题: ");
  const desc = await question("文章描述: ");
  const tags = await question("标签 (用逗号分隔): ");

  const date = new Date().toISOString().split("T")[0];
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

  const filename = `${date}-${slug}.md`;
  const filepath = path.join(process.cwd(), "content", "posts", filename);

  const frontMatter = `---
title: "${title}"
date: ${date}
desc: "${desc}"
tags: [${tags
    .split(",")
    .map((tag) => `"${tag.trim()}"`)
    .join(", ")}]
author: "Joey"
---

# ${title}

在这里开始写你的文章内容...

## 段落标题

内容...

`;

  fs.writeFileSync(filepath, frontMatter);
  console.log(`\n✅ 文章已创建: ${filepath}`);
  console.log(`📝 现在你可以编辑这个文件来写文章内容！`);

  rl.close();
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

createNewPost().catch(console.error);
