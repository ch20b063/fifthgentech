import React from 'react';
import '../App.css';

const DeviceList = ({ devices, removeDevice }) => {
  const handleRemove = (deviceId) => {
    fetch(`http://localhost:4000/api/devices/${deviceId}`, {
      method: 'DELETE',
    })
      .then(() => {
        removeDevice(deviceId);
      })
      .catch((error) => console.error('Error removing device:', error));
  };

  return (
    <div>
      <h1>Device List</h1>
      <table className="device-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th>Port</th>
            <th>Protocol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device._id}>
              <td>{device.name}</td>
              <td>{device.ip}</td>
              <td>{device.port}</td>
              <td>{device.protocol}</td>
              <td>
                <button onClick={() => handleRemove(device._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
