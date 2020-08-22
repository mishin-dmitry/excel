export class TableSelection {
	static className = 'selected'
	constructor() {
		// массив с выбранными ячейками
		this.group = [];
		this.current = null
	}

	// $el инстанс класса DOM
	select($el) {
		this.clear()
		this.group.push($el)
		this.current = $el
		$el.focus();
		$el.addClass(TableSelection.className)
	}

	selectGroup($group = []) {
		this.clear()
		this.group = $group
		this.group.forEach($el => $el.addClass(TableSelection.className))
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className))
		this.group = []
	}
}
