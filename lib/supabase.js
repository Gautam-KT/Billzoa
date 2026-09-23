import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrwvhfpmqmcwjmxoulcv.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_aaw2_hzDj-LTySlaPS9elQ_Q3WGwh7L";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);