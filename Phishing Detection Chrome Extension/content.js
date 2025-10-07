function analyzeURL(url) {
  const heuristics = {
    hasAtSymbol: /@/.test(url),
    hasIpAddress: /\d{1,3}(\.\d{1,3}){3}/.test(url),
    tooManySubdomains: (url.match(/\./g) || []).length > 3,
    hasHyphen: /-/.test(url),
    notHttps: !url.startsWith("https://")
  };

  let score = 0;
  for (let key in heuristics) {
    if (heuristics[key]) score++;
  }

  return score; // Higher score = more suspicious
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    const score = analyzeURL(window.location.href);
    sendResponse({ score, url: window.location.href });
  }
});
