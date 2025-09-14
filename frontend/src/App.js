// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Import styles
import "./styles/App.css";
import { Public_page } from "./pages/Public_page";

function App() {
  return (
    <Router>
      <div className="App">
        <Public_page />
      </div>
    </Router>
  );
}

export default App;
