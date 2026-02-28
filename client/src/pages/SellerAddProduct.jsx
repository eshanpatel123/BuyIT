import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import api from '../api/axios';

export default function SellerAddProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: '',
        sku: '',
        stockQuantity: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                stockQuantity: Number(formData.stockQuantity),
                images: formData.imageUrl ? [formData.imageUrl] : []
            };

            await api.post('/products', productData);
            setSuccess('Product added successfully!');
            setTimeout(() => {
                navigate('/seller/products');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-display">
            <SellerSidebar />

            <main className="flex-1 h-screen overflow-y-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors">
                                    <span className="material-symbols-outlined text-slate-600">arrow_back</span>
                                </button>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Add New Product</h2>
                                    <p className="text-slate-500 text-sm">Step 2 of 3: Details & Inventory</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => navigate('/seller/products')} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="bg-primary text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center gap-2">
                                    {loading ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : 'Save Product'}
                                </button>
                            </div>
                        </div>
                        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
                        {success && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">{success}</div>}
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6 pb-12">
                        {/* Basic Information */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary text-xl">info</span>
                                <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
                            </div>
                            <div className="grid gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Premium Wireless Headphones" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Tell customers about your product features and benefits..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none resize-none"></textarea>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Category <span className="text-red-500">*</span></label>
                                        <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none appearance-none">
                                            <option value="">Select Category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Apparel">Apparel</option>
                                            <option value="Home & Living">Home & Living</option>
                                            <option value="Footwear">Footwear</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Sub-category</label>
                                        <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none appearance-none">
                                            <option value="">Select Sub-category</option>
                                            <option value="Accessories">Accessories</option>
                                            <option value="Wearables">Wearables</option>
                                            <option value="Laptops">Laptops</option>
                                            <option value="Smartphones">Smartphones</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Pricing & Inventory */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                                <h3 className="text-lg font-bold text-slate-900">Pricing & Inventory</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                                        <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" required placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">SKU <span className="text-red-500">*</span></label>
                                    <input type="text" name="sku" value={formData.sku} onChange={handleChange} required placeholder="SHZ-XXXX-XX" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none font-mono uppercase" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Stock Quantity <span className="text-red-500">*</span></label>
                                    <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required min="0" placeholder="0" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none" />
                                </div>
                            </div>
                        </section>

                        {/* Product Media */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-xl">image</span>
                                    <h3 className="text-lg font-bold text-slate-900">Product Image URL</h3>
                                </div>
                            </div>
                            <div className="grid gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Image URL (Optional)</label>
                                    <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none" />
                                </div>
                                {formData.imageUrl && (
                                    <div className="w-32 h-32 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>
                </form>
            </main>
        </div>
    );
}
