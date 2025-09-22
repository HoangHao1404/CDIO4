import React, { useState } from "react";
import { FaGoogle, FaGithub, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setError("");

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <>
      {/* Toast khi đăng nhập thành công */}
      {showToast && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <h3 className="font-medium">Đăng nhập thành công!</h3>
            <p className="text-sm text-green-100">Chào mừng bạn quay lại AirZen</p>
          </div>
        </div>
      )}

      {/* Layout chính */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        }}
      >
        <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-lime-400">Air</span>
              <span className="text-white">Zen</span>
            </h1>
            <p className="text-white text-lg mt-2">Sign in</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
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
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
              <span
                className="absolute right-4 top-11 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-lime-400 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-lime-400 rounded-lg font-semibold text-gray-900 hover:bg-lime-500 transition relative ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              <span
                className={`inline-flex items-center ${
                  isLoading ? "invisible" : ""
                }`}
              >
                Sign in
              </span>
              {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-500"></div>
            <span className="px-4 text-gray-300 text-sm">or continue with</span>
            <div className="flex-grow h-px bg-gray-500"></div>
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white shadow hover:bg-gray-100 text-red-500">
              <FaGoogle className="text-lg" />
            </button>
            <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white shadow hover:bg-gray-100 text-gray-800">
              <FaGithub className="text-lg" />
            </button>
            <button className="flex-1 flex items-center justify-center py-2 rounded-lg bg-white shadow hover:bg-gray-100 text-blue-600">
              <FaFacebookF className="text-lg" />
            </button>
          </div>

          {/* Link đến Register */}
          <p className="text-center text-gray-300 text-sm mt-6">
            Don’t have an account yet?{" "}
            <a
              href="/register"
              className="text-lime-400 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
