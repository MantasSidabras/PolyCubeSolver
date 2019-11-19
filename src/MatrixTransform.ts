export const rangeFrom = <T>({ length }: Array<T>) => [...Array(length).keys()];

export const flipMatrix = <T>(matrix: T[][]) =>
	rangeFrom(matrix).map((_, index) => matrix.map(row => row[index]));

export const flipMatrixHorizontal = <T>(matrix: T[][]) =>
	rotateMatrixClockwise(matrix).reverse();

export const rotateMatrixClockwise = <T>(matrix: T[][]) =>
	flipMatrix(matrix.reverse());

export const rotateMatrixCounterClockwise = <T>(matrix: T[][]) =>
	flipMatrix(matrix).reverse();
