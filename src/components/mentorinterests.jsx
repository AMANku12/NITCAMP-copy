import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context for managing app-wide state
const AppStateContext = createContext();

// Custom hook to use the app state
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// App State Provider Component
const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState(() => {
    // Load all saved data from sessionStorage on app start
    try {
      const savedState = sessionStorage.getItem('app-state');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error loading app state:', error);
    }
    
    // Default state structure
    return {
      currentPage: 'mentee-interests', // or whatever your starting page is
      menteeInterests: {
        textContent: '',
        selectedArea: ''
      },
      mentorInterests: {
        broadArea: '',
        narrowArea: ''
      },
      // Add more forms as needed
      // otherFormData: {},
    };
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem('app-state', JSON.stringify(appState));
    } catch (error) {
      console.error('Error saving app state:', error);
    }
  }, [appState]);

  // Update specific form data
  const updateFormData = (formName, data) => {
    setAppState(prev => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        ...data
      }
    }));
  };

  // Navigate between pages
  const navigateTo = (page) => {
    setAppState(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  // Clear all data (optional)
  const clearAllData = () => {
    const defaultState = {
      currentPage: 'mentee-interests',
      menteeInterests: { textContent: '', selectedArea: '' },
      mentorInterests: { broadArea: '', narrowArea: '' }
    };
    setAppState(defaultState);
    sessionStorage.removeItem('app-state');
  };

  return (
    <AppStateContext.Provider value={{
      appState,
      updateFormData,
      navigateTo,
      clearAllData
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Updated Mentee Interests Component
const MenteeInterests = () => {
  const { appState, updateFormData, navigateTo } = useAppState();
  const formData = appState.menteeInterests;

  const [textContent, setTextContent] = useState(formData.textContent);
  const [selectedArea, setSelectedArea] = useState(formData.selectedArea);

  // Update app state when form data changes
  useEffect(() => {
    updateFormData('menteeInterests', { textContent, selectedArea });
  }, [textContent, selectedArea, updateFormData]);

  const handleSubmit = () => {
    if (textContent.trim() && selectedArea) {
      console.log('Mentee form submitted:', { textContent, selectedArea });
      // Navigate to next page (e.g., mentor interests)
      navigateTo('mentor-interests');
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  const handleBack = () => {
    // Navigate to previous page - all data is preserved
    navigateTo('previous-page'); // Replace with your actual previous page
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-blue-950 text-lg sm:text-xl font-bold mb-6 sm:mb-8 border-b-2 border-blue-950 pb-2">
          Mentee Interests - Please provide the following details:-
        </h1>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full h-40 sm:h-48 p-3 sm:p-4 border-2 border-blue-950 rounded-2xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base"
              style={{ fontFamily: 'Arial, sans-serif' }}
              placeholder="Please describe your interests, goals, and what you hope to achieve through mentorship..."
            />
          </div>

          <div className="relative">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full p-3 sm:p-4 pr-10 border-2 border-blue-950 rounded-2xl bg-yellow-100 text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent appearance-none cursor-pointer text-sm sm:text-base"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              <option value="" disabled>Enter your area of interests....</option>
              <option value="artificial-intelligence">Artificial Intelligence & Machine Learning</option>
              <option value="quantum-computing">Quantum Computing</option>
              <option value="biotechnology">Biotechnology & Genetic Engineering</option>
              <option value="renewable-energy">Renewable Energy & Sustainability</option>
              <option value="cybersecurity">Cybersecurity & Data Privacy</option>
              <option value="space-exploration">Space Exploration & Astronomy</option>
              <option value="robotics">Robotics & Automation</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 text-sm sm:text-base"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              ← BACK
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 text-sm sm:text-base"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              ✓ SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated Mentor Interests Component
const MentorInterests = () => {
  const { appState, updateFormData, navigateTo } = useAppState();
  const formData = appState.mentorInterests;

  const [broadArea, setBroadArea] = useState(formData.broadArea);
  const [narrowArea, setNarrowArea] = useState(formData.narrowArea);

  // Update app state when form data changes
  useEffect(() => {
    updateFormData('mentorInterests', { broadArea, narrowArea });
  }, [broadArea, narrowArea, updateFormData]);

  const handleSubmit = () => {
    if (broadArea && narrowArea) {
      console.log('Mentor form submitted:', { broadArea, narrowArea });
      alert('All forms submitted successfully!');
      // You might want to navigate to a success page or clear data
    } else {
      alert('Please select both broad and narrow areas of expertise.');
    }
  };

  const handleBack = () => {
    // Navigate back to mentee interests - all data is preserved
    navigateTo('mentee-interests');
  };

  const broadAreaOptions = [
    'Software Engineering', 'Machine Learning', 'Artificial Intelligence',
    'Data Science', 'Computer Science', 'Web Development', 'Chemical Engineering'
  ];

  const narrowAreaOptions = [
    'React & Frontend Development', 'Python Programming', 'Machine Learning Algorithms',
    'Process Control', 'Renewable Energy', 'MATLAB'
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-blue-950 text-lg sm:text-xl font-bold mb-6 sm:mb-8 border-b-2 border-blue-950 pb-2">
          Mentor Interests - Please provide the following details:-
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-blue-950 text-sm sm:text-base font-medium mb-3">
              Enter <span className="font-bold">broad area</span> of expertise....
            </label>
            <div className="relative">
              <select
                value={broadArea}
                onChange={(e) => setBroadArea(e.target.value)}
                className="w-full p-6 sm:p-7 pr-12 border-2 border-blue-950 rounded-2xl bg-yellow-100 text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent appearance-none cursor-pointer text-base sm:text-lg min-h-[80px] sm:min-h-[90px]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <option value="" disabled>Example:- Chemical engineering, modeling</option>
                {broadAreaOptions.map((option, index) => (
                  <option key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-950" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-blue-950 text-sm sm:text-base font-medium mb-3">
              Enter <span className="font-bold">narrow area</span> of expertise....
            </label>
            <div className="relative">
              <select
                value={narrowArea}
                onChange={(e) => setNarrowArea(e.target.value)}
                className="w-full p-6 sm:p-7 pr-12 border-2 border-blue-950 rounded-2xl bg-yellow-100 text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent appearance-none cursor-pointer text-base sm:text-lg min-h-[80px] sm:min-h-[90px]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <option value="" disabled>Example:- petrochemical, renewable energy, matlab</option>
                {narrowAreaOptions.map((option, index) => (
                  <option key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-950" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8 sm:mt-10">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 text-sm sm:text-base font-medium"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              ← BACK
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 text-sm sm:text-base font-medium"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
               SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { appState } = useAppState();

  const renderCurrentPage = () => {
    switch (appState.currentPage) {
      case 'mentee-interests':
        return <MenteeInterests />;
      case 'mentor-interests':
        return <MentorInterests />;
      default:
        return <MenteeInterests />;
    }
  };

  return (
    <div>
      {renderCurrentPage()}
      
      {/* Debug info - remove in production */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded text-xs">
        Current: {appState.currentPage}
        <br />
        Mentee: {appState.menteeInterests.selectedArea ? '✓' : '✗'}
        <br />
        Mentor: {appState.mentorInterests.broadArea ? '✓' : '✗'}
      </div>
    </div>
  );
};

// Main App with Provider
export default function AppWithStateManagement() {
  return (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );
}