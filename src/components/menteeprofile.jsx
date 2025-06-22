import React, { useState } from 'react';
import profile from "../assets/profile.jpg";

export default function MenteeProfilePage() {
  const [isEditing, setIsEditing] = useState({});
  const [profileData, setProfileData] = useState({
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    rollNo: 'CS22B013',
    degree: 'B.Tech',
    yearGraduated: '2020',
    phoneNo: '+91-9876543210',
    department: 'Computer Science',
    yearOfEnrollment: '2023',
    menteeCapacity: '3',
    mentoringType: 'One-on-One',
    availability: 'true',
    broadAreaOfExpertise: 'Computer Science',
    narrowAreaOfExpertise: 'AI, ML, Backend development'
  });

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
    }
  };

  const renderEditableField = (label, field, value, type = 'text', options = []) => {
    const isCurrentlyEditing = isEditing[field];
    
    return (
      <div className="flex justify-between items-center py-4 border-b border-gray-100">
        <span className="text-gray-600 font-medium">
          {label}:
        </span>
        {isCurrentlyEditing ? (
          <div className="flex gap-3 items-center">
            {type === 'select' ? (
              <select
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            )}
            <button
              onClick={() => handleSave(field)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-gray-800 mr-4">
              {field === 'availability' ? (value === 'true' ? 'Available' : 'Not Available') : value}
            </span>
            <button
              onClick={() => handleEdit(field)}
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderReadOnlyField = (label, value) => {
    return (
      <div className="flex justify-between items-center py-4 border-b border-gray-100">
        <span className="text-gray-600 font-medium">
          {label}:
        </span>
        <span className="text-gray-800">{value}</span>
      </div>
    );
  };

  // Options for select fields
  const degreeOptions = [
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'M.Tech', label: 'M.Tech' },
    { value: 'B.Sc', label: 'B.Sc' },
    { value: 'M.Sc', label: 'M.Sc' },
    { value: 'PhD', label: 'PhD' }
  ];

  const mentoringTypeOptions = [
    { value: 'One-on-One', label: 'One-on-One' },
    { value: 'Group', label: 'Group' },
    { value: 'Both', label: 'Both' }
  ];

  const availabilityOptions = [
    { value: 'true', label: 'Available' },
    { value: 'false', label: 'Not Available' }
  ];

  const broadAreaOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    { value: 'Civil Engineering', label: 'Civil Engineering' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-center text-gray-900">
            
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Profile Image */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={profile}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="space-y-0">
            {/* Read-only fields */}
            {renderReadOnlyField('Name', profileData.name)}
            {renderReadOnlyField('Roll No', profileData.rollNo)}
            {renderReadOnlyField('Department', profileData.department)}
            {renderReadOnlyField('Year of Enrollment', profileData.yearOfEnrollment)}
            
            {/* Editable fields */}
            {renderEditableField('Email', 'email', profileData.email, 'email')}
            {renderEditableField('Degree', 'degree', profileData.degree, 'select', degreeOptions)}
            {renderEditableField('Year Graduated', 'yearGraduated', profileData.yearGraduated)}
            {renderEditableField('Phone No', 'phoneNo', profileData.phoneNo, 'tel')}
            {renderEditableField('Mentee Capacity', 'menteeCapacity', profileData.menteeCapacity, 'number')}
            {renderEditableField('Mentoring Type', 'mentoringType', profileData.mentoringType, 'select', mentoringTypeOptions)}
            {renderEditableField('Availability', 'availability', profileData.availability, 'select', availabilityOptions)}
            {renderEditableField('Broad Area of Expertise', 'broadAreaOfExpertise', profileData.broadAreaOfExpertise, 'select', broadAreaOptions)}
            {renderEditableField('Narrow Area of Expertise', 'narrowAreaOfExpertise', profileData.narrowAreaOfExpertise)}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-12 pt-8 border-t border-gray-100">
            <button
              onClick={handleDeleteAccount}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors duration-200"
            >
              Delete My Account
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}