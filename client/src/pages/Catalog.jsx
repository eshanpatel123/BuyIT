import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main className="max-w-[1440px] mx-auto w-full flex flex-1 px-6 lg:px-10 py-8 gap-8">
            {/* Sidebar Filters */}
            <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-8">
                <div>
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">filter_list</span> Filters
                    </h2>
                    {/* Categories */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Categories</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Electronics</span>
                            </label>
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm text-primary font-medium">Fashion</span>
                            </label>
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Home & Living</span>
                            </label>
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Beauty</span>
                            </label>
                        </div>
                    </div>
                    {/* Price Range */}
                    <div className="mt-8 space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Price Range</h3>
                        <div className="space-y-4 px-2">
                            <input className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" max="1000" min="0" type="range" />
                            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                                <span>₹0</span>
                                <span>₹1,000+</span>
                            </div>
                        </div>
                    </div>
                    {/* Brand */}
                    <div className="mt-8 space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Top Brands</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Apple</span>
                            </label>
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Samsung</span>
                            </label>
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Nike</span>
                            </label>
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input className="rounded border-slate-300 dark:border-slate-700 text-primary checked:bg-primary checked:border-primary dark:checked:bg-primary dark:checked:border-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm group-hover:text-primary transition-colors">Adidas</span>
                            </label>
                        </div>
                    </div>
                    <button className="w-full mt-10 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        Apply Filters
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                {/* Sorting & View Options */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">New Arrivals</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Showing 6 of 150 products</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                            <span className="text-sm font-medium">Sort by: Popularity</span>
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                            <button className="p-1.5 bg-primary/10 text-primary rounded-md">
                                <span className="material-symbols-outlined text-lg block">grid_view</span>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <span className="material-symbols-outlined text-lg block">view_list</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</span>
                    </div>
                ) : products.length === 0 ? (
                    <div className="w-full text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4 block">inventory_2</span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Products Found</h3>
                        <p className="text-slate-500 mt-2">Check back later or register as a seller to add products!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.map(product => (
                            <div key={product._id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url('${product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'}')` }}></div>
                                    <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-lg block">favorite</span>
                                    </button>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
                                        <div className="flex items-center gap-1 text-orange-400">
                                            <span className="material-symbols-outlined text-sm fill-1">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">4.5</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug truncate">{product.name}</h3>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white mb-6">₹{product.price.toFixed(2)}</p>
                                    <Link to={`/product/${product._id}`} className="w-full mt-auto bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group/btn">
                                        <span>Shop Now</span>
                                        <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center mt-16 gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">3</button>
                    <span className="px-2 text-slate-400">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">12</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
