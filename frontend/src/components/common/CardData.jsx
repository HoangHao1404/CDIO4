import React from "react";
import { ArrowUpRight } from "phosphor-react";

const CardData = () => {
  return (
    <div className="w-full flex gap-4 flex-nowrap">
      <div className="flex-none w-[180px] h-[160px] p-3 bg-white flex flex-col justify-between gap-3 rounded-[20px] shadow-lg">
        {/* title + detail*/}
        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-semibold text-[#969696]">CO₂</p>
          <a
            href="#"
            className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 duration-300"
          >
            <ArrowUpRight size={20} color="#969696" />
          </a>
        </div>

        {/* value + unit */}
        <p className="text-2xl font-semibold text-gray-800">735 ppm</p>

        {/* progress bar */}
        <div className="w-full h-9 rounded-full border border-gray-200">
          <div className="h-full w-1/4 bg-[#CCF067] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CardData;
