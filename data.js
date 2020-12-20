const state = {
	href: document.location.href,
};
window.addEventListener("load", () => {
	const bodyList = document.querySelector("body");
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (state.href != document.location.href) {
				state.href = document.location.href;
				inspect.initialize();
				//inject button
			}
		});
	});

	var config = {
		childList: true,
		subtree: true,
	};

	observer.observe(bodyList, config);
});
