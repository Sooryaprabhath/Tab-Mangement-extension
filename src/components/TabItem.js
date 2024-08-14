import React from 'react';

const TabItem = ({ tab }) => {
  const snoozeTab = () => {
    const snoozeTime = Date.now() + 60000;
    chrome.storage.local.set({ [tab.id]: { url: tab.url, time: snoozeTime } });
    chrome.alarms.create(`reopenTab_${tab.id}`, { when: snoozeTime });
    chrome.tabs.remove(tab.id);
  };

  return (
    <li>
      <span>{tab.title}</span>
      <button onClick={snoozeTab}>Snooze</button>
      <button>Group</button> 
    </li>
  );
};

export default TabItem;
