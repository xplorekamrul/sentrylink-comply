export function formatDate(date: Date): string {
   return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });
}

export function formatRelativeTime(date: Date): string {
   const now = new Date();
   const diffMs = now.getTime() - new Date(date).getTime();
   const diffMins = Math.floor(diffMs / 60000);
   const diffHours = Math.floor(diffMs / 3600000);
   const diffDays = Math.floor(diffMs / 86400000);

   if (diffMins < 1) return 'just now';
   if (diffMins < 60) return `${diffMins}m ago`;
   if (diffHours < 24) return `${diffHours}h ago`;
   if (diffDays < 7) return `${diffDays}d ago`;
   if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
   if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
   return `${Math.floor(diffDays / 365)}y ago`;
}

export function getStatusFromExpiry(expiryDate: Date): 'active' | 'expiring' | 'expired' {
   const now = new Date();
   const diffMs = new Date(expiryDate).getTime() - now.getTime();
   const diffDays = Math.floor(diffMs / 86400000);

   if (diffDays < 0) return 'expired';
   if (diffDays <= 90) return 'expiring';
   return 'active';
}

export function formatFileSize(bytes: number): string {
   if (bytes === 0) return '0 B';
   const k = 1024;
   const sizes = ['B', 'KB', 'MB', 'GB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function cn(...classes: (string | undefined | null | false)[]): string {
   return classes.filter(Boolean).join(' ');
}
