import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
        setIsLoading(false);
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4 text-primary">
                        <span className="material-symbols-outlined text-3xl">lock</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h1>
                    <p className="text-sm text-slate-500 mt-2">Sign in to your ShopEZ account</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                            <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="rounded text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer" />
                        <label htmlFor="remember" className="ml-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">Remember me for 30 days</label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isLoading ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-primary hover:underline">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
