import axios from "axios";

axios.defaults.withCredentials = true;

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://api.d-dayskincare.cloud/api",

  timeout: 15000,

  // 쿠키를 요청에 포함하고,
  // 서버의 Set-Cookie 응답을 브라우저가 처리할 수 있도록 설정
  withCredentials: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.defaults.withCredentials = true;

export function fetchWithCredentials(url, options = {}) {
  return fetch(url, {
    ...options,
    credentials: "include",
  });
}

export function unwrap(response) {
  if (!response) return undefined;

  const payload = response.data ?? response;

  if (payload && typeof payload === "object") {
    if (Object.prototype.hasOwnProperty.call(payload, "data")) {
      return payload.data;
    }

    return payload;
  }

  return payload;
}
