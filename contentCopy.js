var callback = function (mutationsList) {
	const addedNodes = [];
	mutationsList.forEach(
		(record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
	);
	const sections = addedNodes.filter((node) => node.nodeName === "SECTION");
	const _callback = function (_mutations) {
		const addedNodes = [];
		_mutations.forEach(
			(record) =>
				record.addedNodes.length & addedNodes.push(...record.addedNodes)
		);
		const addedDivNode = addedNodes.filter((node) => node.nodeName === "DIV");
		const divHavingTweets = addedDivNode.filter((node) =>
			node.innerText.includes(
				`<div style="position: absolute; width: 100%; transform: translateY`
			)
		);
		if (addedDivNode.length) {
			for (const div of addedDivNode) {
				const mainDivHavingTweetActions = div.querySelector(
					".css-1dbjc4n.r-18u37iz.r-1wtj0ep.r-156q2ks.r-1mdbhws"
				);
				if (mainDivHavingTweetActions) {
					const newDiv = document.createElement("div");
					newDiv.innerHTML = "BM";
					newDiv.style.color = "#5b7082";
					newDiv.style.display = "flex";
					newDiv.style.alignItems = "center";
					mainDivHavingTweetActions.appendChild(newDiv);
				}
			}
		}
	};

	for (const section of sections) {
		if (section.textContent.includes("Your Home Timeline")) {
			const targetSection = section;
			const observer = new MutationObserver(_callback);
			const targetNode = targetSection;
			observer.observe(targetNode, {
				childList: true,
				attributes: true,
				characterData: true,
				subtree: true,
			});
		}
	}
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
const targetNode = document.querySelector("#react-root");
observer.observe(targetNode, {
	childList: true,
	attributes: true,
	characterData: true,
	subtree: true,
});
