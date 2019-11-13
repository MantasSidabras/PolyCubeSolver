import IPosition from './IPosition';

class Piece {
	private _coordinates: number[][];
	private _sign: number;
	private _center: IPosition;
	private _size: number;

	get coordinates() {
		return this._coordinates;
	}

	get sign() {
		return this._sign;
	}

	get center() {
		return this._center;
	}

	get size() {
		let s = 0;
		for (const row of this._coordinates) {
			for (const value of row) {
				if (value === 1) {
					s++;
				}
			}
		}
		return s;
	}

	constructor(sign: number, coordinates: number[][]) {
		this._sign = sign;
		this._coordinates = coordinates;
		this._center = {
			row: Math.floor(coordinates.length / 2),
			col: Math.floor(coordinates[0].length / 2),
		};
	}

	rotate = (rotateCount: number = 1) => {
		for (let r = 0; r < rotateCount; r++) {
			const n = this._coordinates.length;
			const x = Math.floor(n / 2);
			const y = n - 1;
			for (let i = 0; i < x; i++) {
				for (let j = i; j < y - i; j++) {
					const k = this._coordinates[i][j];
					this._coordinates[i][j] = this._coordinates[y - j][i];
					this._coordinates[y - j][i] = this._coordinates[y - i][y - j];
					this._coordinates[y - i][y - j] = this._coordinates[j][y - i];
					this._coordinates[j][y - i] = k;
				}
			}
		}
	};

	toString = () => {
		return this._coordinates.reduce((str, row) => {
			return str.concat(row.join(' '), '\n');
		}, '');
	};

	clone = () =>
		new Piece(this._sign, [...this._coordinates.map(row => [...row])]);
}

export default Piece;
