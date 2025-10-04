import React, { useState } from "react";
import { FaGoogle, FaGithub, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
  const nav = useNavigate();
  const { register, error, clearError } = useAuth();

  const [name, setName] = useState("");          // THÊM name để khớp BE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (confirmValue) => {
    if (confirmValue && password !== confirmValue) setPasswordError("Mật khẩu không khớp!");
    else setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError?.();

    if (!name || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;

    setIsLoading(true);
    const res = await register({ name, email, password });
    setIsLoading(false);

    if (res.success) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        nav("/signin");
      }, 900);
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <h3 className="font-medium">Đăng ký thành công!</h3>
            <p className="text-sm text-green-100">Chuyển đến trang đăng nhập…</p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')" }}>
        <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold"><span className="text-lime-400">Air</span><span className="text-white">Zen</span></h1>
            <p className="text-white text-lg mt-2">Sign up</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div>
              <label className="block text-white text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
              <span className="absolute right-4 top-11 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); validatePassword(e.target.value); }}
                className={`w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 ${
                  passwordError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-lime-400"
                }`}
                required
              />
              <span className="absolute right-4 top-11 cursor-pointer text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className={`w-full py-3 bg-lime-400 rounded-lg font-semibold text-gray-900 hover:bg-lime-500 transition relative ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              <span className={`inline-flex items-center ${isLoading ? "invisible" : ""}`}>Sign up</span>
              {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-500"></div>
            <span className="px-4 text-gray-300 text-sm">or continue with</span>
            <div className="flex-grow h-px bg-gray-500"></div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white shadow hover:bg-gray-100 text-red-500"><FaGoogle className="text-lg" /></button>
            <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white shadow hover:bg-gray-100 text-gray-800"><FaGithub className="text-lg" /></button>
            <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white shadow hover:bg-gray-100 text-blue-600"><FaFacebookF className="text-lg" /></button>
          </div>

          <p className="text-center text-gray-300 text-sm mt-6">
            Already have an account?{" "}
            <a href="/signin" className="text-lime-400 font-semibold hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
