const CODES = {
	A: 65,
	Z: 90
}

function toCell() {
	return `<div class="cell" contenteditable="true"></div>`
}

function toColumn(col) {
	return `<div class="column">${col}</div>`
}

function createRow(index, content) {
	return `
		<div class="row">
		 <div class="row__info">${index ? index : ''}</div>
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

	// делаем ряд с пустыми ячейками
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
