import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/cart', { productId: product._id, qty: 1 });
            navigate('/cart');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">refresh</span>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="material-symbols-outlined text-6xl text-slate-300">error</span>
                <h2 className="text-2xl font-bold text-slate-800">{error || 'Product not found'}</h2>
                <Link to="/" className="text-primary hover:underline font-medium">Return to Catalog</Link>
            </div>
        );
    }

    return (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-8">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 mb-8 items-center text-sm">
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
                <span className="text-slate-500">{product.category}</span>
                <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
                <span className="text-slate-900 dark:text-white font-semibold">{product.name}</span>
            </nav>

            {/* Product Detail Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Left Column: Gallery */}
                <div className="flex flex-col gap-4">
                    <div className="w-full aspect-4/5 md:aspect-square bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'}")` }}></div>
                    </div>
                </div>

                {/* Right Column: Product Info */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 w-fit">Low Stock</span>
                        )}
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star} className={`material-symbols-outlined ${product.rating >= star ? "fill-1" : product.rating >= star - 0.5 ? "fill-half" : "fill-0"}`}>
                                        {product.rating >= star ? 'star' : product.rating >= star - 0.5 ? 'star_half' : 'star'}
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-slate-500 underline cursor-pointer">{product.numReviews} reviews</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 border-y border-slate-200 dark:border-slate-800 py-6">
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">₹{product.price.toFixed(2)}</span>
                        </div>
                        {product.stockQuantity > 0 ? (
                            <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                In Stock - Ready to ship ({product.stockQuantity} available)
                            </p>
                        ) : (
                            <p className="text-sm text-red-600 font-medium mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">cancel</span>
                                Out of Stock
                            </p>
                        )}
                    </div>

                    {/* USP Icons */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                            <span className="material-symbols-outlined text-primary">local_shipping</span>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Fast Shipping</p>
                                <p className="text-[10px] text-slate-500">2-3 business days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                            <span className="material-symbols-outlined text-primary">verified_user</span>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Secure Payment</p>
                                <p className="text-[10px] text-slate-500">SSL Encrypted</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3 mt-4">
                        <button onClick={handleAddToCart} disabled={product.stockQuantity === 0} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
                <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
                    <button className="pb-4 border-b-2 border-primary text-primary font-bold whitespace-nowrap">Product Description</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Content Area */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h3 className="text-2xl font-bold mb-4">About this product</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {product.description}
                            </p>
                        </section>
                        {/* Specifications Table */}
                        <section>
                            <h3 className="text-xl font-bold mb-6">Details</h3>
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <div className="grid grid-cols-2 p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                    <span className="font-semibold">Category</span>
                                    <span className="text-slate-600 dark:text-slate-400">{product.category}</span>
                                </div>
                                <div className="grid grid-cols-2 p-4 border-b border-slate-200 dark:border-slate-800">
                                    <span className="font-semibold">Sub-category</span>
                                    <span className="text-slate-600 dark:text-slate-400">{product.subCategory || 'N/A'}</span>
                                </div>
                                <div className="grid grid-cols-2 p-4 bg-slate-50 dark:bg-slate-900/50">
                                    <span className="font-semibold">SKU</span>
                                    <span className="text-slate-600 dark:text-slate-400">{product.sku}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Customer Reviews</h3>
                {product.reviews && product.reviews.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">reviews</span>
                        <p className="text-slate-500 font-medium">No reviews yet. Be the first to review this product!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.reviews && product.reviews.map((review) => (
                            <div key={review._id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-display">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white leading-tight">{review.name}</p>
                                            <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-amber-400 text-sm">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span key={star} className={`material-symbols-outlined text-base ${review.rating >= star ? 'fill-1' : 'fill-0 text-slate-300'}`}>star</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-2">
                                    "{review.comment}"
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
