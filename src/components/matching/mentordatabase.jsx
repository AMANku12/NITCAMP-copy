export default function MentorsDatabase({ onBack }) {
  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Mentors Database</h2>
      
      {/* Mobile view - Card layout */}
      <div className="block md:hidden space-y-4">
        {/* Example card */}
        <div className="bg-white text-black rounded-xl p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Sl.no:</span> 1</div>
            <div><span className="font-medium">Name:</span> John Doe</div>
            <div><span className="font-medium">Department:</span> CSE</div>
            <div><span className="font-medium">Year:</span> 2020</div>
            <div><span className="font-medium">Capacity:</span> 3</div>
            <div><span className="font-medium">Broad Areas:</span> AI, ML</div>
            <div className="col-span-2"><span className="font-medium">Narrow Areas:</span> Deep Learning</div>
          </div>
        </div>
      </div>

      {/* Desktop view - Table layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-black bg-white rounded-xl overflow-hidden min-w-max">
          <thead className="bg-gray-200 text-xs">
            <tr>
              <th className="px-2 py-2 text-left">Sl.no</th>
              <th className="px-2 py-2 text-left">Name</th>
              <th className="px-2 py-2 text-left">Department</th>
              <th className="px-2 py-2 text-left">Year Passed</th>
              <th className="px-2 py-2 text-left">Mentee Capacity</th>
              <th className="px-2 py-2 text-left">Broad Areas of Interest</th>
              <th className="px-2 py-2 text-left">Narrow Areas of Interest</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr className="text-sm border-b border-gray-100 hover:bg-gray-50">
              <td className="px-2 py-2">1</td>
              <td className="px-2 py-2">John Doe</td>
              <td className="px-2 py-2">CSE</td>
              <td className="px-2 py-2">2020</td>
              <td className="px-2 py-2">3</td>
              <td className="px-2 py-2">AI, ML</td>
              <td className="px-2 py-2">Deep Learning</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-right">
        <button onClick={onBack} className="px-4 py-1 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
          Back
        </button>
      </div>
    </div>
  );
}