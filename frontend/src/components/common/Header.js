// ==================================================
// HEADER COMPONENT
// ==================================================
// Navigation header component - hiển thị trên tất cả trang

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
        padding: "1rem 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          REMN Stack
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
          className="desktop-nav"
        >
          <Link to="/" className="nav-link">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>

              {/* User Menu */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#666", fontSize: "0.9rem" }}>
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{ padding: "0.5rem 1rem" }}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav"
          style={{
            display: "none",
            backgroundColor: "#fff",
            borderTop: "1px solid #eee",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Link
              to="/"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ padding: "0.5rem 0" }}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ padding: "0.5rem 0" }}
                >
                  Dashboard
                </Link>
                <div
                  style={{
                    padding: "0.5rem 0",
                    borderTop: "1px solid #eee",
                    marginTop: "0.5rem",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "#666",
                      fontSize: "0.9rem",
                    }}
                  >
                    Welcome, {user?.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger"
                    style={{ width: "100%" }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ padding: "0.5rem 0" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ marginTop: "0.5rem" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-nav {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
