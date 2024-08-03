import React, { useState, useEffect } from 'react';
import DeviceForm from './components/DeviceFrom';
import DeviceList from './components/DeviceList';
import RealTimeData from './components/RealTimeData';
import './App.css';

const App = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/devices')
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error('Error fetching devices:', error));
  }, []);

  const addDevice = (device) => {
    setDevices([...devices, device]);
  };

  const removeDevice = (deviceId) => {
    setDevices(devices.filter((device) => device._id !== deviceId));
  };

  return (
    <div className="App">
      <h1>Device Management</h1>
      <DeviceForm addDevice={addDevice} />
      <DeviceList devices={devices} removeDevice={removeDevice} />
      <RealTimeData />
    </div>
  );
};

export default App;
