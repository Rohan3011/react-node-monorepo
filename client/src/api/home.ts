import axios from "axios";

export async function checkHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.log("Failed to check health", err);
    return null;
  }
}
