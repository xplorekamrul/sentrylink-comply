import React from 'react';

interface StatusChipProps {
  status: 'active' | 'expiring' | 'expired' | 'pending' | 'fulfilled' | 'overdue';
  label?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, label }) => {
  const statusConfig = {
    active: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-400',
      label: 'Active',
    },
    expiring: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-400',
      label: 'Expiring Soon',
    },
    expired: {
      bg: 'bg-rose-100 dark:bg-rose-900/30',
      text: 'text-rose-700 dark:text-rose-400',
      label: 'Expired',
    },
    pending: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      label: 'Pending',
    },
    fulfilled: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-400',
      label: 'Fulfilled',
    },
    overdue: {
      bg: 'bg-rose-100 dark:bg-rose-900/30',
      text: 'text-rose-700 dark:text-rose-400',
      label: 'Overdue',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`badge ${config.bg} ${config.text} font-semibold tracking-tight`}
    >
      {label || config.label}
    </span>
  );
};
