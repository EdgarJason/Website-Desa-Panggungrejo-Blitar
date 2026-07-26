"use client";

// =============================================
// Auth Utilities - Temporary Client-Side Auth
// Will be replaced with API calls when backend is ready
// =============================================

const SESSION_KEY = "pgrj_admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const VALID_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "desapanggungrejo";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const VALID_PASSWORD_HASH = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH || "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5";

interface Session {
  username: string;
  token: string;
  expiresAt: number;
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Attempt to log in with given credentials.
 * Returns true on success, false on failure.
 */
export async function login(
  username: string,
  password: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);

  if (username === VALID_USERNAME && passwordHash === VALID_PASSWORD_HASH) {
    const session: Session = {
      username,
      token: generateToken(),
      expiresAt: Date.now() + SESSION_DURATION,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }

  return false;
}

/**
 * Log out the current user by clearing the session.
 */
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Check if the current user is authenticated.
 */
export function isAuthenticated(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;

    const session: Session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Get the current session info (username).
 */
export function getSession(): { username: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session: Session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return { username: session.username };
  } catch {
    return null;
  }
}
