import { useEffect, useState } from "react";
import { checkSession, createSession } from "../api/session";


export function useSession() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await checkSession().catch(() => null);
        if (!session?.valid) {
          await createSession();
        }
        if (!cancelled) setReady(true);
      } catch (err) {
        if (!cancelled) setError(err.message || "세션을 확인하지 못했어요.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, error };
}
