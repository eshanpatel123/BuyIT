import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white dark:bg-slate-900 px-6 md:px-20 py-4 sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-primary">
                    <img src="/logo.png" alt="ShopEZ Logo" className="h-8 w-8 object-contain" />
                    <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold leading-tight tracking-[-0.015em]">ShopEZ</h2>
                </Link>
                <div className="hidden lg:flex items-center gap-6">
                    <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-semibold" to="/">Shop</Link>
                    <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-semibold" to="/">Categories</Link>
                    <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-semibold" to="/">Deals</Link>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <label className="hidden md:flex flex-col min-w-40 h-10! max-w-64">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 dark:border-slate-700">
                        <div className="text-slate-400 flex border-none bg-slate-50 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-0 h-full placeholder:text-slate-400 px-4 rounded-r-lg text-sm font-normal outline-none" placeholder="Search products..." />
                    </div>
                </label>
                <div className="flex gap-2 items-center">
                    <Link to="/cart" className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3 ml-2 border-l border-slate-200 dark:border-slate-700 pl-4">
                            <Link to={user.role === 'seller' ? '/seller' : '/profile'} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                </div>
                                <span className="hidden md:inline-block">{user.firstName}</span>
                            </Link>
                            <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-500 transition-colors hidden md:block" title="Logout">
                                <span className="material-symbols-outlined text-xl">logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all ml-1" title="Sign In">
                            <span className="material-symbols-outlined">person</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
