import {capitalize} from '@core/utils';

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('$root did not provide for DomListenter')
		}
		// корневой элемент для которого вешаем событие (инстанс класса Dom)
		this.$root = $root
		// массив событий
		this.listeners = listeners
	}

	// метод для добавления прослушки событий
	initDomListeners() {
		// работает только где есть прослушка, если прослушки нет, то игнорируется
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(`Method ${method} doesn't exist in ${this.name || ''}`)
			}
			// привяжем контекст, чтобы в других классах был доступ к this.$root
			// TODO запомнить что bind создает новую функцию и
			// TODO при удалении прослушки может ничего не происхоидть
			// TODO так как используем другой cb
			// забайндим метод на текущий контекст с переопределением метода,
			// если передадим без переопределения, то читать TODO
			this[method] = this[method].bind(this)
			this.$root.on(listener, this[method])
		})
	}

	// метод для удаления прослушки событий
	removeDomListeners() {
		// работает только где есть прослушка, если прослушки нет, то игнорируется
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)

			this.$root.off(listener, this[method])
		})
	}
}

// метод для формирования названия методы, input => onInput
function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}
