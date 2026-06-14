export default function InfoCard ({ data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{data.title}</h3>
      <div className="space-y-3">
        {data.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};