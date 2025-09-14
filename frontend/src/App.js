// ==================================================
// MAIN APP COMPONENT
// ==================================================
// Component gốc chứa toàn bộ ứng dụng React
// Cấu hình routing, context providers, và layout chính

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import styles
import "./styles/App.css";
import OverviewPage from "./pages/OverviewPage";

function App() {
  return (
    <div className="App">
    </div>
    // <AuthProvider>
    //   <Router>
    //     <div className="App">
    //       {/* Header - Hiển thị trên tất cả trang */}
    //       <Header />

    //       {/* Main content area */}
    //       <main className="main-content">
    //         <Routes>
    //           {/* Public routes */}
    //           <Route path="/" element={<HomePage />} />
    //           <Route path="/login" element={<LoginPage />} />
    //           <Route path="/register" element={<RegisterPage />} />

    //           {/* Protected routes - Cần đăng nhập */}
    //           <Route path="/dashboard" element={<DashboardPage />} />

    //           {/* 404 Page */}
    //           <Route path="*" element={<NotFoundPage />} />
    //         </Routes>
    //       </main>

    //       {/* Footer - Hiển thị trên tất cả trang */}
    //       <Footer />
    //     </div>
    //   </Router>
    // </AuthProvider>
  );
}

export default App;
