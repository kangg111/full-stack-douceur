// app/(auth)/auth/verify/page.tsx
"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ── Import shared modal ──
import PolicyModal, { PRIVACY_CONTENT } from "../PolicyModal";

function VerifyContent() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [focused, setFocused] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false); // ← ADD
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");
    if (value && index < 5) inputs.current[index + 1]?.focus();
    if (index === 5 && value) {
      const fullCode = [...newCode].join("");
      if (fullCode.length === 6) handleSubmit(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") handleSubmit(code.join(""));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newCode = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(newCode);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    if (pasted.length === 6) handleSubmit(pasted);
  };

  const handleSubmit = async (fullCode?: string) => {
    const submitCode = fullCode ?? code.join("");
    if (submitCode.length !== 6) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: submitCode }),
    });
    if (res.ok) {
      router.push("/account");
    } else {
      setError("Invalid or expired code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setResent(false);
    await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResending(false);
    setResent(true);
    setCode(["", "", "", "", "", ""]);
    inputs.current[0]?.focus();
    setTimeout(() => setResent(false), 3000);
  };

  const isComplete = code.every((d) => d !== "");

  return (
    <>
      {/* ── Privacy modal ── */}
      {showPrivacy && (
        <PolicyModal
          content={PRIVACY_CONTENT}
          onClose={() => setShowPrivacy(false)}
          user={undefined as any}
          initialAddresses={[] as any}
        />
      )}

      <div
        className="min-h-screen bg-[#f0eeeb] flex flex-col items-center
        justify-center px-4"
      >
        <div className="bg-white rounded-2xl shadow-sm w-full max-w-lg px-12 py-14">
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-4xl tracking-[0.15em] text-[#4f0d0d] font-light uppercase">
              Douceur
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Enter code
            </h2>
            <p className="text-gray-400 text-sm">
              Sent to <span className="text-gray-600 font-medium">{email}</span>
            </p>
          </div>

          <div
            className="flex gap-3 justify-between mb-6"
            onPaste={handlePaste}
          >
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onFocus={() => setFocused(i)}
                onBlur={() => setFocused(null)}
                className={`w-full aspect-square text-center text-xl font-semibold
                  rounded-xl border-2 outline-none transition-all duration-200
                  ${
                    focused === i
                      ? "border-[#4f0d0d] ring-2 ring-[#4f0d0d]/10 bg-[#4f0d0d]/5"
                      : digit
                        ? "border-[#4f0d0d]/40 bg-white text-[#4f0d0d]"
                        : "border-gray-200 bg-gray-50 text-gray-900"
                  }
                  ${error ? "border-red-300 bg-red-50" : ""}`}
              />
            ))}
          </div>

          {error && (
            <div
              className="flex items-center gap-2 mb-5 px-4 py-3 bg-red-50
              rounded-xl border border-red-100"
            >
              <span className="text-red-400 text-sm">⚠</span>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {resent && (
            <div
              className="flex items-center gap-2 mb-5 px-4 py-3 bg-green-50
              rounded-xl border border-green-100"
            >
              <span className="text-green-400 text-sm">✓</span>
              <p className="text-green-600 text-sm">
                A new code has been sent to your email.
              </p>
            </div>
          )}

          <button
            onClick={() => handleSubmit()}
            disabled={loading || !isComplete}
            className="w-full py-4 rounded-xl text-white font-semibold text-sm
              tracking-wide transition-all duration-200 disabled:opacity-50
              disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: "#4f0d0d" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 border-2 border-white/30 border-t-white
                  rounded-full animate-spin"
                />
                Verifying...
              </span>
            ) : (
              "Submit"
            )}
          </button>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-xs text-gray-400 hover:text-[#4f0d0d]
                transition-colors disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend code"}
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="text-xs text-gray-400 hover:text-[#4f0d0d] transition-colors"
            >
              Sign in with a different email
            </button>
          </div>
        </div>

        {/* ── Privacy link — now opens modal ── */}
        <div className="mt-8">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-sm text-[#4f0d0d]/70 hover:text-[#4f0d0d]
              underline underline-offset-2 transition-colors"
          >
            Privacy policy
          </button>
        </div>
      </div>
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
