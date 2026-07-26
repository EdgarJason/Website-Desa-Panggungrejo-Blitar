"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  // If already logged in, redirect to dashboard
  useAuth({
    redirectIfUnauthenticated: false,
    redirectIfAuthenticated: true,
  });

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(username.trim(), password);
      if (success) {
        router.replace("/admin/dashboard");
      } else {
        setError("Username atau password salah.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light via-white to-brand-light-hover px-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-brand-dark tracking-wider">
            PANGGUNGREJO
          </h1>
          <p className="text-brand-normal mt-1 font-medium">
            Kab. Blitar
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-brand-normal/5 border border-brand-light-active/40 p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Login Admin
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Masukkan kredensial untuk mengakses panel admin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {error}
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-normal/30 focus:border-brand-normal transition-all"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-xl font-semibold text-base h-12 mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; 2026 Desa Panggungrejo — Divisi DDM MMD 57 FILKOM UB
        </p>
      </div>
    </div>
  );
}
