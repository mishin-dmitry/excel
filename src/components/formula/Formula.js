import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
	// создадим статическое поле, чтобы к нему был доступ, без создания инстанста
	static className = 'excel__formula'

	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input']
		});
	}

	// метод возвращающий разметку компонента
	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable="true" spellcheck="false"></div>
		`
	}

	onInput(event) {
		console.log(this.$root)
	}
}
