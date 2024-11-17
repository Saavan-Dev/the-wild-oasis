import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jitwobcnfcbedofxnkuu.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});
export default supabase;
