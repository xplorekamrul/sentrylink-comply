'use client';

import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
   size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   title,
   children,
   size = 'md',
}) => {
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }

      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [isOpen]);

   if (!isOpen) return null;

   const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         {/* Backdrop */}
         <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
         />

         {/* Modal Content */}
         <div
            className={`relative w-full ${sizeClasses[size]} mx-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-300`}
         >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-6">
               <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  {title}
               </h2>
               <button
                  onClick={onClose}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                  aria-label="Close modal"
               >
                  <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
               </button>
            </div>

            {/* Body */}
            <div className="p-6">{children}</div>
         </div>
      </div>
   );
};
