// console.log("from chrome extension content", document.readyState);
// // console.log({document: document.getElementById("react-root")});
// // const root = document.getElementsByTagName("main");
// // console.log(root.children.lastChild.children.lastChild);
// // const containerHavingAllTweets = document.querySelector("#react-root")
// // 	.lastElementChild.lastElementChild.lastElementChild.lastElementChild
// // 	.lastElementChild.lastElementChild.lastElementChild.firstElementChild
// // 	.lastElementChild.lastElementChild.lastElementChild.lastElementChild
// // 	.lastElementChild.lastElementChild.lastElementChild;
// // const containerHavingAllTweets = document.querySelector("#react-root")
// // 	.lastElementChild.lastElementChild.lastElementChild;
// // console.log(containerHavingAllTweets);

// function docReady(fn) {
// 	// see if DOM is already available
// 	if (
// 		document.readyState === "complete" ||
// 		document.readyState === "interactive"
// 	) {
// 		// call on next available tick
// 		setTimeout(fn, 1);
// 	} else {
// 		document.addEventListener("DOMContentLoaded", fn);
// 	}
// }

// docReady(() => {
// 	const containerHavingAllTweets = document.querySelector("#react-root")
// 		.lastElementChild.lastElementChild.lastElementChild.lastElementChild
// 		.lastElementChild.lastElementChild.lastElementChild.firstElementChild
// 		.lastElementChild.lastElementChild.lastElementChild.lastElementChild
// 		.lastElementChild.lastElementChild;
// 	console.log(containerHavingAllTweets);
// });
// (function () {
// 	if (window.top === window) {
// 		if (document.readyState === "loading") {
// 			document.addEventListener("DOMContentLoaded", setLoaded);
// 		} else {
// 			setLoaded();
// 		}
// 	}
// })();

// Callback function to execute when mutations are observed
const yourHomeTimeLineAreaLabel = "Timeline: Your Home Timeline";
var callback = function (mutationsList) {
	// const addedNodes = [];
	// mutationsList.forEach(
	// 	(record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
	// );
	// for (const mutation of mutationsList) {
	// 	if (mutation.addedNodes.length) {
	// 		addedNodes.push(...mutation.addedNodes);
	// 	}
	// }
	console.log(mutationsList);
	const requiredNodes = [];
	const requiredDivClass = "css-1dbjc4n r-aqfbo4 r-16y2uox";

	// for (const node of mutationsList) {
	// 	if (node.className === requiredDivClass) {
	// 		requiredNodes.push(node);
	// 	}
	// }

	// for (const node of requiredNodes) {
	// 	console.log(node.lastChild.firstChild.lastChild.lastChild);
	// }
	// console.log({requiredNodes});
	// for (const node of addedNodes) {
	// 	const isASection = node.tagName === "SECTION";
	// 	const lastChild = node.lastChild;
	// 	if (
	// 		node.getAttribute("class") === "css-1dbjc4n" &&
	// 		isASection &&
	// 		lastChild.getAttribute("aria-label") === yourHomeTimeLineAreaLabel
	// 	) {
	// 		// const mainContainer = node.childNodes[1].lastChild;
	// 		// for (const tweetContainer of mainContainer.children) {
	// 		// 	tweetContainer.style["border"] = "1px solid red";
	// 		// }
	// 		// for (const child of node.lastChild.children) {
	// 		// 	console.log(child);
	// 		// }
	// 		// console.log(node.lastChild.children[0]);
	// 		// console.log(node.childNodes[1].lastChild);
	// 		// node.childNodes[1].lastChild.style["border"] = "1px solid red";
	// 		// node.lastChild.style["border"] = "1px solid red";
	// 	}
	// }
	// console.log(mutationsList);
	// const spans = document.getElementsByTagName("span");
	// for (const span of spans) {
	// 	span.style["color"] = "green";
	// }
	// console.log(mutationsList);
	// for (var mutation of mutationsList) {
	// 	// const childElementCount = mutation.target.childElementCount;
	// 	if (mutation.target.tagName == "DIV") {
	// 		// const style = "position: absolute; width: 100%;";
	// 		const style1 = "position: absolute; width: 100%; transform: translateY(";
	// 		// console.log(mutation.target, mutation.target.attributes.style);
	// 		const hasStyleAttribute = mutation.target.attributes.style;
	// 		// console.log(hasStyleAttribute);
	// 		if (hasStyleAttribute) {
	// 			console.log(hasStyleAttribute);
	// 			console.log(mutation.target);
	// 			// mutation.target.style["background"] = "red";
	// 		}
	// 		// 	console.log(mutation.target, mutation.target.attributes.style);
	// 		// mutation.target.style["background"] = "red";
	// 		// console.log(mutation.target, childElementCount);
	// 	}
	// 	// if (console)
	// 	// 	console.log({mutation, count: mutation.target.childElementCount});
	// }
	// const minHeightStyle = "position: relative; min-height: ";
	// // const divContainingActions = document.querySelectorAll(".r-1mdbhws");
	// // const _divContainingActions = document.querySelectorAll(".r-a2tzq0");
	// // const ourBookmark = document.createElement;
	// const textnode = document.createTextNode("BM");
	// const newDiv = document.createElement("div");
	// // add the text node to the newly created div
	// newDiv.appendChild(textnode);
	// for (const div of divContainingActions) {
	// 	div.style["background"] = "red";
	// 	// div.appendChild(textnode);
	// }
	// for (const div of _divContainingActions) {
	// 	div.style["background"] = "red";
	// 	div.appendChild(newDiv);
	// }
	// for (const mutation of mutationsList) {
	// 	const target = mutation.target;
	// 	const targetStyle = target.getAttribute("style");
	// 	const isADiv = target.tagName == "DIV";
	// 	// const haveChild = target;
	// 	if (isADiv && targetStyle && targetStyle.includes(minHeightStyle)) {
	// 		// target.style["background"] = "red";
	// 		console.log(target);

	// 		// if (targetStyle.includes("minHeightStyle")) {
	// 		// 	console.log(target, targetStyle);
	// 		// }
	// 	}
	// }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
// var targetNode = document.querySelector(
// 	".css-1dbjc4n.r-1jgb5lz.r-1ye8kvj.r-13qz1uu"
// );
const targetNode = document.querySelector("#react-root");
// console.log(targetNode, "targetNode");
observer.observe(targetNode, {
	childList: true,
	attributes: true,
	characterData: true,
	subtree: true,
});
// function setLoaded() {
// 	if (chrome) {
// 		chrome.runtime.onMessage.addListener(function (request) {
// 			const {action: name, payload: message} = request;
// 			handleMessage({name, message});
// 		});
// 	}

// 	// if (typeof safari !== "undefined") {
// 	// 	safari.self.addEventListener("message", handleMessage);
// 	// }

// 	// Inject styles at page level to avoid overhead
// 	// saveButtonStyles();

// 	// Check if user has twitter integration iturned on
// 	// chrome.runtime.sendMessage({type: CHECK_TWITTER_INTEGRATION});
// }

// function handleMessage(event) {
// 	const {message, name = "Unknown Action"} = event || {};

// 	console.groupCollapsed(`RECEIVEfddfdffdfd: ${name}`);
// 	console.log(message);
// 	console.groupEnd(`RECEIVEfdsffdffd: ${name}`);
// }
