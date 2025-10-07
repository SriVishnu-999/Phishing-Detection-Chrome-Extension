document.getElementById("scan").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "analyze" }, (response) => {
      const { score, url } = response;
      const result = document.getElementById("result");

      if (score > 2) {
        result.innerHTML = `<span style="color:red;">Warning: ${url} may be phishing!</span>`;
      } else {
        result.innerHTML = `<span style="color:green;">Safe site: ${url}</span>`;
      }
    });
  });
});
