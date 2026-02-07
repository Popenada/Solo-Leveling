import { useRouter } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)");       // already logged in
      } else {
        router.replace("/(auth)/login"); // open login FIRST
      }
    };

    checkUser();
  }, []);

  return null; // nothing visible while deciding
}
