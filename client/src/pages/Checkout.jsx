import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Checkout() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [placingOrder, setPlacingOrder] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'United States'
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCart = async () => {
            try {
                const { data } = await api.get('/cart');
                setCart(data);
            } catch (err) {
                setError('Failed to fetch cart. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user, navigate]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            alert('Please fill in all shipping details');
            return;
        }

        setPlacingOrder(true);
        try {
            const orderItems = cart.cartItems.map(item => ({
                name: item.product.name,
                qty: item.qty,
                image: item.product.images?.[0] || '',
                price: item.product.price,
                product: item.product._id
            }));

            const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
            const tax = subtotal * 0.08;
            const total = subtotal + tax;

            await api.post('/orders', {
                orderItems,
                shippingAddress,
                paymentMethod: 'Credit Card',
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: 0,
                totalPrice: total
            });

            // After placing order, clear the cart on the backend.
            await api.delete('/cart');
            // Redirect to Order Placed page
            navigate('/order-placed');

        } catch (err) {
            alert(err.response?.data?.message || 'Failed to place order');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">refresh</span>
            </div>
        );
    }

    const cartItems = cart?.cartItems || [];
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="material-symbols-outlined text-6xl text-slate-300">shopping_cart</span>
                <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
                <Link to="/cart" className="text-primary hover:underline font-medium">Return to Cart</Link>
            </div>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Checkout Forms */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Shipping Information Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                Shipping Information
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Address</label>
                                <input value={shippingAddress.address} onChange={e => setShippingAddress({ ...shippingAddress, address: e.target.value })} type="text" placeholder="123 Main St" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">City</label>
                                <input value={shippingAddress.city} onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })} type="text" placeholder="New York" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Postal Code</label>
                                <input value={shippingAddress.postalCode} onChange={e => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} type="text" placeholder="10001" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                            </div>
                        </div>
                    </section>

                    {/* Payment Information Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">payments</span>
                            Payment Method
                        </h2>
                        <div className="space-y-6">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Cardholder Name</label>
                                    <input type="text" placeholder={user?.firstName ? `${user.firstName} ${user.lastName}` : "John Doe"} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Card Number</label>
                                    <div className="relative">
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Expiry Date</label>
                                    <input type="text" placeholder="MM / YY" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">CVV</label>
                                    <div className="relative">
                                        <input type="password" placeholder="•••" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-help" title="3-digit security code on the back of your card">help</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                        <Link to="/cart" className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-2 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Back to Cart
                        </Link>
                        <button onClick={handlePlaceOrder} disabled={placingOrder} className="w-full sm:w-auto px-12 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                            {placingOrder ? 'Processing...' : 'Complete Order'}
                            <span className="material-symbols-outlined">{placingOrder ? 'refresh' : 'lock'}</span>
                        </button>
                    </div>
                </div>

                {/* Right Column: Order Summary Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-6">
                        <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                            <h2 className="text-lg font-bold mb-6">Order Summary</h2>

                            {/* Items List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.product._id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                                            <img src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{item.product.name}</p>
                                            <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                                            <p className="text-sm font-bold text-primary mt-1">₹{item.product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Calculations */}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Shipping</span>
                                    <span className="font-medium text-green-500">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Estimated Tax</span>
                                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                                    <span>Total</span>
                                    <span className="text-primary">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </section>

                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-4">
                            <span className="material-symbols-outlined text-primary">verified_user</span>
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Buyer Protection</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Your purchase is fully encrypted and secure. Shop with confidence.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
