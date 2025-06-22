import { useState } from 'react';
import AnalyticsPanel from './analytics';
import ArchivesPanel from './archive';
import MatchingPanel from './matching/matchingdashboard.jsx';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Analytics');

  const tabs = ['Archives', 'Analytics', 'Matching', 'Logout'];

  const handleTabClick = (tab) => {
    if (tab === 'Logout') {
      alert('You have been logged out.');
      window.location.href = '/adminlogin'; // Redirect after alert
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-black flex relative overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-28 sm:w-36 md:w-44 lg:w-56 bg-black p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`w-full py-2 text-xs sm:text-sm font-semibold text-center rounded-md transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        {activeTab === 'Analytics' && <AnalyticsPanel />}
        {activeTab === 'Archives' && <ArchivesPanel />}
        {activeTab === 'Matching' && <MatchingPanel />}
      </div>
    </div>
  );
}
