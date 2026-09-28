"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function getAtlasSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_ATLAS_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_ATLAS_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      "Atlas authentication is not configured. Missing NEXT_PUBLIC_ATLAS_SUPABASE_URL or NEXT_PUBLIC_ATLAS_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  browserClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}
