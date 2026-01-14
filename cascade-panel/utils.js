import { MATH_ATTR, RAW_TEXT_PROP } from './constants.js';

/**
 * 动态加载样式表
 * @param {string} href - 样式表 URL
 * @returns {Promise<void>} 加载完成后 resolve
 * 说明：重复 URL 会复用已有 link，避免重复请求（性能优化）
 */
export const loadStyle = (href) =>
    new Promise((resolve, reject) => {
        if (!href) return reject(new Error('Missing stylesheet URL'));
        if (document.querySelector(`link[href="${href}"]`)) return resolve();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
        document.head.appendChild(link);
    });

/**
 * 动态加载脚本
 * @param {string} src - 脚本 URL
 * @returns {Promise<void>} 加载完成后 resolve
 * 说明：重复 URL 会复用已有 script，避免重复请求（性能优化）
 */
export const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (!src) return reject(new Error('Missing script URL'));
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });

/**
 * 判断元素是否位于可编辑上下文中
 * @param {Element} el
 * @returns {boolean} true 表示应跳过处理
 * 边界：仅检查最近的可编辑祖先，避免误伤输入区域
 */
export const isEditable = (el) =>
    !!el.closest('[contenteditable="true"], textarea, input');

/**
 * 安全读取 className（兼容 SVGAnimatedString）
 * @param {Element} el
 * @returns {string}
 */
export const getClassString = (el) => {
    const className = el?.className || '';
    if (typeof className === 'string') return className;
    if (className && typeof className.baseVal === 'string') return className.baseVal;
    return '';
};

/**
 * 写入剪贴板，优先使用 Clipboard API，失败则降级到 execCommand
 * @param {string} text
 * @returns {Promise<boolean>} true 表示成功写入
 * 边界：无文本直接返回 false；部分浏览器可能要求用户手势
 */
export const writeClipboard = async (text) => {
    if (!text) return false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // execCommand fallback
        }
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    return ok;
};

/**
 * 捕获原始文本，避免数学渲染后丢失原始内容
 * @param {Element} contentEl
 * @returns {void}
 * 边界：已标记为数学渲染时不重复写入，避免覆盖原始文本
 */
export const captureRawText = (contentEl) => {
    if (!contentEl) return;
    if (contentEl.getAttribute(MATH_ATTR) === '1') return;
    const raw = contentEl.innerText !== undefined
        ? contentEl.innerText
        : contentEl.textContent ?? '';
    contentEl[RAW_TEXT_PROP] = raw;
};
