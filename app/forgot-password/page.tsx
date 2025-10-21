import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
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
            <h1 className="font-[family-name:var(--font-quicksand)] text-4xl font-bold text-[#FF9B50] mb-2">
              BabyVote
            </h1>
          </Link>
          <p className="text-[#666666] text-lg">Reset your password</p>
        </div>

        {/* Forgot Password Form Card */}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#2D2D2D] mb-2">
              Forgot Password?
            </h2>
            <p className="text-sm text-[#666666]">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <form className="space-y-5">
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
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[#FFE5D9] placeholder-[#999999] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#FF9B50] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-[#FF9B50] hover:bg-[#FF8A3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9B50] transition-all duration-300"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm font-semibold text-[#FF9B50] hover:text-[#FF8A3D] transition-colors inline-flex items-center">
              <svg 
                className="w-4 h-4 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#666666]">
            Still having trouble?{" "}
            <Link href="#" className="font-semibold text-[#FF9B50] hover:text-[#FF8A3D] transition-colors">
              Contact Support
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[#666666] hover:text-[#FF9B50] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
