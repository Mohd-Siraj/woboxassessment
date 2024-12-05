// contexts/CameraContext.js
import React, { createContext, useState } from "react";

// Create the context
export const CameraContext = createContext();

// Create a provider component
export const CameraProvider = ({ children }) => {
  const [cameras, setCameras] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

  return (
    <CameraContext.Provider value={{ cameras, setCameras, searchTerm, setSearchTerm }}>
      {children}
    </CameraContext.Provider>
  );
};
