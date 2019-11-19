import * as R from 'ramda';
import * as Matrix from './MatrixTransform';

// TODO create ccw
// axis 0 rotation
export const rotate0 = <T>(piece: T[][][]) => {
	// TODO compose or pipe
	return Matrix.flipMatrix(R.clone(rotate1ccw(Matrix.flipMatrix(R.clone(piece)))));
};

// axis 1 rotation
export const rotate1 = <T>(piece: T[][][]) => {
	return piece.map((layer) => Matrix.rotateMatrixClockwise(layer));
};

// axis 1 rotation ccw
export const rotate1ccw = <T>(piece: T[][][]) => {
	return R.clone(piece).map((layer) => Matrix.rotateMatrixCounterClockwise(layer));
};

// axis 2 rotation
export const rotate2 = <T>(piece: T[][][]) => {
	return Matrix.rotateMatrixCounterClockwise(R.clone(piece));
};

// axis 2 rotation ccw
export const rotate2ccw = <T>(piece: T[][][]) => {
	return Matrix.rotateMatrixClockwise(R.clone(piece));
};

export function* checkAll(piece: number[][][]) {
	let p = piece;
	yield p;
	yield (p = rotate2(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));

	yield (p = rotate1(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));

	yield (p = rotate1(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));

	yield (p = rotate1ccw(p));
	yield (p = rotate2ccw(p));
	yield (p = rotate2ccw(p));
	yield (p = rotate2ccw(p));

	yield (p = rotate1(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));
	yield (p = rotate2(p));

	yield (p = rotate1ccw(p));
	yield (p = rotate2ccw(p));
	yield (p = rotate2ccw(p));
	yield (p = rotate2ccw(p));
}
