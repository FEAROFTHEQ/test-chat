import axios from "axios";
import { API_BASE_URL } from "./api";

export default async function fetchUser(id: string | null) {
  if (id) {
    const response = await axios.post(`${API_BASE_URL}/users/init`, { id });
    return response.data;
  }
}
