import { CONTENT_SELECTOR } from './constants.js';
import { addFeedbackCopyButtons, ensureContentCopyButton } from './copy.js';
import { renderMath } from './math.js';
import { renderMermaid } from './mermaid.js';

/**
 * 功能配置（由入口传入）
 */
let config = {
    mermaid: true,
    math: true,
    copyButton: true,
    tableColor: true
};

/**
 * 扫描根节点并处理需要增强的内容区域
 * @param {Element} root
 * @returns {void}
 */
const scan = (root) => {
    if (!root) return;

    root.querySelectorAll(CONTENT_SELECTOR).forEach((node) => {
        if (config.copyButton) {
            ensureContentCopyButton(node);
        }
        if (config.math) {
            void renderMath(node);
        }
    });

    if (config.mermaid) {
        root.querySelectorAll('[class*="language-mermaid"]').forEach((node) => {
            void renderMermaid(node);
        });
    }

    if (config.copyButton) {
        addFeedbackCopyButtons();
    }
};

/**
 * 获取渲染根节点，按优先级依次寻找
 * @returns {Element}
 */
const getRoot = () =>
    document.getElementById('chat') ||
    document.getElementById('react-app') ||
    document.body;

let scheduled = false;
/**
 * 基于 rAF 合并多次变更回调，降低高频 DOM 变更开销
 * @returns {void}
 */
const scheduleScan = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
        scheduled = false;
        scan(getRoot());
    });
};

/**
 * 初始化扫描与 MutationObserver
 * @returns {void}
 */
const init = () => {
    const root = getRoot();
    scan(root);

    const observer = new MutationObserver(scheduleScan);
    observer.observe(root, { childList: true, subtree: true });
};

/**
 * 模块入口：接收配置并启动
 * @param {Object} userConfig - 用户配置
 * @returns {void}
 */
export const start = (userConfig = {}) => {
    // 合并用户配置
    config = { ...config, ...userConfig };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
};
