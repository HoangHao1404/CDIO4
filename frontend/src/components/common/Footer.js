// ==================================================
// FOOTER COMPONENT
// ==================================================
// Footer component - hiển thị ở cuối trang

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #eee",
        marginTop: "auto",
        padding: "2rem 0 1rem 0",
      }}
    >
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-4" style={{ marginBottom: "2rem" }}>
          {/* About Section */}
          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              REMN Stack
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              A modern fullstack web application built with React, Express,
              MongoDB, and Node.js. Perfect for learning and building scalable
              web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Quick Links
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Home
              </Link>
              <Link
                to="/login"
                style={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Register
              </Link>
              <Link
                to="/dashboard"
                style={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Tech Stack
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                ⚛️ React.js
              </span>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                🚀 Express.js
              </span>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                🍃 MongoDB
              </span>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                🟢 Node.js
              </span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Resources
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => alert("API Documentation coming soon!")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  padding: 0,
                }}
              >
                📚 API Docs
              </button>
              <button
                onClick={() => alert("GitHub repository coming soon!")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  padding: 0,
                }}
              >
                💻 GitHub
              </button>
              <button
                onClick={() => alert("Support coming soon!")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  padding: 0,
                }}
              >
                🆘 Support
              </button>
              <button
                onClick={() => alert("Contributing guide coming soon!")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  padding: 0,
                }}
              >
                🤝 Contributing
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #eee",
            margin: "2rem 0 1rem 0",
          }}
        />

        {/* Bottom Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Copyright */}
          <div style={{ color: "#666", fontSize: "0.9rem" }}>
            © {currentYear} REMN Stack. Made with ❤️ for learning purposes.
          </div>

          {/* Social Links / Contact */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => alert("Email: contact@remnstack.com")}
              style={{
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              title="Email"
            >
              📧
            </button>
            <button
              onClick={() => alert("GitHub coming soon!")}
              style={{
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              title="GitHub"
            >
              💻
            </button>
            <button
              onClick={() => alert("Documentation coming soon!")}
              style={{
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              title="Documentation"
            >
              📖
            </button>
          </div>
        </div>

        {/* Development Info */}
        {process.env.NODE_ENV === "development" && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#fff3cd",
              borderRadius: "4px",
              fontSize: "0.8rem",
              color: "#856404",
            }}
          >
            🧪 Development Mode - Environment: {process.env.NODE_ENV}
          </div>
        )}
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .grid-4 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
