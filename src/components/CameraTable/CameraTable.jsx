// components/CameraTable/CameraTable.js
import React, { useEffect, useState } from "react";
import Camera from "../Camera/Camera";
import "./CameraTable.css";
import { fetchCameras } from "../../api/Cameraapi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useContext } from "react";
import { CameraContext } from "../../contexts/CameraContext";
function CameraTable() {
  const value = {
    green: "🟢",
    red: "🔴",
  };
  const { searchTerm, setSearchTerm } = useContext(CameraContext);

 

  
   const [filteredCameras, setFilteredCameras] = useState([]);

  const [cameras, setCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(10);

   useEffect(() => {
     if (searchTerm) {
      console.log("inside search term", searchTerm)
       const filtered = cameras.filter((camera) =>
         camera?.name?.toLowerCase().includes(searchTerm.toLowerCase())
       );
       console.log("filtered", filtered)
       setFilteredCameras(filtered);
     } else {
       setFilteredCameras(cameras); // Reset to full list if no search term
     }
   }, [searchTerm, cameras]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCameras();
        console.log(data);
        setCameras(data.data);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCamera = (id) => {
    setCameras((prevCameras) =>
      prevCameras.filter((camera) => camera.id !== id)
    );
  };

  const nextTenRow = () => {
    if(last >= cameras.length) return
    setFirst(last);
    setLast(last + 10);
  };
  const previousTenRow = () => {
    if(first <= 0) return
    setFirst(first - 10);
    setLast(first);
  };

  // Calculate the index of the first and last camera to display on the current page
  const indexOfLastCamera = currentPage * itemsPerPage;
  const indexOfFirstCamera = indexOfLastCamera - itemsPerPage;

  // Get the cameras to display on the current page
  const currentCameras = cameras.slice(indexOfFirstCamera, indexOfLastCamera);
  const totalPages = Math.ceil(cameras.length / itemsPerPage);
  // Change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sample camera data
  const cameraData = [
    {
      name: `${value.green} Camera 1`,
      health: "🟢",
      location: "New York City, NY",
      recorder: "New York Recorder",
      tasks: 3,
      status: "Active",
      actions: "...",
      select: (
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      ),
    },
    // Add more camera data objects as needed
  ];

  return (
    <div className="CameraTable">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
            </th>
            {/* <label for="vehicle1"></label><br></br> */}
            <th>NAME</th>
            <th>HEALTH</th>
            <th>LOCATION</th>
            <th>RECORDER</th>
            <th>TASKS</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredCameras.slice(`${first}`, `${last}`).map((camera, index) => (
            <Camera
              key={index}
              camera={camera}
              deleteCamera={handleDeleteCamera}
              setCameras={setCameras}
              cameras={cameras}
            />
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="navigation">
        <div className="count">
          10 <RiArrowDropDownLine />
        </div>

        <div className="limit">{`${first}-${last} of ${cameras.length}`}</div>

        <div className="btns">
          <button onClick={previousTenRow}>&laquo;</button>
          <button>&lt;</button>
          <button>&gt;</button>
          <button onClick={nextTenRow}>&raquo;</button>{" "}
        </div>
      </div>
    </div>
  );
}

export default CameraTable;
