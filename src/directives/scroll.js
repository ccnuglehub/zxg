const scrollCallback = callback => {
	let timer = null
	clearTimeout(timer)
	timer = setTimeout(() => {
		callback()
	}, 150)
}
let callBackWarpped
export default {
	inserted(el, binding) {
		const fn = binding.value
		if (typeof fn !== 'function') {
			console.error('The param of directive v-scroll must be a function!')
			return
		}
		callBackWarpped = scrollCallback.bind({}, binding.value)
		window.addEventListener('scroll', callBackWarpped)
		return
	},
	unbind() {
		window.removeEventListener('scroll', callBackWarpped)
		return true
	},
}