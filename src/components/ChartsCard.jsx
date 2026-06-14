export default function ChartsCard ({ data }) {
  const maxValue = Math.max(...data.data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{data.description}</p>
      </div>
      
      {/* Simple bar chart */}
      <div className="space-y-4">
        {data.data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full
                         flex items-center justify-end px-3 transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-xs font-semibold text-white">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
