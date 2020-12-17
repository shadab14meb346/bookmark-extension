function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

let clickedButtonId;

function handleBMClick(bmButtonId, tweetLink, toggleDivId) {
	clickedButtonId = bmButtonId;
	const targetDivToToggle = document.getElementById(toggleDivId);
	const targetDivDisplay = targetDivToToggle.style.display;
	if (targetDivDisplay === "none") {
		targetDivToToggle.style["display"] = "block";
	} else {
		targetDivToToggle.style["display"] = "none";
	}
	const message = {
		tweetLink,
	};
	chrome.runtime.sendMessage(message);
}

function addBMButton(mainDivHavingTweetActions) {
	const linkOfTweet = mainDivHavingTweetActions.parentNode.parentNode.firstChild.lastChild.lastChild.firstChild.querySelectorAll(
		"a"
	)[1];
	const containerId = uuidv4();
	const newContainer = document.createElement("div");
	newContainer.style.position = "relative";
	newContainer.style.border = "1px solid red";
	newContainer.id = containerId;
	const newButton = document.createElement("button");
	newButton.innerHTML = "BM";
	newButton.style.color = "#5b7082";
	newButton.style.display = "flex";
	newButton.style.alignItems = "center";
	newButton.id = uuidv4();
	const contentDiv = document.createElement("div");
	const contentDivId = uuidv4();
	contentDiv.id = contentDivId;
	contentDiv.style.border = "1px solid pink";
	contentDiv.style.top = "-120px";
	contentDiv.style.left = "-82px";
	contentDiv.style.display = "none";
	contentDiv.style.position = "absolute";
	contentDiv.style.background = "white";
	contentDiv.innerHTML = `<input type="text" placeholder="Search" />
        <h4>Tag1</h4>
				<h4>Tag2</h4>`;
	newButton.value = linkOfTweet;
	newButton.toggleDivId = contentDivId;

	newButton.addEventListener("click", function (e) {
		console.log(e.target.id, e.target.value, e.target.toggleDivId);
		handleBMClick(e.target.id, e.target.value, e.target.toggleDivId);
	});

	newContainer.appendChild(contentDiv);
	const layerNode = document.getElementById("layers");
	layerNode.appendChild(newContainer);
	newContainer.appendChild(newButton);
	mainDivHavingTweetActions.appendChild(newContainer);
}
const callbackForSectionMutation = function (_mutations) {
	const addedNodes = [];
	_mutations.forEach(
		(record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
	);
	const addedDivNodes = addedNodes.filter((node) => node.nodeName === "DIV");
	if (addedDivNodes.length) {
		for (const div of addedDivNodes) {
			const mainDivHavingTweetActions = div.querySelector(
				".css-1dbjc4n.r-18u37iz.r-1wtj0ep.r-156q2ks.r-1mdbhws"
			);
			if (mainDivHavingTweetActions) {
				addBMButton(mainDivHavingTweetActions);
			}
		}
	}
};

const callback = function (mutationsList) {
	const addedNodes = [];
	mutationsList.forEach(
		(record) => record.addedNodes.length & addedNodes.push(...record.addedNodes)
	);
	const sections = addedNodes.filter((node) => node.nodeName === "SECTION");

	for (const section of sections) {
		if (section.textContent.includes("Your Home Timeline")) {
			const observer = new MutationObserver(callbackForSectionMutation);
			const targetNode = section;
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.text == "saved successfully") {
		console.log(request.text);
		document.getElementById(clickedButtonId).style["background"] = "red";
		sendResponse({type: "response received"});
	}
});
