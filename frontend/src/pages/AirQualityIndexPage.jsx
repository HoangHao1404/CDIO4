import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// =====================
// Config ngưỡng & label
// =====================
const METRICS = {
  PM25: {
    key: "PM2.5",
    unit: "µg/m³",
    baseline: 15,
    footer:
      "Khuyến nghị WHO: PM2.5 (24h trung bình) ≤ 15 µg/m³; hàng năm ≤ 5 µg/m³.",
    healthy: (v) => v <= 15,
  },
  CO2: {
    key: "CO₂",
    unit: "ppm",
    baseline: 1000,
    footer:
      "Khuyến nghị ASHRAE: CO₂ trong nhà nên ≤ 1000 ppm để đảm bảo thông thoáng.",
    healthy: (v) => v <= 1000,
  },
  TEMP: {
    key: "Nhiệt độ",
    unit: "°C",
    baseline: 26,
    footer:
      "Khuyến nghị OSHA: Nhiệt độ thoải mái trong nhà khoảng 20–26 °C.",
    healthy: (v) => v >= 20 && v <= 26,
  },
  HUMI: {
    key: "Độ ẩm",
    unit: "%",
    baseline: 60,
    footer:
      "Khuyến nghị ASHRAE: Độ ẩm tương đối trong nhà lý tưởng 40–60%.",
    healthy: (v) => v >= 40 && v <= 60,
  },
  GAS: {
    key: "Khí gas",
    unit: "ppm",
    baseline: 50,
    footer:
      "Khuyến nghị WHO: Khí VOC / gas nên dưới 50 ppm để đảm bảo an toàn.",
    healthy: (v) => v <= 50,
  },
};

const Y_DOMAIN = {
  PM25: { min: 0, max: 60, step: 15 },
  CO2: { min: 400, max: 1600, step: 200 },
  TEMP: { min: 0, max: 45, step: 5 },
  HUMI: { min: 0, max: 100, step: 10 },
  GAS: { min: 0, max: 50, step: 5 },
};

function getYDomain(metricKey) {
  const cfg = Y_DOMAIN[metricKey];
  return cfg ? [cfg.min, cfg.max] : ["auto", "auto"];
}
function genYTicks(metricKey) {
  const cfg = Y_DOMAIN[metricKey];
  if (!cfg) return undefined;
  const arr = [];
  for (let v = cfg.min; v <= cfg.max; v += cfg.step) arr.push(v);
  return arr;
}
function xAxisPropsByRange(range) {
  switch (range) {
    case "realtime":
    case "day":
      return { interval: 2, minTickGap: 16 };
    case "week":
      return { interval: 0, minTickGap: 24 };
    case "month":
      return { interval: 2, minTickGap: 20 };
    default:
      return {};
  }
}

// =====================
// Dropdown đơn giản
// =====================
function Select({ value, onChange, options }) {
  return (
    <select
      className="h-9 rounded-xl border border-slate-200 bg-white/90 px-3 text-sm shadow-sm outline-none transition hover:bg-white focus:border-slate-300 dark:bg-slate-800/70 dark:border-slate-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

const METRIC_OPTIONS = [
  { value: "PM25", label: "PM2.5" },
  { value: "CO2", label: "CO2" },
  { value: "TEMP", label: "Nhiệt độ" },
  { value: "HUMI", label: "Độ ẩm" },
  { value: "GAS", label: "Gas" },
];
const RANGE_OPTIONS = [
  { value: "realtime", label: "Real-time" },
  { value: "day", label: "Theo ngày" },
  { value: "week", label: "Theo tuần" },
  { value: "month", label: "Theo tháng" },
];

// =====================
// Fake data demo
// =====================
function randAround(base, jitter) {
  return +(base + (Math.random() * 2 - 1) * jitter).toFixed(1);
}
function genData(metricKey, range) {
  const now = new Date();
  const cfg = {
    PM25: { base: 35, jitter: 15 },
    CO2: { base: 800, jitter: 400 },
    TEMP: { base: 27, jitter: 6 },
    HUMI: { base: 55, jitter: 20 },
    GAS: { base: 6, jitter: 6 },
  }[metricKey];

  if (!cfg) return [];

  const r =
    range === "realtime" || range === "day"
      ? { n: 24, stepHours: 1 }
      : range === "week"
      ? { n: 7, stepHours: 24 }
      : { n: 30, stepHours: 24 };

  const points = [];
  for (let i = r.n - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 60 * 1000 * r.stepHours);
    const label =
      r.stepHours === 1
        ? t.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        : t.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
    points.push({ t, label, value: randAround(cfg.base, cfg.jitter) });
  }
  return points;
}

// =====================
// Badge trạng thái
// =====================
function StatusBadge({ metric, currentValue }) {
  const ok = metric.healthy(currentValue);
  const color = ok
    ? "bg-green-500/15 text-green-600"
    : "bg-orange-500/15 text-orange-600";
  const text = ok ? "Lành mạnh" : "Không lành mạnh";
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full px-3 py-2 ${color} shadow-sm backdrop-blur`}
    >
      <span className="text-sm font-semibold">
        {currentValue} {metric.unit}
      </span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

// =====================
// Tooltip tag xanh
// =====================
function DotTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0].value;
  return (
    <div className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
      {v}
    </div>
  );
}

// =====================
// Trang chính
// =====================
export default function AirQualityIndexPage() {
  const [metricKey, setMetricKey] = useState("PM25");
  const [range, setRange] = useState("realtime");

  const metric = METRICS[metricKey];
  const data = useMemo(() => genData(metricKey, range), [metricKey, range]);
  const current = data[data.length - 1]?.value ?? 0;

  const unit = metric.unit;
  const xProps = xAxisPropsByRange(range);

  return (
    <div className="h-full w-full flex flex-col gap-3 px-0">
      {/* Card biểu đồ */}
      <div className="relative flex-1 min-h-[420px] rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/50 lg:p-6 overflow-hidden">
        {/* Controls */}
        <div className="absolute inset-x-4 top-2 z-10 flex items-start justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <StatusBadge metric={metric} currentValue={current} />
          </div>
          <div className="flex items-center gap-3 pointer-events-auto">
            <Select
              value={metricKey}
              onChange={setMetricKey}
              options={METRIC_OPTIONS}
            />
            <Select value={range} onChange={setRange} options={RANGE_OPTIONS} />
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="h-[400px] w-full pt-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickMargin={8}
                {...xProps}
              />
              <YAxis
                domain={getYDomain(metricKey)}
                ticks={genYTicks(metricKey)}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v} ${unit}`}
                width={70}
              />
              <ReferenceLine
                y={metric.baseline}
                strokeDasharray="6 6"
                stroke="#ef4444"
                ifOverflow="extendDomain"
                label={{
                  value: "WHO",
                  position: "insideTopLeft",
                  fill: "#ef4444",
                  fontSize: 12,
                  offset: 10,
                }}
              />
              <Tooltip content={<DotTooltip />} cursor={{ strokeDasharray: "3 3" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer WHO */}
      <div className="shrink-0 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs">
            ℹ️
          </span>
          {metric.footer}
        </span>
      </div>
    </div>
  );
}
