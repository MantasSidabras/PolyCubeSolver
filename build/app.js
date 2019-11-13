"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var square_1 = require("./square");
var Piece_1 = require("./Piece");
var Frame_1 = require("./Frame");
var chalk_1 = require("chalk");
var positionsChecked = 0;
var main = function () {
    var pcs = formatData(square_1.matoData);
    var pieces = pcs
        .map(function (piece, index) { return new Piece_1.default(index + 1, piece); })
        .sort(function (p1, p2) { return p2.size - p1.size; });
    for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
        var p = pieces_1[_i];
        console.log(p.toString());
    }
    var frameSize = Math.sqrt(pieces.reduce(function (sum, piece) { return sum + piece.size; }, 0));
    console.log('frame size: ', frameSize, 'x', frameSize);
    var frame = new Frame_1.default(frameSize);
    var res = solve(frame, pieces);
    printColoredFrame(res);
    console.log(positionsChecked);
};
var solve = function (frame, pieces) {
    if (positionsChecked % 1000000 === 0 && positionsChecked !== 0) {
        if (positionsChecked % 50000000 === 0) {
            printColoredFrame(frame);
            console.log();
        }
        console.log('positions checked: ', positionsChecked);
    }
    // if (pieces.length < 2) {
    // 	printColoredFrame(frame);
    // 	console.log();
    // }
    if (pieces.length === 0 && frame.isSolved()) {
        return frame;
    }
    positionsChecked++;
    for (var _i = 0, pieces_2 = pieces; _i < pieces_2.length; _i++) {
        var piece = pieces_2[_i];
        var _loop_1 = function (i) {
            // include all rotations
            var newPiece = piece.clone();
            newPiece.rotate(i);
            var newFrame = frame.clone().place(newPiece);
            if (newFrame) {
                var res = solve(newFrame, pieces.filter(function (p) { return p.sign !== newPiece.sign; }));
                if (res) {
                    return { value: res };
                }
            }
        };
        for (var i = 0; i < 4; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    return null;
};
var printColoredFrame = function (res) {
    var availableColors = [];
    var colors = function (index) {
        if (!availableColors[index]) {
            availableColors[index] = chalk_1.default.bgHex('#' + (((1 << 24) * Math.random()) | 0).toString(16));
        }
        return availableColors[index];
    };
    if (res) {
        for (var _i = 0, _a = res.getCoordinates(); _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var value = row_1[_b];
                var val = value / 10 >= 1 ? value.toString() : " " + value.toString();
                var txt = value > 0 ? colors(value)(val) : ' 0';
                process.stdout.write("" + txt);
            }
            console.log();
        }
    }
    else {
        console.log(res);
    }
};
var formatData = function (data) {
    return data.map(function (pieceStr) {
        return pieceStr
            .trim()
            .split('\n')
            .map(function (row) {
            return row
                .trim()
                .split('')
                .map(function (c) { return Number(c); });
        });
    });
};
main();
//# sourceMappingURL=app.js.map