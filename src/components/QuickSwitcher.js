import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";

const QuickSwitcher = () => {
  const [query, setQuery] = useState("");
  const [filteredTabs, setFilteredTabs] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);

    chrome.tabs.query({}, (tabs) => {
      const filtered = tabs.filter((tab) =>
        tab.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTabs(filtered);
    });
  };

  const switchTab = (tabId) => {
    chrome.tabs.update(tabId, { active: true });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#f7f7f7",
          borderRadius: 8,
        }}
      >
        <LuSearch size={20} />
        <input
          type="text"
          style={{
            borderStyle: "none",
            backgroundColor: "#f7f7f7",
            borderRadius: 8,
            padding: 10,
            width: 200,
          }}
          value={query}
          onChange={handleSearch}
          placeholder="Search tabs..."
        />
      </div>
      <ul>
        {filteredTabs.map((tab) => (
          <li key={tab.id} onClick={() => switchTab(tab.id)}>
            {tab.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickSwitcher;
