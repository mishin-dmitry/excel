import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
	// создадим статическое поле, чтобы к нему был доступ, без создания инстанста
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

	// метод возвращающий разметку компонента
	toHTML() {
		return createTable()
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell)

		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})

		this.$on('formula:enterPress', () => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
		} else if (isCell(event)) {
			// нажатая ячейка
			const $target = $(event.target)

			// позволяет выбирать множество ячеек else одну ячейку
			if (event.shiftKey) {
				// ячейка на которую мы кликнули с зажатым шифтом
				const target = $target.id(true)
				// выбранная ячейка
				const current = this.selection.current.id(true)

				const $cells = matrix(target, current)
					.map(id => this.$root.find(`[data-id="${id}"]`))

				this.selection.selectGroup($cells)
			} else {
				this.selection.select($target)
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Tab',
			'Enter',
			'ArrowLeft',
			'ArrowDown',
			'ArrowUp',
			'ArrowRight'
		]

		const {key} = event;

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}
}

