import React, { useState } from "react";
import { BiSolidAlarmSnooze } from "react-icons/bi";
import { BsBorderStyle, BsJustify } from "react-icons/bs";

const SnoozeSettings = () => {
  const [snoozeTime, setSnoozeTime] = useState(5);

  const handleSnooze = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const time = Date.now() + snoozeTime * 60000;
      chrome.storage.local.set({ [tab.id]: { url: tab.url, time: time } });
      chrome.alarms.create(`reopenTab_${tab.id}`, { when: time });
      chrome.tabs.remove(tab.id);
    });
  };

  const snoozeButtonStyle = {
    display: "flex",
    alignItems: "center",
    padding: "2px 8px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#FFC107",
    marginLeft: "10px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // marginLeft: 30,
      }}
    >
      <h2
        style={{
          fontWeight: 500,
          fontSize: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Snooze Current Tab
      </h2>
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <input
          style={{
            borderStyle: "none",
            backgroundColor: "#f7f7f7",
            borderRadius: 8,
            padding: 10,
          }}
          type="number"
          value={snoozeTime}
          onChange={(e) => setSnoozeTime(Number(e.target.value))}
        />
        <button onClick={handleSnooze} style={snoozeButtonStyle}>
          <BiSolidAlarmSnooze size={20} />
        </button>
      </div>
    </div>
  );
};

export default SnoozeSettings;
