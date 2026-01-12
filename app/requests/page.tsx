'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusChip } from '@/components/ui/StatusChip';
import { mockBuyerRequests, mockEvidence } from '@/lib/mockData';
import type { BuyerRequest } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function BuyerRequests() {
   const [requests, setRequests] = useState<BuyerRequest[]>(mockBuyerRequests);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(null);
   const [activeTab, setActiveTab] = useState<'vault' | 'upload'>('vault');
   const [selectedDocId, setSelectedDocId] = useState<string>('');

   const handleFulfill = (request: BuyerRequest) => {
      setSelectedRequest(request);
      setIsModalOpen(true);
   };

   const handleSubmitFulfill = () => {
      if (!selectedRequest) return;

      setRequests(
         requests.map((req) =>
            req.id === selectedRequest.id ? { ...req, status: 'fulfilled' } : req
         )
      );

      setIsModalOpen(false);
      setSelectedRequest(null);
      setSelectedDocId('');
      setActiveTab('vault');
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case 'fulfilled':
            return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
         case 'overdue':
            return <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
         default:
            return <Clock className="w-5 h-5 text-slate-400 dark:text-slate-500" />;
      }
   };

   return (
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
         {/* Header */}
         <div className="mb-8">
            <h1 className=" text-center lg:text-left text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
               Buyer Requests
            </h1>
            <p className="text-center lg:text-left text-slate-600 dark:text-slate-400">
               Manage compliance document requests from buyers
            </p>
         </div>

         {/* Requests Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
               <div key={request.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-md dark:hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex-1">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                           Action Required
                        </p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                           {request.docType}
                        </h3>
                     </div>
                     {getStatusIcon(request.status)}
                  </div>

                  {/* Buyer Info */}
                  <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium">From:</span> {request.buyerName}
                     </p>
                  </div>

                  {/* Due Date */}
                  <div className="mb-4">
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-1">
                        Due Date
                     </p>
                     <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {formatDate(request.dueDate)}
                     </p>
                  </div>

                  {/* Status */}
                  <div className="mb-6">
                     <StatusChip status={request.status as any} />
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                     {request.status === 'fulfilled' ? (
                        <Button variant="secondary" disabled className="w-full">
                           Fulfilled
                        </Button>
                     ) : (
                        <Button
                           variant="primary"
                           onClick={() => handleFulfill(request)}
                           className="w-full"
                        >
                           Fulfill Request
                        </Button>
                     )}
                  </div>
               </div>
            ))}
         </div>

         {/* Empty State */}
         {requests.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 p-12 text-center">
               <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
               <p className="text-slate-600 dark:text-slate-400">
                  No pending requests. All caught up!
               </p>
            </div>
         )}

         {/* Fulfill Modal */}
         <Modal
            isOpen={isModalOpen}
            onClose={() => {
               setIsModalOpen(false);
               setSelectedRequest(null);
               setSelectedDocId('');
               setActiveTab('vault');
            }}
            title={`Fulfill: ${selectedRequest?.docType}`}
            size="lg"
         >
            <div className="space-y-4">
               {/* Tabs */}
               <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                  <button
                     onClick={() => setActiveTab('vault')}
                     className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'vault'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                        }`}
                  >
                     Choose from Vault
                  </button>
                  <button
                     onClick={() => setActiveTab('upload')}
                     className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'upload'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                        }`}
                  >
                     Upload New
                  </button>
               </div>

               {/* Tab Content */}
               {activeTab === 'vault' ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                     {mockEvidence
                        .filter((e) => e.docType === selectedRequest?.docType)
                        .map((doc) => (
                           <label
                              key={doc.id}
                              className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                           >
                              <input
                                 type="radio"
                                 name="doc"
                                 value={doc.id}
                                 checked={selectedDocId === doc.id}
                                 onChange={(e) => setSelectedDocId(e.target.value)}
                                 className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <div className="flex-1">
                                 <p className="font-medium text-slate-900 dark:text-slate-50">
                                    {doc.name}
                                 </p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">
                                    v{doc.versions.length} • {formatDate(doc.lastUpdated)}
                                 </p>
                              </div>
                           </label>
                        ))}
                  </div>
               ) : (
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                           Document Name
                        </label>
                        <input
                           type="text"
                           placeholder="Enter document name..."
                           className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                           Upload File
                        </label>
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer">
                           <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                              Click to upload
                           </p>
                        </div>
                     </div>
                  </div>
               )}

               {/* Actions */}
               <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button
                     variant="secondary"
                     onClick={() => {
                        setIsModalOpen(false);
                        setSelectedRequest(null);
                        setSelectedDocId('');
                        setActiveTab('vault');
                     }}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="primary"
                     disabled={!selectedDocId && activeTab === 'vault'}
                     onClick={handleSubmitFulfill}
                  >
                     Submit
                  </Button>
               </div>
            </div>
         </Modal>
      </div>
   );
}
