'use client';

import { Button } from '@/components/ui/Button';
import { Package } from 'lucide-react';

export default function ExportPacks() {
   return (
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
               Export Packs
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
               Create and manage compliance document packages
            </p>
         </div>

         {/* Empty State */}
         <div className="card p-12 text-center">
            <Package className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 mb-6">
               No packs created yet. Start by selecting documents from the Evidence Vault.
            </p>
            <Button
               variant="primary"
               onClick={() => window.location.href = '/'}
            >
               Go to Evidence Vault
            </Button>
         </div>
      </div>
   );
}
