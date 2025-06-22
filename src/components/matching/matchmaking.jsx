export default function Matchmaking({ onBack }) {
  return (
    <div className="text-white p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Current Database</h2>
      
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full text-black bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-200 text-xs">
            <tr>
              <th className="p-2">Sl.no</th>
              <th className="p-2">Mentee Name</th>
              <th className="p-2">Mentor Name</th>
              <th className="p-2">Common Areas of Interest</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-center">
              <td className="p-2">1</td>
              <td className="p-2">Riya Sharma</td>
              <td className="p-2">Dr. Ahuja</td>
              <td className="p-2">Backend Development</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="bg-white text-black rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Sl.no: 1</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-semibold text-gray-600">Mentee:</span>
              <p className="text-sm">Riya Sharma</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600">Mentor:</span>
              <p className="text-sm">Dr. Ahuja</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600">Common Areas:</span>
              <p className="text-sm">Backend Development</p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Button Container */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <button 
          onClick={onBack} 
          className="px-4 py-2 bg-white text-black rounded-full text-sm sm:text-base order-2 sm:order-1"
        >
          Back
        </button>
        <button className="px-4 py-2 bg-white text-black rounded-full text-sm sm:text-base order-1 sm:order-2">
          Match
        </button>
      </div>
    </div>
  );
}