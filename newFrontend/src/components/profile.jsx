import React, { useState } from "react";
import { motion } from "framer-motion";
import defaultProfile from "../assets/profile.jpg";

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
];

const nonEditableFields = ["email", "degree", "graduationYear", "department"];

const ProfileCard = ({ user }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fields = [
    { label: "Email", key: "email" },
    { label: "Degree", key: "degree" },
    { label: "Year Graduated", key: "graduationYear" },
    { label: "Phone No.", key: "phone" },
    { label: "Department", key: "department" },
    { label: "Mentee Capacity", key: "menteeCapacity" },
    { label: "Mentoring Type", key: "mentoringType" },
    { label: "Availability", key: "availability" },
    { label: "Broad Area of Expertise", key: "broadExpertise" },
    { label: "Narrow Area of Expertise", key: "narrowExpertise" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center bg-blue-150 rounded-xl shadow-md p-6 m-4 w-full max-w-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={formData.image}
        alt="Profile"
        className="w-28 h-28 rounded-full shadow-md object-cover border-4 border-blue-300"
      />
      <h2 className="text-2xl font-bold mt-3 text-blue-700">{formData.name}</h2>
      <p className="text-gray-600 italic">{formData.role}</p>

      <div className="mt-6 w-full text-left space-y-3">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2"
          >
            <span className="font-medium text-gray-700">{field.label}:</span>
            {nonEditableFields.includes(field.key) || !isEditing ? (
              <span className="text-gray-800">{formData[field.key]?.toString()}</span>
            ) : field.key === "availability" ? (
              <select
                value={formData[field.key] ? "Yes" : "No"}
                onChange={(e) =>
                  handleChange(field.key, e.target.value === "Yes")
                }
                className="bg-white border rounded px-2 py-1"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <input
                type="text"
                value={formData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="bg-white border rounded px-2 py-1 w-48"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow"
        >
          Delete My Account
        </button>
        <button
          className={`${
            isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-6 py-2 rounded-full shadow`}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
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
