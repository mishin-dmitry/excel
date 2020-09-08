// коды первой и последней буквы алфавита
const CODES = {
	A: 65,
	Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

// возвращает ширину из state по индексу
function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px';
}

// возвращает высоту из state по индексу
function getHeight(state, index) {
	return (state[index] || DEFAULT_HEIGHT) + 'px';
}

// функция для генерации новой ячейки c замыканием
function toCell(state, row) {
	return function(_, col) {
		return `
			<div
				class="cell"
				contenteditable="true"
				data-col="${col}"
				data-id="${row}:${col}"
				data-type="cell"
				style="width: ${getWidth(state, col)}"
			>
			</div>
		`
	}
}

// функция для генерации новой колонки и элемента ресайза
function toColumn({col, index, width}) {
	return `
		<div
			class="column"
			data-type="resizable"
			data-col="${index}"
			style="width=${width}"
		>
			${col}
			<!--добавим дата атрибут для делегирования обработки события-->
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

// функция для генерации новой строчки
function createRow(index, content, state) {
	// добавим дата атрибут для делегирования обработки события
	const resize =
		index ? '<div class="row-resize" data-resize="row"></div>' : '';
	const height = getHeight(state, index);

	return `
		<div
			class="row"
			data-type="resizable"
			data-row="${index}"
			style="height: ${height}"
		>
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

function withWidthFrom(state) {
	return function(col, index) {
		return {
			col, index, width: getWidth(state.colState, index)
		}
	}
}

export function createTable(rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	// делаем ряд с заголовками
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state))
		.map(toColumn)
		.join('')

	// делаем ряд с пустой ячейкой
	rows.push(createRow(null, cols, {}))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(state, row))
			.join('')

		rows.push(createRow(row + 1, cells, state.rowState))
	}

	return rows.join('')
}
