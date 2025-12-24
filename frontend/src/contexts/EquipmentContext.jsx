import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const EquipmentContext = createContext();

export const useEquipment = () => useContext(EquipmentContext);

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/equipment');
      setEquipment(res.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    equipment,
    loading,
    fetchData,
    setEquipment,
  };

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  );
};