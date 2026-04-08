// app/(auth)/auth/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PolicyModal, { TERMS_CONTENT, PRIVACY_CONTENT } from "./PolicyModal";
import { useFormValidation, VALIDATION } from "@/lib/use-form-validation";
import ErrorMessage from "../../components/ui/ErrorMessage";

const BRAND = "#4f0d0d";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [focused, setFocused] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const router = useRouter();

  const { errors, validate, clearError } = useFormValidation<{ email: string }>(
    {
      email: VALIDATION.email,
    },
  );

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) router.replace("/account");
        else setChecking(false);
      });
  }, []);

  const submit = async () => {
    if (!validate({ email })) return;
    setLoading(true);
    await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    setLoading(false);
  };

  if (checking) return null;

  return (
    <>
      {showTerms && (
        <PolicyModal
          content={TERMS_CONTENT}
          onClose={() => setShowTerms(false)}
        />
      )}
      {showPrivacy && (
        <PolicyModal
          content={PRIVACY_CONTENT}
          onClose={() => setShowPrivacy(false)}
        />
      )}

      <div
        className="min-h-screen bg-[#f0eeeb] flex flex-col items-center
        justify-center px-4"
      >
        <div className="bg-white rounded-2xl shadow-sm w-full max-w-lg px-12 py-14">
          <div className="flex flex-col items-center mb-10">
            <h1
              className="text-4xl tracking-[0.15em] font-light uppercase"
              style={{ color: BRAND }}
            >
              Douceur
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Sign in
            </h2>
            <p className="text-gray-400 text-sm">Welcome Dear</p>
          </div>

          {/* Email input */}
          <div className="mb-4">
            <div
              className="border rounded-xl px-4 py-4 transition-all duration-200"
              style={{
                borderColor: errors.email
                  ? "#fca5a5"
                  : focused
                    ? BRAND
                    : "#e5e7eb",
                backgroundColor: errors.email ? "#fef2f2" : "white",
                boxShadow:
                  focused && !errors.email ? `0 0 0 3px ${BRAND}12` : "none",
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="w-full text-sm text-gray-800 placeholder-gray-400
                  outline-none bg-transparent"
              />
            </div>
            <ErrorMessage message={errors.email} />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-semibold text-sm
              tracking-wide transition-all duration-200 disabled:opacity-50
              disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: BRAND }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 border-2 border-white/30 border-t-white
                  rounded-full animate-spin"
                />
                Sending...
              </span>
            ) : (
              "Continue"
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing, you agree to our{" "}
            <button
              onClick={() => setShowTerms(true)}
              className="underline underline-offset-2 hover:opacity-70
                transition-opacity font-medium"
              style={{ color: BRAND }}
            >
              Terms of Service
            </button>
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-sm underline underline-offset-2 hover:opacity-70
              transition-opacity"
            style={{ color: `${BRAND}70` }}
          >
            Privacy policy
          </button>
        </div>
      </div>
    </>
  );
}
