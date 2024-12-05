import axios from 'axios';

export const fetchCameras = async () => {
  try {
    const response = await axios.get('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
      headers: {
        'Authorization': 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cameras:', error);
    throw error;
  }
};
export const updateStatus = async (status, id) => {
  try {
    const response = await axios.put(
      "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
      { status, id },
      {
        headers: {
          Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};