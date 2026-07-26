"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, logout as doLogout, getSession } from "@/lib/auth";

/**
 * Custom hook for authentication state and actions.
 * Handles route protection automatically.
 *
 * @param options.redirectIfUnauthenticated - Redirect to login if not authenticated (default: true)
 * @param options.redirectIfAuthenticated - Redirect to dashboard if already authenticated (default: false)
 */
export function useAuth(
  options: {
    redirectIfUnauthenticated?: boolean;
    redirectIfAuthenticated?: boolean;
  } = {}
) {
  const {
    redirectIfUnauthenticated = true,
    redirectIfAuthenticated = false,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const authed = isAuthenticated();
    setAuthenticated(authed);

    if (authed) {
      const session = getSession();
      setUsername(session?.username ?? null);
    }

    // Redirect logic
    if (!authed && redirectIfUnauthenticated) {
      router.replace("/admin/login");
    } else if (authed && redirectIfAuthenticated) {
      router.replace("/admin/dashboard");
    }

    setIsLoading(false);
  }, [pathname, redirectIfUnauthenticated, redirectIfAuthenticated, router]);

  const logout = () => {
    doLogout();
    setAuthenticated(false);
    setUsername(null);
    router.replace("/admin/login");
  };

  return {
    isLoading,
    isAuthenticated: authenticated,
    username,
    logout,
  };
}
