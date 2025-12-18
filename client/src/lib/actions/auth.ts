"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export type AuthActionState = {
  success: boolean;
  error?: string;
  user?: User | null;
};

export async function signInAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Check specifically for email not confirmed error
      if (error.message.includes("Email not confirmed")) {
        // We will handle the redirect outside the try/catch
        throw new Error("RedirectToConfirmEmail");
      }
      return {
        success: false,
        error: error.message,
      };
    }
  } catch (error) {
    if (error instanceof Error && error.message === "RedirectToConfirmEmail") {
      // This allows us to break out of the try/catch block to redirect
      // We can't redirect here directly because we are inside catch if we entered via throw
      // But wait, the standard pattern is to let the redirect bubble up if it was called.
      // Since I'm throwing a custom error to signal redirect, I can handle it below.
    } else {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred during sign in.",
      };
    }
  }

  // Checking if we need to redirect due to email confirmation or success
  // However, local scope variables in try block aren't available here easily.
  // A cleaner way:

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      redirect("/confirm-email");
    }
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/profile");
}

export async function signUpAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim() || undefined;

  if (!email || !password || !displayName) {
    return {
      success: false,
      error: "Email, password, and display name are required.",
    };
  }

  const supabase = await createClient();

  // Sign up user
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        phone_number: phoneNumber || "",
      },
    },
  });

  if (authError) {
    return {
      success: false,
      error: authError.message,
    };
  }

  redirect("/confirm-email");
}