import React, { useState, useEffect } from 'react';

export default function MenteeInterests({ 
  onBack, 
  initialData = { textContent: '', selectedArea: '' },
  onDataChange,
  formId = 'mentee-interests' // Unique ID for this form
}) {
  // Load saved data from sessionStorage or use initialData
  const loadSavedData = () => {
    try {
      const saved = sessionStorage.getItem(`form-${formId}`);
      if (saved) {
        const parsedData = JSON.parse(saved);
        return {
          textContent: parsedData.textContent || initialData.textContent,
          selectedArea: parsedData.selectedArea || initialData.selectedArea
        };
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
    return initialData;
  };

  const savedData = loadSavedData();
  const [textContent, setTextContent] = useState(savedData.textContent);
  const [selectedArea, setSelectedArea] = useState(savedData.selectedArea);

  // Save form data whenever it changes
  useEffect(() => {
    const formData = { textContent, selectedArea };
    
    // Save to sessionStorage for persistence across navigation
    try {
      sessionStorage.setItem(`form-${formId}`, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
    
    // Update parent component when data changes (for state management)
    if (onDataChange) {
      onDataChange(formData);
    }
  }, [textContent, selectedArea, onDataChange, formId]);

  const handleSubmit = () => {
    console.log('Form submitted:', { textContent, selectedArea });
    // Handle form submission logic here
    // You might want to validate the form before submitting
    if (textContent.trim() && selectedArea) {
      // Clear saved data after successful submission
      try {
        sessionStorage.removeItem(`form-${formId}`);
      } catch (error) {
        console.error('Error clearing form data:', error);
      }
      // Submit logic
      alert('Form submitted successfully!');
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  // Clear form data (optional method you can call from parent)
  const clearFormData = () => {
    setTextContent('');
    setSelectedArea('');
    try {
      sessionStorage.removeItem(`form-${formId}`);
    } catch (error) {
      console.error('Error clearing form data:', error);
    }
  };

  // Expose clearFormData method to parent component
  useEffect(() => {
    if (onDataChange) {
      onDataChange({ textContent, selectedArea, clearFormData });
    }
  }, [textContent, selectedArea, onDataChange]);

  const handleBack = () => {
    console.log('Back button clicked');
    
    // Option 1: If parent component handles navigation (recommended for state management)
    if (onBack) {
      onBack({ textContent, selectedArea }); // Pass current state back to parent
    } else {
      // Option 2: Using browser's native back functionality
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-blue-950 text-lg sm:text-xl font-bold mb-6 sm:mb-8 border-b-2 border-blue-950 pb-2">
          Please provide the following details:-
        </h1>

        {/* Main Content Area */}
        <div className="space-y-4 sm:space-y-6">
          {/* Large Text Area */}
          <div>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full h-40 sm:h-48 p-3 sm:p-4 border-2 border-blue-950 rounded-2xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base"
              style={{ fontFamily: 'Arial, sans-serif' }}
              placeholder="Please describe your interests, goals, and what you hope to achieve through mentorship..."
            />
          </div>

          {/* Dropdown Menu */}
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
              <option value="nanotechnology">Nanotechnology</option>
              <option value="cybersecurity">Cybersecurity & Data Privacy</option>
              <option value="space-exploration">Space Exploration & Astronomy</option>
              <option value="neuroscience">Neuroscience & Brain Research</option>
              <option value="robotics">Robotics & Automation</option>
              <option value="climate-science">Climate Science & Environmental Research</option>
              <option value="blockchain">Blockchain & Cryptocurrency</option>
              <option value="biomedical-engineering">Biomedical Engineering</option>
              <option value="materials-science">Advanced Materials Science</option>
              <option value="oceanography">Marine Biology & Oceanography</option>
              <option value="psychology">Cognitive Psychology & Behavioral Science</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Buttons */}
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
}