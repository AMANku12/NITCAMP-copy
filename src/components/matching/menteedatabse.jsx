export default function MenteesDatabase({ onBack }) {
  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Mentees Database</h2>
      
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full text-black bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-200 text-xs">
            <tr>
              <th className="p-3 text-left">Sl.no</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Year of Admission</th>
              <th className="p-3 text-left">Interests</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm border-b border-gray-100">
              <td className="p-3">1</td>
              <td className="p-3">Riya Sharma</td>
              <td className="p-3">ECE</td>
              <td className="p-3">2022</td>
              <td className="p-3">AI/ML</td>
              <td className="p-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Active
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        <div className="bg-white text-black rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">Riya Sharma</h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Active
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Sl.no:</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Department:</span>
              <span>ECE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year of Admission:</span>
              <span>2022</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interests:</span>
              <span>AI/ML</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button 
          onClick={onBack} 
          className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}