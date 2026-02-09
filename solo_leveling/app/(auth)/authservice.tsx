import { supabase } from "@/lib/supabase";

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      },
    });

    if (error) throw error;

    const user = data.user;

    if (!user) {
      return {
        needsEmailConfirmation: true,
        message: "Check your email to confirm your account.",
      };
    }

    const { error: profileError } = await supabase.from("hunters").insert([
      {
        id: user.id,
        email,
        username,
      },
    ]);

    if (profileError) throw profileError;

    return {
      needsEmailConfirmation: false,
      user,
    };
  } catch (err: any) {
    console.error("registerUser failed:", err?.message ?? err);
    throw err;
  }
};
