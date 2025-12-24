import Home from './pages/Home'
import { EquipmentProvider } from './contexts/EquipmentContext';
import './index.css';

function App() {
  

  return (
      <EquipmentProvider>
        <Home />
      </EquipmentProvider>
  )
}

export default App
