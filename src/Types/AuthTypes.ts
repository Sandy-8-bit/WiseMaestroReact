import type { Session, User } from "@supabase/supabase-js";

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface SupabaseAuthResponse {
  user: User;
  session: Session | null;
}