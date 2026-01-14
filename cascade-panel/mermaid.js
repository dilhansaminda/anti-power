import { MERMAID_ATTR, MERMAID_SOURCE_PROP, MERMAID_URL } from './constants.js';
import { bindCopyButton, createCopyButton } from './copy.js';
import { getClassString, loadScript } from './utils.js';

let mermaidReady = false;
let mermaidReadyPromise = null;
let mermaidIdCounter = 0;

/**
 * 初始化 Mermaid 配置（主题、字体等）
 * @returns {void}
 */
const initializeMermaid = () => {
    window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
            darkMode: true,
            background: '#1e1e1e',
            primaryColor: '#4a9eff',
            primaryTextColor: '#e0e0e0',
            primaryBorderColor: '#4a9eff',
            lineColor: '#6a9eff',
            secondaryColor: '#2d4a6f',
            tertiaryColor: '#1e3a5f',
        },
        securityLevel: 'loose',
        fontFamily: 'var(--vscode-font-family, "Segoe UI", sans-serif)',
    });
    mermaidReady = true;
};

/**
 * 确保 Mermaid 库加载并初始化
 * @returns {Promise<void>}
 * 说明：使用 Promise 缓存避免重复加载（性能优化）
 */
export const ensureMermaid = () => {
    if (mermaidReadyPromise) return mermaidReadyPromise;
    mermaidReadyPromise = (async () => {
        if (window.mermaid && mermaidReady) return;

        if (window.mermaid) {
            initializeMermaid();
            return;
        }

        try {
            await loadScript(MERMAID_URL);
            if (window.mermaid) {
                initializeMermaid();
            }
        } catch (error) {
            console.warn('[Cascade] Mermaid 加载失败:', error);
            mermaidReady = false;
        }
    })();
    return mermaidReadyPromise;
};

/**
 * 提取 Mermaid 源码
 * @param {Element} codeBlockContainer
 * @returns {string}
 */
const extractMermaidSource = (codeBlockContainer) => {
    const codeBlock = codeBlockContainer.querySelector('.code-block');
    if (!codeBlock) return '';

    const lines = codeBlock.querySelectorAll('.line-content');
    let source = '';
    lines.forEach((line, idx) => {
        source += line.textContent;
        if (idx < lines.length - 1) source += '\n';
    });
    return source.trim();
};

/**
 * 原地渲染 Mermaid 图表（保留原代码块并插入渲染容器）
 * @param {Element} codeBlockContainer
 * @returns {Promise<void>}
 */
export const renderMermaid = async (codeBlockContainer) => {
    const classString = getClassString(codeBlockContainer);
    if (!classString.includes('language-mermaid')) return;

    const source = extractMermaidSource(codeBlockContainer);
    if (!source) return;

    const previousSource = codeBlockContainer[MERMAID_SOURCE_PROP] || '';
    const isRendered = codeBlockContainer.getAttribute(MERMAID_ATTR) === '1';
    const contentChanged = previousSource && previousSource !== source;

    if (isRendered && !contentChanged) {
        return;
    }

    codeBlockContainer[MERMAID_SOURCE_PROP] = source;

    try {
        await ensureMermaid();
        if (!mermaidReady || !window.mermaid) {
            console.warn('[Cascade] Mermaid 引擎未就绪');
            return;
        }

        const id = `cascade-mermaid-${++mermaidIdCounter}`;
        const { svg } = await window.mermaid.render(id, source);

        let container = codeBlockContainer.nextElementSibling;
        let copyBtn = null;
        if (!container || !container.classList.contains('cascade-mermaid-container')) {
            container = document.createElement('div');
            container.className = 'cascade-mermaid-container';
            codeBlockContainer.insertAdjacentElement('afterend', container);

            codeBlockContainer.style.display = 'none';

            copyBtn = createCopyButton({ className: 'cascade-mermaid-copy' });
            bindCopyButton(copyBtn, {
                getText: () => {
                    const mermaidSource = codeBlockContainer[MERMAID_SOURCE_PROP] || '';
                    if (!mermaidSource) return '';
                    return `\`\`\`mermaid\n${mermaidSource}\n\`\`\``;
                },
                copiedDuration: 1200,
                preventDefault: true,
                stopPropagation: true,
            });
            container.appendChild(copyBtn);
        } else {
            copyBtn = container.querySelector('.cascade-mermaid-copy');
        }

        container.innerHTML = svg;
        if (copyBtn) {
            container.appendChild(copyBtn);
        }

        codeBlockContainer.setAttribute(MERMAID_ATTR, '1');
    } catch (error) {
        console.error('[Cascade] Mermaid 渲染失败:', error);
        delete codeBlockContainer[MERMAID_SOURCE_PROP];
    }
};
