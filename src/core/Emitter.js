export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// dispatch, trigger, fire
	// Уведомляем слушателей, при их наличии
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) return false
		this.listeners[event].forEach(listener => {
			listener(...args)
		})
		return true
	}

	// подписка на уведомление или добавляем нового слушателя
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)

		// отписка
		return () => {
			this.listeners[event] = this.listeners[event]
				.filter(listener => listener !== fn)
		}
	}
}
