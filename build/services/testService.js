"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factorial = function (num, currentValue) {
    if (currentValue === void 0) { currentValue = 0; }
    while (num > 0) {
        if ([0, 1].includes(currentValue)) {
            currentValue = 1;
        }
        else {
            currentValue = currentValue * exports.factorial(num - 1, currentValue);
        }
    }
    return currentValue;
};
//# sourceMappingURL=testService.js.map