import {$} from '@core/dom';

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || [];
	}

	// Формируем рутовую ноду с классом excel
	getRoot() {
		// создадим рутовую ноду
		const $root = $.create('div', 'excel')

		// преобразуем массив классов в массив инстансов и вернем его
		this.components = this.components.map(Component => {
			// создадим ноду для итеррируемого компонента
			const $el = $.create('div', Component.className)
			// создадим инстанс итеррируемого компонента
			const component = new Component($el)
			// добавим содержимое для итеррируемого компонента
			$el.html(component.toHTML())
			// заапендим ноду в рутовую ноду
			$root.append($el)

			return component
		})

		return $root;
	}

	// рендерим основной компонент
	render() {
		this.$el.append(this.getRoot())

		this.components.forEach(component => component.init())
	}
}
