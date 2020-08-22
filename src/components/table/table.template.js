// коды первой и последней буквы алфавита
const CODES = {
	A: 65,
	Z: 90
}

// функция для генерации новой ячейки c замыканием
function toCell(row) {
	return function(_, col) {
		return `
			<div
				class="cell"
				contenteditable="true"
				data-col="${col}"
				data-id="${row}:${col}"
				data-type="cell"
			>
			</div>
		`
	}
}

// функция для генерации новой колонки и элемента ресайза
function toColumn(col, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<!--добавим дата атрибут для делегирования обработки события-->
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

// функция для генерации новой строчки
function createRow(index, content) {
	// добавим дата атрибут для делегирования обработки события
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
	return `
		<div class="row" data-type="resizable" data-row="${index}">
		 <div class="row__info">
			${index ? index : ''}
			${resize}
		</div>
		<div class="row__data">${content}</div>
		</div>
	`
}

// преобразуем код символа к символу
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	// делаем ряд с заголовками
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')

	// делаем ряд с пустой ячейкой
	rows.push(createRow(null, cols))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(row))
			.join('')

		rows.push(createRow(row + 1, cells))
	}

	return rows.join('')
}
