"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

type Step =
  | "email"
  | "auth-method"
  | "otp"
  | "password-error"
  | "new-user-otp"
  | "create-1"
  | "create-2"
  | "create-3"
  | "create-4"
  | "create-5"
  | "create-6"
  | "create-7"
  | "success";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2C17.64 8.57 17.58 7.95 17.48 7.36H9V10.85H13.84C13.63 11.97 12.97 12.92 11.98 13.56V15.82H14.92C16.66 14.25 17.64 11.95 17.64 9.2Z" fill="#4285F4"/>
      <path d="M9 18C11.43 18 13.47 17.2 14.92 15.82L11.98 13.56C11.17 14.1 10.16 14.42 9 14.42C6.66 14.42 4.67 12.84 3.96 10.71H0.96V13.04C2.4 15.83 5.48 18 9 18Z" fill="#34A853"/>
      <path d="M3.96 10.71C3.78 10.17 3.68 9.6 3.68 9C3.68 8.4 3.78 7.83 3.96 7.29V4.96H0.96C0.35 6.17 0 7.55 0 9C0 10.45 0.35 11.83 0.96 13.04L3.96 10.71Z" fill="#FBBC05"/>
      <path d="M9 3.58C10.32 3.58 11.5 4.03 12.44 4.93L14.97 2.4C13.47 1 11.43 0 9 0C5.48 0 2.4 2.17 0.96 4.96L3.96 7.29C4.67 5.16 6.66 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 9C11.5 7.1 13 6.2 13.1 6.1C12 4.5 10.3 4.3 9.7 4.3C8.3 4.2 6.9 5.2 6.2 5.2C5.5 5.2 4.3 4.3 3.1 4.3C1.6 4.4 0.2 5.3 0 7.1C-0.4 10.7 2.2 16.1 3.6 16.1C4.1 16.1 4.8 15.5 5.9 15.5C7 15.5 7.5 16.1 8.3 16.1C9.8 16 11.1 12.2 11.5 9ZM9.3 2.8C10.1 1.8 10.1 0.9 10.1 0.5C9.3 0.5 8.4 1.1 7.9 1.6C7.3 2.2 6.9 3 7 3.8C7.8 3.9 8.6 3.4 9.3 2.8Z" fill="white"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0H2C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14H16C17.1 14 18 13.1 18 12V2C18 0.9 17.1 0 16 0ZM16 4L9 8.5L2 4V2L9 6.5L16 2V4Z" fill="white"/>
    </svg>
  );
}

function Divider({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-px bg-[#E6EAEE]/30" />
      <span className="text-[#E6EAEE] text-[10px] tracking-[1.5px] uppercase font-medium">{text}</span>
      <div className="flex-1 h-px bg-[#E6EAEE]/30" />
    </div>
  );
}

function SignInHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <p className="text-[#DDE7F4] text-[10px] tracking-[1.5px] uppercase font-semibold">SIGN IN</p>
      <h1 className="text-[28px] sm:text-[35px] leading-tight">
        <span className="text-[#EBEFF2] font-semibold">Welcome </span>
        <span className="text-[#5B7FB6] italic font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
          back.
        </span>
      </h1>
      <p className="text-[#94A0AA] text-[12px] leading-relaxed">
        Continue to your workspace. Your morning brief is ready.
      </p>
    </div>
  );
}

function AuthenticateHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <p className="text-[#DDE7F4] text-[10px] tracking-[1.5px] uppercase font-semibold">AUTHENTICATE</p>
      <h1 className="text-[28px] sm:text-[35px] leading-tight">
        <span className="text-[#EBEFF2] font-semibold">Welcome </span>
        <span className="text-[#5B7FB6] italic font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
          aboard.
        </span>
      </h1>
    </div>
  );
}

function CreateAccountHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <p className="text-[#DDE7F4] text-[10px] tracking-[1.5px] uppercase font-semibold">CREATE A NEW ACCOUNT</p>
      <h1 className="text-[28px] sm:text-[35px] leading-tight">
        <span className="text-[#EBEFF2] font-semibold">Tell us about </span>
        <span className="text-[#5B7FB6] italic font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
          yourself.
        </span>
      </h1>
    </div>
  );
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  autoFocus = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#94A0AA] text-[10px] tracking-[1.5px] uppercase font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`w-full backdrop-blur-sm bg-white/10 border border-[#D9D9D9]/40 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-[#6B7B86] outline-none focus:border-white/50 transition-colors ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function OTPInput({
  value,
  onChange,
  hasError,
}: {
  value: string[];
  onChange: (val: string[]) => void;
  hasError: boolean;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, char: string) => {
      if (!/^\d?$/.test(char)) return;
      const next = [...value];
      next[index] = char;
      onChange(next);
      if (char && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, onChange]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [value]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
      if (!pasted) return;
      const next = [...value];
      for (let i = 0; i < 6; i++) {
        next[i] = pasted[i] || "";
      }
      onChange(next);
      const focusIdx = Math.min(pasted.length, 5);
      inputRefs.current[focusIdx]?.focus();
    },
    [value, onChange]
  );

  return (
    <div className="flex items-center gap-2 justify-center">
      {[0, 1, 2].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] text-center text-[20px] font-semibold text-white backdrop-blur-sm bg-white/10 rounded-[10px] border outline-none focus:border-white/50 transition-colors ${
            hasError ? "border-[#EB7373]" : "border-[#D9D9D9]/40"
          }`}
          autoFocus={i === 0}
        />
      ))}
      <div className="w-3" />
      {[3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] text-center text-[20px] font-semibold text-white backdrop-blur-sm bg-white/10 rounded-[10px] border outline-none focus:border-white/50 transition-colors ${
            hasError ? "border-[#EB7373]" : "border-[#D9D9D9]/40"
          }`}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Create account fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isOtpComplete = otpValues.every((v) => v !== "");

  const isCreateStep = step.startsWith("create-");

  useEffect(() => {
    if (step === "otp" || step === "auth-method" || step === "password-error" || step === "new-user-otp") {
      setError("");
    }
  }, [step]);

  // --- Handlers ---

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: rpcError } = await supabase.rpc("check_email_exists", {
        check_email: email.trim(),
      });
      if (rpcError) {
        setError(rpcError.message);
        return;
      }
      if (data === true) {
        setStep("auth-method");
      } else {
        // New user: send OTP that creates the auth user
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { shouldCreateUser: true },
        });
        if (otpError) {
          setError(otpError.message);
        } else {
          setStep("new-user-otp");
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });
      if (otpError) {
        setError(otpError.message);
      } else {
        setStep("otp");
      }
    } catch {
      setError("Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!isOtpComplete) return;
    setLoading(true);
    setError("");
    try {
      const token = otpValues.join("");
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      if (verifyError) {
        setError("Incorrect code. Please try again.");
      } else {
        setStep("success");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyNewUserOtp = async () => {
    if (!isOtpComplete) return;
    setLoading(true);
    setError("");
    try {
      const token = otpValues.join("");
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      if (verifyError) {
        setError("Incorrect code. Please try again.");
      } else {
        setStep("create-1");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendNewUserOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true },
      });
      if (otpError) {
        setError(otpError.message);
      }
    } catch {
      setError("Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError("Incorrect password. Please try again.");
        setStep("password-error");
      } else {
        setStep("success");
      }
    } catch {
      setError("Sign in failed. Please try again.");
      setStep("password-error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // 1. auth.users에 비밀번호 + 메타데이터 설정
      const { error: updateError } = await supabase.auth.updateUser({
        password: signupPassword,
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          nickname: nickname.trim() || null,
          job_title: role.trim() || null,
        },
      });
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // 2. public.users 생성 (회원가입 완료 시점에만 생성)
      const { error: regError } = await supabase.rpc("complete_registration", {
        p_first_name: firstName.trim(),
        p_last_name: lastName.trim(),
        p_nickname: nickname.trim() || null,
        p_job_title: role.trim() || null,
      });
      if (regError) {
        setError(regError.message);
      } else {
        setStep("success");
      }
    } catch {
      setError("Account creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextCreateStep = () => {
    setError("");
    const stepNum = parseInt(step.replace("create-", ""), 10);
    if (stepNum === 1 && !firstName.trim()) {
      setError("First name is required.");
      return;
    }
    if (stepNum === 2 && !lastName.trim()) {
      setError("Last name is required.");
      return;
    }
    if (stepNum < 7) {
      setStep(`create-${stepNum + 1}` as Step);
    }
  };

  const createStepNumber = isCreateStep ? parseInt(step.replace("create-", ""), 10) : 0;

  // --- Determine which header to show ---
  const renderHeader = () => {
    if (step === "success") return null;
    if (step === "new-user-otp") return <AuthenticateHeader />;
    if (isCreateStep) return <CreateAccountHeader />;
    return <SignInHeader />;
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(166deg, rgb(46, 67, 78) 0%, rgb(31, 47, 56) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] rounded-[40%] opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(45, 90, 158, 0.6) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[45%] rounded-[40%] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(120, 80, 180, 0.5) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Logo */}
      <Link href="/" className="relative z-10 block px-6 sm:px-10 pt-6 sm:pt-8">
        <Logo variant="light" size={32} />
      </Link>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-[380px]">
          {renderHeader()}

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              {/* OAuth buttons */}
              <button
                type="button"
                className="flex items-center justify-center gap-3 w-full backdrop-blur-sm bg-white/10 rounded-[5px] px-4 py-3 text-white text-[14px] font-semibold hover:bg-white/15 transition-colors"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 w-full backdrop-blur-sm bg-white/10 rounded-[5px] px-4 py-3 text-white text-[14px] font-semibold hover:bg-white/15 transition-colors"
              >
                <AppleIcon />
                Continue with Apple
              </button>

              <Divider text="OR WITH EMAIL" />

              {/* Email input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#94A0AA] text-[10px] tracking-[1.5px] uppercase font-medium">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full backdrop-blur-sm bg-white/10 border border-[#D9D9D9]/40 rounded-[8px] px-4 py-3 text-white text-[14px] placeholder:text-[#94A0AA] outline-none focus:border-white/50 transition-colors"
                  autoFocus
                />
              </div>

              {error && <p className="text-[#EB7373] text-[11px]">{error}</p>}

              {/* Continue button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white border border-[#E6EAEE] rounded-[10px] px-4 py-3 text-[#16242E] text-[12px] font-semibold hover:bg-white/90 transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? "Checking..." : "Continue"}
              </button>
            </form>
          )}

          {/* Step 2: Auth Method (existing user) */}
          {(step === "auth-method" || step === "password-error") && (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="flex items-center justify-center gap-3 w-full backdrop-blur-sm bg-white/10 rounded-[5px] px-4 py-3 text-white text-[14px] font-semibold hover:bg-white/15 transition-colors disabled:opacity-50"
              >
                <MailIcon />
                {loading ? "Sending..." : "Verify with one-time code"}
              </button>

              <Divider text="OR" />

              <form onSubmit={handlePasswordSignIn} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className={`text-[10px] tracking-[1.5px] uppercase font-medium ${
                      step === "password-error" ? "text-[#EB7373]" : "text-[#94A0AA]"
                    }`}
                  >
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (step === "password-error") {
                        setStep("auth-method");
                        setError("");
                      }
                    }}
                    placeholder="Enter your password"
                    className={`w-full backdrop-blur-sm bg-white/10 border rounded-[8px] px-4 py-3 text-[14px] placeholder:text-[#94A0AA] outline-none focus:border-white/50 transition-colors ${
                      step === "password-error"
                        ? "border-[#EB7373] text-[#EB7373]"
                        : "border-[#D9D9D9]/40 text-white"
                    }`}
                    autoFocus
                  />
                  {step === "password-error" && error && (
                    <p className="text-[#EB7373] text-[11px] mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!password.trim() || loading}
                  className={`w-full rounded-[10px] px-4 py-3 text-[12px] font-semibold transition-colors mt-2 ${
                    password.trim()
                      ? "bg-white border border-[#E6EAEE] text-[#16242E] hover:bg-white/90"
                      : "bg-[#E7E7E7] text-[#94A0AA] cursor-not-allowed"
                  }`}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          )}

          {/* Step 3a: OTP (existing user) */}
          {step === "otp" && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[20px] font-semibold text-[#EBEFF2]">Enter Verification Code</h2>
                <p className="text-[12px] text-[#94A0AA]">A verification code has been sent to:</p>
                <p className="text-[14px] font-semibold text-[#DDE7F4]">{email}</p>
              </div>

              <OTPInput value={otpValues} onChange={setOtpValues} hasError={!!error} />

              {error && <p className="text-[#EB7373] text-[11px] text-center">{error}</p>}

              <button
                type="button"
                className="text-[#5B7FB6] text-[12px] hover:underline self-center"
                onClick={handleSendOtp}
              >
                Didn&apos;t get a code?
              </button>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={!isOtpComplete || loading}
                className={`w-full rounded-[10px] px-4 py-3 text-[12px] font-semibold transition-colors ${
                  isOtpComplete
                    ? "bg-white border border-[#E6EAEE] text-[#16242E] hover:bg-white/90"
                    : "bg-[#E7E7E7] text-[#94A0AA] cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("auth-method");
                  setOtpValues(["", "", "", "", "", ""]);
                  setError("");
                }}
                className="w-full backdrop-blur-sm bg-white/10 rounded-[5px] px-4 py-3 text-white text-[14px] font-semibold hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Step 2b: New User OTP Verification */}
          {step === "new-user-otp" && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[20px] font-semibold text-[#EBEFF2]">Enter Verification Code</h2>
                <p className="text-[12px] text-[#94A0AA]">A verification code has been sent to:</p>
                <p className="text-[14px] font-semibold text-[#DDE7F4]">{email}</p>
              </div>

              <OTPInput value={otpValues} onChange={setOtpValues} hasError={!!error} />

              {error && <p className="text-[#EB7373] text-[11px] text-center">{error}</p>}

              <button
                type="button"
                className="text-[#5B7FB6] text-[12px] hover:underline self-center"
                onClick={handleResendNewUserOtp}
              >
                Didn&apos;t get a code?
              </button>

              <button
                type="button"
                onClick={handleVerifyNewUserOtp}
                disabled={!isOtpComplete || loading}
                className={`w-full rounded-[10px] px-4 py-3 text-[12px] font-semibold transition-colors ${
                  isOtpComplete
                    ? "bg-white border border-[#E6EAEE] text-[#16242E] hover:bg-white/90"
                    : "bg-[#E7E7E7] text-[#94A0AA] cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtpValues(["", "", "", "", "", ""]);
                  setError("");
                }}
                className="w-full backdrop-blur-sm bg-white/10 rounded-[5px] px-4 py-3 text-white text-[14px] font-semibold hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Create Account Steps (progressive form) */}
          {isCreateStep && (
            <div className="flex flex-col gap-4">
              {/* FIRST NAME - visible from create-1 */}
              <FormField
                label="FIRST NAME"
                value={firstName}
                onChange={setFirstName}
                placeholder="Enter your first name"
                autoFocus={createStepNumber === 1}
              />

              {/* LAST NAME - visible from create-2 */}
              {createStepNumber >= 2 && (
                <FormField
                  label="LAST NAME"
                  value={lastName}
                  onChange={setLastName}
                  placeholder="Enter your last name"
                  autoFocus={createStepNumber === 2}
                />
              )}

              {/* NICKNAME - visible from create-3 */}
              {createStepNumber >= 3 && (
                <FormField
                  label="NICKNAME"
                  value={nickname}
                  onChange={setNickname}
                  placeholder="Choose a nickname"
                  autoFocus={createStepNumber === 3}
                />
              )}

              {/* ROLE - visible from create-4 */}
              {createStepNumber >= 4 && (
                <FormField
                  label="ROLE"
                  value={role}
                  onChange={setRole}
                  placeholder="e.g. Product Manager, Engineer"
                  autoFocus={createStepNumber === 4}
                />
              )}

              {/* EMAIL - visible from create-5 (pre-filled, disabled) */}
              {createStepNumber >= 5 && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#94A0AA] text-[10px] tracking-[1.5px] uppercase font-medium">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full backdrop-blur-sm bg-white/5 border border-[#D9D9D9]/20 rounded-[8px] px-4 py-3 text-white/60 text-[12px] outline-none cursor-not-allowed"
                  />
                </div>
              )}

              {/* PASSWORD - visible from create-6 */}
              {createStepNumber >= 6 && (
                <FormField
                  label="PASSWORD"
                  type="password"
                  value={signupPassword}
                  onChange={setSignupPassword}
                  placeholder="At least 6 characters"
                  autoFocus={createStepNumber === 6}
                />
              )}

              {/* CONFIRM PASSWORD - visible from create-7 */}
              {createStepNumber >= 7 && (
                <FormField
                  label="CONFIRM PASSWORD"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Re-enter your password"
                  autoFocus={createStepNumber === 7}
                />
              )}

              {error && <p className="text-[#EB7373] text-[11px]">{error}</p>}

              {/* Action button */}
              {createStepNumber < 7 ? (
                <button
                  type="button"
                  onClick={handleNextCreateStep}
                  className="w-full bg-white border border-[#E6EAEE] rounded-[10px] px-4 py-3 text-[#16242E] text-[12px] font-semibold hover:bg-white/90 transition-colors mt-2"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  disabled={loading}
                  className="w-full bg-white border border-[#E6EAEE] rounded-[10px] px-4 py-3 text-[#16242E] text-[12px] font-semibold hover:bg-white/90 transition-colors mt-2 disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              )}
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-5 text-center">
              <div>
                <h1 className="text-[28px] sm:text-[35px] font-semibold text-[#EBEFF2] leading-tight">
                  Logged in as
                </h1>
                <p
                  className="text-[24px] sm:text-[30px] text-[#5B7FB6] italic mt-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {email}
                </p>
              </div>

              <a
                href="plinq://open"
                className="w-full bg-white border border-[#E6EAEE] rounded-[10px] px-4 py-3 text-[#16242E] text-[12px] font-semibold hover:bg-white/90 transition-colors text-center block"
              >
                Open the desktop app
              </a>

              <p className="text-[12px] text-[#94A0AA]">
                Not {email}?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setEmail("");
                    setPassword("");
                    setOtpValues(["", "", "", "", "", ""]);
                    setError("");
                    setFirstName("");
                    setLastName("");
                    setNickname("");
                    setRole("");
                    setSignupPassword("");
                    setConfirmPassword("");
                  }}
                  className="text-[#5B7FB6] hover:underline"
                >
                  Log in with another account
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-6 px-6">
        <p className="text-[#6B7B86] text-[11px]">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-[#94A0AA]">Terms</span> and{" "}
          <span className="underline cursor-pointer hover:text-[#94A0AA]">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
