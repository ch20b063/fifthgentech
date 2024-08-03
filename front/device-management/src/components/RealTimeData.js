import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const RealTimeData = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    socket.on('data', (newData) => {
      setData(newData);
    });

    return () => {
      socket.off('data');
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Data</h2>
      <pre>{data}</pre>
    </div>
  );
};

export default RealTimeData;
