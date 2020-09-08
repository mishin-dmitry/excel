import {DomListener} from '@core/DomListener';

// базовый класс от которого наследуются компоненты
export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.store = options.store;
		this.unsubscribes = [];
		this.storeSub = null;

		this.prepare();
	}

	// Настраивакм компонент до метода init
	prepare() {
	}

	// абстрактный метод для возврата шаблона компонента
	toHTML() {
		return '';
	}

	// Уведомляем слушателей про событие event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	// Подписываемся на событие event
	$on(event, fn) {
		const unsubscribe = this.emitter.subscribe(event, fn);
		this.unsubscribes.push(unsubscribe);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	$subscribe(fn) {
		this.storeSub = this.store.subscribe(fn);
	}

	// метод для инициализации компонента + прослушка
	init() {
		this.initDomListeners();
	}

	// метод для удаления компонента и чистки прослушок
	destroy() {
		this.removeDomListeners();
		this.unsubscribes.forEach(unsub => unsub());
		this.storeSub.unsubscribe()
	}
}
