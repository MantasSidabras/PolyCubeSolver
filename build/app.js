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
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var bedlamData_1 = require("./bedlamData");
var Cube = require("./Cube");
var Frame_1 = require("./Frame");
var Piece_1 = require("./Piece");
var PieceFormatter_1 = require("./PieceFormatter");
var availableColors = [];
var piecesLeft1 = 0;
var piecesLeft2 = 0;
var positionsChecked = 0;
exports.compose = function (fn1) {
    var fns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fns[_i - 1] = arguments[_i];
    }
    return fns.reduce(function (prevFn, nextFn) { return function (value) { return prevFn(nextFn(value)); }; }, fn1);
};
var main = function () {
    var pieces = PieceFormatter_1.default.formatPieces(bedlamData_1.bedlamData)
        .map(function (p, index) { return new Piece_1.default(index + 1, p); })
        .sort(function (p1, p2) { return p2.dimensionSize - p1.dimensionSize; })
        .sort(function (p1, p2) { return p2.size - p1.size; });
    pieces.forEach(function (piece) {
        console.log('dimensions: ', piece.dimensionSize);
        printPiece(piece.coordinates);
    });
    var piecesSize = pieces.reduce(function (sum, _a) {
        var size = _a.size;
        return sum + size;
    }, 0);
    console.log('piecesTotal: ', piecesSize);
    var frameSize = 4;
    console.log('frame size: ', frameSize, 'x', frameSize, 'x', frameSize);
    var frame = new Frame_1.default(frameSize);
    console.time('rotate');
    var res = solve(frame, pieces);
    console.timeEnd('rotate');
    if (res) {
        console.log('result');
        printPiece(res.coordinates);
    }
    else {
        console.log('failed!');
    }
};
var solve = function (frame, pieces) {
    var e_1, _a, e_2, _b;
    if (pieces.length < 3) {
        if (pieces.length == 2)
            piecesLeft2++;
        if (pieces.length == 1)
            piecesLeft1++;
    }
    if (positionsChecked % 100000 === 0 && positionsChecked !== 0) {
        console.log('positions checked: ', positionsChecked);
        console.log('pieces left: ', pieces.length);
        console.log('2 pieces left count: ', piecesLeft2);
        console.log('1 piece left count: ', piecesLeft1);
        printPiece(frame.coordinates);
    }
    positionsChecked++;
    if (pieces.length === 0 && frame.isSolved()) {
        return frame;
    }
    try {
        for (var pieces_1 = __values(pieces), pieces_1_1 = pieces_1.next(); !pieces_1_1.done; pieces_1_1 = pieces_1.next()) {
            var piece = pieces_1_1.value;
            var shapeGen = Cube.checkAll(piece.coordinates);
            var _loop_1 = function (newPieceCoordinates) {
                // include all rotations
                var newPiece = new Piece_1.default(piece.sign, newPieceCoordinates);
                var newFrame = frame.clone().place(newPiece);
                if (newFrame) {
                    var res = solve(newFrame, pieces.filter(function (p) { return p.sign !== newPiece.sign; }));
                    if (res) {
                        return { value: res };
                    }
                }
            };
            try {
                for (var shapeGen_1 = (e_2 = void 0, __values(shapeGen)), shapeGen_1_1 = shapeGen_1.next(); !shapeGen_1_1.done; shapeGen_1_1 = shapeGen_1.next()) {
                    var newPieceCoordinates = shapeGen_1_1.value;
                    var state_1 = _loop_1(newPieceCoordinates);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (shapeGen_1_1 && !shapeGen_1_1.done && (_b = shapeGen_1.return)) _b.call(shapeGen_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (pieces_1_1 && !pieces_1_1.done && (_a = pieces_1.return)) _a.call(pieces_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return null;
};
// const printColoredFrame = (res: Frame) => {
// 	const availableColors = [];
// 	const colors = (index: number) => {
// 		if (!availableColors[index]) {
// 			availableColors[index] = chalk.bgHex('#' + (((1 << 24) * Math.random()) | 0).toString(16));
// 		}
// 		return availableColors[index];
// 	};
// 	if (res) {
// 		for (const row of res.getCoordinates()) {
// 			for (const value of row) {
// 				let val = value / 10 >= 1 ? value.toString() : ` ${value.toString()}`;
// 				const txt = value > 0 ? colors(value)(val) : ' 0';
// 				process.stdout.write(`${txt}`);
// 			}
// 			console.log();
// 		}
// 	} else {
// 		console.log(res);
// 		const txt = value > 0 ? colors(value)(val) : ' 0';
// 		process.stdout.write(`${txt}`);
// 	}
// };
var printPiece = function (piece) {
    var e_3, _a, e_4, _b, e_5, _c;
    console.log('------------------');
    var colors = function (index) {
        if (!availableColors[index]) {
            availableColors[index] = chalk_1.default.bgHex('#' + (((1 << 24) * Math.random()) | 0).toString(16));
        }
        return availableColors[index];
    };
    try {
        for (var piece_1 = __values(piece), piece_1_1 = piece_1.next(); !piece_1_1.done; piece_1_1 = piece_1.next()) {
            var layer = piece_1_1.value;
            try {
                for (var layer_1 = (e_4 = void 0, __values(layer)), layer_1_1 = layer_1.next(); !layer_1_1.done; layer_1_1 = layer_1.next()) {
                    var row = layer_1_1.value;
                    try {
                        for (var row_1 = (e_5 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                            var value = row_1_1.value;
                            var val = value / 10 >= 1 ? value.toString() : " " + value.toString();
                            var txt = colors(value)(val);
                            process.stdout.write("" + txt);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (row_1_1 && !row_1_1.done && (_c = row_1.return)) _c.call(row_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    console.log();
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (layer_1_1 && !layer_1_1.done && (_b = layer_1.return)) _b.call(layer_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            console.log();
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (piece_1_1 && !piece_1_1.done && (_a = piece_1.return)) _a.call(piece_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
};
var formatData = function (data) {
    return data.map(function (pieceStr) {
        return pieceStr.trim().split('\n').map(function (row) { return row.split('').filter(function (c) { return c !== '\t'; }).map(function (c) { return Number(c); }); });
    });
};
main();
//# sourceMappingURL=app.js.map