import { supabase } from "@/lib/supabase";

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    //
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
        exp: 0,
        level: 1
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
export const loginUser = async (email: string, password: string) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      throw new Error("Email and password are required.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) throw error;
    if (!data.user) {
      throw new Error("Login succeeded but no user was returned.");
    }

    return {
      user: data.user,
      session: data.session,
    };
  } catch (err: any) {
    console.error("loginUser failed:", err?.message ?? err);
    throw err;
  }
};
