class PieceFormatter {
	private static formatPiece = (piece: string[]) => {
		return piece.map(layer =>
			layer
				.trim()
				.split('\n')
				.map(row =>
					row
						.trim()
						.split('')
						.map(tile => Number(tile)),
				),
		);
	};

	public static formatPieces = (pieces: string[][]) => {
		return pieces.map(piece => PieceFormatter.formatPiece(piece));
	};
}

export default PieceFormatter;
