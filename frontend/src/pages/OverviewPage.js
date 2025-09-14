import React, { useState } from "react";

// Import các icon và assets từ Figma design
const imgOverviewHome =
  "http://localhost:3845/assets/e0bc495b29ca2c7486c8a524d517cae08c17c718.png";
const imgUser =
  "http://localhost:3845/assets/368efa59fd16babbf15403d8ccb0018a8c34c24f.png";
const imgSquaresFour =
  "http://localhost:3845/assets/fc85b8eed6f9b7a5e846d893c7088544a02a370f.svg";
const imgUsers =
  "http://localhost:3845/assets/0dfef28bb4c502b5b9d516b447e1d2dadcea6e78.svg";
const imgHeadset =
  "http://localhost:3845/assets/2551b38a560ea1c7618c7519c5ca6ce99d7113aa.svg";
const imgBellSimpleRinging =
  "http://localhost:3845/assets/53032b04e957d0b4d6c13ae769b73374022bd275.svg";
const imgGear =
  "http://localhost:3845/assets/4f898509feaf42e53c012e8dfc3d67534c106a85.svg";
const imgCloudMoon =
  "http://localhost:3845/assets/37ecf27d7ce7ff3d37d1b20538a5c422eefe0a4d.svg";
const imgVector1 =
  "http://localhost:3845/assets/604f7939ca8a0ce2ec2c57d797d18bb95c096c16.svg";
const imgNofication =
  "http://localhost:3845/assets/709a11fbcce0b14163f802e5a3e3eef428ecca60.svg";
const imgSignOut =
  "http://localhost:3845/assets/3131933941177fcf1a00346b442de4fd647c055a.svg";
const imgArrowUpRight =
  "http://localhost:3845/assets/2427909afe2a97e27ef41540363fb720e236ff9b.svg";

