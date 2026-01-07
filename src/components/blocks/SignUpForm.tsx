import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { appRoutes } from "@/routes/appRoutes";
import { useSignup } from "@/queries/AuthQueries"; // ✅ NEW

interface SignupFormProps extends React.ComponentProps<"form"> {
  className?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setIsOtpFormVisible: (visible: boolean) => void;
}

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm({
  className,
  setEmail,
  setIsOtpFormVisible,
  ...props
}: SignupFormProps) {
  const { mutate: signup, isPending } = useSignup();

  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (key: keyof SignUpForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    signup(
      {
        email: form.email,
        password: form.password,
        username: form.name,
      },
      {
        onSuccess: ({ user }) => {
          // 🔐 Email verification flow
          if (!user.email_confirmed_at) {
            setEmail(form.email);
            setIsOtpFormVisible(true);
            return;
          }

          toast.success("Account created successfully 🎉");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Signup failed");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Enter Your Name"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="Enter Your Email"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            placeholder="Enter Your Password"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirm Password
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={form.confirmPassword}
            placeholder="Conform Your Password"
            onChange={handleChange("confirmPassword")}
            required
          />
        </Field>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button">
            <img width={16} src="/icons/google.svg" alt="google" />
            Sign up with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <a href={appRoutes.auth.signIn} className="underline">
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
