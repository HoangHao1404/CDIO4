import React from "react";

const CardData = () => {
  return (
    <div className="w-[170px] h-[150px] p-3 bg-white flex flex-col justify-center gap-4 rounded-[20px] shadow-lg">
      {/* title + detail*/}
      <div className="w-full h-fit flex justify-between">
        <p className="text-xl font-semibold text-[#969696]">CO2</p>
        <p className="text-xl font-semibold text-[#969696]">-&gt;</p>
      </div>
      {/* value + unit */}
      <p className="text-2xl font-semibold">735 ppm</p>
      {/* progress bar */}
      <div className="w-full h-15 rounded-full border border-gray-200" />
    </div>
  );
};

export default CardData;
