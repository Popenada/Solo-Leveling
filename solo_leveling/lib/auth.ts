import { supabase } from "@/lib/supabase";

// Authentication file for registering and logging in for user using supabase API calls
export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    // Call supabase API to sign up user from email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) throw error;

    const user = data.user;
    // If user is not already found, set needs email confirmation to true
    if (!user) {
      return {
        needsEmailConfirmation: true,
        message: "Check your email to confirm your account.",
      };
    }
    // Process hunter information using table information from supabase data row
    const { error: profileError } = await supabase.from("hunters").insert([
      {
        id: user.id,
        email,
        username,
        level: 1,
        AGI: 10,
        STR: 10,
        INT: 10,
        VIT: 10,
        rank: 'E',
        total_quests_completed: 0,
        daily_streak: 0,
        xp_to_next_level: 0,
        xp: 0
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
// Login user using supabase signInWithPassword method requiring email and password
// Simple processing to trim email to lowercase for processing 
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
