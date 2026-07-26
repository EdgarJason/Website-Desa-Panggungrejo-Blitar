"use client";

import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // On login page, don't protect route & don't show sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}

/**
 * Protected admin shell with sidebar.
 * Separated to avoid calling useAuth conditionally.
 */
function AdminShell({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, logout } = useAuth({
    redirectIfUnauthenticated: true,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-normal border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <AdminSidebar onLogout={logout} />
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
