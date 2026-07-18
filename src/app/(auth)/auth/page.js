"use client";
import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useSelector(state => state.auth);
  const mode = searchParams.get("mode") || "login";
  const [activeForm, setActiveForm] = useState(mode);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    setActiveForm(mode);
  }, [mode]);

  const handleNavigate = (type) => {
    router.push(`/auth?mode=${type}`);
    setActiveForm(type);
  };

  return (
    <div className="w-full max-w-md">
      {activeForm === "login" ? (
        <LoginForm onSignUpClick={() => handleNavigate("signup")} />
      ) : (
        <SignupForm onLoginClick={() => handleNavigate("login")} />
      )}
    </div>
  );
}
