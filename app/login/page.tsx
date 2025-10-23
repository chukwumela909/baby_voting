"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Handle specific error cases
        if (signInError.message.includes("Invalid login credentials") || 
            signInError.message.includes("invalid") ||
            signInError.message.includes("Email not confirmed")) {
          setError("Invalid email or password. Please check your credentials and try again.");
        } else if (signInError.message.includes("Email not confirmed")) {
          setError("Please confirm your email address before logging in.");
        } else {
          setError(signInError.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // Redirect to dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Failed to sign in with Google");
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
          <p className="text-[#666666] text-lg">Welcome back! Log in to continue</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D] mb-6 text-center">
            Log In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
                {error.includes("Invalid email or password") && (
                  <div className="mt-2">
                    <Link href="/forgot-password" className="font-semibold underline hover:text-red-800">
                      Forgot your password? →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#FF9B50] focus:ring-[#FF9B50] border-[#FFE5D9] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#666666]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-semibold text-[#FF9B50] hover:text-[#FF8A3D] transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-[#FF9B50] hover:bg-[#FF8A3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9B50] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FFE5D9]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#999999]">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full inline-flex justify-center py-3 px-4 rounded-xl border-2 border-[#FFE5D9] bg-white text-sm font-semibold text-[#2D2D2D] hover:bg-[#FFF5EB] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Log in with Google</span>
              Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#666666]">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#FF9B50] hover:text-[#FF8A3D] transition-colors">
                Sign up
              </Link>
            </p>
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
