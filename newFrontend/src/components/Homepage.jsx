import React from "react";
import nitImage from "../assets/nitc.webp";


const Homepage = () => {
  return (
    <div className="bg-gradient-to-br from-[#043871] to-[#043871] text-gray-800 font-sans px-4 sm:px-10 py-12 space-y-16">
       {/* NITCamp Header */}
      <div className="flex justify-start mb-6">
        <h1 className="text-6xl font-sans  font-bold text-white ">NITCamp</h1>
      </div>

     {/* Hero Section e */}
      <section className="space-y-6">
        <img src={nitImage} alt="NIT Calicut" className="w-full rounded-lg shadow-md" />
        <div className="bg-[#dbeafe] p-6 rounded-md shadow text-center">
          <h2 className="text-2xl font-bold flex justify-center items-center gap-2">
            📘 What is this program about?
          </h2>
          <p className="mt-3 max-w-3xl mx-auto text-gray-700">
           NIT Calicut Mentor Connect is a comprehensive platform designed to bridge the gap between current students and accomplished alumni. Our platform facilitates meaningful mentor-mentee relationships, enabling knowledge transfer, career guidance, and professional networking within the NIT Calicut community. Through structured connections and ongoing support, we create opportunities for personal and professional growth for both students and alumni.
          </p>
        </div>
      </section>


      {/* Who is it for? */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-[#dbeafe] to-[#f0f9ff] p-8 rounded-xl shadow-lg border-l-4 border-blue-500 transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-800">👥 Who is it for?</h2>
          <p className="mt-3 text-lg text-gray-700">
            NIT Calicut Mentor Connect is a comprehensive platform designed to bridge the gap between current students and accomplished alumni. Our platform facilitates meaningful mentor-mentee relationships, enabling knowledge transfer, career guidance, and professional networking within the NIT Calicut community. Through structured connections and ongoing support, we create opportunities for personal and professional growth for both students and alumni.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#eff6ff] to-[#f8fafc] p-8 rounded-xl shadow-lg border border-blue-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Who are mentees?</h3>
            <p className="text-gray-600 leading-relaxed">Current students seeking guidance and support from alumni.</p>
          </div>
          <div className="bg-gradient-to-br from-[#eff6ff] to-[#f8fafc] p-8 rounded-xl shadow-lg border border-blue-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Who are mentors?</h3>
            <p className="text-gray-600 leading-relaxed">Alumni offering insights, mentorship, and networking.</p>
          </div>
        </div>
      </section>

      {/* Primary Benefits */}
      <section className="bg-gradient-to-r from-[#dbeafe] to-[#f0f9ff] p-8 rounded-xl shadow-lg border-l-4 border-blue-600 space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-800">🎯 What's the primary benefit for me?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] p-8 rounded-xl border border-blue-200 shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-center text-[#1e3a8a] mb-3">For mentees</h3>
            <p className="text-center text-gray-700 leading-relaxed">Get career guidance, real-world insights, and a supportive mentor.</p>
          </div>
          <div className="bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] p-8 rounded-xl border border-blue-200 shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-center text-[#1e3a8a] mb-3">For mentors</h3>
            <p className="text-center text-gray-700 leading-relaxed">Give back to the institute, guide students, and stay connected.</p>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="bg-gradient-to-r from-[#dbeafe] to-[#f0f9ff] p-8 rounded-xl shadow-lg border-l-4 border-blue-500 space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-800">🧑‍💻 How do I get started?</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
            <h4 className="font-semibold text-lg mb-2 text-gray-800">Login</h4>
            <p className="text-gray-600 leading-relaxed">Login using Google authentication</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
            <h4 className="font-semibold text-lg mb-2 text-gray-800">Complete Profile</h4>
            <p className="text-gray-600 leading-relaxed">Fill all the required details</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
            <h4 className="font-semibold text-lg mb-2 text-gray-800">Waiting Period</h4>
            <p className="text-gray-600 leading-relaxed">You will be notified when assigned</p>
          </div>
        </div>
      </section>

      {/* Why trust this program */}
      <section className="bg-gradient-to-r from-[#dbeafe] to-[#f0f9ff] p-8 rounded-xl shadow-lg border-l-4 border-blue-600 space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-800">🛡️ Why should I trust this program?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">🏛️</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Institutional Support</h3>
            <p className="text-gray-700 leading-relaxed">
              Endorsed by NIT Calicut administration with alumni and CDC support.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Verified Community</h3>
            <p className="text-gray-700 leading-relaxed">
              All participants are verified NITC students and alumni.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Proven Success</h3>
            <p className="text-gray-700 leading-relaxed">
              Mentees have reached top companies with mentor guidance.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex items-center justify-center text-gray-400 italic transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-gray-400 text-xl">⏳</span>
              </div>
              More coming soon...
            </div>
          </div>
        </div>
      </section>

      
{/* Testimonial with Typing Animation */}
      <section className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center justify-center gap-2">
            💬 What our community says?
          </h3>
          <div>
            <div className="text-6xl text-blue-200 mb-4">"</div>
            <div className="relative w-full">
              <p className="italic text-gray-700 text-lg leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                The mentorship program helped me land my dream job at a top tech company. My mentor's
                guidance was invaluable.
                <span className="typing-cursor">|</span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                PS
              </div>
              <div className="text-left">
                <p className="font-semibold text-blue-800">Priya Sharma</p>
                <p className="text-sm text-gray-600">B.Tech CSE 2023</p>
              </div>
            </div>
            <div className="flex justify-center space-x-1">
              {[1,2,3,4,5].map(star => (
                <span key={star} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          font-weight: bold;
          font-size: 1.2em;
          color: #374151;
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Homepage;