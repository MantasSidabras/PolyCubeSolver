"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFrom = function (_a) {
    var length = _a.length;
    return __spread(Array(length).keys());
};
exports.flipMatrix = function (matrix) {
    return exports.rangeFrom(matrix).map(function (_, index) { return matrix.map(function (row) { return row[index]; }); });
};
exports.flipMatrixHorizontal = function (matrix) {
    return exports.rotateMatrixClockwise(matrix).reverse();
};
exports.rotateMatrixClockwise = function (matrix) {
    return exports.flipMatrix(matrix.reverse());
};
exports.rotateMatrixCounterClockwise = function (matrix) {
    return exports.flipMatrix(matrix).reverse();
};
//# sourceMappingURL=MatrixTransform.js.map