export interface Version {
   id: string;
   versionNumber: number;
   uploadedAt: Date;
   uploadedBy: string;
   notes: string;
   fileSize: number;
}

export interface Evidence {
   id: string;
   name: string;
   docType: 'Certificate' | 'License' | 'Audit' | 'Report' | 'Other';
   status: 'active' | 'expiring' | 'expired';
   expiryDate: Date;
   versions: Version[];
   owner: string;
   createdDate: Date;
   description: string;
   lastUpdated: Date;
}

export interface BuyerRequest {
   id: string;
   docType: 'Certificate' | 'License' | 'Audit' | 'Report' | 'Other';
   dueDate: Date;
   status: 'pending' | 'fulfilled' | 'overdue';
   buyerName: string;
   requestedAt: Date;
}

export interface Pack {
   id: string;
   name: string;
   evidenceIds: string[];
   createdAt: Date;
   status: 'draft' | 'pending' | 'ready' | 'downloaded';
   downloadUrl?: string;
}
