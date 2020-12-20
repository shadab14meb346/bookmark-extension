console.log("background running");

chrome.runtime.onMessage.addListener(receiver);
const createTweetEndpoint =
	"https://backend-bookmarker.herokuapp.com/api/tweet-test";
async function receiver(request, sender, sendResponse) {
	chrome.cookies.get(
		{url: "https://bookmarker-front.vercel.app/", name: "tweet-bookmarker"},
		async function (cookie) {
			if (cookie) {
				try {
					const options = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${cookie.value}`,
						},
						body: JSON.stringify({
							tweet: {
								tweetUrl: request.tweetLink,
							},
							notes: "from extension action",
						}),
					};
					const data = await fetch(createTweetEndpoint, options);
					console.log(data.json().then((data) => console.log(data)));
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
				} catch (error) {
					console.error(error);
				}
			} else {
				var newURL = "https://bookmarker-front.vercel.app/";
				chrome.tabs.create({url: newURL});
			}
		}
	);
}
