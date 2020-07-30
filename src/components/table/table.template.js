// коды первой и последней буквы алфавита
const CODES = {
	A: 65,
	Z: 90
}

// функция для генерации новой ячейки
function toCell(_, col) {
	return `<div class="cell" contenteditable="true" data-col="${col}"></div>`
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
	const cells = new Array(colsCount)
		.fill('')
		.map(toCell)
		.join('')

	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(i + 1, cells))
	}

	return rows.join('')
}
