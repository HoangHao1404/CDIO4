// ==================================================
// REGISTER PAGE COMPONENT
// ==================================================
// Trang đăng ký user mới

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register, isAuthenticated, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Redirect nếu đã login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear error khi component unmount
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="form-header">
          <h2>Create New Account</h2>
          <p>Join us today! Please fill in the form below.</p>
        </div>

        {/* Error Alert */}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${formErrors.name ? "error" : ""}`}
              placeholder="Enter your full name"
            />
            {formErrors.name && (
              <small style={{ color: "#dc3545", fontSize: "0.875rem" }}>
                {formErrors.name}
              </small>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${formErrors.email ? "error" : ""}`}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <small style={{ color: "#dc3545", fontSize: "0.875rem" }}>
                {formErrors.email}
              </small>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${formErrors.password ? "error" : ""}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {formErrors.password && (
              <small style={{ color: "#dc3545", fontSize: "0.875rem" }}>
                {formErrors.password}
              </small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${formErrors.confirmPassword ? "error" : ""}`}
              placeholder="Confirm your password"
            />
            {formErrors.confirmPassword && (
              <small style={{ color: "#dc3545", fontSize: "0.875rem" }}>
                {formErrors.confirmPassword}
              </small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? (
              <>
                <div
                  className="spinner"
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                    display: "inline-block",
                  }}
                ></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="form-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
          <p>
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>

      {/* Password Requirements (helper) */}
      <div
        className="card mt-2"
        style={{ maxWidth: "400px", margin: "2rem auto" }}
      >
        <div className="card-header">
          <h3 className="card-title">🔒 Password Requirements</h3>
        </div>
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          <li>At least 6 characters long</li>
          <li>Mix of letters and numbers recommended</li>
          <li>Avoid common passwords</li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterPage;
