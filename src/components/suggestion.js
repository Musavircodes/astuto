import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import CostGraph from "../components/costGraph";
import Query from "../components/query";
import profile from "../assests/profile.webp";

const Suggestions = ({ onClickSuggestion }) => {
  const suggestions = [
    "Top cloud cost by services by production account (#24542)",
    "Which application costs are increasing the fastest?",
    "How much money are we losing by not moving to graviton instances",
    "Which are the largest S3 buckets by size?",
    "What is the next step",
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showCostGraph, setShowCostGraph] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [queryStatus, setQueryStatus] = useState("");
  const [showQuery, setShowQuery] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (queryStatus === "Generating SQL Query...") {
      setShowQuery(true);
    } else {
      setShowQuery(false);
    }
  }, [queryStatus]);

  const handleClick = (index) => {
    if (!firstClick) {
      setFirstClick(true);
      setQueryStatus("Generating SQL Query...");
      setTimeout(() => {
        setQueryStatus("Query");
        setShow(true);
        setShowCostGraph(true);
      }, 2000);
    } else {
      if (index === 0) {
        setShowCostGraph(true);
      } else {
        onClickSuggestion(suggestions[index]);
      }
    }
  };

  const toggleQuery = () => {
    setShowQuery(!showQuery);
  };

  const renderedSuggestions = suggestions.slice(0, 4);

  return (
    <>
      <div
        className={`rounded-lg px-4 pb-4 w-full transition-opacity duration-500 ${
          firstClick ? "opacity-100" : "opacity-0"
        }`}
      >
        {firstClick && (
          <div className="flex items-center border rounded-lg py-4 px-4 bg-blue-50">
            <img src={profile} className="rounded-lg h-10 w-10" alt="Profile" />
            <p className="text-lg px-3 text-gray-500">
              {showCostGraph ? suggestions[0] : "Profile"}
            </p>
          </div>
        )}
      </div>
      <div
        className={`px-4 rounded-lg  w-full transition-opacity duration-500 ${
          firstClick ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className=" border rounded-lg py-2 px-4 bg-white">
          <div className="flex items-center">
            {" "}
            <div className="flex-shrink-0 text-gray-500 text-sm">
              {queryStatus}
            </div>
            <div className="flex-grow border mx-3"></div>
            <button onClick={toggleQuery} className="focus:outline-none">
              {showQuery ? (
                <IoIosArrowUp className="text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-gray-500" />
              )}
            </button>{" "}
          </div>

          <div
            className={`transition-all duration-1000 ease-in-out overflow-hidden ${
              showQuery ? "max-h-full" : "max-h-0"
            }`}
          >
            {showQuery && <Query />}
          </div>
        </div>
      </div>

      {showCostGraph && <CostGraph show={show} />}
      <div className="grid grid-cols-2 gap-4 mb-8 absolute bottom-16 w-4/5">
        {renderedSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`rounded-2xl border border-gray-300 p-4 ${
              index === 0 ? "cursor-pointer hover:bg-gray-100" : ""
            } ${
              index !== 0 ? "opacity-50 pointer-events-none" : ""
            } relative transition duration-300 ease-in-out`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(index)}
          >
            <p className="text-sm text-gray-600">{suggestion}</p>
            {hoveredIndex === index && index === 0 && (
              <div className="absolute top-1/2 transform -translate-y-1/2 right-4 text-green-400">
                <BsArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Suggestions;
