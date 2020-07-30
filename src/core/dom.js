// создадим класс-утилиту для взаимодействия с дом деревом, потипу jQuery

class Dom {
	constructor(selector) {
		// проверим если селектор - строка, то получим эту ноду
		this.$el = typeof selector === 'string' ?
			document.querySelector(selector) :
			selector
	}

	// метод для формирования контена ноды, возвращаем this для чейнинга
	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.outerHTML.trim()
	}

	// метод для очистки контента ноды, возвращаем this для чейнинга
	clear() {
		this.html('')
		return this
	}

	// метод добавления прослушки события для инстанса, короче, чем нативный
	on(eventType, cb) {
		this.$el.addEventListener(eventType, cb)
	}

	// метод удаления прослушки события для инстанса, короче, чем нативный
	off(eventType, cb) {
		this.$el.removeEventListener(eventType, cb)
	}

	// метод для аппенда в ноду
	append(node) {
		// если передали инстанс, то у него нода находится в $el
		if (node instanceof Dom) {
			node = node.$el
		}

		// проверим если в прототипе аппенд, если нет, выполним старый апенд метод,
		// возвращаем this для чейнинга
		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}

		return this
	}

	closest(selector) {
		return $(this.$el.closest(selector))
	}

	// получаем координаты элемента
	getCoords() {
		return this.$el.getBoundingClientRect()
	}

	get data() {
		return this.$el.dataset
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach(key => this.$el.style[key] = styles[key])
	}
}

// event.target
// обертка для создания Dom инстанса
export function $(selector) {
	return new Dom(selector)
}

// метод для создания нового инстанса Dom с указанием тэга и класса
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}
