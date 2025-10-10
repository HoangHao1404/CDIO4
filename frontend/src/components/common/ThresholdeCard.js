import { useState } from "react";

export default function ThresholdCard({
  title,
  defaultValue,
  unit,
  value,
  onSave,
  infoText = "Nguồn tham khảo: Bộ Y tế",
}) {
  const [mode, setMode] = useState("default");
  const [inputValue, setInputValue] = useState(value || "");
  const [showTooltip, setShowTooltip] = useState(false);

  const isError = mode === "custom" && +inputValue > defaultValue;

  return (
    <div
      className="bg-white dark:bg-zinc-800 dark:text-zinc-100 
                 dark:border dark:border-zinc-700 rounded-xl shadow-md 
                 p-4 w-[320px] h-[200px] flex flex-col 
                 transition-colors duration-300"
    >
      {/* Header: title + centered toggle + info */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>

        {/* Centered Toggle */}
        <div className="flex justify-center">
          <div className="flex bg-gray-50 dark:bg-zinc-700 p-0.5 rounded-full text-xs font-medium transition-colors">
            <button
              className={`px-3 py-1 rounded-full transition-colors flex items-center justify-center min-w-[60px] ${
                mode === "default"
                  ? "bg-lime-300 dark:text-black"
                  : "dark:text-zinc-100"
              }`}
              onClick={() => setMode("default")}
            >
              <span>Mặc định</span>
            </button>
            <button
              className={`px-3 py-1 rounded-full transition-colors flex items-center justify-center min-w-[60px] ${
                mode === "custom"
                  ? "bg-lime-300 dark:text-black"
                  : "dark:text-zinc-100"
              }`}
              onClick={() => setMode("custom")}
            >
              <span>Custom</span>
            </button>
          </div>
        </div>

        {/* Info tooltip */}
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div
            className="w-4 h-4 rounded-full border border-gray-400 dark:border-zinc-500 
                       text-center text-[10px] font-bold text-gray-600 dark:text-zinc-300 
                       flex items-center justify-center"
          >
            i
          </div>
          {showTooltip && (
            <div
              className="absolute z-20 top-6 right-0 w-52 bg-white/95 dark:bg-zinc-800/95 
                         backdrop-blur text-xs text-gray-700 dark:text-zinc-200 
                         p-2 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-600"
            >
              {infoText}
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      <p
        className={`text-[10px] h-2 transition-colors ${
          isError
            ? "text-red-500 font-medium"
            : "invisible dark:text-zinc-400"
        }`}
      >
        {isError ? "Không thể vượt ngưỡng an toàn" : "-"}
      </p>

      {/* Input + Button */}
      <div className="flex-grow flex flex-col justify-end gap-3">
        <input
          disabled={mode === "default"}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`${defaultValue} ${unit}`}
          className={`w-full p-2 text-base border rounded-md transition-colors ${
            isError
              ? "border-red-500 text-red-500 dark:border-red-500 dark:text-red-400"
              : "border-lime-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
          }`}
        />

        <button
          onClick={() => onSave(inputValue)}
          disabled={mode === "default" || isError}
          className={`w-full py-2 text-base font-semibold rounded-md transition-colors ${
            mode === "default" || isError
              ? "bg-gray-300 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed"
              : "bg-lime-300 hover:bg-lime-400 dark:hover:bg-lime-400 dark:text-black"
          }`}
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
