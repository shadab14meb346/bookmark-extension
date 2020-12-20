function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
let clientX;
let clientY;

let clickedButtonId;

function handleBMClick(bmButtonId, tweetLink, toggleDivId, x, y) {
	clickedButtonId = bmButtonId;
	const targetDivToToggle = document.getElementById(toggleDivId);
	const targetDivDisplay = targetDivToToggle.style.display;
	console.log({x, y});
	const menuDiv = document.createElement("div");
	const menu = `
<div class="css-1dbjc4n r-1d2f490 r-105ug2t r-u8s1d r-zchlnj r-ipm5af" style="right:${x} !important;top:${y} !important">
   <div class="css-1dbjc4n r-12vffkv">
      <div class="css-1dbjc4n r-12vffkv">
         <div class="css-1dbjc4n r-1pz39u2 r-16y2uox r-1wbh5a2">
            <div data-focusable="true" tabindex="0" class="css-1dbjc4n">
               <div class="css-1dbjc4n r-1p0dtai r-1d2f490 r-1xcajam r-zchlnj r-ipm5af"></div>
               <div class="css-1dbjc4n r-1d2f490 r-u8s1d r-zchlnj r-ipm5af"></div>
               <div role="menu" class="css-1dbjc4n r-14lw9ot r-z2wwpe r-1upvrn0 r-1ekmkwe r-1udh08x r-u8s1d" style="right: 829.812px; top: 664.438px;">
                  <div style="">
                     <div class="css-1dbjc4n">
                        <div class="css-1dbjc4n">
                           <div role="menuitem" data-focusable="true" tabindex="0" class="css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l r-1j3t67a r-9qu9m4 r-o7ynqc r-6416eg r-13qz1uu">
                              <div class="css-1dbjc4n r-1777fci"></div>
                              <div class="css-1dbjc4n r-16y2uox r-1wbh5a2">
                                 <div dir="auto" class="css-901oao r-18jsvk2 r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><input class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0" type="text" placeholder="Search"/></div>
                              </div>
                           </div>
                           <div role="menuitem" data-focusable="true" tabindex="0" class="css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l r-1j3t67a r-9qu9m4 r-o7ynqc r-6416eg r-13qz1uu">
                              <div class="css-1dbjc4n r-1777fci"></div>
                              <div class="css-1dbjc4n r-16y2uox r-1wbh5a2">
                                 <div dir="auto" class="css-901oao r-18jsvk2 r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0">Add Tweet to Bookmarks</span></div>
                              </div>
                           </div>
                           <div role="menuitem" data-focusable="true" tabindex="0" class="css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l r-1j3t67a r-9qu9m4 r-o7ynqc r-6416eg r-13qz1uu">
                              <div class="css-1dbjc4n r-1777fci"></div>
                              <div class="css-1dbjc4n r-16y2uox r-1wbh5a2">
                                 <div dir="auto" class="css-901oao r-18jsvk2 r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><span class="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0">Copy link to Tweet</span></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div data-focusable="true" tabindex="0" class="css-1dbjc4n"></div>
         </div>
      </div>
   </div>
</div>
`;
	// menuDiv.innerHTML = menu;
	// document.getElementById("layers").appendChild(menuDiv);
	// if (targetDivDisplay === "none") {
	// 	targetDivToToggle.style["display"] = "block";
	// } else {
	// 	targetDivToToggle.style["display"] = "none";
	// }
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
		handleBMClick(
			e.target.id,
			e.target.value,
			e.target.toggleDivId,
			e.clientX,
			e.clientY
		);
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

document.addEventListener("click", printMousePos);
function printMousePos(event) {
	clientX = event.clientX;
	clientY = event.clientY;
}
