// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import "./styles/App.css";
import Layout from "./components/common/Layout";
import { DeviceManagerment } from "./pages/DeviceManagerment";
import { UserManagerment } from "./pages/UserManagerment";
import { ThresholdePage } from "./pages/ThresholdePage";
import Register from "./pages/Register";
import SignIn from "./pages/Sign_in";

function App() {
  return (
    // Remove Register and SignIn from Layout since they're full-page components
    <>
      {/* Main app with Layout */}
      <Layout>
        <DeviceManagerment />
        {/* <UserManagerment /> */}
        {/* <ThresholdePage /> */}
      </Layout>

      {/* Full page components */}
      {/* <Register /> */}
      {/* <SignIn /> */}
    </>
  );
}

export default App;
