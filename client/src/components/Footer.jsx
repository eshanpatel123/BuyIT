import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-12 md:px-20">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-extrabold tracking-tight">ShopEZ</h2>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">Modern shopping for a modern world. Secure, fast, and intuitive.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Quick Links</h4>
                    <ul className="text-slate-500 text-sm space-y-2">
                        <li><Link className="hover:text-primary" to="/">About Us</Link></li>
                        <li><Link className="hover:text-primary" to="/">Contact</Link></li>
                        <li><Link className="hover:text-primary" to="/">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Support</h4>
                    <ul className="text-slate-500 text-sm space-y-2">
                        <li><Link className="hover:text-primary" to="/">Returns</Link></li>
                        <li><Link className="hover:text-primary" to="/">Shipping Info</Link></li>
                        <li><Link className="hover:text-primary" to="/">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Newsletter</h4>
                    <p className="text-xs text-slate-500 mb-4">Get the latest updates on new products and sales.</p>
                    <div className="flex gap-2">
                        <input className="form-input text-xs flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-lg" placeholder="Email address" type="email" />
                        <button className="p-2 bg-primary rounded-lg text-white">
                            <span className="material-symbols-outlined text-sm">send</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 text-xs">
                © {new Date().getFullYear()} ShopEZ E-Commerce Inc. All rights reserved.
            </div>
        </footer>
    );
}
