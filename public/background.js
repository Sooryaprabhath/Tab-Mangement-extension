chrome.commands.onCommand.addListener((command) => {
    if (command === "quick-switch") {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        const activeTabIndex = tabs.findIndex(tab => tab.active);
        const nextTabIndex = (activeTabIndex + 1) % tabs.length;
        chrome.tabs.update(tabs[nextTabIndex].id, { active: true });
      });
    }
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith("reopenTab_")) {
      const tabId = alarm.name.split("_")[1];
      chrome.storage.local.get([tabId], (result) => {
        const tabInfo = result[tabId];
        chrome.tabs.create({ url: tabInfo.url });
        chrome.storage.local.remove(tabId);
      });
    }
  });
  