import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import type { LoginRequest, SupabaseAuthResponse,SignupRequest } from "@/types/AuthTypes";
import axiosInstance from "@/utils/axios";

export const useLogin = () => {
  const loginUser = async (
    payload: LoginRequest
  ): Promise<SupabaseAuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) throw error;
    if (!data.user || !data.session) {
      throw new Error("Login failed");
    }

    return {
      user: data.user,
      session: data.session,
    };
  };

  return useMutation({
    mutationFn: loginUser,

    onSuccess: ({ session }) => {
      // ✅ CORRECT PLACE
      localStorage.setItem(
        "access_token-wiseMaestro",
        session?.access_token || ""
      );
      localStorage.setItem(
        "refresh_token-wiseMaestro",
        session?.refresh_token || ""
      );

      toast.success("Login successful 🎉");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Login failed");
    },
  });
};


export const useSignup = () => {
  const signupUser = async (
    payload: SignupRequest
  ): Promise<SupabaseAuthResponse> => {
    /* ------------------------------------------------------------------ */
    /* 1️⃣ SUPABASE AUTH SIGNUP                                            */
    /* ------------------------------------------------------------------ */
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("Signup failed");

    const userId = data.user.id;

    /* ------------------------------------------------------------------ */
    /* 2️⃣ INSERT INTO users TABLE                                         */
    /* ------------------------------------------------------------------ */
    await axiosInstance.post("/rest/v1/users", {
      id: userId,
      email: payload.email,
      username: payload.username,
      created_at: new Date().toISOString(),
    });

    /* ------------------------------------------------------------------ */
    /* 3️⃣ INSERT INTO user_roles TABLE                                    */
    /* ------------------------------------------------------------------ */
    await axiosInstance.post("/rest/v1/user_roles", {
      user_id: userId,
      roles: "User",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return {
      user: data.user,
      session: data.session,
    };
  };

  return useMutation({
    mutationFn: signupUser,

    onSuccess: ({ session }) => {
      if (session) {
        localStorage.setItem(
          "access_token-wiseMaestro",
          session.access_token
        );
        localStorage.setItem(
          "refresh_token-wiseMaestro",
          session.refresh_token
        );
      }

      toast.success("Account created successfully 🎉");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Signup failed");
    },
  });
};
