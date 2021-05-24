"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringValid = exports.isThreadBodyValid = exports.isThreadTitleValid = void 0;
const isThreadTitleValid = (title) => {
    return exports.isStringValid("Title", title, 5, 150);
};
exports.isThreadTitleValid = isThreadTitleValid;
const isThreadBodyValid = (body) => {
    return exports.isStringValid("Body", body, 10, 2500);
};
exports.isThreadBodyValid = isThreadBodyValid;
const isStringValid = (label, str, min, max) => {
    if (!str)
        return `${label} cannot be empty.`;
    if (str.length < 5) {
        return `${label} must be at least ${min} characters.`;
    }
    if (str.length > 150) {
        return `${label} cannot be greater than ${max} characters.`;
    }
    return "";
};
exports.isStringValid = isStringValid;
//# sourceMappingURL=ThreadValidators.js.map