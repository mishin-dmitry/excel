import {$} from '@core/dom';

export function resizeHandler($root, event) {
	return new Promise(resolve => {
		let cells = []
		let rows = []
		let resizedId = ''
		let value
		const $resizer = $(event.target)
		// получаем ближайшего родителя по условию
		const $parent = $resizer.closest('[data-type="resizable"]')
		const coords = $parent.getCoords()

		$resizer.css({
			opacity: 1
		})

		switch (event.target.dataset.resize) {
			case 'col': {
				resizedId = $parent.data.col
				cells = $root.findAll(`[data-col="${resizedId}"]`)

				break;
			}

			case 'row': {
				resizedId = $parent.data.row
				rows = $root.findAll(`[data-row="${resizedId}"]`)
			}
		}

		document.onmousemove = e => {
			switch (event.target.dataset.resize) {
				case 'col': {
					const delta = e.pageX - coords.right
					value = coords.width + delta
					$resizer.css({
						right: -delta + 'px',
						bottom: '-5000px'
					})
					break
				}

				case 'row': {
					const delta = e.pageY - coords.bottom
					value = coords.height + delta
					$resizer.css({
						bottom: -delta + 'px',
						right: '-5000px'
					})
				}
			}
		}

		document.onmouseup = () => {
			document.onmousemove = null
			document.onmouseup = null

			switch (event.target.dataset.resize) {
				case 'col': {
					$parent.css({width: value + 'px'})
					cells.forEach(el => el.style.width = value + 'px')
					break
				}

				case 'row': {
					$parent.css({height: value + 'px'})
					rows.forEach(el => el.style.height = value + 'px')
				}
			}

			resolve({
				value,
				id: event.target.dataset.resize === 'col' ?
					$parent.data.col :
					$parent.data.row,
				type: event.target.dataset.resize
			})

			$resizer.css({
				opacity: 0,
				bottom: 0,
				right: 0
			})
		}
	})
}
