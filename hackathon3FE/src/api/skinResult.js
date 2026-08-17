import { apiClient, unwrap } from "./client";

export async function getSkinResult() {
  try {
    const res = await apiClient.get("/skin/result");
    return unwrap(res);
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
