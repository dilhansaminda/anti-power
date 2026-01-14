/**
 * Anti-Power 补丁入口
 * 根据配置文件动态加载功能模块
 */

// 加载配置
const loadConfig = async () => {
    try {
        const res = await fetch('./cascade-panel/config.json');
        return await res.json();
    } catch {
        // 默认全部启用
        return { mermaid: true, math: true, copyButton: true, tableColor: true };
    }
};

// 动态加载表格修复样式
const loadTableFix = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './cascade-panel/table-fix.css';
    document.head.appendChild(link);
};

// 入口
(async () => {
    const config = await loadConfig();

    // 表格颜色修复（CSS 动态加载）
    if (config.tableColor) {
        loadTableFix();
    }

    // 启动扫描模块，传入配置
    const { start } = await import('./scan.js');
    start(config);
})();
