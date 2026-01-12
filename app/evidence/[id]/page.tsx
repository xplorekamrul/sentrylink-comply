'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusChip } from '@/components/ui/StatusChip';
import { mockEvidence } from '@/lib/mockData';
import type { Evidence, Version } from '@/lib/types';
import { formatDate, formatFileSize, formatRelativeTime } from '@/lib/utils';
import { ArrowLeft, Plus, Upload } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EvidenceDetail() {
   const params = useParams();
   const router = useRouter();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [notes, setNotes] = useState('');
   const [versions, setVersions] = useState<Version[]>([]);

   const evidence = mockEvidence.find((e) => e.id === params.id) as Evidence | undefined;

   if (!evidence) {
      return (
         <div className="p-8 max-w-7xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 p-8 text-center">
               <p className="text-slate-500 dark:text-slate-400">Document not found</p>
               <Button
                  variant="primary"
                  onClick={() => router.push('/')}
                  className="mt-4 "
               >
                  Back to Vault
               </Button>
            </div>
         </div>
      );
   }

   const handleUploadVersion = async () => {
      if (!notes.trim()) return;

      setIsLoading(true);
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newVersion: Version = {
         id: `v${evidence.id}-${evidence.versions.length + 1}`,
         versionNumber: evidence.versions.length + 1,
         uploadedAt: new Date(),
         uploadedBy: 'Current User',
         notes,
         fileSize: Math.floor(Math.random() * 5000) + 1000,
      };

      setVersions([...evidence.versions, newVersion]);
      setNotes('');
      setIsLoading(false);
      setIsModalOpen(false);
   };

   const displayVersions = versions.length > 0 ? versions : evidence.versions;

   return (
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
         {/* Header */}
         <div className="mb-8">
            <button
               onClick={() => router.push('/')}
               className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-4 transition-colors"
            >
               <ArrowLeft className="w-4 h-4" />
               Back to Vault
            </button>
            <h1 className=" text-center lg:text-left text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
               {evidence.name}
            </h1>
            <p className="text-center lg:text-left text-slate-600 dark:text-slate-400">
               {evidence.description}
            </p>
         </div>

         {/* Two Column Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Metadata Card */}
            <div className="lg:col-span-1">
               <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 p-6 space-y-6">
                  <div>
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-2">
                        Status
                     </p>
                     <StatusChip status={evidence.status} />
                  </div>

                  <div>
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-2">
                        Document Type
                     </p>
                     <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {evidence.docType}
                     </p>
                  </div>

                  <div>
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-2">
                        Owner
                     </p>
                     <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {evidence.owner}
                     </p>
                  </div>

                  <div>
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-2">
                        Created
                     </p>
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        {formatDate(evidence.createdDate)}
                     </p>
                  </div>

                  <div>
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-2">
                        Expiry Date
                     </p>
                     <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                        {formatDate(evidence.expiryDate)}
                     </p>
                  </div>

                  <div>
                     <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-2">
                        Last Updated
                     </p>
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        {formatRelativeTime(evidence.lastUpdated)}
                     </p>
                  </div>
               </div>
            </div>

            {/* Versions Section */}
            <div className="lg:col-span-2">
               <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 p-6">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                        Versions ({displayVersions.length})
                     </h2>
                     <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2"
                     >
                        <Plus className="w-4 h-4" />
                        Upload New
                     </Button>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                     {displayVersions.map((version, idx) => (
                        <div
                           key={version.id}
                           className="flex gap-4 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:pb-0"
                        >
                           {/* Timeline Dot */}
                           <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5" />
                              {idx < displayVersions.length - 1 && (
                                 <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-700 mt-2" />
                              )}
                           </div>

                           {/* Version Info */}
                           <div className="flex-1 pt-0.5">
                              <div className="flex items-center justify-between mb-1">
                                 <p className="font-semibold text-slate-900 dark:text-slate-50">
                                    v{version.versionNumber}
                                 </p>
                                 <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {formatFileSize(version.fileSize)}
                                 </span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                 {version.notes}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                 <span>By {version.uploadedBy}</span>
                                 <span>{formatRelativeTime(version.uploadedAt)}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Upload Modal */}
         <Modal
            isOpen={isModalOpen}
            onClose={() => {
               setIsModalOpen(false);
               setNotes('');
            }}
            title="Upload New Version"
            size="md"
         >
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                     Notes <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     placeholder="Describe the changes in this version..."
                     className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none h-24"
                  />
               </div>

               <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                     Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                     PDF, DOC, DOCX up to 10MB
                  </p>
               </div>

               <div className="flex gap-3 justify-end pt-4">
                  <Button
                     variant="secondary"
                     onClick={() => {
                        setIsModalOpen(false);
                        setNotes('');
                     }}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="primary"
                     isLoading={isLoading}
                     disabled={!notes.trim()}
                     onClick={handleUploadVersion}
                  >
                     Upload Version
                  </Button>
               </div>
            </div>
         </Modal>
      </div>
   );
}
