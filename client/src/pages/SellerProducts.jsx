import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import api from '../api/axios';

export default function SellerProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const { data } = await api.get('/products/seller');
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch seller products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            // we have not yet created a delete endpoint but here is the skeleton
            try {
                // await api.delete(`/products/${id}`);
                // setProducts(products.filter(p => p._id !== id));
                alert("Delete functionality pending backend endpoint implementation.");
            } catch (error) {
                console.error("Failed to delete product", error);
            }
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-display">
            <SellerSidebar />

            <main className="flex-1 h-screen overflow-y-auto p-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Product Management</h2>
                        <p className="text-slate-500">Manage your inventory, pricing, and stock status.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none" />
                        </div>
                        <Link to="/seller/products/add" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">add</span>
                            Add New Product
                        </Link>
                    </div>
                </header>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase font-bold tracking-widest border-b border-slate-200">
                                    <th className="px-6 py-4">Thumbnail</th>
                                    <th className="px-6 py-4">Product Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">SKU</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                            <span className="material-symbols-outlined animate-spin text-2xl mb-2 text-primary">refresh</span>
                                            <p>Loading products...</p>
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                            <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                                            <p className="text-lg font-bold text-slate-700">No products found</p>
                                            <p className="text-sm">You haven't listed any products yet.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'} alt="Product" className="size-14 rounded-xl object-cover bg-slate-100 border border-slate-100 shadow-sm" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]" title={product.name}>{product.name}</p>
                                                <p className="text-[11px] text-slate-400 font-medium">Added {new Date(product.createdAt).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{product.category}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-slate-500">{product.sku}</td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900">₹{product.price.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                {product.stockQuantity > 10 ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
                                                        In Stock ({product.stockQuantity})
                                                    </span>
                                                ) : product.stockQuantity > 0 ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                                                        <span className="size-1.5 rounded-full bg-amber-500"></span>
                                                        Low Stock ({product.stockQuantity})
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                                                        <span className="size-1.5 rounded-full bg-rose-500"></span>
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit">
                                                        <span className="material-symbols-outlined text-xl">edit</span>
                                                    </button>
                                                    <button onClick={() => deleteProduct(product._id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                                                        <span className="material-symbols-outlined text-xl">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
