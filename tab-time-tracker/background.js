let currentTabId = null;
let currentDomain = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  switchTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    switchTab(tab);
  }
});

async function switchTab(tab) {
  await trackTime();
  currentTabId = tab.id;
  currentDomain = new URL(tab.url).hostname;
  startTime = Date.now();
}

async function trackTime() {
  if (!currentDomain || !startTime) return;
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);

  const data = await chrome.storage.local.get([currentDomain]);
  const prevTime = data[currentDomain] || 0;
  await chrome.storage.local.set({ [currentDomain]: prevTime + timeSpent });

  console.log(`Tracked ${timeSpent}s on ${currentDomain}`);
}