export function registerListener(eventType, callback) {
    console.log(`[registerListener] ${eventType}`);
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
    console.log(`[dispatchEvent] ${event.type}`);
    document.dispatchEvent(event);
}