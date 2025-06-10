import React, { useState } from 'react';
import { User } from 'lucide-react';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Handle role selection logic here
    console.log(`Selected role: ${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className=" p-8 w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-800 mb-2">
            Hey <span className="text-blue-600 font-medium">&lt;username&gt;</span>, please tell your purpose of visit
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {/* Mentee Option */}
          <div 
            onClick={() => handleRoleSelect('mentee')}
            className={`
              group cursor-pointer transition-all duration-300 transform hover:scale-105 
              ${selectedRole === 'mentee' ? 'ring-4 ring-blue-300' : ''}
            `}
          >
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-white rounded-full p-6 shadow-md group-hover:shadow-lg transition-shadow duration-300 mb-4">
                <User size={48} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 text-center">Mentee</h3>
            </div>
          </div>

          {/* Mentor Option */}
          <div 
            onClick={() => handleRoleSelect('mentor')}
            className={`
              group cursor-pointer transition-all duration-300 transform hover:scale-105 
              ${selectedRole === 'mentor' ? 'ring-4 ring-blue-300' : ''}
            `}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-white rounded-full p-6 shadow-md group-hover:shadow-lg transition-shadow duration-300 mb-4">
                <User size={48} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-white text-center">Mentor</h3>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => {
                // Handle continue logic
                console.log(`Continuing as ${selectedRole}`);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;