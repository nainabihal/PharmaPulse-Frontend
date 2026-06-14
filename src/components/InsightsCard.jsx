export default function InsightsCard ({ data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{data.title}</h3>
      <div className="space-y-4">
        {data.metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                metric.change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};