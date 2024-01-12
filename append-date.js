
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
    const date_string = _get_date();
    _append_date(date_string);
    const _log_title = document.title;
    _download(document.URL, document.title);
    _remove_date(date_string);
    return Promise.resolve(
	{ response: `...saving "${document.URL}" as "${_log_title}"` });
});


