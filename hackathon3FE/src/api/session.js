import { apiClient, unwrap } from "./client";

export async function createSession() {
  const res = await apiClient.post("/session");
  return unwrap(res);
}

export async function checkSession() {
  const res = await apiClient.get("/session");
  return unwrap(res);
}
