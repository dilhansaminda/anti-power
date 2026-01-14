import { CONTENT_SELECTOR } from './constants.js';
import { addFeedbackCopyButtons, ensureContentCopyButton } from './copy.js';
import { renderMath } from './math.js';
import { renderMermaid } from './mermaid.js';

/**
 * 扫描根节点并处理需要增强的内容区域
 * @param {Element} root
 * @returns {void}
 * 说明：每次扫描都使用选择器查询，若性能压力大可考虑更细粒度的观察策略
 */
const scan = (root) => {
    if (!root) return;

    root.querySelectorAll(CONTENT_SELECTOR).forEach((node) => {
        ensureContentCopyButton(node);
        void renderMath(node);
    });

    root.querySelectorAll('[class*="language-mermaid"]').forEach((node) => {
        void renderMermaid(node);
    });

    addFeedbackCopyButtons();
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
 * 模块入口：等待 DOM 就绪后启动
 * @returns {void}
 */
export const start = () => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
};
