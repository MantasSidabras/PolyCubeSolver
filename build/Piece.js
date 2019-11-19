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
Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
    function Piece(sign, coordinates) {
        var _this = this;
        this.toString = function () {
            return _this._coordinates.reduce(function (str, row) {
                return str.concat(row.join(' '), '\n');
            }, '');
        };
        this.clone = function () { return new Piece(_this._sign, __spread(_this._coordinates.map(function (row) { return __spread(row); }))); };
        this._sign = sign;
        this._coordinates = coordinates;
        this._center = {
            layer: Math.floor(coordinates.length / 2),
            row: Math.floor(coordinates[0].length / 2),
            col: Math.floor(coordinates[0][0].length / 2),
        };
    }
    Object.defineProperty(Piece.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "sign", {
        get: function () {
            return this._sign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "center", {
        get: function () {
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "size", {
        get: function () {
            var e_1, _a, e_2, _b, e_3, _c;
            var s = 0;
            try {
                for (var _d = __values(this.coordinates), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var layer = _e.value;
                    try {
                        for (var layer_1 = (e_2 = void 0, __values(layer)), layer_1_1 = layer_1.next(); !layer_1_1.done; layer_1_1 = layer_1.next()) {
                            var row = layer_1_1.value;
                            try {
                                for (var row_1 = (e_3 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                                    var value = row_1_1.value;
                                    if (value === 1) {
                                        s++;
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
            return s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "dimensionSize", {
        get: function () {
            return this._coordinates.reduce(function (acc, layer) {
                var addLayer = layer.some(function (row) { return row.some(function (value) { return value === 1; }); });
                return addLayer ? acc + 1 : acc;
            }, 0);
        },
        enumerable: true,
        configurable: true
    });
    return Piece;
}());
exports.default = Piece;
//# sourceMappingURL=Piece.js.map