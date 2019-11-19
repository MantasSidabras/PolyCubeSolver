import Piece from './Piece';
import IPosition from './IPosition';
import R = require('ramda');

class Frame {
	private _coordinates: number[][][] = [];
	private _size: number;

	get coordinates() {
		return this._coordinates;
	}

	get size() {
		return this._size;
	}

	public constructor(size: number) {
		this._coordinates = [ ...Array(size).keys() ].map((layer) =>
			[ ...Array(size).keys() ].map((row) => [ ...Array(size).keys() ].map((col) => 0)),
		);
		this._size = size;
	}

	public toString = () => {
		return this._coordinates.reduce((str, layer) => {
			return str.concat(
				layer.map((row) => row.map((tile) => (tile >= 10 ? tile : ` ${tile}`)).join('')).join('\n'),
				'\n\n',
			);
		}, '');
	};

	private canPlace = (z: number, y: number, x: number, piece: Piece) => {
		for (let i = 0; i < piece.coordinates.length; i++) {
			for (let j = 0; j < piece.coordinates[0].length; j++) {
				for (let k = 0; k < piece.coordinates[0][0].length; k++) {
					const layer = i + z - piece.center.layer;
					const row = j + y - piece.center.row;
					const col = k + x - piece.center.col;

					if (piece.coordinates[i][j][k] !== 0) {
						if (
							layer < 0 ||
							row < 0 ||
							col < 0 ||
							layer > this._size - 1 ||
							row > this._size - 1 ||
							col > this._size - 1
						) {
							return false;
						} else if (this._coordinates[layer][row][col] !== 0) {
							return false;
						}
					}
				}
			}
		}
		return true;
	};

	placePosition = (piece: Piece): IPosition => {
		for (let i = 0; i < this._size; i++) {
			for (let j = 0; j < this._size; j++) {
				for (let k = 0; k < this._size; k++) {
					if (this.canPlace(i, j, k, piece)) {
						return { layer: i, row: j, col: k };
					}
				}
			}
		}
	};

	place = (piece: Piece) => {
		const pos = this.placePosition(piece);
		if (!pos) {
			return null;
		}
		const newFrame = this.clone();
		for (let i = 0; i < piece.coordinates.length; i++) {
			const layer = i + pos.layer - piece.center.layer;
			for (let j = 0; j < piece.coordinates[0].length; j++) {
				const row = j + pos.row - piece.center.row;
				for (let k = 0; k < piece.coordinates[0][0].length; k++) {
					const col = k + pos.col - piece.center.col;
					if (piece.coordinates[i][j][k] !== 0) {
						newFrame.coordinates[layer][row][col] = piece.sign;
					}
				}
			}
		}
		return newFrame;
	};

	getCoordinates() {
		return R.clone(this._coordinates);
	}

	setCoordinates = (coordinates: number[][][]) => {
		this._coordinates = coordinates;
	};

	clone = (): Frame => {
		const newCoordinates = R.clone(this._coordinates);
		const newFrame = new Frame(this._size);
		newFrame.setCoordinates(newCoordinates);
		return newFrame;
	};

	isSolved = (): boolean => {
		for (const layer of this._coordinates) {
			for (const row of layer) {
				for (const value of row) {
					if (value === 0) {
						return false;
					}
				}
			}
		}
		return true;
	};
}

export default Frame;
