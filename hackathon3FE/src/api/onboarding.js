import { apiClient, unwrap } from "./client";

export async function saveOnboarding(payload) {
  const response = await apiClient.post("/onboarding", payload, {
    timeout: 60000,
  });

  return unwrap(response);
}
