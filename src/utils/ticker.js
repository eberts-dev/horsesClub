function initTicker() {
	const ticker = document.querySelector('.ticker__content')
	if (!ticker) {
		console.log('Ticker content not found!')
		return
	}
	const originalContent = ticker.innerHTML
	ticker.innerHTML = originalContent + originalContent + originalContent
}

document.addEventListener('DOMContentLoaded', initTicker)
