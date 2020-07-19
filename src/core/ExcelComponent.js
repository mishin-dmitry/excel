import {DomListener} from '@core/DomListener';

// базовый класс от которого наследуются компоненты
export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || ''
	}

	// абстрактный метод для возврата шаблона компонента
	toHTML() {
		return ''
	}

	// метод для инициализации прослушки
	init() {
		this.initDomListeners()
	}

	// метод для снятия прослушки
	destroy() {
		this.removeDomListeners()
	}
}
