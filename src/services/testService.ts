export const factorial = (num: number, currentValue = 0) => {
	while (num > 0) {
		if ([0, 1].includes(currentValue)) {
			currentValue = 1;
		} else {
			currentValue = currentValue * factorial(num - 1, currentValue);
		}
	}
	return currentValue;
};
