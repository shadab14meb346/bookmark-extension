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
const verifyTokenEndpoint =
	"https://backend-bookmarker.herokuapp.com/api/verifytoken";
const appUrl = "https://bookmarker-front.vercel.app/";

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
		async function (cookie) {
			if (cookie) {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: cookie.value,
					}),
				};
				const response = await fetch(verifyTokenEndpoint, options);
				if (response) {
					chrome.browserAction.setPopup({popup: "popup.html"});
					console.log(
						response.json().then((response) => console.log(response))
					);
				} else {
					chrome.tabs.create({url: appUrl});
				}
				chrome.browserAction.setPopup({popup: "popup.html"});
			} else {
				chrome.tabs.create({url: appUrl});
			}
		}
	);
});
