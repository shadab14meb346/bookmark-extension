console.log("background running");

chrome.runtime.onMessage.addListener(receiver);
const createTweetEndpoint =
	"https://backend-bookmarker.herokuapp.com/api/tweet-test";
const verifyTokenEndpoint =
	"https://backend-bookmarker.herokuapp.com/api/verifytoken";
const appUrl = "https://bookmarker-front.vercel.app/";
async function receiver(request, sender, sendResponse) {
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
				const user = response.json().then((data) => data.user);
				if (user) {
					try {
						const options = {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${cookie.value}`,
							},
							body: JSON.stringify({
								tweet: {
									tweetUrl: request.tweetUrl,
								},
								notes: "from extension action",
							}),
						};
						const response = await fetch(createTweetEndpoint, options);
						const data = response.json().then((response) => response);
						if (data) {
							chrome.tabs.query(
								{active: true, currentWindow: true},
								function (tabs) {
									chrome.tabs.sendMessage(
										tabs[0].id,
										{text: "saved successfully"},
										function (response) {
											if (response.type == "response received") {
												console.log(response.type);
											}
										}
									);
								}
							);
						} else {
							console.log("ERROR");
						}
					} catch (error) {
						console.error(error);
					}
				} else {
					chrome.tabs.create({url: appUrl});
				}
			} else {
				chrome.tabs.create({url: appUrl});
			}
		}
	);
}
