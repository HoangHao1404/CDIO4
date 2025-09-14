// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Import styles
import "./styles/App.css";


import OverviewPage from "./pages/OverviewPage";
import Sidebar from "./components/common/Sidebar";


function App() {
  return (
    <div className="App">
      <Sidebar/>
    </div>
  );
}

export default App;
