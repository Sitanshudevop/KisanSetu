"use client";

import { useEffect } from "react";

export function ClearCookies() {
  useEffect(() => {
    // Destroy the auth cookie whenever this component is mounted (i.e. landing page is visited)
    document.cookie = "officer_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);
  return null;
}
