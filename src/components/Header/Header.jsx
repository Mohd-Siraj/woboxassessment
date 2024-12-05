// components/Header/Header.js
import React from "react";
import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiWifiOn } from "react-icons/ci";
import { useContext } from "react";
import { CameraContext } from "../../contexts/CameraContext";
import { useState } from "react";

function Header() {
  const { cameras, setCameras } = useContext(CameraContext); // Use the context
  // console.log("caemras", cameras);
  const { searchTerm, setSearchTerm } = useContext(CameraContext);

    // const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
      console.log(event.target.value);
      setSearchTerm(event.target.value);
      // onSearch(event.target.value);
    };

  return (
    <>
      <header className="Header">
        {/* <img src="logo.png" alt="Weboar.ai Logo" className="Logo" /> */}
        <div className="Logo">
          <h3>Cameras</h3>
          <p>Manage your cameras here</p>
        </div>
        {/* <div className="Search">
      <input type="text" placeholder="Search" />
      <CiSearch />
    </div> */}
        <div className="Search">
          <div className="input-container">
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <CiSearch className="search-icon" />
          </div>
        </div>
      </header>
      <div className="dropdown-container">
        <div className="dropdown-with-icon">
          <CiLocationOn className="icon" />
          <select className="dropdown dropdownLocation">
            <option value="option1">Location</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="dropdown-with-icon">
          <CiWifiOn className="icon rotate-icon" />
          <select className="dropdown dropdownStatus">
            <option value="option1">Status</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Header;
