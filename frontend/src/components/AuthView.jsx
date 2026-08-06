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
    <div className="min-h-screen bg-[#060709] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14171d_1px,transparent_1px),linear-gradient(to_bottom,#14171d_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-md bg-[#101216] border border-[#1e222a] rounded-2xl p-8 shadow-2xl relative z-10">
        {/* Terminal Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-[#060709] border border-[#1e222a] flex items-center justify-center mx-auto mb-4 text-amber-500 shadow-inner shrink-0">
            <svg className="w-6 h-6" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">BeWare Terminal</h1>
          <p className="text-xs text-[#71717a] font-mono mt-1">Authenticate Operator Credentials</p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider mb-1.5">
              Operator Identifier (Email)
            </label>
            <input
              type="email"
              placeholder="operator@privacy-terminal.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#060709] border border-[#1e222a] focus:border-amber-500 text-white rounded-lg px-3.5 py-2.5 text-xs font-mono outline-none transition-all placeholder:text-[#3f3f46]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider mb-1.5">
              Access Secret
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#060709] border border-[#1e222a] focus:border-amber-500 text-white rounded-lg px-3.5 py-2.5 text-xs font-mono outline-none transition-all placeholder:text-[#3f3f46]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-[#060709] font-mono font-semibold rounded-lg py-2.5 text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 mt-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#060709] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{isLogin ? 'Authenticate Access' : 'Register Operator'}</span>
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center text-xs font-mono text-[#71717a]">
          <span>{isLogin ? 'Need new access profile? ' : 'Profile already registered? '}</span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:text-amber-400 font-medium underline ml-1"
          >
            {isLogin ? 'Create profile' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
