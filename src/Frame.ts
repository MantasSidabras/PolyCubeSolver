import Piece from './Piece';
import IPosition from './IPosition';

class Frame {
	private _coordinates: number[][] = [];
	private _size: number;

	get coordinates() {
		return this._coordinates;
	}

	get size() {
		return this._size;
	}

	public constructor(size: number) {
		this._size = size;
		for (let i = 0; i < size; i++) {
			const row = [];
			for (let j = 0; j < size; j++) {
				row[j] = 0;
			}
			this._coordinates.push(row);
		}
	}

	public toString = () => {
		return this._coordinates.reduce((str, row) => {
			return str.concat(row.join(' '), '\n');
		}, '');
	};

	private canPlace = (y: number, x: number, piece: Piece) => {
		for (let i = 0; i < piece.coordinates.length; i++) {
			for (let j = 0; j < piece.coordinates.length; j++) {
				const row = i + y - piece.center.row;
				const col = j + x - piece.center.col;
				if (piece.coordinates[i][j] !== 0) {
					if (
						row < 0 ||
						col < 0 ||
						row > this._size - 1 ||
						col > this._size - 1
					) {
						return false;
					} else if (this._coordinates[row][col] !== 0) {
						return false;
					}
				}
			}
		}
		return true;
	};

	placePosition = (piece: Piece): IPosition => {
		for (let i = 0; i < this._size; i++) {
			for (let j = 0; j < this._size; j++) {
				if (this.canPlace(i, j, piece)) {
					return { row: i, col: j };
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
			for (let j = 0; j < piece.coordinates[0].length; j++) {
				const row = i + pos.row - piece.center.row;
				const col = j + pos.col - piece.center.col;
				if (piece.coordinates[i][j] !== 0) {
					newFrame._coordinates[row][col] = piece.sign;
				}
			}
		}
		return newFrame;
	};

	getCoordinates() {
		return this._coordinates;
	}

	setCoordinates = (coordinates: number[][]) => {
		this._coordinates = coordinates;
	};

	clone = (): Frame => {
		const newCoordinates = [...this._coordinates.map(row => [...row])];
		const newFrame = new Frame(this._size);
		newFrame.setCoordinates(newCoordinates);
		return newFrame;
	};

	isSolved = (): boolean => {
		for (const row of this._coordinates) {
			for (const value of row) {
				if (value === 0) {
					return false;
				}
			}
		}
		return true;
	};
}

export default Frame;
