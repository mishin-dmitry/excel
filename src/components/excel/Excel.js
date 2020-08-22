import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || [];
		this.emitter = new Emitter()
	}

	// Формируем рутовую ноду с классом excel
	getRoot() {
		// создадим рутовую ноду
		const $root = $.create('div', 'excel')
		const componentOptions = {
			emitter: this.emitter
		}

		// преобразуем массив классов в массив инстансов и вернем его
		this.components = this.components.map(Component => {
			// создадим ноду для итеррируемого компонента
			const $el = $.create('div', Component.className)
			// создадим инстанс итеррируемого компонента
			const component = new Component($el, componentOptions)
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

	// уничтожаем компоненты
	destroy() {
		this.components.forEach((component => component.destroy()))
	}
}
