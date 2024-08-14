import React from "react";
import TabList from "../components/TabList";
import SnoozeSettings from "../components/SnoozeSettings";
import QuickSwitcher from "../components/QuickSwitcher";

const Popup = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 style={{justifyContent: 'center', display: 'flex'}}>Tab Management</h1>
      <QuickSwitcher />
      <TabList />
      <SnoozeSettings />
    </div>
  );
};

export default Popup;
