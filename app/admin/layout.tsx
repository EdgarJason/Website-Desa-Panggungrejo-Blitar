"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";
import { logoutAction } from "./login/actions";

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

  return (
    <div className="min-h-screen bg-gray-50/80">
      <AdminSidebar onLogout={() => logoutAction()} />
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
