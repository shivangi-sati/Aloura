import React from "react";
import SelfCareCheckIn from "../components/selfcare/SelfCareCheckIn";
import StreakTracker from "../components/selfcare/StreakTracker";

const SelfCare = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">🌸 Self-Care</h1>
      <p className="text-gray-600">
        Track your well-being, daily mood, and self-care habits.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <SelfCareCheckIn />
        <StreakTracker />
      </div>
    </div>
  );
};

export default SelfCare;
