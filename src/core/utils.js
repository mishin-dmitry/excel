// метод, для преведения перой буквы строки к верхнему регистру
export function capitalize(string) {
	if (typeof string !== 'string') {
		return ''
	}

	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
	// меняем местами если старт больше чем конец
	if (start > end) {
		[end, start] = [start, end]
	}

	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index)
}

export function storage(key, value = null) {
	if (!value) {
		return JSON.parse(localStorage.getItem(key))
	}

	localStorage.setItem(key, JSON.stringify(value))
}
