import React from "react";
import DonutChart from "../components/graph";

import { BsCloud } from "react-icons/bs";

const CostGraph = ({ show }) => {
  const data = [
    { label: "EC2-30%($30,000)", value: 30, color: "blue" },
    { label: "RDS-20%($20,000)", value: 20, color: "purple" },
    { label: "S3-20%($20,000)", value: 20, color: "pink" },
    { label: "opensearch-10%($10,000)", value: 10, color: "red" },
    { label: "Elasticacche-10%($10,000)", value: 10, color: "orange" },
    { label: "others-10%($10,000)", value: 10, color: "yellow" },
  ];

  return (
    <div
      className={`rounded-lg p-4 mb-8 w-full transition-opacity duration-3000 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="border rounded-lg py-4 px-4 bg-white">
        <div className="flex items-center">
          <div className="bg-green-600 rounded-lg p-2">
            <BsCloud color="white" />
          </div>
          <div className="px-2 text-gray-600">
            Your production account has accumulated costs of $100,000 over the
            past month, here is a spread of cloud costs by services.
          </div>
        </div>
        <div className="w-full flex justify-center align-middle mt-4 bg-blue-50">
          <DonutChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default CostGraph;
