import { apiClient, unwrap } from "./client";

// GET /api/notifications → { notifications: [{ notiType, message, isRead, createdAt }] }
// 조회하는 순간 서버에서 자동으로 읽음 처리됩니다. 메인 화면 진입 시마다 호출해야 해요.
export async function getNotifications() {
  const res = await apiClient.get("/notifications");
  return unwrap(res)?.notifications ?? [];
}

// PATCH /api/notifications/toggle → 알림 ON/OFF
export async function toggleNotifications() {
  const res = await apiClient.patch("/notifications/toggle");
  return unwrap(res);
}
