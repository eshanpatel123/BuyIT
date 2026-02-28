import { Link } from 'react-router-dom';

export default function OrderPlaced() {
    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh]">
            <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-6xl">check_circle</span>
                </div>

                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Order Confirmed!</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Thank you for your purchase. Your order has been placed successfully and is being processed.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-left border border-slate-100 dark:border-slate-800 mt-6 mb-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">What's next?</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        You will receive an email confirmation with your order details shortly. You can track your order status in your profile.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link to="/profile" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/25 text-center">
                        View My Orders
                    </Link>
                    <Link to="/" className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3.5 rounded-xl transition-all text-center">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </main>
    );
}
