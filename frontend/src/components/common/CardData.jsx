import React from "react";
import { ArrowUpRight } from "phosphor-react";

const CardData = ({ title, value, unit, percent }) => {
  return (
    <div className="min-w-[160px] flex-1 h-[140px] p-3 bg-white flex flex-col justify-between gap-3 rounded-[20px] shadow-lg">
      {/* title + detail*/}
      <div className="w-full flex justify-between items-center">
        <p className="text-xl font-semibold text-[#969696]">{title}</p>
        <a
          href="#"
          className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 duration-300"
        >
          <ArrowUpRight size={20} color="#969696" />
        </a>
      </div>

      {/* value + unit */}
      <p className="text-2xl font-semibold text-gray-800">
        {value} {unit}
      </p>

      {/* progress bar */}
      <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-[#CCF067] rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CardData;
