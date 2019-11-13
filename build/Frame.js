"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Frame = /** @class */ (function () {
    function Frame(size) {
        var _this = this;
        this._coordinates = [];
        this.toString = function () {
            return _this._coordinates.reduce(function (str, row) {
                return str.concat(row.join(' '), '\n');
            }, '');
        };
        this.canPlace = function (y, x, piece) {
            for (var i = 0; i < piece.coordinates.length; i++) {
                for (var j = 0; j < piece.coordinates.length; j++) {
                    var row = i + y - piece.center.row;
                    var col = j + x - piece.center.col;
                    if (piece.coordinates[i][j] !== 0) {
                        if (row < 0 ||
                            col < 0 ||
                            row > _this._size - 1 ||
                            col > _this._size - 1) {
                            return false;
                        }
                        else if (_this._coordinates[row][col] !== 0) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        this.placePosition = function (piece) {
            for (var i = 0; i < _this._size; i++) {
                for (var j = 0; j < _this._size; j++) {
                    if (_this.canPlace(i, j, piece)) {
                        return { row: i, col: j };
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
                for (var j = 0; j < piece.coordinates[0].length; j++) {
                    var row = i + pos.row - piece.center.row;
                    var col = j + pos.col - piece.center.col;
                    if (piece.coordinates[i][j] !== 0) {
                        newFrame._coordinates[row][col] = piece.sign;
                    }
                }
            }
            return newFrame;
        };
        this.setCoordinates = function (coordinates) {
            _this._coordinates = coordinates;
        };
        this.clone = function () {
            var newCoordinates = _this._coordinates.map(function (row) { return row.slice(); }).slice();
            var newFrame = new Frame(_this._size);
            newFrame.setCoordinates(newCoordinates);
            return newFrame;
        };
        this.isSolved = function () {
            for (var _i = 0, _a = _this._coordinates; _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                    var value = row_1[_b];
                    if (value === 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        this._size = size;
        for (var i = 0; i < size; i++) {
            var row = [];
            for (var j = 0; j < size; j++) {
                row[j] = 0;
            }
            this._coordinates.push(row);
        }
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
        return this._coordinates;
    };
    return Frame;
}());
exports.default = Frame;
//# sourceMappingURL=Frame.js.map