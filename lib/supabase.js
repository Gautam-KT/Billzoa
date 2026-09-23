import { createClient } from "@supabase/supabase-js";

let client = null;

export function getSupabase() {
  if (client) return client;

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://jrwvhfpmqmcwjmxoulcv.supabase.co";

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_aaw2_hzDj-LTySlaPS9elQ_Q3WGwh7L";

  client = createClient(url, key);
  return client;
}