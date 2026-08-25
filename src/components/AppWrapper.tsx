"use client";

import { usePathname } from "next/navigation";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/officer/login") {
    return <main className="flex-grow w-full flex flex-col">{children}</main>;
  }

  if (pathname.startsWith("/farmer/track")) {
    return <main className="flex-grow w-full flex flex-col">{children}</main>;
  }

  if (pathname.startsWith("/officer") || pathname.startsWith("/superadmin")) {
    return <main className="flex-grow w-full flex flex-col">{children}</main>;
  }

  if (pathname.startsWith("/farmer")) {
    return <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 py-8 flex flex-col">{children}</main>;
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl shadow-xl min-h-[80vh] w-full p-4 sm:p-8 flex-grow">
        {children}
      </div>
    </main>
  );
}
