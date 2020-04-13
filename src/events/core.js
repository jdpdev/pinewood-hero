export function registerListener(eventType, callback) {
    document.addEventListener(eventType, callback);

    return () => {
        removeListener(eventType, callback);
    }
}

export function removeListener(eventType, callback) {
    document.removeEventListener(eventType, callback);
}

/**
 * 
 * @param {Event} event 
 */
export function dispatchEvent(event) {
    document.dispatchEvent(event);
}