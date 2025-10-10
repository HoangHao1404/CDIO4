import React from "react";
import { ArrowUpRight } from "phosphor-react";

const CardData = ({ title, value, unit, percent }) => {
  return (
    <div
      className="min-w-[160px] flex-1 h-[140px] p-3 
                 bg-white dark:bg-zinc-800 
                 flex flex-col justify-between gap-3 
                 rounded-[20px] shadow-lg 
                 transition-colors duration-300"
    >
      {/* title + detail */}
      <div className="w-full flex justify-between items-center">
        <p className="text-xl font-semibold text-[#969696] dark:text-zinc-300">
          {title}
        </p>
        <a
          href="#"
          className="w-9 h-9 border border-gray-200 dark:border-zinc-600 
                     rounded-full flex items-center justify-center 
                     hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 
                     duration-300"
        >
          <ArrowUpRight
            size={20}
            color={window.matchMedia("(prefers-color-scheme: dark)").matches ? "#d1d5db" : "#969696"}
            className="dark:text-zinc-300"
          />
        </a>
      </div>

      {/* value + unit */}
      <p className="text-2xl font-semibold text-gray-800 dark:text-zinc-100">
        {value} {unit}
      </p>

      {/* progress bar */}
      <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-zinc-700 overflow-hidden">
        <div
          className="h-full bg-[#CCF067] dark:bg-lime-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};
  
export default CardData;
