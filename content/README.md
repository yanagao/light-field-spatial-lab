# 内容目录

这里放长期可编辑的内容，和 React 源码分开管理。

- `ai/`: AI Lab 文章、前端笔记、AI 工作流和工程记录。
- `craft/`: Craft Lab 玻璃灯工、材料实验、过程记录和成品作品。
- `life/`: Life Lab 日常记录、生活片段和记忆碎片。

每个目录都有自己的 `_template.md`。复制模板，改成日期开头的文件名，然后用 Markdown 写内容。

## Frontmatter 字段

每篇 Markdown 顶部的 `---` 区域叫 frontmatter，用来给网站读取文章信息。

常用字段：

- `title`: 文章标题，会显示在列表和详情页。
- `date`: 文章日期，建议和文件名前缀一致，例如 `2026-07-09`。
- `time`: 时间，主要给 Life Lab 使用，例如 `08:30`。
- `status`: 发布状态，控制文章是否显示在列表里。
- `tags`: 标签数组，例如 `["AI", "前端", "实验"]`。
- `summary`: 文章摘要，会显示在列表里。
- `mood`: 心情或氛围，主要给 Life Lab 使用。
- `place`: 地点，主要给 Life Lab 使用。
- `materials`: 材料数组，主要给 Craft Lab 使用，例如 `["玻璃棒", "火焰"]`。
- `techniques`: 技法数组，主要给 Craft Lab 使用，例如 `["加热", "软化", "塑形"]`。

数组字段用 `[]`，多个值用逗号分开：

```md
tags: ["日常", "光"]
materials: ["玻璃棒", "火焰"]
techniques: ["加热", "拉丝", "旋转塑形"]
```

## 发布状态

文章通过 frontmatter 里的 `status` 控制是否显示在列表里：

- `status: "draft"`: 草稿，不显示在页面列表。
- `status: "published"`: 已发布，显示在对应 Lab 列表。
- `status: "archived"`: 归档，不显示在页面列表。

模板默认是 `draft`。文章写完后，把 `status` 改成 `published`，就会出现在对应列表里。
