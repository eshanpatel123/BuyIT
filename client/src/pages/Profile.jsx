import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [reviewModal, setReviewModal] = useState({ isOpen: false, productId: null, productName: '' });
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewStatus, setReviewStatus] = useState({ loading: false, error: null, success: false });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                // Optional: handle ordering by date
                setOrders(data.reverse()); // latest first
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center min-h-[60vh] gap-4">
                <span className="material-symbols-outlined animate-spin text-5xl text-primary">refresh</span>
                <p>Loading your orders...</p>
            </div>
        );
    }

    const submitReview = async (e) => {
        e.preventDefault();
        setReviewStatus({ loading: true, error: null, success: false });
        try {
            await api.post(`/products/${reviewModal.productId}/reviews`, {
                rating,
                comment
            });
            setReviewStatus({ loading: false, error: null, success: true });
            setTimeout(() => {
                setReviewModal({ isOpen: false, productId: null, productName: '' });
                setReviewStatus({ loading: false, error: null, success: false });
                setRating(5);
                setComment('');
            }, 2000);
        } catch (error) {
            setReviewStatus({
                loading: false,
                error: error.response?.data?.message || 'Failed to submit review',
                success: false
            });
        }
    };

    return (
        <main className="flex flex-1 justify-center py-8">
            <div className="layout-content-container flex flex-col w-full max-w-[1200px] px-4 md:px-10">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Link to="/" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary">Home</Link>
                    <span className="text-slate-400 text-sm">/</span>
                    <span className="text-primary text-sm font-semibold">Order History</span>
                </div>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">My Orders</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            You've placed <span className="font-semibold text-slate-900 dark:text-slate-100">{orders.length} orders</span> in total.
                        </p>
                    </div>
                </div>

                {/* Order List */}
                <div className="flex flex-col gap-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">inventory_2</span>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No orders found</h2>
                            <p className="text-slate-500 mb-6">Looks like you haven't placed an order yet.</p>
                            <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">Start Shopping</Link>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            {order.isDelivered ? (
                                                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">check_circle</span> Delivered
                                                </div>
                                            ) : order.orderStatus === 'Shipped' ? (
                                                <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">local_shipping</span> Shipped
                                                </div>
                                            ) : (
                                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">sync</span> Processing
                                                </div>
                                            )}
                                            <span className="text-slate-400">|</span>
                                            <p className="text-slate-900 dark:text-slate-100 font-bold">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1 flex gap-4">
                                                    <div className="size-24 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                                                        <img className="w-full h-full object-cover" src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'} alt={item.name} />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-1">{item.name}</h3>
                                                        <p className="text-slate-500 text-sm mt-1">Qty: {item.qty}</p>
                                                    </div>
                                                </div>
                                                {/* Only display total amount on the first item to avoid clutter, or display each item's price. Let's show item price. */}
                                                <div className="flex flex-col md:flex-row md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                                                    <p className="text-slate-500 text-sm">Item Total</p>
                                                    <p className="text-slate-900 dark:text-slate-100 text-xl font-black mb-2">₹{(item.price * item.qty).toFixed(2)}</p>

                                                    {order.isDelivered && (
                                                        <button
                                                            onClick={() => setReviewModal({ isOpen: true, productId: item.product, productName: item.name })}
                                                            className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">star_rate</span>
                                                            Leave a Review
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <p className="text-slate-500 font-medium">Order Total</p>
                                        <p className="text-xl font-bold text-primary">₹{order.totalPrice?.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : `Arriving soon`}
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50">View Details</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Review Modal */}
                {reviewModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                            <button
                                onClick={() => setReviewModal({ isOpen: false, productId: null, productName: '' })}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">Write a Review</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">For: {reviewModal.productName}</p>

                            {reviewStatus.success ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Review Submitted!</h3>
                                    <p className="text-slate-500">Thank you for sharing your feedback.</p>
                                </div>
                            ) : (
                                <form onSubmit={submitReview} className="flex flex-col gap-4">
                                    {reviewStatus.error && (
                                        <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm font-medium">
                                            {reviewStatus.error}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setRating(num)}
                                                    className={`transition-colors ${num <= rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                                                >
                                                    <span className="material-symbols-outlined text-3xl font-variation-settings-'FILL' 1">star</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="comment" className="text-sm font-bold text-slate-700 dark:text-slate-300">Share your experience</label>
                                        <textarea
                                            id="comment"
                                            rows="4"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white resize-none"
                                            placeholder="What did you like or dislike?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={reviewStatus.loading}
                                        className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {reviewStatus.loading ? (
                                            <span className="material-symbols-outlined animate-spin">refresh</span>
                                        ) : (
                                            <>Submit Review</>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
