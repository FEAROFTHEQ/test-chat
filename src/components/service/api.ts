const isDevelopment = import.meta.env.MODE === "development";

export const API_BASE_URL = isDevelopment
  ? "http://localhost:3000/api"
  : "/api";
