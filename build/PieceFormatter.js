"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceFormatter = /** @class */ (function () {
    function PieceFormatter() {
    }
    PieceFormatter.formatPiece = function (piece) {
        return piece.map(function (layer) {
            return layer
                .trim()
                .split('\n')
                .map(function (row) {
                return row
                    .trim()
                    .split('')
                    .map(function (tile) { return Number(tile); });
            });
        });
    };
    PieceFormatter.formatPieces = function (pieces) {
        return pieces.map(function (piece) { return PieceFormatter.formatPiece(piece); });
    };
    return PieceFormatter;
}());
exports.default = PieceFormatter;
//# sourceMappingURL=PieceFormatter.js.map