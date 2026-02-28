import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCart = async () => {
            try {
                const { data } = await api.get('/cart');
                setCart(data);
            } catch (error) {
                console.error("Failed to fetch cart", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user, navigate]);

    const updateQuantity = async (productId, currentQty, change) => {
        const newQty = currentQty + change;
        if (newQty < 1) return;

        try {
            // Note: If the backend doesn't support an update endpoint directly, 
            // you might just send the delta as 'qty' if addToCart accumulates it. 
            // the backend route is: /api/cart with POST { productId, qty }.
            // It accumulates `cart.cartItems[itemIndex].qty += Number(qty)`
            await api.post('/cart', { productId, qty: change });

            // local state update for instant feedback
            setCart(prev => {
                const newItems = prev.cartItems.map(item => {
                    if (item.product._id === productId) {
                        return { ...item, qty: newQty };
                    }
                    return item;
                });
                return { ...prev, cartItems: newItems };
            });
        } catch (err) {
            console.error(err);
        }
    }

    const removeItem = async (productId) => {
        try {
            await api.delete(`/cart/${productId}`);
            setCart(prev => ({
                ...prev,
                cartItems: prev.cartItems.filter(item => item.product._id !== productId)
            }));
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">refresh</span>
            </div>
        );
    }

    const cartItems = cart?.cartItems || [];
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <main className="max-w-[1280px] mx-auto w-full px-6 py-8 md:px-20 min-h-[70vh]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6">
                <Link to="/" className="text-slate-400 text-sm font-medium hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Shopping Cart</span>
            </div>

            <div className="mb-8">
                <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">Your Shopping Cart</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">You have {cartItems.length} items in your cart</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Products List */}
                <div className="flex-1 w-full">
                    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Quantity</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Price</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {cartItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                                                <span className="material-symbols-outlined text-4xl mb-2">shopping_cart</span>
                                                <p>Your cart is empty.</p>
                                                <Link to="/" className="text-primary hover:underline font-bold mt-2 block">Continue Shopping</Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        cartItems.map((item) => (
                                            <tr key={item.product._id}>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-20 bg-center bg-no-repeat bg-cover rounded-lg border border-slate-100 dark:border-slate-800" style={{ backgroundImage: `url("${item.product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'}")` }}></div>
                                                        <div>
                                                            <Link to={`/product/${item.product._id}`} className="text-slate-900 hover:text-primary dark:text-slate-100 font-bold max-w-[200px] truncate block">{item.product.name}</Link>
                                                            <p className="text-slate-400 text-xs mt-1">{item.product.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg w-fit overflow-hidden">
                                                        <button onClick={() => updateQuantity(item.product._id, item.qty, -1)} className="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500">
                                                            <span className="material-symbols-outlined text-sm">remove</span>
                                                        </button>
                                                        <span className="px-3 py-1 font-medium text-sm border-x border-slate-200 dark:border-slate-700">{item.qty}</span>
                                                        <button onClick={() => updateQuantity(item.product._id, item.qty, +1)} className="px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500">
                                                            <span className="material-symbols-outlined text-sm">add</span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="text-slate-900 dark:text-slate-100 font-bold">₹{item.product.price.toFixed(2)}</span>
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button onClick={() => removeItem(item.product._id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Summary Column */}
                <div className="w-full lg:w-[400px]">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden sticky top-24">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold">Order Summary</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span className="text-slate-900 dark:text-slate-100 font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                <span>Shipping</span>
                                <span className={subtotal > 0 ? "text-green-600 font-medium" : "text-slate-400"}>{subtotal > 0 ? "Free" : "₹0.00"}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-2">
                                <span>Tax</span>
                                <span className="text-slate-900 dark:text-slate-100 font-medium">₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xl font-bold">Total</span>
                                <span className="text-2xl font-black text-primary">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="p-6 pt-0 flex flex-col gap-4">
                            <Link to="/checkout" aria-disabled={cartItems.length === 0} className={`w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 ${cartItems.length === 0 ? 'opacity-50 pointer-events-none' : 'hover:bg-primary/90 transition-all'}`}>
                                Proceed to Checkout
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
