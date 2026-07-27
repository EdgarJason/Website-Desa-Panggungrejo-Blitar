import { createClient as createBrowserClient } from "@/utils/supabase/client";

// Export the browser client instance to maintain compatibility
// with existing client components that use `supabase` directly.
export const supabase = createBrowserClient();