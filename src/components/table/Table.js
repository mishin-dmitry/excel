import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
	// создадим статическое поле, чтобы к нему был доступ, без создания инстанста
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		})
	}

	// метод возвращающий разметку компонента
	toHTML() {
		return createTable()
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
		}
	}
}
