import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AuthForm = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const response = await axios.post(`${API_URL}${endpoint}`, { email, password });
            
            localStorage.setItem('token', response.data.token);
            onLogin(response.data.token);
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0a0a0f' }}>
            <div className="card p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-[#1a5cff] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🛡️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">BeWare</h1>
                    <p className="text-gray-400 mt-1">Digital Privacy Auditor</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input w-full mb-3"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input w-full mb-4"
                        required
                        minLength={6}
                    />
                    
                    {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                    
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                        {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
                    </button>
                </form>
                
                <p className="text-center text-gray-400 text-sm mt-4">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-[#1a5cff] hover:underline">
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;