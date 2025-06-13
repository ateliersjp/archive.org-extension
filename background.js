const proxy = "https://web.archive.org/web/submit?type=replay";
  
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const url = new URL(details.url);
    const proxyUrl = new URL(proxy);
    if (url.hostname !== proxyUrl.hostname) {
      if (details.type === "main_frame" && details.statusCode === 404) {
        proxyUrl.searchParams.set("url", url.href);
        chrome.tabs.update(details.tabId, { url: proxyUrl.href });
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
