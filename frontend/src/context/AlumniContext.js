import React, { createContext, useContext, useState } from 'react';
import { sampleAlumni } from '../data/sampleAlumni';

const AlumniContext = createContext();

export function AlumniProvider({ children }) {
  const [alumni, setAlumni] = useState(sampleAlumni);

  return (
    <AlumniContext.Provider value={{ alumni, setAlumni }}>
      {children}
    </AlumniContext.Provider>
  );
}

export function useAlumni() {
  const context = useContext(AlumniContext);
  if (context === undefined) {
    throw new Error('useAlumni must be used within an AlumniProvider');
  }
  return context;
}
