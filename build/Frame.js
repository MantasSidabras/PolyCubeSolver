"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
var R = require("ramda");
var Frame = /** @class */ (function () {
    function Frame(size) {
        var _this = this;
        this._coordinates = [];
        this.toString = function () {
            return _this._coordinates.reduce(function (str, layer) {
                return str.concat(layer.map(function (row) { return row.map(function (tile) { return (tile >= 10 ? tile : " " + tile); }).join(''); }).join('\n'), '\n\n');
            }, '');
        };
        this.canPlace = function (z, y, x, piece) {
            for (var i = 0; i < piece.coordinates.length; i++) {
                for (var j = 0; j < piece.coordinates[0].length; j++) {
                    for (var k = 0; k < piece.coordinates[0][0].length; k++) {
                        var layer = i + z - piece.center.layer;
                        var row = j + y - piece.center.row;
                        var col = k + x - piece.center.col;
                        if (piece.coordinates[i][j][k] !== 0) {
                            if (layer < 0 ||
                                row < 0 ||
                                col < 0 ||
                                layer > _this._size - 1 ||
                                row > _this._size - 1 ||
                                col > _this._size - 1) {
                                return false;
                            }
                            else if (_this._coordinates[layer][row][col] !== 0) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        };
        this.placePosition = function (piece) {
            for (var i = 0; i < _this._size; i++) {
                for (var j = 0; j < _this._size; j++) {
                    for (var k = 0; k < _this._size; k++) {
                        if (_this.canPlace(i, j, k, piece)) {
                            return { layer: i, row: j, col: k };
                        }
                    }
                }
            }
        };
        this.place = function (piece) {
            var pos = _this.placePosition(piece);
            if (!pos) {
                return null;
            }
            var newFrame = _this.clone();
            for (var i = 0; i < piece.coordinates.length; i++) {
                var layer = i + pos.layer - piece.center.layer;
                for (var j = 0; j < piece.coordinates[0].length; j++) {
                    var row = j + pos.row - piece.center.row;
                    for (var k = 0; k < piece.coordinates[0][0].length; k++) {
                        var col = k + pos.col - piece.center.col;
                        if (piece.coordinates[i][j][k] !== 0) {
                            newFrame.coordinates[layer][row][col] = piece.sign;
                        }
                    }
                }
            }
            return newFrame;
        };
        this.setCoordinates = function (coordinates) {
            _this._coordinates = coordinates;
        };
        this.clone = function () {
            var newCoordinates = R.clone(_this._coordinates);
            var newFrame = new Frame(_this._size);
            newFrame.setCoordinates(newCoordinates);
            return newFrame;
        };
        this.isSolved = function () {
            var e_1, _a, e_2, _b, e_3, _c;
            try {
                for (var _d = __values(_this._coordinates), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var layer = _e.value;
                    try {
                        for (var layer_1 = (e_2 = void 0, __values(layer)), layer_1_1 = layer_1.next(); !layer_1_1.done; layer_1_1 = layer_1.next()) {
                            var row = layer_1_1.value;
                            try {
                                for (var row_1 = (e_3 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                                    var value = row_1_1.value;
                                    if (value === 0) {
                                        return false;
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (row_1_1 && !row_1_1.done && (_c = row_1.return)) _c.call(row_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (layer_1_1 && !layer_1_1.done && (_b = layer_1.return)) _b.call(layer_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        };
        this._coordinates = __spread(Array(size).keys()).map(function (layer) {
            return __spread(Array(size).keys()).map(function (row) { return __spread(Array(size).keys()).map(function (col) { return 0; }); });
        });
        this._size = size;
    }
    Object.defineProperty(Frame.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Frame.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Frame.prototype.getCoordinates = function () {
        return R.clone(this._coordinates);
    };
    return Frame;
}());
exports.default = Frame;
//# sourceMappingURL=Frame.js.map