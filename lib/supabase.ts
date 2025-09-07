// import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

// // Auth helpers
// export const auth = {
//   signUp: async (email: string, password: string) => {
//     return await supabase.auth.signUp({
//       email,
//       password,
//     })
//   },

//   signIn: async (email: string, password: string) => {
//     return await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })
//   },

//   signOut: async () => {
//     return await supabase.auth.signOut()
//   },

//   getUser: async () => {
//     return await supabase.auth.getUser()
//   }
// }
