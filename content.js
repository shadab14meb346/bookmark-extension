function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
const icon = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.66943 6.48962L12.6836 11.694C12.9009 11.8194 13.0595 12.0261 13.1245 12.2685C13.1894 12.5109 13.1554 12.7692 13.0299 12.9865L10.3489 17.6302C10.2234 17.8475 10.0168 18.0061 9.77436 18.0711C9.53195 18.136 9.27367 18.102 9.05633 17.9765L0.861644 13.2453C0.644307 13.1199 0.485718 12.9132 0.420766 12.6708C0.355813 12.4284 0.389816 12.1701 0.515296 11.9528L3.66943 6.48962Z" fill="#9966FF"/>
        <path d="M12.3303 3.02086L5.64714 3.72652C5.50264 3.74174 5.36379 3.79091 5.24192 3.87001C5.12004 3.9491 5.01858 4.05589 4.94583 4.18166L0.51748 11.8518C0.334963 12.1679 0.359016 12.6203 0.576446 12.9886C0.619582 12.5451 0.902969 12.1723 1.34901 12.1445L8.31814 11.4081C8.46264 11.3929 8.60149 11.3437 8.72337 11.2646C8.84524 11.1855 8.9467 11.0788 9.01945 10.953L13.0016 4.05562C13.0651 3.94505 13.0969 3.81911 13.0934 3.69165C13.09 3.5642 13.0514 3.44016 12.982 3.3332C12.9126 3.22624 12.8151 3.14049 12.7001 3.08538C12.5851 3.03028 12.4571 3.00795 12.3303 3.02086Z" fill="url(#paint0_linear)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2141 8.88377L9.01575 10.9594C8.86827 11.2148 8.6105 11.3811 8.31629 11.4113L1.34899 12.1445C0.902955 12.1723 0.621413 12.5419 0.576433 12.9885L0.580121 12.9822C0.432811 12.736 0.37437 12.4468 0.41455 12.1628C0.436266 12.0401 0.478541 11.922 0.53959 11.8134L4.22681 5.427L10.2141 8.88377Z" fill="url(#paint1_linear)"/>
        <defs>
        <linearGradient id="paint0_linear" x1="9.87502" y1="2.56127" x2="6.06059" y2="9.16805" gradientUnits="userSpaceOnUse">
        <stop offset="0.317708" stop-color="#3CC8F3"/>
        <stop offset="1" stop-color="#0090BC"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="2.58415" y1="8.27216" x2="9.26118" y2="12.1271" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9966FF"/>
        <stop offset="1" stop-color="#1C0054"/>
        </linearGradient>
        </defs>
        </svg>
