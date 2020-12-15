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
