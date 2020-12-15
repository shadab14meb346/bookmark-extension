var callback = function (mutationsList) {
	const addedNodes = [];
	mutationsList.forEach(
		(record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
	);
	// const sections = addedNodes.filter((node) => node.nodeName === "SECTION");
	// const sectionContainingTweets = [];
	// for (const section of sections) {
	// 	if (section.textContent.includes("Your Home Timeline")) {
	// 		// console.log(section.lastChild.lastChild);
	// 	}
	// }
	// console.log(addedNodes);
	const textnode = document.createTextNode("BM");

	const allDiv = document.querySelectorAll(".r-1mdbhws");
	for (const div of allDiv) {
		div.style["background"] = "red";
		// div.appendChild(textnode);
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
