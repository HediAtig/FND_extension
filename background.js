
async function getCurrentTab() {
    dataURL = '';
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    dataURL = tab.url;
    return dataURL;
}



// url = "https://fnd-api.herokuapp.com/"
url = "http://127.0.0.1:8000/"

/*chrome.tabs.onActivated.addListener(async function () {
    console.log("TAB CHANGED")
    console.log(await getCurrentTab())
})*/



chrome.action.onClicked.addListener(async function () {
    dataURL = ''
    let queryOptions = { active: true, currentWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    dataURL = tab.url


    console.log(dataURL)

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'same-origin',
        body: JSON.stringify({ 'msg': dataURL })
    }).then(resp => {
        if (resp.status === 200) {
            return resp.json()
        } else {
            console.log("Status: " + resp.status)
            return Promise.reject("server")
        }
    })
})





