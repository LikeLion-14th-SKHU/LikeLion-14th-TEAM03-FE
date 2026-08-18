import { apiClient, unwrap } from "./client";

export async function saveOnboarding(payload) {
  const response = await apiClient.post("/onboarding", payload, {
    timeout: 600000,
  });
  return unwrap(response);
}

export async function getOnboarding() {
  const response = await apiClient.get("/onboarding");
  return unwrap(response);
}

export async function updateGoalDate(goalDate) {
  const response = await apiClient.patch("/onboarding/goal-date", {
    goalDate,
  });
  return unwrap(response);
}

export async function restartOnboarding() {
  const response = await apiClient.post("/onboarding/restart");
  return unwrap(response);
}
