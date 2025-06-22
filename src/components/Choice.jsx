import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
    
    // Navigate based on role selection
    if (role === 'mentee') {
      navigate('/menteeregister');
    } else if (role === 'mentor') {
      navigate('/mentoregister');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className=" p-8 w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-arial text-blue-950  mb-2"> 
            please tell your purpose of visit
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
            <div className="bg-white rounded-2xl p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-50 rounded-full p-6 shadow-md group-hover:shadow-lg transition-shadow duration-300 mb-4">
                <User size={48} className="text-blue-950" />
              </div>
              <h3 className="text-xl font-medium text-blue-950 text-center">Mentee</h3>
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
            <div className="bg-white rounded-2xl p-8 w-48 h-48 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-950 rounded-full p-6 shadow-md group-hover:shadow-lg transition-shadow duration-300 mb-4">
                <User size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-medium text-blue-950 text-center">Mentor</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;