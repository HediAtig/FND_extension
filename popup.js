const run = document.querySelector(".run");
const message = document.querySelector(".message");
const loading = document.querySelector(".spinner");
const fake = document.querySelector(".fake");
const valid = document.querySelector(".valid");
const error = document.querySelector(".error");


loading.style.display = "none";
run.style.display = "none";
fake.style.display="none"
valid.style.display="none"
error.style.display="none"


async function getCurrentTabAPI() {
  dataURL = '';
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  dataURL = tab.url;

  if (checkUrl(dataURL)>0) {
    post_api(dataURL)
  }
  else{
    const msjDiv = document.querySelector("#message");
    const msjElement = document.createElement("p");
    msjElement.innerText = `Sorry, we do not support this website.`;
    msjDiv.append(msjElement);
    error.style.display = "block";

  }
}

function checkUrl(url) {
  let websites = ['news.yahoo.com', 'www.foxnews.com','www.huffpost.com','www.latimes.com','www.aljazeera.com','www.bbc.com','www.dailymail.co.uk','www.thesun.co.uk','www.cnbc.com','edition.cnn.com']
  for (let i = 0; i < websites.length + 1; i++) {
    if (url.includes(websites[i-1])) {
      return i
    }

  }
}

function post_api(web) {
  loading.style.display = "block";
  run.style.display = "block";

  fetch("https://fnd-api.herokuapp.com/", {
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
      throw new Error("NETWORK RESPONSE ERROR");
    }
  }).then(data => {
    loading.style.display = "none";
    run.style.display = "none";
    let d = data.toString()
    showData(d);
    if (d.includes("Fake")){
      fake.style.display = "block";
    }
    else{
      valid.style.display = "block";
    }
  })
      .catch((error) => console.error("FETCH ERROR:", error));

  function showData (d) {
    const msjDiv = document.querySelector("#message");
    const msjElement = document.createElement("p");
    msjElement.innerText =  d;
    console.log(msjElement.innerText)
    msjDiv.append(msjElement);
  }
}

getCurrentTabAPI()