const OverviewPage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Overview");
  const [currentUser] = useState("Bạc xỉu");

  // Dữ liệu thời tiết và môi trường mẫu
  const environmentData = [
    {
      id: "co2",
      title: "CO₂",
      value: "735 ppm",
      progress: 25, // 25% của thanh progress
      color: "#ccf067",
      position: { left: "calc(16.667% + 25px)" },
    },
    {
      id: "pm25",
      title: "PM2.5",
      value: "45.7 µg/m³",
      progress: 75, // 75% của thanh progress
      color: "#f49352",
      position: { left: "calc(33.333% + 20px)" },
    },
    {
      id: "temperature",
      title: "Nhiệt độ",
      value: "26 °C",
      progress: 25,
      color: "#ccf067",
      position: { left: "calc(50% + 15px)" },
    },
    {
      id: "humidity",
      title: "Độ ẩm",
      value: "56 %",
      progress: 50,
      color: "#f2c13b",
      position: { left: "calc(66.667% + 10px)" },
    },
    {
      id: "gas",
      title: "Gas",
      value: "12 %",
      progress: 100,
      color: "#f4525c",
      position: { left: "calc(83.333% + 5px)" },
    },
  ];

  // Menu items cho sidebar
  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: imgSquaresFour,
      isActive: selectedMenuItem === "Overview",
    },
    {
      id: "users",
      label: "Quản lý user",
      icon: imgUsers,
      isActive: selectedMenuItem === "Quản lý user",
    },
    {
      id: "support",
      label: "Yêu cầu hỗ trợ",
      icon: imgHeadset,
      isActive: selectedMenuItem === "Yêu cầu hỗ trợ",
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: imgBellSimpleRinging,
      isActive: selectedMenuItem === "Thông báo",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: imgGear,
      isActive: selectedMenuItem === "Cài đặt",
    },
  ];

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.label);
  };

  const handleLogout = () => {
    console.log("Đăng xuất");
    // Thêm logic đăng xuất ở đây
  };

  const handleCardClick = (cardId) => {
    console.log(`Clicked on ${cardId} card`);
    // Thêm logic xử lý click card ở đây
  };

  // Lấy ngày hiện tại
  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleDateString("vi-VN", { month: "short" });
    const year = now.getFullYear().toString().slice(-2);
    return `${day} ${month}, ${year}`;
  };

  return (
    <div
      className="bg-center bg-cover bg-no-repeat opacity-[0.62] relative min-h-screen w-full"
      style={{ backgroundImage: `url('${imgOverviewHome}')` }}
    >
      {/* Sidebar Navigation */}
      <div className="absolute bg-white h-[1017px] left-[30px] rounded-[30px] shadow-[1px_5px_20px_0px_rgba(0,0,0,0.1)] top-[50px] w-[253px]">
        {/* Active navigation background */}
        {menuItems.some((item) => item.isActive) && (
          <div className="absolute bg-[#ccf067] h-[49px] left-[21px] rounded-[33px] top-[118px] w-[210px]" />
        )}

        {/* Menu container */}
        <div className="absolute flex flex-col gap-[414px] items-start justify-start left-9 top-32 w-[179px]">
          {/* Menu items */}
          <div className="flex flex-col gap-[50px] items-start justify-start w-full">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`flex gap-2.5 items-center justify-start w-full cursor-pointer transition-colors duration-200 ${
                  item.isActive ? "z-10" : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <div className="relative shrink-0 size-7">
                  <img
                    alt={item.label}
                    className="block max-w-none size-full"
                    src={item.icon}
                  />
                </div>
                <div
                  className={`font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic text-[18px] text-nowrap ${
                    item.isActive ? "text-black" : "text-[#969696]"
                  }`}
                >
                  <p className="leading-[normal] whitespace-pre">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="h-6 shrink-0 w-[97px]" />
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div
        className="absolute bg-white flex gap-[35px] items-center justify-end p-[23px] rounded-[30px] shadow-[1px_5px_20px_0px_rgba(0,0,0,0.1)] top-[50px] w-[1385px]"
        style={{ left: "calc(16.667% + 25px)" }}
      >
        {/* Weather and Date */}
        <div className="bg-[#f6f6f6] flex gap-2.5 h-[70px] items-center justify-center p-[22px] rounded-[999px] w-[235px]">
          <div className="flex gap-[11px] items-center justify-start">
            <div className="flex gap-1 items-center justify-start">
              <div className="relative shrink-0 size-6">
                <img
                  alt="Weather"
                  className="block max-w-none size-full"
                  src={imgCloudMoon}
                />
              </div>
              <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic text-[#969696] text-[18px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">26 °C</p>
              </div>
            </div>
            <div className="h-5 w-0 relative">
              <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
                <img
                  alt="Divider"
                  className="block max-w-none size-full"
                  src={imgVector1}
                />
              </div>
            </div>
            <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic text-[#969696] text-[18px] text-nowrap">
              <p className="leading-[normal] whitespace-pre">
                {getCurrentDate()}
              </p>
            </div>
          </div>
        </div>

        {/* Notification Button */}
        <div className="relative shrink-0 size-[70px] cursor-pointer">
          <img
            alt="Notifications"
            className="block max-w-none size-full"
            src={imgNofication}
          />
        </div>

        {/* User Greeting */}
        <div className="bg-[#f6f6f6] flex gap-2.5 h-[70px] items-center justify-center p-[25px] rounded-[999px] w-[230px]">
          <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic text-[18px] text-black text-nowrap">
            <p className="leading-[normal] whitespace-pre">
              Xin chào, {currentUser} 👋
            </p>
          </div>
        </div>

        {/* User Avatar */}
        <div className="relative shrink-0 size-[70px] cursor-pointer">
          <img
            alt="User Avatar"
            className="block max-w-none size-full rounded-full"
            height="70"
            src={imgUser}
            width="70"
          />
        </div>
      </div>

      {/* Logo AirZen */}
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] left-[91px] not-italic text-[36px] text-black text-nowrap top-20">
        <p className="leading-[normal] whitespace-pre">
          <span>Air</span>
          <span className="font-['Inter:Semi_Bold_Italic',_sans-serif] font-semibold italic text-[#969696]">
            Zen
          </span>
        </p>
      </div>

      {/* Logout Button */}
      <div
        className="absolute bottom-[79px] flex items-center justify-center left-[83px] size-6 cursor-pointer"
        onClick={handleLogout}
      >
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="relative size-6">
            <img
              alt="Logout Icon"
              className="block max-w-none size-full"
              src={imgSignOut}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[102px] font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-28 not-italic text-[#969696] text-[18px] text-nowrap translate-y-[100%] cursor-pointer"
        onClick={handleLogout}
      >
        <p className="leading-[normal] whitespace-pre">Log Out</p>
      </div>

      {/* Environment Data Cards */}
      {environmentData.map((card) => (
        <div
          key={card.id}
          className="absolute bg-white h-[213px] rounded-[30px] top-[196px] w-[253px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
          style={card.position}
          onClick={() => handleCardClick(card.id)}
        >
          {/* Progress Bar */}
          <div className="absolute h-[45px] left-[19px] top-[150px] w-[214px]">
            <div
              className="absolute h-[45px] left-0 rounded-[50px] top-0"
              style={{
                backgroundColor: card.color,
                width: `${(card.progress / 100) * 214}px`,
              }}
            />
            <div className="absolute h-[45px] left-0 rounded-[50px] top-0 w-[214px]">
              <div className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[50px]" />
            </div>
          </div>

          {/* Value */}
          <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-[19px] not-italic text-[34px] text-black text-nowrap top-[82px]">
            <p className="leading-[normal] whitespace-pre">{card.value}</p>
          </div>

          {/* Title */}
          <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-[19px] not-italic text-[#969696] text-[30px] text-nowrap top-[19px]">
            <p className="leading-[normal] whitespace-pre">{card.title}</p>
          </div>

          {/* Action Button */}
          <div className="absolute flex gap-2.5 items-center justify-center left-[188px] p-[7px] rounded-[22.5px] size-[45px] top-[19px] hover:bg-gray-50 transition-colors">
            <div className="absolute border border-[#969696] border-solid inset-0 pointer-events-none rounded-[22.5px]" />
            <div className="relative shrink-0 size-6">
              <img
                alt="Expand"
                className="block max-w-none size-full"
                src={imgArrowUpRight}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewPage;
