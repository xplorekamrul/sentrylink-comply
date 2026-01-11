'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusChip } from '@/components/ui/StatusChip';
import { Table } from '@/components/ui/Table';
import { mockEvidence } from '@/lib/mockData';
import type { Evidence } from '@/lib/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function EvidenceVaultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL State
  const search = searchParams.get('search') || '';
  const docType = searchParams.get('docType') || '';
  const status = searchParams.get('status') || '';

  // Filter evidence based on URL params
  const filteredEvidence = evidence.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesDocType = !docType || item.docType === docType;
    const matchesStatus = !status || item.status === status;
    return matchesSearch && matchesDocType && matchesStatus;
  });

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleSelectRow = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(filteredEvidence.map((e) => e.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Document Name',
      render: (value: string) => <span className="font-semibold text-slate-900 dark:text-slate-50">{value}</span>,
    },
    {
      key: 'docType',
      label: 'Type',
      render: (value: string) => <span className="text-slate-500 dark:text-slate-400">{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => <StatusChip status={value as any} />,
    },
    {
      key: 'expiryDate',
      label: 'Expiry',
      render: (value: Date) => formatDate(value),
    },
    {
      key: 'versions',
      label: 'Versions',
      render: (_: any, row: Evidence) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {row.versions.length}
        </span>
      ),
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      render: (value: Date) => formatRelativeTime(value),
    },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
          Evidence Vault
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage and organize your compliance documents
        </p>
      </div>

      {/* Floating Counter */}
      {selectedRows.size > 0 && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 px-6 py-3 shadow-3d">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
              {selectedRows.size} selected
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add to Pack
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 p-6 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => updateUrlParams('search', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
          <select
            value={docType}
            onChange={(e) => updateUrlParams('docType', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Types</option>
            <option value="Certificate">Certificate</option>
            <option value="License">License</option>
            <option value="Audit">Audit</option>
            <option value="Report">Report</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={status}
            onChange={(e) => updateUrlParams('status', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
          <Button
            variant="secondary"
            onClick={() => {
              router.push('/');
              setSelectedRows(new Set());
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredEvidence}
        selectable
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onRowClick={(row) => router.push(`/evidence/${row.id}`)}
        emptyMessage="No documents found matching your filters"
        rowKey="id"
      />

      {/* Add to Pack Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add to Pack"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {selectedRows.size} document(s) selected
          </p>
          <input
            type="text"
            placeholder="Pack name..."
            className="input-field"
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedRows(new Set());
              }}
            >
              Create Pack
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function EvidenceVault() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <EvidenceVaultContent />
    </Suspense>
  );
}
