
"use strict";

function _download(url, title) {
    //console.log("*** entering function _download");
    const a = document.createElement('a');
    a.href = url;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

function _get_date() {
    //console.log("*** entering function _get_date")
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const date_string = `_${year}-${month}-${day}`;
    return date_string; //document.title += date_string;
};

function _append_date(date_string) {
    //console.log("*** entering function _append_date")
    document.title += date_string;
};

function _remove_date(date_string) {
    //console.log("*** entering function _remove_date")
    const _re = new RegExp(`${date_string}$`);
    const title = document.title.replace(_re, '');
    document.title = title;
};

browser.runtime.onMessage.addListener((request) => {
    //console.log(`from the background script: ${request.message}`);
    //console.log(`[1] ${document.URL} | ${document.title}`)
    var __title = document.title;
    const date_string = _get_date();
    _append_date(date_string);
    //console.log(`[2] ${document.URL} *** ${document.title}`)
    _download(document.URL, document.title);
    //console.log(`[3] ${document.URL} *** ${document.title} *** ${__title}`)
    _remove_date(date_string);
    //console.log(`[4] ${document.URL} *** ${document.title} *** ${__title}`)
    document.title = __title
    return Promise.resolve(
	{ response: `...saving "${document.URL}" as "${__title}"` });
});


