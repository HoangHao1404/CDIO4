import React from "react";
import DeviceTable from "../components/common/DeviceTable";

export const DeviceManagerment = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <DeviceTable />
      </div>
    </div>
  );
};
