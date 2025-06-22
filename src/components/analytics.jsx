import { useState, useEffect } from 'react';

/**
 * Analytics Panel Component
 * Displays key metrics in a clean responsive layout with blue-950 background
 * Currently uses sample data - replace with actual API calls when backend is ready
 */
export default function AnalyticsPanel() {
  // State for storing analytics data
  const [analyticsData, setAnalyticsData] = useState({
    registrations: 0,
    maleMentees: 0,
    femaleMentees: 0,
    mentorsRegistered: 0,
    mentorsMatched: 0,
    mentorsToBeMatched: 0
  });

  // Loading state for better UX (currently simulated)
  const [isLoading, setIsLoading] = useState(true);
  
  // Animated values for counter animation
  const [animatedValues, setAnimatedValues] = useState({});

  /**
   * SAMPLE DATA - Replace this with actual API calls
   * This function simulates fetching data from backend
   */
  const loadSampleData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const sampleData = {
        registrations: 680,      // Total mentee registrations
        maleMentees: 360,        // Male mentees count
        femaleMentees: 320,      // Female mentees count
        mentorsRegistered: 150,  // Total registered mentors
        mentorsMatched: 100,     // Active mentor-mentee matches
        mentorsToBeMatched: 100  // Pending matches
      };

      setAnalyticsData(sampleData);
      setIsLoading(false);
      
      // Start counter animations after data is loaded
      Object.entries(sampleData).forEach(([key, value], index) => {
        setTimeout(() => {
          animateCounter(value, key);
        }, index * 150); // Stagger animations by 150ms
      });
    }, 800); // Simulate 800ms API response time
  };

  /**
   * Counter animation function for smooth number transitions
   * Creates a smooth counting effect from 0 to target value
   */
  const animateCounter = (targetValue, key, duration = 1500) => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out-quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
      
      setAnimatedValues(prev => ({
        ...prev,
        [key]: currentValue
      }));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Load sample data on component mount
  useEffect(() => {
    loadSampleData();
  }, []);

  /**
   * Analytics metrics configuration
   * Each metric defines its display properties and backend data source
   */
  const metrics = [
    {
      id: 'registrations',
      label: 'REGISTRATIONS',
      value: analyticsData.registrations,
      description: 'Total number of mentee registrations'
    },
    {
      id: 'maleMentees',
      label: 'MALE MENTEES',
      value: analyticsData.maleMentees,
      description: 'Total number of male mentees'
    },
    {
      id: 'femaleMentees',
      label: 'FEMALE MENTEES',
      value: analyticsData.femaleMentees,
      description: 'Total number of female mentees'
    },
    {
      id: 'mentorsRegistered',
      label: 'MENTORS REGISTERED',
      value: analyticsData.mentorsRegistered,
      description: 'Total number of registered mentors'
    },
    {
      id: 'mentorsMatched',
      label: 'MENTORS/MENTEE MATCHED',
      value: analyticsData.mentorsMatched,
      description: 'Active mentor-mentee pairs'
    },
    {
      id: 'mentorsToBeMatched',
      label: 'TO BE MATCHED',
      value: analyticsData.mentorsToBeMatched,
      description: 'Pending matches awaiting assignment'
    }
  ];

  /**
   * Handle metric card click
   */
  const handleMetricClick = (metric) => {
    console.log(`Clicked on ${metric.id}:`, metric);
  };

  /**
   * Refresh data handler
   */
  const handleRefresh = () => {
    loadSampleData();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-950 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">Analytics</h1>
            <div className="h-1 bg-white w-24 sm:w-32 mt-2"></div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg max-w-5xl mx-auto">
            {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`
                    p-4 sm:p-5 lg:p-6 xl:p-7
                    text-center
                    ${index < 1 ? 'sm:border-b sm:border-gray-300' : ''}
                    ${index < 2 ? 'lg:border-b lg:border-gray-300' : ''}
                    ${index >= 3 ? 'sm:border-t sm:border-gray-300 lg:border-t-0' : ''}
                  `}
                >
                  <div className="animate-pulse">
                    <div className="h-3 bg-gray-200 rounded mb-3 sm:mb-4"></div>
                    <div className="h-6 sm:h-8 lg:h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Analytics Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">Analytics</h1>
          <div className="h-1 bg-white w-24 sm:w-32 mt-2"></div>
        </div>

        {/* Analytics Grid Panel */}
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg max-w-5xl mx-auto">
          {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
            {metrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`
                  p-4 sm:p-5 lg:p-6 xl:p-7
                  text-center 
                  hover:bg-gray-50 
                  transition-all duration-300 
                  cursor-pointer
                  group
                  relative
                  ${index < 1 ? 'sm:border-b sm:border-gray-300' : ''}
                  ${index < 2 ? 'lg:border-b lg:border-gray-300' : ''}
                  ${index >= 3 ? 'sm:border-t sm:border-gray-300 lg:border-t-0' : ''}
                `}
                onClick={() => handleMetricClick(metric)}
                title={metric.description}
              >
                {/* Metric Label */}
                <div className="text-gray-800 text-xs sm:text-sm font-bold mb-3 sm:mb-4 lg:mb-5 tracking-wide leading-tight">
                  {metric.label}
                </div>
                
                {/* Animated Metric Value */}
                <div className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold group-hover:text-blue-600 transition-colors">
                  {animatedValues[metric.id] !== undefined 
                    ? animatedValues[metric.id].toLocaleString() 
                    : '0'
                  }
                </div>
                
                {/* Hover hint (desktop only) */}
                <div className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
                  Click for details
                </div>

                {/* Mobile tap indicator */}
                <div className="absolute top-2 right-2 text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity lg:hidden">
                  tap
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Info Footer */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-sm text-gray-300">
          <div className="order-2 sm:order-1">
            Currently showing sample data
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="order-1 sm:order-2 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
          >
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>

        {/* Mobile-specific metrics summary */}
        <div className="mt-6 sm:hidden">
          <div className="bg-blue-900 rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-2 text-sm">Quick Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Total Mentees: {(analyticsData.maleMentees + analyticsData.femaleMentees).toLocaleString()}</div>
              <div>Match Rate: {analyticsData.mentorsMatched > 0 ? Math.round((analyticsData.mentorsMatched / analyticsData.mentorsRegistered) * 100) : 0}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}