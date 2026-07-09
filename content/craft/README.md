# Craft Lab 记录

这里放 Craft Lab 内容：玻璃灯工、材料实验、过程记录和成品作品。

推荐流程：

1. 复制 `_template.md`。
2. 改成日期开头的文件名，例如 `2026-07-09-glass-flame-test.md`。
3. 用 Markdown 写记录。
4. 相关图片或附件放到 `content/craft/assets/`。
5. 准备发布时，把 `status` 改成 `published`。

建议文件名格式：

```text
YYYY-MM-DD-craft-slug.md
```

Craft Lab 常用字段：

- `title`: 手作记录标题。
- `date`: 记录日期。
- `status`: 发布状态，`published` 才会显示在列表里。
- `type`: 记录类型，例如 `过程记录`、`材料实验`、`作品记录`。
- `materials`: 材料数组，例如 `["硼硅玻璃", "透明玻璃棒"]`。
- `techniques`: 技法数组，例如 `["加热", "软化", "塑形"]`。
- `summary`: 列表摘要。
- `cover`: 封面图片文件名，图片放在 `content/craft/assets/`。
