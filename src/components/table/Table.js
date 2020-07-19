import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
	// создадим статическое поле, чтобы к нему был доступ, без создания инстанста
	static className = 'excel__table'

	// метод возвращающий разметку компонента
	toHTML() {
		return createTable()
	}
}
