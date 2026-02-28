import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import api from '../api/axios';

export default function SellerDashboard() {
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                // Fetch the seller's products to display in the top products table
                const { data } = await api.get('/products/seller');

                // For a true "top products" we'd sort by sales. 
                // Currently just sorting by recent and taking top 5.
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
                setTopProducts(sorted);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50 font-display">
            <SellerSidebar />

            <main className="flex-1 h-screen overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Seller Analytics</h2>
                        <p className="text-slate-500">Monitor your shop performance and revenue growth.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium text-slate-600 shadow-sm">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            Last 30 Days
                        </div>
                        <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Export Report
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Sales</p>
                            <span className="text-emerald-500 bg-emerald-50 text-xs px-2 py-1 rounded font-bold">+12.5%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">₹45,231.89</h3>
                                <p className="text-xs text-slate-400 mt-1">vs. last month</p>
                            </div>
                            <div className="w-16 h-8 text-primary">
                                <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-transparent">
                                    <path d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,10 T100,5" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
                            <span className="text-emerald-500 bg-emerald-50 text-xs px-2 py-1 rounded font-bold">+8.2%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">1,284</h3>
                                <p className="text-xs text-slate-400 mt-1">vs. last month</p>
                            </div>
                            <div className="w-16 h-8 text-primary">
                                <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-transparent">
                                    <path d="M0,30 Q20,35 40,25 T60,15 T80,20 T100,10" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Avg Order Value</p>
                            <span className="text-rose-500 bg-rose-50 text-xs px-2 py-1 rounded font-bold">-2.1%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">₹35.22</h3>
                                <p className="text-xs text-slate-400 mt-1">vs. last month</p>
                            </div>
                            <div className="w-16 h-8 text-rose-400">
                                <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-transparent">
                                    <path d="M0,10 Q20,15 40,30 T60,20 T80,35 T100,38" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">New Customers</p>
                            <span className="text-emerald-500 bg-emerald-50 text-xs px-2 py-1 rounded font-bold">+18.4%</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">452</h3>
                                <p className="text-xs text-slate-400 mt-1">vs. last month</p>
                            </div>
                            <div className="w-16 h-8 text-primary">
                                <svg viewBox="0 0 100 40" className="w-full h-full stroke-current fill-transparent">
                                    <path d="M0,38 Q20,20 40,25 T60,10 T80,5 T100,2" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-slate-900">Revenue Trends</h3>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                    <span className="size-2 rounded-full bg-primary"></span> Current Period
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 ml-4">
                                    <span className="size-2 rounded-full bg-slate-200"></span> Previous Period
                                </span>
                            </div>
                        </div>

                        <div className="relative h-[300px] w-full mt-4">
                            <svg viewBox="0 0 800 300" preserveAspectRatio="none" className="w-full h-full">
                                <line x1="0" y1="0" x2="800" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="0" y1="75" x2="800" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="0" y1="150" x2="800" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="0" y1="225" x2="800" y2="225" stroke="#f1f5f9" strokeWidth="1" />
                                <line x1="0" y1="300" x2="800" y2="300" stroke="#f1f5f9" strokeWidth="1" />
                                <path d="M0,280 L100,270 L200,275 L300,250 L400,260 L500,240 L600,250 L700,230 L800,245" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8 4" />
                                <path d="M0,250 L100,200 L200,220 L300,120 L400,180 L500,100 L600,130 L700,60 L800,40" fill="none" stroke="#136dec" strokeWidth="4" strokeLinecap="round" />
                                <path d="M0,250 L100,200 L200,220 L300,120 L400,180 L500,100 L600,130 L700,60 L800,40 V300 H0 Z" fill="url(#chartGradient)" />
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#136dec" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="#136dec" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex justify-between mt-4 text-xs font-semibold text-slate-400">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                                <span>Sep</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Your Products</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-3">Product</th>
                                        <th className="px-4 py-3 text-right">Stock</th>
                                        <th className="px-6 py-3 text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                                                <span className="material-symbols-outlined animate-spin text-xl mb-2 text-primary">refresh</span>
                                            </td>
                                        </tr>
                                    ) : topProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-slate-500 text-sm">
                                                No products uploaded yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        topProducts.map(product => (
                                            <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'} alt={product.name} className="size-10 rounded-lg object-cover bg-slate-100" />
                                                        <div className="overflow-hidden flex flex-col justify-center">
                                                            <p className="text-sm font-bold text-slate-900 truncate max-w-[120px]" title={product.name}>{product.name}</p>
                                                            <p className="text-[10px] text-slate-500 font-medium truncate">{product.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    {product.stockQuantity > 10 ? (
                                                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">{product.stockQuantity}</span>
                                                    ) : product.stockQuantity > 0 ? (
                                                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-100">{product.stockQuantity}</span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-100">{product.stockQuantity}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <p className="text-sm font-black text-slate-900">₹{product.price.toFixed(2)}</p>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-100 text-center">
                            <Link to="/seller/products" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">View All Products</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
