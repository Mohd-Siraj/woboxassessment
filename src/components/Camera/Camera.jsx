// components/Camera/Camera.js
import React from "react";
import "./Camera.css";
import { MdBlockFlipped } from "react-icons/md";
import { CiCloudOn } from "react-icons/ci";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoMdSwitch } from "react-icons/io";
import { updateStatus } from "../../api/Cameraapi";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CameraContext } from "../../contexts/CameraContext";

function Camera({ camera, deleteCamera, setCameras, cameras }) {
  // const [currentStatus, setCurrentStatus] = useState(camera?.status);
  const [status, setStatus] = useState([]);

  const { searchTerm, setSearchTerm } = useContext(CameraContext);

  // const deleteCamera = () => {};
  const handleDelete = () => {
    deleteCamera(camera.id); // Trigger the delete handler passed from the parent
  };

  const handleToggleStatus = async () => {
    const newStatus = camera.status === "Active" ? "Inactive" : "Active";

    try {
      const response = await updateStatus(newStatus, camera.id); // Send status and ID to API
      if (response) {
        console.log("response data", response);
        setCameras(
          cameras.map((c) => (c.id === camera.id ? response?.data : c))
        );
      } else {
        console.error("Failed to update status:", response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <tr className="Camera">
      <td>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      </td>
      <td>
        {camera?.current_status === "Online" ? "🟢" : "🔴"}
        {camera?.name || "N/A"}
        <p style={{ marginLeft: "1.3rem" }}>sherwinwilliams@wobot.ai</p>
      </td>
      <td>
        <CiCloudOn className="cloudIcon"/>
        <span
          className={` border ${
            camera?.health?.device === "A"
              ? "green-border"
              : camera?.health?.device === "B"
              ? "orange-border"
              : camera?.health?.device === "C"
              ? "yellow-border"
              : camera?.health?.device === "D"
              ? "red-border"
              : camera?.health?.device === "E"
              ? "brown-border"
              : camera?.health?.device === "F"
              ? "violet-border"
              : ""
          }`}
        >
          {camera?.health?.cloud ? camera.health.cloud : "N/A"}
        </span>

        <RiArchiveDrawerLine />
        <span
          className={` border ${
            camera?.health?.device === "A"
              ? "green-border"
              : camera?.health?.device === "B"
              ? "orange-border"
              : camera?.health?.device === "C"
              ? "yellow-border"
              : camera?.health?.device === "D"
              ? "red-border"
              : camera?.health?.device === "E"
              ? "brown-border"
              : camera?.health?.device === "F"
              ? "violet-border"
              : "grey-border"
          }`}
        >
          {camera?.health.device ? camera.health.device : "N/A"}
        </span>
      </td>
      {/* <td
  className={`Health ${
    camera?.health?.device === "A"
      ? "Health--green"
      : camera?.health?.device === "B"
      ? "Health--warning"
      : camera?.health?.device === "C"
      ? "Health--yellow"
      : ""
  }`}
>
  <CiCloudOn />
  {camera?.health.cloud
    ? camera.health.cloud
        .split("")
        .map((char) =>
          String.fromCharCode(9398 + char.toLowerCase().charCodeAt(0) - 97)
        )
    : "N/A"}
  <RiArchiveDrawerLine />
  {camera?.health.device
    ? camera.health.device
        .split("")
        .map((char) =>
          String.fromCharCode(9398 + char.toLowerCase().charCodeAt(0) - 97)
        )
    : "N/A"}
</td> */}

      <td>{camera?.location || "N/A"}</td>
      <td>{camera?.recorder || "N/A"}</td>
      <td>{camera?.tasks ? `${camera.tasks} Tasks` : "N/A"}</td>
      <td>
        <span className={`Status Status--${camera?.status?.toLowerCase()}`}>
          {camera?.status || "N/A"}
        </span>
      </td>
      <td className="Actions">
        {camera?.actions}
        {/* <MdBlockFlipped /> */}
        <MdDelete onClick={handleDelete} />
        <IoMdSwitch
          onClick={handleToggleStatus}
          style={{ cursor: "pointer" }}
        />
      </td>
      {/* <td></td> */}
    </tr>
  );
}

export default Camera;
