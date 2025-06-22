import React, { useState } from 'react';
import { User, Phone, Mail, BookOpen, Calendar, GraduationCap, Users, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MentorRegistrationForm = () => {
  const navigate = useNavigate(); // Add this line to use the navigate function

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    highestDegree: '',
    department: '',
    yearGraduated: '',
    menteeCapacity: '',
    mentoringType: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = [
    'Chemical Engineering',
    'Civil Engineering',
    'Computer Science and Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Production Engineering',
    'Architecture',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Humanities and Social Sciences'
  ];

  const degrees = ['Bachelor\'s', 'Master\'s', 'PhD', 'MBA', 'M.Tech', 'B.Tech'];
  const mentoringTypes = [
    'Academic Mentoring',
    'Career Mentoring', 
    'Personal Development',
    'Technical Skills',
    'Research Guidance',
    'Entrepreneurship'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Phone number must be 10 digits';
    }
    if (!formData.highestDegree.trim()) newErrors.highestDegree = 'Highest degree is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.yearGraduated) newErrors.yearGraduated = 'Year graduated is required';
    if (!formData.menteeCapacity.trim()) newErrors.menteeCapacity = 'Mentee capacity is required';
    if (!formData.mentoringType) newErrors.mentoringType = 'Mentoring type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Navigate directly to mentorinterests page
      navigate('/mentorinterests');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phoneNo: '',
      highestDegree: '',
      department: '',
      yearGraduated: '',
      menteeCapacity: '',
      mentoringType: ''
    });
    setErrors({});
  };

  // Remove the isSubmitted conditional render since we're navigating directly
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        {/* Form Container */}
        <div className="bg-white rounded-b-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Mentor Registration</h2>
              <p className="text-blue-700">Please provide the following details (all fields marked with * are compulsory)</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Connector Line */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-950 transform -translate-x-1/2 rounded-full">
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-950 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg"></div>
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-950 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg"></div>
                </div>

                {/* Left Column */}
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.name 
                          ? 'border-red-400 bg-red-50' 
                          : formData.name.trim() 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.email 
                          ? 'border-red-400 bg-red-50' 
                          : formData.email.trim() 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Phone No <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.phoneNo 
                          ? 'border-red-400 bg-red-50' 
                          : formData.phoneNo.trim() 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Enter 10-digit phone number"
                    />
                    {errors.phoneNo && <p className="text-red-600 text-xs mt-1">{errors.phoneNo}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <GraduationCap className="inline w-4 h-4 mr-1" />
                      Highest Degree <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="highestDegree"
                      value={formData.highestDegree}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm bg-white shadow-sm ${
                        errors.highestDegree 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50' 
                          : formData.highestDegree 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Highest Degree</option>
                      {degrees.map((degree) => (
                        <option key={degree} value={degree}>{degree}</option>
                      ))}
                    </select>
                    {errors.highestDegree && <p className="text-red-600 text-xs mt-1">{errors.highestDegree}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <BookOpen className="inline w-4 h-4 mr-1" />
                      Department <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm bg-white shadow-sm ${
                        errors.department 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50' 
                          : formData.department 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Year Graduated <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="yearGraduated"
                      value={formData.yearGraduated}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm bg-white shadow-sm ${
                        errors.yearGraduated 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50' 
                          : formData.yearGraduated 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {errors.yearGraduated && <p className="text-red-600 text-xs mt-1">{errors.yearGraduated}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Users className="inline w-4 h-4 mr-1" />
                      Mentee Capacity <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      name="menteeCapacity"
                      value={formData.menteeCapacity}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.menteeCapacity 
                          ? 'border-red-400 bg-red-50' 
                          : formData.menteeCapacity.trim() 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Number of mentees you can handle"
                    />
                    {errors.menteeCapacity && <p className="text-red-600 text-xs mt-1">{errors.menteeCapacity}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Target className="inline w-4 h-4 mr-1" />
                      Mentoring Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="mentoringType"
                      value={formData.mentoringType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm bg-white shadow-sm ${
                        errors.mentoringType 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50' 
                          : formData.mentoringType 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Mentoring Type</option>
                      {mentoringTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.mentoringType && <p className="text-red-600 text-xs mt-1">{errors.mentoringType}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 ease-out overflow-hidden"
                >
                  {/* Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20to-transparent group-hover:animate-pulse"></div>
                  </div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center space-x-3 z-10">
                    <CheckCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="tracking-wide">NEXT</span>
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2"></div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;