import React, { useState } from 'react';
import axios from 'axios';

const DeviceForm = ({ addDevice }) => {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [protocol, setProtocol] = useState('TCP');

  const handleSubmit = (e) => {
    e.preventDefault();
    const device = { name, ip, port, protocol };
    axios.post('http://localhost:4000/api/devices', device)
      .then((response) => {
        addDevice(response.data);
        setName('');
        setIp('');
        setPort('');
      })
      .catch((error) => console.error('Error adding device:', error));
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Name</h4>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <h4>IP Address</h4>
      <input
        type="text"
        placeholder="IP"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        required
      />
      <h4>Port</h4>
      <input
        type="number"
        placeholder="Port"
        value={port}
        onChange={(e) => setPort(e.target.value)}
        required
      />
      <select
        value={protocol}
        onChange={(e) => setProtocol(e.target.value)}
        required
      >
        <option value="tcp">TCP</option>
        <option value="udp">UDP</option>
        <option value="http">HTTP</option>
      </select>
      <button type="submit">Add Device</button>
    </form>
  );
};

export default DeviceForm;
