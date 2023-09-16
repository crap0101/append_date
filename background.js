
"use strict";

function onError(error) {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
    for (const tab of tabs) {
	browser.tabs
	    .sendMessage(tab.id, {message: "clicked"})
	    .then((response) => {
		console.log("*** response:");
		console.log(response.response);
	    })
	    .catch(onError);
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs
	.query({
	    currentWindow: true,
	    active: true,
	})
	.then(sendMessageToTabs)
	.catch(onError);
});

