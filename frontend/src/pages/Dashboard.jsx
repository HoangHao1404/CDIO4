import React from "react";
import CardData from "../components/common/CardData";
import OverviewChart from "../components/common/OverviewChart";
import QualityChart from "../components/common/QualityChart";

const Dashboard = () => {
  return (
    <div>
      <div className="w-full flex flex-nowrap gap-4">
        <CardData />
        <CardData />
        <CardData />
        <CardData />
        <CardData />
      </div>

      <div className="w-full min-h-[450px] flex gap-4 mt-4">
        <div className="w-2/3 flex flex-col bg-white rounded-[20px] shadow-lg p-4">
          <p className="text-md text-[#969696] font-medium">Overview</p>
          <div className="flex-1 flex items-center justify-center">
            <OverviewChart />
          </div>
        </div>
        <div className="w-1/3 bg-white rounded-[20px] shadow-lg p-4">
          <p className="text-md text-[#969696] font-medium">Quality</p>
          <div className="flex-1 flex items-center justify-center">
            <QualityChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
