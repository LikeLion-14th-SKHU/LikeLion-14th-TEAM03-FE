import axios from "axios";

// 세션은 UUID 쿠키(30일)로 관리되므로 withCredentials가 꼭 필요합니다.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://d-dayskincare.cloud",
  withCredentials: true,
});

// 서버 공통 성공 응답 포맷: { success, data }
export function unwrap(res) {
  return res.data?.data;
}

// 서버 공통 에러 응답 포맷: { code, message, status }
// err.response가 없으면 요청이 서버까지 아예 못 간 것(네트워크 오류/서버 다운/CORS 등).
export function errorMessage(err) {
  const body = err?.response?.data;
  if (body?.message) return `${body.message}${body.code ? ` (${body.code})` : ""}`;
  if (err?.response) {
    return `${err.response.status} ${err.response.statusText || ""}`.trim();
  }
  return "서버 응답 없음 (네트워크 오류 또는 서버 다운 가능성)";
}
