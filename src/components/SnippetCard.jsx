export default function SnippetCard ({ snippet }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm 
                  hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 flex-1">{snippet.title}</h4>
        <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full ml-2">
          {snippet.tag}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{snippet.description}</p>
      <span className="text-xs text-gray-400">{snippet.timestamp}</span>
    </div>
  );
};