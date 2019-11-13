import { matoData } from './square';
import Piece from './Piece';
import Frame from './Frame';
import chalk from 'chalk';
import { puzzleData } from './data';

let positionsChecked = 0;

const main = () => {
	const pcs = formatData(matoData);

	const pieces = pcs.map((piece, index) => new Piece(index + 1, piece)).sort((p1, p2) => p2.size - p1.size);

	for (const p of pieces) {
		console.log(p.toString());
	}

	const frameSize = Math.sqrt(pieces.reduce((sum, piece) => sum + piece.size, 0));
	console.log('frame size: ', frameSize, 'x', frameSize);
	const frame = new Frame(frameSize);
	const res = solve(frame, pieces);
	printColoredFrame(res);
	console.log(positionsChecked);
};
const solve = (frame: Frame, pieces: Piece[]): Frame => {
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
	for (const piece of pieces) {
		for (let i = 0; i < 4; i++) {
			// include all rotations
			const newPiece = piece.clone();
			newPiece.rotate(i);
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

const printColoredFrame = (res: Frame) => {
	const availableColors = [];
	const colors = (index: number) => {
		if (!availableColors[index]) {
			availableColors[index] = chalk.bgHex('#' + (((1 << 24) * Math.random()) | 0).toString(16));
		}
		return availableColors[index];
	};

	if (res) {
		for (const row of res.getCoordinates()) {
			for (const value of row) {
				let val = value / 10 >= 1 ? value.toString() : ` ${value.toString()}`;
				const txt = value > 0 ? colors(value)(val) : ' 0';
				process.stdout.write(`${txt}`);
			}
			console.log();
		}
	} else {
		console.log(res);
	}
};

const formatData = (data: string[]): number[][][] => {
	return data.map((pieceStr) => pieceStr.trim().split('\n').map((row) => row.trim().split('').map((c) => Number(c))));
};

main();
