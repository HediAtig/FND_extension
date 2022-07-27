const run = document.querySelector(".run");
const message = document.querySelector(".message");
const loading = document.querySelector(".spinner");
loading.style.display = "none";
run.style.display = "none";


async function getCurrentTabAPI() {
  dataURL = '';
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  dataURL = tab.url;

  if (checkUrl(dataURL)>0) {
    post_api(dataURL)
    setTimeout(get_api, 5000)

  }
  else{
    const msjDiv = document.querySelector("#message");
    const msjElement = document.createElement("p");
    msjElement.innerText = `Sorry, we do not support this website.`;
    msjDiv.append(msjElement);
    process.exit();
  }
}

function checkUrl(url) {
  let websites = ["https://www.huffpost.com/*", "https://www.aljazeera.com/", "https://www.latimes.com/",
    "https://www.bbc.com/", "https://www.dailymail.co.uk/", "https://www.forbes.com/",
    "https://www.cnbc.com/", "https://www.nbcnews.com/", "https://www.foxnews.com/",
    "https://news.yahoo.com/"]

  for (let i = 0; i < websites.length + 1; i++) {
    if (url.includes(websites[i])) {
      return i
    }

  }
}

  function post_api(web) {
    loading.style.display = "block";
    run.style.display = "block";

    fetch("http://127.0.0.1:8000/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      mode: 'same-origin',
      body: JSON.stringify({ 'msg': web })
    }).then(resp => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        console.log("Status: " + resp.status)
        return Promise.reject("server")
      }
    })
  }

  function get_api() {
    fetch("http://127.0.0.1:8000/prediction", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    mode: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      loading.style.display = "none";
      run.style.display = "none";

      showData(data.message);
    })
    .catch((error) => console.error("FETCH ERROR:", error));

  showData = message => {
    const msjDiv = document.querySelector("#message");
    const msjElement = document.createElement("p");
    msjElement.innerText = `Result: ${message}`;
    msjDiv.append(msjElement);
  }
}


getCurrentTabAPI()




