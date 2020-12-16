// let active_tab_id = 0;

// chrome.tabs.onActivated.addListener((tab) => {
// 	chrome.tabs.get(tab.tabId, (current_tab_info) => {
// 		active_tab_id = tab.tabId;

// 		if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
// 			chrome.tabs.executeScript(null, {file: "./foreground.js"}, () =>
// 				console.log("i injected")
// 			);
// 		}
// 	});
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	if (request.message === "yo check the storage") {
// 		chrome.tabs.sendMessage(active_tab_id, {message: "yo i got your message"});

// 		chrome.storage.local.get("password", (value) => {
// 			console.log(value);
// 		});
// 	}
// });
// chrome.tabs.onActivated.addListener((tab) => {
// 	// console.log(tab);
// 	chrome.tabs.get(tab.tabId, (current_tab_info) => {
// 		if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
// 			chrome.tabs.executeScript(null, {file: "./foreground.js"}, () =>
// 				console.log("I injected foreground")
// 			);
// 		}
// 	});
// });
// console.log("from background");
// chrome.tabs.executeScript(null, {file: "./foreground.js"}, () =>
// 	console.log("I injected foreground")
// );
console.log("background running");

chrome.runtime.onMessage.addListener(receiver);

async function receiver(request, sender, sendResponse) {
	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data: request.tweetLink,
			}),
		};
		const data = await fetch(
			"https://backend-bookmarker.herokuapp.com/demo",
			options
		);
		console.log(data.json());
	} catch (error) {
		console.error(error);
	}
}
