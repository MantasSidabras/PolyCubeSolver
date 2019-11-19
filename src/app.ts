import { sampleData } from './sampleData';
import chalk from 'chalk';
import { bedlamData } from './bedlamData';
import * as Cube from './Cube';
import Frame from './Frame';
import Piece from './Piece';
import PieceFormatter from './PieceFormatter';

const availableColors = [];

let piecesLeft1 = 0;
let piecesLeft2 = 0;
let positionsChecked = 0;

export const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
	fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);

const main = () => {
	const pieces = PieceFormatter.formatPieces(bedlamData)
		.map((p, index) => new Piece(index + 1, p))
		.sort((p1, p2) => p2.dimensionSize - p1.dimensionSize)
		.sort((p1, p2) => p2.size - p1.size);
	pieces.forEach((piece) => {
		console.log('dimensions: ', piece.dimensionSize);
		printPiece(piece.coordinates);
	});

	const piecesSize = pieces.reduce((sum, { size }) => sum + size, 0);
	console.log('piecesTotal: ', piecesSize);
	const frameSize = 4;

	console.log('frame size: ', frameSize, 'x', frameSize, 'x', frameSize);
	const frame = new Frame(frameSize);
	console.time('rotate');
	const res = solve(frame, pieces);
	console.timeEnd('rotate');
	if (res) {
		console.log('result');
		printPiece(res.coordinates);
	} else {
		console.log('failed!');
	}
};

const solve = (frame: Frame, pieces: Piece[]): Frame => {
	if (pieces.length < 3) {
		if (pieces.length == 2) piecesLeft2++;
		if (pieces.length == 1) piecesLeft1++;
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
	for (const piece of pieces) {
		const shapeGen = Cube.checkAll(piece.coordinates);
		for (const newPieceCoordinates of shapeGen) {
			// include all rotations
			const newPiece = new Piece(piece.sign, newPieceCoordinates);
			const newFrame = frame.clone().place(newPiece);
			if (newFrame) {
				const res = solve(newFrame, pieces.filter((p) => p.sign !== newPiece.sign));
				if (res) {
					return res;
				}
			}
		}
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

const printPiece = (piece: number[][][]) => {
	console.log('------------------');
	const colors = (index: number) => {
		if (!availableColors[index]) {
			availableColors[index] = chalk.bgHex('#' + (((1 << 24) * Math.random()) | 0).toString(16));
		}
		return availableColors[index];
	};

	for (const layer of piece) {
		for (const row of layer) {
			for (const value of row) {
				const val = value / 10 >= 1 ? value.toString() : ` ${value.toString()}`;
				const txt = colors(value)(val);
				process.stdout.write(`${txt}`);
			}
			console.log();
		}
		console.log();
	}
};

const formatData = (data: string[]): number[][][] => {
	return data.map((pieceStr) =>
		pieceStr.trim().split('\n').map((row) => row.split('').filter((c) => c !== '\t').map((c) => Number(c))),
	);
};

main();
