import React, { useState } from "react";
import { useWellBeing } from "../context/WellBeingContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PeriodLog from "../components/wellbeing/PeriodLog";
import SymptomsLog from "../components/wellbeing/SymptomsLog"; 
import WellnessTips from "../components/wellbeing/WellnessTips"; 

const WellBeing = () => {
  const { periods, addPeriod, deletePeriod, symptoms, addSymptom, wellnessTips } = useWellBeing();
  const [activeTab, setActiveTab] = useState("calendar");

  
  const tileClassName = ({ date }) => {
    const isPeriod = periods.some(
      (p) => new Date(p.date).toDateString() === date.toDateString()
    );
    if (isPeriod) return "period-day";
    return null;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🌸 WellBeing</h1>

    
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`px-3 py-1 rounded ${
            activeTab === "calendar" ? "bg-pink-500 text-white" : "bg-gray-200"
          }`}
        >
          Period Calendar
        </button>
        <button
          onClick={() => setActiveTab("symptoms")}
          className={`px-3 py-1 rounded ${
            activeTab === "symptoms" ? "bg-pink-500 text-white" : "bg-gray-200"
          }`}
        >
          Symptoms Log
        </button>
        <button
          onClick={() => setActiveTab("tips")}
          className={`px-3 py-1 rounded ${
            activeTab === "tips" ? "bg-pink-500 text-white" : "bg-gray-200"
          }`}
        >
          Wellness Tips
        </button>
      </div>

    
      {activeTab === "calendar" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Period Calendar</h2>
          <Calendar tileClassName={tileClassName} />

          
          <div className="flex gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-pink-400"></span> Period Days
            </span>
          </div>

          <div className="mt-4">
            <PeriodLog periods={periods} addPeriod={addPeriod} deletePeriod={deletePeriod} />
          </div>
        </div>
      )}

     
      {activeTab === "symptoms" && (
        <div>
          <SymptomsLog symptoms={symptoms} addSymptom={addSymptom} />
        </div>
      )}

     
      {activeTab === "tips" && (
        <div>
          <WellnessTips tips={wellnessTips} />
        </div>
      )}
    </div>
  );
};

export default WellBeing;
