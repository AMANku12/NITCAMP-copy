import React, { useState } from 'react';
import MentorDatabase from './mentordatabase';
import MenteeDatabase from './menteedatabse';
import Matchmaking from './matchmaking';

export default function MatchingDashboard() {
  const [view, setView] = useState(null);

  const renderView = () => {
    switch (view) {
      case 'mentors':
        return <MentorDatabase onBack={() => setView(null)} />;
      case 'mentees':
        return <MenteeDatabase onBack={() => setView(null)} />;
      case 'matchmaking':
        return <Matchmaking onBack={() => setView(null)} />;
      default:
        return (
          <div className="flex flex-col items-center gap-4 mt-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
                Select Database
              </h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setView('mentors')} 
                  className="w-full bg-white hover:bg-gray-100 text-black px-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200"
                >
                  Mentors Database
                </button>
                
                <button 
                  onClick={() => setView('mentees')} 
                  className="w-full bg-white hover:bg-gray-100 text-black px-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200"
                >
                  Mentees Database
                </button>
                
                <button 
                  onClick={() => setView('matchmaking')} 
                  className="w-full bg-white hover:bg-gray-100 text-black px-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200"
                >
                  Matchmaking
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div>{renderView()}</div>;
}