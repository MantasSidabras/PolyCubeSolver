"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
    function Piece(sign, coordinates) {
        var _this = this;
        this.rotate = function (rotateCount) {
            if (rotateCount === void 0) { rotateCount = 1; }
            for (var r = 0; r < rotateCount; r++) {
                var n = _this._coordinates.length;
                var x = Math.floor(n / 2);
                var y = n - 1;
                for (var i = 0; i < x; i++) {
                    for (var j = i; j < y - i; j++) {
                        var k = _this._coordinates[i][j];
                        _this._coordinates[i][j] = _this._coordinates[y - j][i];
                        _this._coordinates[y - j][i] = _this._coordinates[y - i][y - j];
                        _this._coordinates[y - i][y - j] = _this._coordinates[j][y - i];
                        _this._coordinates[j][y - i] = k;
                    }
                }
            }
        };
        this.toString = function () {
            return _this._coordinates.reduce(function (str, row) {
                return str.concat(row.join(' '), '\n');
            }, '');
        };
        this.clone = function () {
            return new Piece(_this._sign, _this._coordinates.map(function (row) { return row.slice(); }).slice());
        };
        this._sign = sign;
        this._coordinates = coordinates;
        this._center = {
            row: Math.floor(coordinates.length / 2),
            col: Math.floor(coordinates[0].length / 2),
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
            var s = 0;
            for (var _i = 0, _a = this._coordinates; _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                    var value = row_1[_b];
                    if (value === 1) {
                        s++;
                    }
                }
            }
            return s;
        },
        enumerable: true,
        configurable: true
    });
    return Piece;
}());
exports.default = Piece;
//# sourceMappingURL=Piece.js.map