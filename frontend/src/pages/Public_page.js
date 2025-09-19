import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import background from "../image/background.png";
import icon1 from "../image/icon1.png";
import icon2 from "../image/icon2.png";
import icon3 from "../image/icon3.png";
import icon4 from "../image/icon4.png";
import icon5 from "../image/icon5.png";
import icon6 from "../image/icon6.png";
import anh1 from "../image/anh1.png";
import anh2 from "../image/anh2.png";
import anh3 from "../image/anh3.png";

export const Public_page = () => {
  // Thêm state để theo dõi active item
  const [activeItem, setActiveItem] = useState("home");

  // Thay đổi useEffect để tối ưu scroll handler
  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      // Nếu đang xử lý scroll thì bỏ qua
      if (isScrolling) return;
      isScrolling = true;

      // Sử dụng requestAnimationFrame để tối ưu performance
      window.requestAnimationFrame(() => {
        const sections = ["home", "about", "features", "prices", "contact"];
        const current = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (current) {
          setActiveItem(current);
        }

        isScrolling = false;
      });
    };

    // Sử dụng throttle với handleScroll
    const throttledScroll = throttle(handleScroll, 100);

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      throttledScroll.cancel(); // Cleanup throttle
    };
  }, []);

  return (
    <div
      className="text-gray-800"
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-white shadow flex items-center justify-between px-[10%]">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold leading-none">
          <span className="text-[#24282C] not-italic">Air</span>
          <span className="text-[#969696] italic">Zen</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-sm font-medium">
            {["Home", "About", "Features", "Prices", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.toLowerCase());
                    element.scrollIntoView({ behavior: "smooth" });
                    setActiveItem(item.toLowerCase());
                  }}
                  className={`
              uppercase tracking-wide relative
              ${
                activeItem === item.toLowerCase()
                  ? "text-indigo-500"
                  : "text-gray-500 hover:text-indigo-500"
              }
              transition-colors duration-200
            `}
                >
                  {item}
                  <span
                    className={`
                absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500
                transform origin-left
                transition-transform duration-200 ease-out
                ${
                  activeItem === item.toLowerCase()
                    ? "scale-x-100"
                    : "scale-x-0"
                }
              `}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ================= HOME ================= */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          background: `url(${background}) no-repeat center center/cover`,
        }}
      >
        {/* Icons */}
        <img
          src={icon1}
          alt="CO2"
          className="absolute top-20 left-1/4 w-16 h-16 drop-shadow-lg"
        />
        <img
          src={icon2}
          alt="Gas"
          className="absolute top-1/2 left-16 w-14 h-14 drop-shadow-lg"
        />
        <img
          src={icon3}
          alt="Temperature"
          className="absolute bottom-32 left-1/3 w-12 h-12 drop-shadow-lg"
        />
        <img
          src={icon4}
          alt="Weather"
          className="absolute top-24 right-1/4 w-14 h-14 drop-shadow-lg"
        />
        <img
          src={icon5}
          alt="Value"
          className="absolute bottom-28 right-1/3 w-12 h-12 drop-shadow-lg"
        />
        <img
          src={icon6}
          alt="PM2.5"
          className="absolute bottom-16 right-20 w-16 h-16 drop-shadow-lg"
        />

        {/* Nội dung */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Hệ thống giám sát <br /> chất lượng không khí
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Xây dựng được một hệ thống giúp kiểm soát được chất lượng không khí
            trong không gian sinh hoạt, giúp đảm bảo sức khỏe,...
          </p>
          <a
            href="#"
            className="inline-block bg-black text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:brightness-90 transition"
          >
            Bắt đầu
          </a>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="relative px-[10%] py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Về <span className="text-[#24282C]">Air</span>
              <span className="text-[#969696] italic">Zen</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Chúng tôi là nền tảng giám sát chất lượng không khí hàng đầu, mang
              đến giải pháp toàn diện cho mọi không gian sống và làm việc.
            </p>
          </div>

          {/* Stats & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-4">Sứ mệnh của chúng tôi</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Xây dựng một nền tảng giám sát chất lượng không khí đáng tin
                cậy, thời gian thực, giúp mọi người hiểu rõ môi trường xung
                quanh và có hành động kịp thời để bảo vệ sức khỏe của chính mình
                và những người thân yêu.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold">Độ chính xác cao</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold">Thời gian thực</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-xl mb-2 text-gray-800">1000+</h4>
                <p className="text-gray-600">Thiết bị đã lắp đặt</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-xl mb-2 text-gray-800">24/7</h4>
                <p className="text-gray-600">Giám sát liên tục</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-xl mb-2 text-gray-800">99%</h4>
                <p className="text-gray-600">Độ chính xác</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-xl mb-2 text-gray-800">30+</h4>
                <p className="text-gray-600">Đối tác tin cậy</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Giám sát toàn diện</h3>
              <p className="text-gray-600">
                Đo lường đầy đủ các chỉ số PM2.5, PM10, CO₂, nhiệt độ, độ ẩm
                theo thời gian thực
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Cảnh báo thông minh</h3>
              <p className="text-gray-600">
                Tự động gửi thông báo khi phát hiện chỉ số vượt ngưỡng an toàn
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Báo cáo chi tiết</h3>
              <p className="text-gray-600">
                Phân tích dữ liệu và tạo báo cáo chuyên sâu về chất lượng không
                khí
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section
        id="why"
        className="py-24 bg-gradient-to-b from-white to-[#f6f6f6]"
      >
        <div className="max-w-7xl mx-auto px-[10%]">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Tại sao chất lượng không khí <br /> lại quan trọng?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Không khí sạch là yếu tố thiết yếu cho sức khỏe và cuộc sống của
              chúng ta
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Bảo vệ sức khỏe</h3>
                    <p className="text-gray-600">
                      Không khí sạch giúp giảm nguy cơ mắc các bệnh về đường hô
                      hấp, tim mạch và các vấn đề sức khỏe khác.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Nâng cao chất lượng sống
                    </h3>
                    <p className="text-gray-600">
                      Môi trường không khí tốt giúp cải thiện giấc ngủ, tăng
                      cường sự tập trung và nâng cao chất lượng cuộc sống.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Môi trường làm việc tốt hơn
                    </h3>
                    <p className="text-gray-600">
                      Không khí sạch tạo môi trường làm việc tích cực, giúp tăng
                      khả năng tập trung và hiệu suất làm việc.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Phát triển bền vững
                    </h3>
                    <p className="text-gray-600">
                      Giám sát và cải thiện chất lượng không khí là bước đi quan
                      trọng hướng tới tương lai bền vững.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
            >
              <span className="font-semibold">
                Khám phá giải pháp của chúng tôi
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="relative px-[10%] pt-24 pb-24 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Thu thập và hiển thị dữ liệu từ <br className="hidden sm:block" />{" "}
              thiết bị IoT theo thời gian thực
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-xl">
              Hệ thống có thể thu thập dữ liệu từ môi trường và hiển thị theo
              thời gian thực.
            </p>
          </div>
          <div className="relative h-[280px] lg:h-[340px] overflow-visible">
            <div className="absolute left-6 bottom-2 w-[90%] rounded-2xl overflow-hidden shadow-md ring-1 ring-gray-100">
              <img
                src={anh1}
                alt="Chart"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 p-6 flex items-center justify-between gap-6">
            <div className="max-w-sm">
              <h3 className="text-xl font-semibold mb-3">
                Cảnh báo người dùng
              </h3>
              <p className="text-gray-600">Thông báo nếu phát hiện lỗi.</p>
            </div>
            <img
              src={anh2}
              alt="Alert"
              className="w-40 h-auto object-contain"
            />
          </div>
          <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 p-6 flex items-center justify-between gap-6">
            <div className="max-w-sm">
              <h3 className="text-xl font-semibold mb-3">
                Cấu hình ngưỡng an toàn
              </h3>
              <p className="text-gray-600">Người dùng tùy chỉnh mức ngưỡng.</p>
            </div>
            <img
              src={anh3}
              alt="Threshold"
              className="w-40 h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-20 bg-white px-[10%]" id="prices">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Bảng giá dịch vụ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">Cơ bản</h3>
              <div className="text-4xl font-bold mb-6">
                2,000,000đ<span className="text-base font-normal">/tháng</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li>✓ 2 thiết bị cảm biến</li>
                <li>✓ Báo cáo cơ bản</li>
                <li>✓ Cảnh báo qua email</li>
                <li>✓ Hỗ trợ 24/7</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800">
                Chọn gói
              </button>
            </div>

            <div className="p-8 rounded-xl border border-blue-500 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                Phổ biến
              </div>
              <h3 className="text-xl font-bold mb-4">Nâng cao</h3>
              <div className="text-4xl font-bold mb-6">
                3,500,000đ<span className="text-base font-normal">/tháng</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li>✓ 5 thiết bị cảm biến</li>
                <li>✓ Báo cáo chi tiết</li>
                <li>✓ Cảnh báo qua SMS & email</li>
                <li>✓ Hỗ trợ ưu tiên 24/7</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">
                Chọn gói
              </button>
            </div>

            <div className="p-8 rounded-xl border hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4">Doanh nghiệp</h3>
              <div className="text-4xl font-bold mb-6">Liên hệ</div>
              <ul className="space-y-3 mb-8">
                <li>✓ Không giới hạn thiết bị</li>
                <li>✓ Báo cáo tùy chỉnh</li>
                <li>✓ API tích hợp</li>
                <li>✓ Hỗ trợ ưu tiên 24/7</li>
              </ul>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800"
              >
                Liên hệ ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 bg-[#f6f6f6] flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">
              Leave your info and we’ll get back shortly.
            </p>
          </div>

          <form className="bg-white rounded-xl border shadow-sm p-6 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 min-w-[180px] rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b99e38]"
            />
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 min-w-[220px] rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b99e38]"
            />
            <input
              type="tel"
              placeholder="+84-your phone number"
              className="flex-1 min-w-[180px] rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b99e38]"
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Send Info
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="#home" className="text-2xl font-extrabold">
              <span className="text-[#CCF067] not-italic">Air</span>
              <span className="text-gray-400 italic">Zen</span>
            </a>
            <p className="mt-3 text-sm text-gray-400">
              Real-time Air Quality Monitoring System
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p>
              Email:{" "}
              <a href="mailto:contact@airzen.com" className="hover:underline">
                contact@airzen.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+84931603379" className="hover:underline">
                +84 931 603 379
              </a>
            </p>
            <p>Address: 353 Quang Trung Street, Da Nang</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Features", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500 text-sm">
          © 2025 AirZen. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
