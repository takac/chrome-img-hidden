/* globals chrome */

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
    "use strict";
    extport.postMessage({
        imgs: true
    });
});

var extport;
chrome.runtime.onConnect.addListener(function(port) {
    "use strict";

    extport = port;
    console.assert(port.name === "imghide");
    port.onMessage.addListener(function(msg) {
    });
});
