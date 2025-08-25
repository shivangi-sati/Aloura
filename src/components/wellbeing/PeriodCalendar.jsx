import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useWellBeing } from "../../context/WellBeingContext";

const PeriodCalendar = () => {
  const { periods, addPeriod, symptoms } = useWellBeing();
  const [newDate, setNewDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [selectedDaySymptoms, setSelectedDaySymptoms] = useState([]);


  const periodDates = periods.flatMap((p) => {
    const start = new Date(p.startDate);
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toDateString();
    });
  });


  const symptomDates = symptoms.map((s) =>
    new Date(s.date).toDateString()
  );


  const fertileDates = periods.flatMap((p) => {
    const start = new Date(p.startDate);
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + 12 + i);
      return d.toDateString();
    });
  });


  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const d = date.toDateString();
      if (periodDates.includes(d)) return "bg-red-300 rounded-full";
      if (symptomDates.includes(d)) return "bg-yellow-300 rounded-full";
      if (fertileDates.includes(d)) return "bg-green-300 rounded-full";
    }
    return null;
  };


  const handleDayClick = (date) => {
    const d = date.toDateString();
    const logs = symptoms.filter(
      (s) => new Date(s.date).toDateString() === d
    );
    setSelectedDaySymptoms(logs);
  };

  const handleAddPeriod = () => {
    if (!newDate) return;
    addPeriod(newDate, cycleLength);
    setNewDate("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Period Calendar</h2>

      <Calendar
        tileClassName={tileClassName}
        onClickDay={handleDayClick}
      />


      {selectedDaySymptoms.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
          <h3 className="font-medium mb-2">Symptoms on this day:</h3>
          <ul className="list-disc ml-4">
            {selectedDaySymptoms.map((s, i) => (
              <li key={i}>{s.text}</li>
            ))}
          </ul>
        </div>
      )}

     
      <div className="flex gap-4 mt-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-300 rounded-full"></span> Period Days
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-300 rounded-full"></span> Symptoms Logged
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-300 rounded-full"></span> Fertile Window
        </span>
      </div>

  
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Log New Period</h3>
        <div className="flex gap-2">
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            type="number"
            min="21"
            max="35"
            className="border rounded px-2 py-1 w-20"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
          />
          <button
            className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
            onClick={handleAddPeriod}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodCalendar;
