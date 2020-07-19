import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
	// создадим статическое поле, чтобы к нему был доступ, без создания инстанста
	static className = 'excel__header'

	// метод возвращающий разметку компонента
	toHTML() {
		return `
			<input type="text" class="input" value="Новая таблица"/>
			<div>
				<div class="button">
					<span class="material-icons">delete</span>
				</div>
				<div class="button">
					<span class="material-icons">exit_to_app</span>
				</div>
			</div>
		`
	}
}
