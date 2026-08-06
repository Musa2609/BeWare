import React from 'react';

const AuthView = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuth,
  loading
}) => {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="w-full max-w-md bg-[#131315] border border-[#27272a] rounded-2xl p-8 shadow-2xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-inner">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">BeWare</h1>
          <p className="text-xs text-[#a1a1aa] font-mono mt-1">Digital Privacy & Cybersecurity Auditor</p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-1.5">
              Account Email
            </label>
            <input
              type="email"
              placeholder="operator@privacy.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#52525b] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-[#52525b]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#a1a1aa] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#52525b] text-white rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-[#52525b]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-zinc-200 text-[#09090b] font-medium rounded-lg py-2.5 text-sm transition-all duration-150 flex items-center justify-center gap-2 mt-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#09090b] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{isLogin ? 'Sign In to Console' : 'Create Access Account'}</span>
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center text-xs text-[#a1a1aa]">
          <span>{isLogin ? "Don't have an auditor account? " : 'Already registered? '}</span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline font-medium ml-1"
          >
            {isLogin ? 'Register now' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