`;
let clientX;
let clientY;

let clickedButtonId;
//key will tweet url and value will be profile pic
const tweetAuthorProfilePic = {};

function handleBMClick(bmButtonId, tweet, toggleDivId, x, y) {
	clickedButtonId = bmButtonId;
	console.log({x, y});
	const message = {
		tweetUrl: tweet.tweetUrl,
		text: tweet.text,
		date: tweet.date,
		profileUrl: tweetAuthorProfilePic[tweet.tweetUrl],
	};
	chrome.runtime.sendMessage(message);
}
function addBMButton(mainDivHavingTweetActions, tweetUrl, tweetText, date) {
	const containerId = uuidv4();
	const newContainer = document.createElement("div");
	newContainer.style.display = "flex";
	newContainer.style.alignItems = "center";
	newContainer.style.justifyContent = "center";
	newContainer.style.height = "100%";
	newContainer.style.width = "34px";
	newContainer.id = containerId;
	const newButton = document.createElement("button");
	newButton.innerHTML = icon;
	newButton.style.color = "#5b7082";
	newButton.style.display = "flex";
	newButton.style.alignItems = "center";
	newButton.style.background = "none";
	newButton.style.border = "none";
	newButton.style.cursor = "pointer";
	newButton.id = uuidv4();
	const contentDiv = document.createElement("div");
	const contentDivId = uuidv4();
	contentDiv.id = contentDivId;
	newButton.style.display = "flex";
	newButton.style.alignItems = "center";
	newButton.style.justifyContent = "center";
	contentDiv.style.display = "flex";
	contentDiv.style.alignItems = "center";
	contentDiv.style.justifyContent = "center";
	contentDiv.style.height = "34px";
	contentDiv.style.width = "34px";
	contentDiv.style.borderRadius = "50%";
	newButton.value = tweetUrl;
	newButton.toggleDivId = contentDivId;
	contentDiv.addEventListener("mouseenter", function () {
		if (contentDiv.style.background !== "rgb(71, 184, 255)") {
			contentDiv.style.background = "#a1d6f7";
			contentDiv.style.transitionDuration = "0.2s";
			contentDiv.style.transitionProperty = "background";
		}
	});
	contentDiv.addEventListener("mouseleave", function () {
		if (contentDiv.style.background !== "rgb(71, 184, 255)") {
			contentDiv.style.background = "none";
		}
	});

	newButton.addEventListener("click", function (e) {
		const tweet = {
			tweetUrl,
			text: tweetText,
			date,
		};
		handleBMClick(
			contentDivId,
			tweet,
			e.target.toggleDivId,
			e.clientX,
			e.clientY
		);
	});
	contentDiv.appendChild(newButton);
	newContainer.appendChild(contentDiv);
	const layerNode = document.getElementById("layers");
	layerNode.appendChild(newContainer);
	function insertAfter(newNode, existingNode) {
		existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
	}
	insertAfter(newContainer, mainDivHavingTweetActions.childNodes[2]);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.text == "saved successfully") {
		console.log(request.text);
		document.getElementById(clickedButtonId).style["background"] = "#47b8ff";
		sendResponse({type: "response received"});
	}
});
/** this symbol '!' before the below anonymous function is a function expression.A good explanation about it's use is here
https://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function
*/
!(function (window) {
	"use strict";
	const observer = window.MutationObserver || window.WebKitMutationObserver;
	var t,
		r = [],
		n = window.document;
	function a() {
		for (var e, t, o = 0, a = r.length; o < a; o++) {
			e = r[o];
			for (
				var s, i = 0, l = (t = n.querySelectorAll(e.selector)).length;
				i < l;
				i++
			)
				(s = t[i]).ready || ((s.ready = true), e.fn.call(s, s));
		}
	}
	window.ready = function (e, s) {
		r.push({selector: e, fn: s}),
			t ||
				(t = new observer(a)).observe(n.documentElement, {
					childList: true,
					subtree: true,
				}),
			a();
	};
})(this);
const moreInTwitterSupportedLanguages = [
	"المزيد",
	"আরও",
	"Gehiago",
	"More",
	"Още",
	"Més",
	"Više",
	"Víc",
	"Mere",
	"Meer",
	"More",
	"Higit pa",
	"Lisää",
	"Plus",
	"Máis",
	"Mehr",
	"Περισσότερα",
	"વધુ",
	"עוד",
	"और अधिक",
	"Még több",
	"Selengkapnya",
	"Tuilleadh",
	"Altro",
	"もっと見る",
	"ಮತ್ತಷ್ಟು",
	"더 보기",
	"Lagi",
	"अधिक",
	"Mer",
	"بیشتر",
	"Więcej",
	"Mais",
	"Mai multe",
	"Еще",
	"Још",
	"更多",
	"Viac",
	"Más opciones",
	"Mer",
	"மேலும்",
	"เพิ่มเติม",
	"更多",
	"Daha fazla",
	"Інші дії",
	"مزید",
	"Thêm",
]
	.map(
		(moreInTwitterSupportedLanguages) =>
			`div[aria-label="${moreInTwitterSupportedLanguages}"]`
	)
	.join(",");

ready("article", (article) => {
	const moreSection = article.querySelector(moreInTwitterSupportedLanguages);
	const divContainingTweetActions = article.querySelector("div[role=group]");
	if (!moreSection) return;
	//regex to check if it's a tweet link or not;
	const tweetUrlRegex = /^https:\/\/(?:m.|mobile.|www.)?twitter\.com\/.+\/status\/([0-9]+)$/;
	let currentTweetLink;
	const allAnchorTagsInArticle = [...article.querySelectorAll("a[role=link]")];
	for (const anchorTag of allAnchorTagsInArticle) {
		if (tweetUrlRegex.test(anchorTag.href)) {
			currentTweetLink = anchorTag.href;
			break;
		}
	}
	const articleObserverCallback = (mutation) => {
		const addedNodes = [];
		mutation.forEach(
			(record) =>
				record.addedNodes.length & addedNodes.push(...record.addedNodes)
		);
		const addedImgTagNodes = addedNodes.filter(
			(node) => node.tagName === "IMG"
		);
		const isAProfilePicUrl = (url) => {
			return url.includes("profile_images");
		};
		for (const imgTag of addedImgTagNodes) {
			if (isAProfilePicUrl(imgTag.src)) {
				tweetAuthorProfilePic[currentTweetLink] = imgTag.src;
				break;
			}
		}
	};
	const observer = new MutationObserver(articleObserverCallback);
	observer.observe(article, {
		childList: true,
		subtree: true,
	});
	//this div has multiple children and with tags like span, anchor tag etc so will need to iterate all and then get the complete text of the tweet.
	const divContainingTweetText = article.querySelector("div[dir=auto][lang]");
	let tweetText = "no text from tweet";
	if (divContainingTweetText) {
		tweetText = ((divContainingTweetText) => {
			let tweetTextResult = "";
			for (const child of divContainingTweetText.children) {
				tweetTextResult += child.innerText;
			}
			return tweetTextResult;
		})(divContainingTweetText);
	}
	let date = null;
	const timeTag = article.querySelector("time");
	if (timeTag) {
		date = timeTag.dateTime;
	}
	//there are edge cases when user have add blocker it can give some bugs
	if (!date) {
		const allAnchorTagsInArticle = [
			...article.querySelectorAll("a[role=link]"),
		];
		for (const anchorTag of allAnchorTagsInArticle) {
			if (anchorTag.href === currentTweetLink) {
				date = Date(anchorTag.innerText);
			}
		}
	}
	if (divContainingTweetActions && currentTweetLink) {
		addBMButton(divContainingTweetActions, currentTweetLink, tweetText, date);
	}
});
