import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function SellerSidebar() {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0 shrink-0">
            <div className="p-6 flex items-center gap-3 text-primary">
                <img src="/logo.png" alt="ShopEZ Logo" className="h-8 w-8 object-contain" />
                <h1 className="text-xl font-black tracking-tight text-slate-900">ShopEZ</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                <Link
                    to="/seller"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${path === '/seller'
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                </Link>
                <Link
                    to="/seller/orders"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${path.includes('/seller/orders')
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Orders
                </Link>
                <Link
                    to="/seller/products"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${path.includes('/seller/products')
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span className="material-symbols-outlined">inventory_2</span>
                    Products
                </Link>
                <Link
                    to="/seller/analytics"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                >
                    <span className="material-symbols-outlined">analytics</span>
                    Analytics
                </Link>
                <Link
                    to="/seller/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                >
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-200">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-2">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkPsJOqLf03qzf_WbHcsH9qKlSDjH5ncBES6goHiWRc2O6T3FOuc94yHUlSc8EGaN4PvJOFCEevA1cqTOvWs5pBZpk-bm4Lfg-2wFs9g9QgwwH6QR8xI46teQnr03CS1Q66IuIIn273lKhIhUyZzSD8ifOF1BqeTAmxXAd8vUmGqigXYr3jgppQCvOl8SeaNhbA2am2FiW04c5bcSD-9d6xCi6GElnVdqDoM186RmCuQ6rjpMd1n_T8JmFZeeCarV1QNv8OGHWVfE" alt="User" className="size-9 rounded-full object-cover" />
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 truncate">{user ? `${user.firstName} ${user.lastName}` : 'Pro Seller'}</p>
                            <p className="text-xs text-slate-500 truncate">Seller</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="flex items-center justify-center gap-2 w-full py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors mt-2"
                    >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
