import { Save, X, Calendar } from "lucide-react";

const EquipmentForm = ({ formData, setFormData, onSubmit, errors, editId }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      errors[name] = "";
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", type: "", status: "Active", lastCleanedDate: "" });
    if (errors) Object.keys(errors).forEach(key => errors[key] = "");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Equipment Name <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter equipment name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
          //required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Type Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Equipment Type <span className="text-red-700">*</span>
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.type ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
          //required
        >
          <option value="">Select Type</option>
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type}</p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status <span className="text-red-700">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Active", "Inactive", "Under Maintenance"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFormData({ ...formData, status })}
              className={`px-4 py-3 rounded-lg border transition ${
                formData.status === status
                  ? status === "Active"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : status === "Inactive"
                    ? "bg-red-50 border-red-500 text-red-700"
                    : "bg-yellow-50 border-yellow-500 text-yellow-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Date Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Cleaned Date <span className="text-red-700">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            name="lastCleanedDate"
            value={formData.lastCleanedDate}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
              errors.lastCleanedDate ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
            //required
          />
        </div>
        {errors.lastCleanedDate && (
          <p className="mt-1 text-sm text-red-600">{errors.lastCleanedDate}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {editId ? "Update Equipment" : "Add Equipment"}
        </button>
        
        {editId && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-2"
          >
            <X size={20} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EquipmentForm;