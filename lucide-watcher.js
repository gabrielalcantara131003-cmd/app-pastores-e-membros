// This observer watches for dynamically added elements and applies Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    // Basic init
    if (window.lucide) {
        lucide.createIcons();
    }

    // Observer setup for dynamicaly created HTML components (e.g. showView elements)
    let timeout;
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.nodeType === 1) { // Element node
                        if (node.hasAttribute('data-lucide') || node.querySelector('[data-lucide]')) {
                            shouldUpdate = true;
                            break;
                        }
                    }
                }
            }
            if (shouldUpdate) break;
        }

        if (shouldUpdate && window.lucide) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                lucide.createIcons();
            }, 100);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

});
