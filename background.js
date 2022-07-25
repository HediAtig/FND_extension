
async function getCurrentTab() {
    dataURL = '';
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    dataURL = tab.url;
    return dataURL;
}


/*chrome.tabs.onActivated.addListener(async function () {
    console.log("TAB CHANGED")
    console.log(await getCurrentTab())
})*/

chrome.action.onClicked.addListener( async function () {
    
    URLL = await getCurrentTab()
    console.log(URLL)
})



 

