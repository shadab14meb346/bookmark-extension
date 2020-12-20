// $(function () {
// 	$("#spendAmount").click(function () {
// 		chrome.storage.sync.get("total", function (budget) {
// 			let newTotal = 0;
// 			if (budget.total) {
// 				newTotal += parseInt(budget.total);
// 			}
// 			const amount = $("#amount").val();
// 			if (amount) {
// 				newTotal += parseInt(amount);
// 			}

// 			chrome.storage.sync.set({total: newTotal});
// 			$("#total").text(newTotal);
// 			$("#amount").val("");
// 		});
// 	});
// });
console.log("from chrome extension content");

function docReady(fn) {
	// see if DOM is already available
	if (
		document.readyState === "complete" ||
		document.readyState === "interactive"
	) {
		// call on next available tick
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}
docReady(function () {
	// DOM is loaded and ready for manipulation here
	chrome.cookies.get(
		{url: "https://bookmarker-front.vercel.app/", name: "tweet-bookmarker"},
		function (cookie) {
			if (cookie) {
				chrome.browserAction.setPopup({popup: "popup.html"});
			} else {
				var newURL = "https://bookmarker-front.vercel.app/";
				chrome.tabs.create({url: newURL});
			}
		}
	);
});
