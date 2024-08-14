import React, { useEffect, useState } from "react";
import handleSnooze from "./SnoozeSettings";
import { BiSolidAlarmSnooze } from "react-icons/bi";
import { MdOutlineSwitchAccessShortcut } from "react-icons/md";

const TabList = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    if (chrome?.tabs?.query) {
      chrome.tabs.query({}, (result) => {
        setTabs(result);
      });
    } else {
      console.warn("chrome.tabs.query is not available in this environment.");
        setTabs([
          { id: 1, title: "Example Tab 1" },
          { id: 2, title: "Example Tab eeeeeeeeeeeeeeeeeevvvvvvvvvvvvvvvv2" },
        ]);
    }
  }, []);

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    maxWidth: "100%",
    margin: "20px 30px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    flexWrap: 'wrap',
  };

  const headerStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
    display: "flex",
    justifyContent: "center",
  };

  const listStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  const listItemStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: 'flex',
  };

  const buttonStyle = {
    padding: "8px 8px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  const snoozeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#FFC107",
    marginLeft: "10px",
  };

  const handleSnooze = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const time = Date.now() + snoozeTime * 60000;
      chrome.storage.local.set({ [tab.id]: { url: tab.url, time: time } });
      chrome.alarms.create(`reopenTab_${tab.id}`, { when: time });
      chrome.tabs.remove(tab.id);
    });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>All Tabs List</h2>
      <ul style={listStyle}>
        {tabs.map((tab) => (
          <li key={tab.id} style={listItemStyle}>
            <span>{tab.title}</span>
            <div style={{ display: "flex" }}>
              <button
                style={buttonStyle}
                onClick={() => chrome.tabs.update(tab.id, { active: true })}
              >
                <MdOutlineSwitchAccessShortcut size={20} />
              </button>
              {/* <button style={snoozeButtonStyle} onClick={handleSnooze}>
                <BiSolidAlarmSnooze size={20} />
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabList;
