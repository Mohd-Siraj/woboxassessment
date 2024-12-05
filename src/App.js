import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CameraTable from "./components/CameraTable/CameraTable";
import { CameraProvider } from "./contexts/CameraContext";

function App() {
  return (
    <div className="App">
      <CameraProvider>
        <Header />
        <CameraTable />
      </CameraProvider>
    </div>
  );
}

export default App;
