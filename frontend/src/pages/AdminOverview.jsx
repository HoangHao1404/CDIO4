import React from "react";
import {
  Users,
  Cpu,
  Wifi,
  WifiOff,
  MessageSquare,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const AdminOverview = () => {
  const stats = [
    { title: "Người dùng", value: 120, icon: <Users size={22} />, gradient: "from-emerald-400 to-lime-300" },
    { title: "Thiết bị", value: 58, icon: <Cpu size={22} />, gradient: "from-sky-400 to-blue-400" },
    { title: "Online", value: 46, icon: <Wifi size={22} />, gradient: "from-green-400 to-emerald-500" },
    { title: "Offline", value: 12, icon: <WifiOff size={22} />, gradient: "from-red-400 to-rose-500" },
    { title: "Yêu cầu hỗ trợ", value: 8, icon: <MessageSquare size={22} />, gradient: "from-amber-400 to-orange-400" },
  ];

  const userStats = [
    { name: "T1", newUsers: 20 },
    { name: "T2", newUsers: 35 },
    { name: "T3", newUsers: 25 },
    { name: "T4", newUsers: 45 },
    { name: "T5", newUsers: 32 },
  ];

  const deviceStatus = [
    { name: "Online", value: 46, color: "#22c55e" },
    { name: "Offline", value: 12, color: "#ef4444" },
  ];

  const activities = [
    { id: 1, text: "👤 Người dùng mới: Lê Văn A", time: "5 phút trước" },
    { id: 2, text: "⚠️ Thiết bị D-102 mất kết nối", time: "30 phút trước" },
    { id: 3, text: "⚙️ Admin thêm thiết bị AirZen-08", time: "2 giờ trước" },
    { id: 4, text: "📨 Yêu cầu hỗ trợ từ user 204", time: "3 giờ trước" },
    { id: 5, text: "🔒 User B-98 bị khóa do spam", time: "6 giờ trước" },
  ];

  return (
    <div
      className="
        min-h-screen w-full p-4 md:p-6
        rounded-[25px]
        bg-gradient-to-b from-gray-50 to-white
        dark:from-[#181818] dark:to-[#121212]
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        dark:shadow-[0_4px_16px_rgba(255,255,255,0.05)]
        transition-all duration-500
        text-gray-800 dark:text-gray-100
      "
    >
      {/* Cards thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className="
              p-5 rounded-2xl
              bg-white dark:bg-[#242424]
              border border-transparent
              shadow-md hover:shadow-lg
              hover:-translate-y-1
              transition-all duration-300
              hover:border-emerald-200 dark:hover:border-emerald-500/40
            "
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow`}
            >
              {item.icon}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
              {item.title}
            </p>
            <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Biểu đồ người dùng */}
        <div className="col-span-2 bg-white dark:bg-[#242424] rounded-2xl shadow p-5 transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Activity size={20} /> Lượng người dùng mới theo tháng
            </h2>
            <span className="text-sm text-gray-400">5 tháng gần nhất</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-zinc-600/40" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  color: "#111",
                }}
              />
              <Bar dataKey="newUsers" fill="#34d399" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ trạng thái thiết bị */}
        <div className="bg-white dark:bg-[#242424] rounded-2xl shadow p-5 transition-all duration-300">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Trạng thái thiết bị
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
              <Pie
                data={deviceStatus}
                cx="50%"
                cy="50%"
                outerRadius={90}
                labelLine={true}
                label={({ name, value }) => `${name}: ${value}`}
                dataKey="value"
              >
                {deviceStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activities */}
      <div className="bg-white dark:bg-[#242424] rounded-2xl shadow p-5 mt-8 transition-all duration-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Hoạt động gần đây
        </h2>
        <ul className="divide-y divide-gray-100 dark:divide-zinc-700">
          {activities.map((act) => (
            <li
              key={act.id}
              className="py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-zinc-800 px-3 rounded-lg transition"
            >
              <span className="text-gray-700 dark:text-gray-200">
                {act.text}
              </span>
              <span className="text-sm text-gray-400">{act.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;
