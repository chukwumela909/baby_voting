"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EB] to-[#FFE5D9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute top-10 right-10 opacity-40 animate-pulse" />
      <Image src="/decorations/flower.svg" alt="" width={64} height={64} className="absolute top-20 left-20 opacity-30" />
      <Image src="/decorations/heart.svg" alt="" width={48} height={48} className="absolute bottom-20 right-20 opacity-40" />
      <Image src="/decorations/sparkle.svg" alt="" width={32} height={32} className="absolute bottom-40 left-40 opacity-50" />
      <Image src="/decorations/circle.svg" alt="" width={40} height={40} className="absolute top-1/2 right-10 opacity-30" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#FF9B50] mb-2">
              PFBOTY
            </h1>
          </Link>
          <p className="text-[#666666] text-lg">Create a new password</p>
        </div>

        {/* Reset Password Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-[#FFE5D9] rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-8 h-8 text-[#FF9B50]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
                />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D] mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-[#666666]">
              Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                Password updated successfully! Redirecting to login...
              </div>
            )}

            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={success}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={success}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Confirm new password"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-[#FF9B50] hover:bg-[#FF8A3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9B50] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : success ? "Password Updated!" : "Reset Password"}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-[#666666] hover:text-[#FF9B50] transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#666666] hover:text-[#FF9B50] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
