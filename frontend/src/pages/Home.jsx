import { useState ,useMemo} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EquipmentForm from "../components/EquipmentForm";
import EquipmentTable from "../components/EquipmentTable";
import { useEquipment } from "../contexts/EquipmentContext";
import { PlusCircle, RefreshCw,Search, X } from "lucide-react";
import axios from "axios";

const Home = () => {
  const { equipment, fetchData, loading } = useEquipment();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "Active",
    lastCleanedDate: "",
  });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipment = useMemo(() => {
    if (!searchTerm.trim()) return equipment;
    
    const term = searchTerm.toLowerCase().trim();
    return equipment.filter((item) => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term) ||
        item.lastCleanedDate.toLowerCase().includes(term) ||
        item._id.toLowerCase().includes(term)
      );
    });
  }, [equipment, searchTerm]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.lastCleanedDate) newErrors.lastCleanedDate = "Cleaning date is required";
    
    // Validate date is not in the future
    if (formData.lastCleanedDate) {
      const selectedDate = new Date(formData.lastCleanedDate);
      const today = new Date();
      if (selectedDate > today) newErrors.lastCleanedDate = "Date cannot be in the future";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix form errors before submitting", {
        position: "top-right",
      });
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/equipment/${editId}`, formData);
        toast.success("Equipment updated successfully!", {
          position: "top-right",
        });
      } else {
        await axios.post("http://localhost:5000/api/equipment", formData);
        toast.success("Equipment added successfully!", {
          position: "top-right",
        });
      }

      setEditId(null);
      setFormData({ name: "", type: "", status: "Active", lastCleanedDate: "" });
      setErrors({});
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", {
        position: "top-right",
      });
    }
  };

  const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/equipment/${id}`);
        toast.success("Equipment deleted successfully!", {
          position: "top-right",
        });
        fetchData();
      } catch (error) {
        toast.error("Failed to delete equipment", {
          position: "top-right",
        });
      }
  };

    const clearSearch = () => {
    setSearchTerm("");
    };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <PlusCircle className="text-blue-600" size={36} />
            EQUIPMENT TRACKER
          </h1>
          <p className="text-gray-600 mt-2">Manage your equipments efficiently</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {editId ? "Edit Equipment" : "Add New Equipment"}
                </h2>
                {loading && (
                  <RefreshCw className="animate-spin text-blue-600" size={20} />
                )}
              </div>
              
              <EquipmentForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                errors={errors}
                editId={editId}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Search Bar */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search equipment by name, type, status, date..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
              <EquipmentTable
                //data={equipment}
                data={filteredEquipment}
                loading={loading}
                onEdit={(item) => {
                  setEditId(item._id);
                  setFormData(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDelete={handleDelete}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;