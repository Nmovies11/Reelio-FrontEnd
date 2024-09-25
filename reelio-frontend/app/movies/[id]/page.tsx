import React from 'react';
import Navigation from '../../Components/Navigation';
interface Props {
    params: {
      id: string;  // Define the type for id
    };
  }
  

export default function movie({ params }: Props) {
    const { id } = params; // Access the 'id' from params
   
  
    return (
      <main>
        
      <h1 className="text-2xl font-bold">Movie Details for ID: {id}</h1>
      </main>
  
    
    );
  }