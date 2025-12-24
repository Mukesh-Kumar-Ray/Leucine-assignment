import { Edit2, Trash2, AlertCircle, CheckCircle, Wrench, Loader2 ,Search  } from "lucide-react";

const EquipmentTable = ({ data, loading, onEdit, onDelete ,searchTerm }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="text-green-500" size={18} />;
      case "Under Maintenance":
        return <Wrench className="text-yellow-500" size={18} />;
      default:
        return <AlertCircle className="text-red-500" size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Under Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="animate-spin mx-auto text-blue-600" size={40} />
        <p className="mt-4 text-gray-600">Loading equipment...</p>
      </div>
    );
  }

if (data.length === 0) {
    return (
      <div className="p-12 text-center">
        {searchTerm ? (
          <>
            <Search className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-gray-700 font-medium">No equipment found for "{searchTerm}"</p>
            <p className="mt-2 text-gray-600">Try searching with different terms</p>
          </>
        ) : (
          <>
            <AlertCircle className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-gray-600">No equipment found. Add your first equipment!</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Type", "Status", "Last Cleaned", "Actions"].map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr 
              key={item._id} 
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">ID: {item._id.slice(-6)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900">{new Date(item.lastCleanedDate).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">
                  {Math.floor((new Date() - new Date(item.lastCleanedDate)) / (1000 * 60 * 60 * 24))} days ago
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;