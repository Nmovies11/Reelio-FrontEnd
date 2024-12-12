"use client"
import React, { useEffect, useState   } from 'react';

const EnvironmentPage = () => {
  const [environment, setEnvironment] = useState('Loading...CCCC');

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        console.log('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
        console.log(`process.env`, process.env.NODE_ENV);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/environments/current`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch environment');
        }

        setEnvironment(data.environment || 'Unknown');
      } catch (err) {
        console.error('Error fetching environment:', err);
      }
    };

    fetchEnvironment();
  }, []);

  return (
    <div>
      <h1>Current Environment</h1>
      { <p>The current environment is: {environment}</p>}
    </div>
  );
};

export default EnvironmentPage;
