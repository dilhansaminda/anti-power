<p align="center">
  <img src="docs/images/LOGO.png" alt="Anti-Power" width="120">
</p>

<h1 align="center">Anti-Power 增强补丁</h1>

<p align="center">
  <a href="https://github.com/daoif/anti-power/releases">
    <img src="https://img.shields.io/badge/版本-v2.2.0-blue.svg" alt="版本">
  </a>
  <a href="https://codeium.com/antigravity">
    <img src="https://img.shields.io/badge/支持_Antigravity-v1.14.2-green.svg" alt="Antigravity">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/协议-MIT-orange.svg" alt="开源协议">
  </a>
</p>

> 🚀 针对 **Antigravity AI IDE** 的增强补丁，让你的 AI 对话体验更上一层楼！

<p align="center">
  💬 <a href="https://qm.qq.com/q/AHUKoyLVKg">QQ 交流群: 993975349</a>
</p>

---

## 🎯 项目愿景

建立这个仓库的初衷是希望**大家一起来共同提升 Antigravity 的使用体验**。

Antigravity 是一款优秀的 AI IDE，但在日常使用中难免会遇到一些小问题或不便之处。我们希望通过社区的力量，收集和分享各种增强补丁、优化技巧，让每一位用户都能获得更好的使用体验。

**欢迎提交你的增强方案！** 无论是样式优化、功能增强还是使用技巧，都可以通过 Issue 或 Pull Request 分享给大家。

---

## ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 🎨 **Mermaid 渲染** | 自动渲染流程图、时序图、类图等，支持深色主题 |
| 📐 **数学公式渲染** | 支持 `$...$` 行内公式和 `$$...$$` 块级公式 |
| 📋 **一键复制** | 侧边栏与 Manager 提供 Copy 按钮，自动转 Markdown |
| 🎯 **表格颜色修复** | 修复深色主题下表格文字不可见问题 |
| 🔠 **Manager 布局调节** | 支持对话宽度与字号调节 |
| 👆 **悬浮复制按钮** | 内容区域右上角悬浮按钮，不影响阅读 |

### 复制功能亮点

- 📝 代码块自动带语言标识（如 ` ```python `）
- 📊 表格自动转换为 Markdown 表格格式
- 🧠 智能忽略 AI 中间思考过程，只复制最终结果
- 📎 公式和 Mermaid 自动还原为源码

---

## 📸 效果展示

效果截图已迁移到 [docs/screenshots.md](docs/screenshots.md)。

---

## 📥 下载安装

### Windows（推荐）

1. 前往 [Releases 页面](https://github.com/daoif/anti-power/releases) 下载 `anti-power.exe`
2. 双击运行，**无需安装**
3. 程序会自动检测 Antigravity 安装路径
4. 选择需要的功能，点击「安装补丁」即可
5. 重启 Antigravity 或重新打开 Manager 窗口查看效果

如需手动安装，下载 Release 中的补丁压缩包（例如 `anti-power-patches.zip`），并参考 `patcher/patches/manual-install.md`。

> ⚠️ 安装器仅支持 Windows，macOS 请使用手动安装方式

### macOS

当前安装器未适配mac，请使用 Release 附带的补丁压缩包，并参考 `patcher/patches/manual-install.md` 手动安装。

---

## 📋 版本信息

| 补丁版本 | 支持的 Antigravity 版本 | 发布日期 | 更新内容 |
|---------|------------------------|----------|----------|
| v2.2.0  | v1.14.2                | 2026-01-21 | Manager Mermaid/数学公式渲染、对话宽度/字号调节，感谢 @mikessslxxx |
| v2.1.0  | v1.14.2                | 2026-01-19 | 侧边栏字体调节、Mermaid 报错提示优化、Manager 一键复制 |
| v2.0.1  | v1.14.2                | 2026-01-14 | 性能优化 |
| v2.0.0  | v1.14.2                | 2026-01-14 | 新增 Tauri 工具，支持功能单独开关 |
| v1.2.1  | v1.13.3                | 2026-01-13 | Bug 修复 |
| v1.2.0  | v1.13.3                | 2026-01-13 | Mermaid 渲染 |
| v1.1.0  | v1.13.3                | 2026-01-13 | 数学公式渲染 |
| v1.0.0  | v1.13.3                | 2026-01-13 | 一键复制、表格修复 |

---

## ⚠️ 注意事项

- **更新覆盖**：Antigravity 官方更新后，此修改可能会被覆盖，需要重新应用补丁
- **版本兼容**：建议在使用前确认 Antigravity 版本号与支持版本一致
- **备份习惯**：每次替换前请务必备份原文件，以便需要时恢复
- **已知问题**：部分功能存在已知限制，详见 [已知问题文档](docs/KNOWN_ISSUES.md)

---

## 📚 参考资料

本项目的表格颜色修复方案参考了以下教程：

- 📺 **视频教程**：[Antigravity 完美深色主题修改指南](https://www.bilibili.com/video/BV1vTrgBXEA1)
- 📖 **图文教程**：[表格文字看不清的终极解决方案](https://dpit.lib00.com/zh/content/1192/antigravity-perfect-dark-theme-modification-guide-fix-invisible-table-text)

---

## 🙏 致谢

感谢以下贡献者对本项目的支持：

- [@mikessslxxx](https://github.com/mikessslxxx)

---

## 📄 开源协议

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<p align="center">
  💡 如果这个项目对你有帮助，欢迎 Star ⭐
</p>
