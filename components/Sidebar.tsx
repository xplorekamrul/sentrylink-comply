'use client';

import { CheckSquare, FileText, Menu, Package, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export const Sidebar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname();

   const navItems = [
      { href: '/', label: 'Evidence Vault', icon: FileText },
      { href: '/requests', label: 'Buyer Requests', icon: CheckSquare },
      { href: '/packs', label: 'Export Packs', icon: Package },
   ];

   const isActive = (href: string) => pathname === href;

   return (
      <>
         {/* Mobile Toggle */}
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 left-4 z-40 p-2 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
         >
            {isOpen ? (
               <X className="w-6 h-6" />
            ) : (
               <Menu className="w-6 h-6" />
            )}
         </button>

         {/* Sidebar */}
         <aside
            className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 z-30 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
               }`}
         >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
               <h1 className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                  SentryLink
               </h1>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Compliance Manager
               </p>
            </div>

            <nav className="p-4 space-y-2">
               {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                     key={href}
                     href={href}
                     onClick={() => setIsOpen(false)}
                     className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(href)
                           ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                           : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                  >
                     <Icon className="w-5 h-5" />
                     <span>{label}</span>
                  </Link>
               ))}
            </nav>
         </aside>

         {/* Mobile Backdrop */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black/50 z-20 lg:hidden"
               onClick={() => setIsOpen(false)}
            />
         )}
      </>
   );
};
