import React from "react";
import { motion } from "framer-motion";
import defaultProfile from "../assets/profile.jpg"; // Replace with actual path

const users = [
  {
    id: 1,
    image: defaultProfile,
    name: "Harsh",
    email: "rohan.mehta@example.com",
    degree: "B.Tech",
    graduationYear: "2020",
    phone: "+91-9876543210",
    department: "Computer Science",
    menteeCapacity: 3,
    mentoringType: "One-on-One",
    availability: true,
    broadExpertise: "Computer Science",
    narrowExpertise: "AI, ML, Backend development",
    role: "Mentee",
  },
  // more user objects here
];

const ProfileCard = ({ user }) => {
  const fields = [
    { label: "Email", value: user.email },
    { label: "Degree", value: user.degree },
    { label: "Year Graduated", value: user.graduationYear },
    { label: "Phone No.", value: user.phone },
    { label: "Department", value: user.department },
    { label: "Mentee Capacity", value: user.menteeCapacity },
    { label: "Mentoring Type", value: user.mentoringType },
    { label: "Availability", value: user.availability ? "Yes" : "No" },
    { label: "Broad Area of Expertise", value: user.broadExpertise },
    { label: "Narrow Area of Expertise", value: user.narrowExpertise },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center bg-blue-150 rounded-xl shadow-md p-6 m-4 w-full max-w-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={user.image}
        alt="Profile"
        className="w-28 h-28 rounded-full shadow-md object-cover border-4 border-blue-300"
      />
      <h2 className="text-2xl font-bold mt-3 text-blue-700">{user.name}</h2>
      <p className="text-gray-600 italic">{user.role}</p>

      <div className="mt-6 w-full text-left space-y-3">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2"
          >
            <span className="font-medium text-gray-700">{field.label}:</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-800">{field.value}</span>
            
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow">
        Delete My Account
      </button>
    </motion.div>
  );
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      {users.map((user) => (
        <ProfileCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Profile;
