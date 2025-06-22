import { useState, useContext, createContext } from 'react';
import { User, Phone, Mail, BookOpen, Calendar, GraduationCap, MessageSquare, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Create Context for form data
const FormDataContext = createContext(null);

// Context Provider Component
const FormDataProvider = ({ children }) => {
  const [menteeFormData, setMenteeFormData] = useState({
    name: '',
    rollNo: '',
    phoneNo: '',
    personalEmail: '',
    department: '',
    yearOfAdmission: '',
    degree: '',
    expectations: ''
  });

  const updateMenteeFormData = (data) => {
    setMenteeFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <FormDataContext.Provider value={{ menteeFormData, updateMenteeFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

// Custom hook to use form data context
const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

function MenteeRegistrationForm() {
  const navigate = useNavigate(); // Add navigate hook
  
  // Use context for persistent form data
  const { menteeFormData, updateMenteeFormData } = useFormData();
  
  // Local state for form data (synced with context)
  const [formData, setFormData] = useState(menteeFormData);
  
  const [errors, setErrors] = useState({});

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

  const degrees = ['B.Tech', 'M.Tech', 'PhD', 'M.Sc', 'MBA'];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 64 }, (_, i) => currentYear - i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    // Update local state
    setFormData(updatedData);
    
    // Update context (persistent state)
    updateMenteeFormData(updatedData);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required';
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Phone number must be 10 digits';
    }
    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Email is invalid';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.yearOfAdmission) newErrors.yearOfAdmission = 'Year of admission is required';
    if (!formData.degree) newErrors.degree = 'Degree is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Save final form data to context before navigation
      updateMenteeFormData(formData);
      
      // Navigate to menteeinterests page
      navigate('/menteeinterests');
    }
  };

  const handleReset = () => {
    const resetData = {
      name: '',
      rollNo: '',
      phoneNo: '',
      personalEmail: '',
      department: '',
      yearOfAdmission: '',
      degree: '',
      expectations: ''
    };
    
    setFormData(resetData);
    updateMenteeFormData(resetData);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white ">
      <div className="w-full ">
        {/* Form Container */}
        <div className="bg-white rounded-b-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Mentee Registration</h2>
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

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Year of Admission <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="yearOfAdmission"
                        value={formData.yearOfAdmission}
                        onChange={handleInputChange}
                        size={1}
                        className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm bg-white shadow-sm overflow-y-auto ${
                          errors.yearOfAdmission 
                            ? 'border-red-400 focus:ring-red-300 bg-red-50' 
                            : formData.yearOfAdmission 
                              ? 'border-blue-300 bg-blue-50' 
                              : 'border-gray-300'
                        }`}
                        style={{ maxHeight: '240px' }}
                      >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {errors.yearOfAdmission && (
                      <p className="text-red-600 text-xs mt-1">{errors.yearOfAdmission}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <GraduationCap className="inline w-4 h-4 mr-1" />
                      Degree <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm bg-white shadow-sm ${
                        errors.degree 
                          ? 'border-red-400 focus:ring-red-300 bg-red-50' 
                          : formData.degree 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Degree</option>
                      {degrees.map((degree) => (
                        <option key={degree} value={degree}>{degree}</option>
                      ))}
                    </select>
                    {errors.degree && <p className="text-red-600 text-xs mt-1">{errors.degree}</p>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <BookOpen className="inline w-4 h-4 mr-1" />
                      Roll No <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.rollNo 
                          ? 'border-red-400 bg-red-50' 
                          : formData.rollNo.trim() 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Enter your roll number"
                    />
                    {errors.rollNo && <p className="text-red-600 text-xs mt-1">{errors.rollNo}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Personal Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="personalEmail"
                      value={formData.personalEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.personalEmail 
                          ? 'border-red-400 bg-red-50' 
                          : formData.personalEmail.trim() 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.personalEmail && <p className="text-red-600 text-xs mt-1">{errors.personalEmail}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-1" />
                      What are your expectations from this program?
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
                        formData.expectations.trim() 
                          ? 'border-blue-300 bg-blue-50' 
                          : 'border-gray-200 focus:border-blue-400'
                      }`}
                      placeholder="Share your expectations and goals for this mentorship program..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-8">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Reset Form
                </button>
                
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
}

// Export both the component and the provider
export default function MenteeRegistrationWithProvider() {
  return (
    <FormDataProvider>
      <MenteeRegistrationForm />
    </FormDataProvider>
  );
}

// Export the components and hooks for use in other files
export { FormDataProvider, useFormData };