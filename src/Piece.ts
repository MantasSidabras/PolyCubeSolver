import IPosition from './IPosition';

class Piece {
	private _coordinates: number[][][];
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
		for (const layer of this.coordinates) {
			for (const row of layer) {
				for (const value of row) {
					if (value === 1) {
						s++;
					}
				}
			}
		}
		return s;
	}

	get dimensionSize() {
		return this._coordinates.reduce((acc, layer) => {
			const addLayer = layer.some((row) => row.some((value) => value === 1));
			return addLayer ? acc + 1 : acc;
		}, 0);
	}

	constructor(sign: number, coordinates: number[][][]) {
		this._sign = sign;
		this._coordinates = coordinates;
		this._center = {
			layer: Math.floor(coordinates.length / 2),
			row: Math.floor(coordinates[0].length / 2),
			col: Math.floor(coordinates[0][0].length / 2),
		};
	}

	toString = () => {
		return this._coordinates.reduce((str, row) => {
			return str.concat(row.join(' '), '\n');
		}, '');
	};

	clone = () => new Piece(this._sign, [ ...this._coordinates.map((row) => [ ...row ]) ]);
}

export default Piece;
