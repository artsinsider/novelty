export function encodePayload(payload) {
    return JSON.stringify(payload).
    replace(/[\u007F-\uFFFF]/g, function (c) {
        return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).substr(-4);
    });
}

