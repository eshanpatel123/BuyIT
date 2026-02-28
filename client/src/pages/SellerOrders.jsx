import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import api from '../api/axios';

export default function SellerOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Fetch orders using the existing /api/orders route (which we just updated to filter by seller products)
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch seller orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
            // Optimistically update
            setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-display">
            <SellerSidebar />

            <main className="flex-1 h-screen overflow-y-auto p-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Orders Management</h2>
                        <p className="text-slate-500">View and manage orders containing your products.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm outline-none" />
                        </div>
                    </div>
                </header>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase font-bold tracking-widest border-b border-slate-200">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Total Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                            <span className="material-symbols-outlined animate-spin text-2xl mb-2 text-primary">refresh</span>
                                            <p>Loading orders...</p>
                                        </td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                            <span className="material-symbols-outlined text-4xl mb-2 border rounded-full p-4 border-slate-200">shopping_bag</span>
                                            <p className="text-lg font-bold text-slate-700 mt-4">No orders received yet</p>
                                            <p className="text-sm">When customers place orders, they will appear here.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-900 font-mono">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                        {order.user?.firstName?.[0]}{order.user?.lastName?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{order.user?.firstName} {order.user?.lastName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900">
                                                ₹{order.totalPrice.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.orderStatus}
                                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                                    className={`text-xs font-bold rounded-full px-3 py-1.5 border-none outline-none cursor-pointer
                                                        ${order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                            order.orderStatus === 'Shipped' ? 'bg-amber-50 text-amber-600' :
                                                                order.orderStatus === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                                                    'bg-blue-50 text-blue-600'}`}
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {order.orderItems.length} item(s)
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                                                    View Details
                                                </button>
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
