chrome.webNavigation.onCommitted.addListener(function(tab) {

    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            let parsedUrl = url.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")

            // we only want base domain
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ?
            parsedUrl.length : parsedUrl.indexOf('/')).slice(0, parsedUrl.indexOf('?') == -1 ?
            parsedUrl.length : parsedUrl.indexOf('?'));

            try {
                if (domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "allrecipes.com") {
                    runAllRecipesScript();
                    return;
                }
            } catch (err) {
                throw err;
            }
        });
    }
});

function runAllRecipesScript() {
    chrome.tabs.executeScript({
        file: 'allrecipes.js'
    });
    return true;
}