import { Version } from './types';

/**
 * Access control system for evidence and versions
 * Implements selective disclosure: buyers only see evidence explicitly shared
 */

interface AccessRecord {
   evidenceId: string;
   buyerId: string;
   accessType: 'fulfill' | 'pack';
   grantedAt: Date;
   expiresAt?: Date;
}

// In-memory access log (would be database in production)
const accessLog: AccessRecord[] = [];

/**
 * Grant access to evidence for a buyer
 * Called when evidence is shared via fulfill or pack
 */
export function grantAccess(
   evidenceId: string,
   buyerId: string,
   accessType: 'fulfill' | 'pack',
   expiresAt?: Date
): void {
   accessLog.push({
      evidenceId,
      buyerId,
      accessType,
      grantedAt: new Date(),
      expiresAt,
   });
}

/**
 * Check if a buyer can access specific evidence
 */
export function canAccessEvidence(
   buyerId: string,
   evidenceId: string
): boolean {
   const now = new Date();
   return accessLog.some(
      (record) =>
         record.buyerId === buyerId &&
         record.evidenceId === evidenceId &&
         (!record.expiresAt || record.expiresAt > now)
   );
}

/**
 * Get all evidence accessible to a buyer
 */
export function getAccessibleEvidenceIds(buyerId: string): Set<string> {
   const now = new Date();
   const accessible = new Set<string>();

   accessLog.forEach((record) => {
      if (
         record.buyerId === buyerId &&
         (!record.expiresAt || record.expiresAt > now)
      ) {
         accessible.add(record.evidenceId);
      }
   });

   return accessible;
}

/**
 * Filter versions based on access
 * Only return versions that were explicitly shared
 */
export function filterAccessibleVersions(
   versions: Version[],
   buyerId: string,
   evidenceId: string
): Version[] {
   // If buyer has access to evidence, they can see all versions
   if (canAccessEvidence(buyerId, evidenceId)) {
      return versions;
   }
   // No access = no versions
   return [];
}

/**
 * Get access history for audit purposes
 */
export function getAccessHistory(evidenceId: string): AccessRecord[] {
   return accessLog.filter((record) => record.evidenceId === evidenceId);
}

/**
 * Revoke access to evidence
 */
export function revokeAccess(
   evidenceId: string,
   buyerId: string
): void {
   const index = accessLog.findIndex(
      (record) =>
         record.evidenceId === evidenceId && record.buyerId === buyerId
   );
   if (index > -1) {
      accessLog.splice(index, 1);
   }
}

/**
 * Check if evidence is shared with any buyer
 */
export function isEvidenceShared(evidenceId: string): boolean {
   return accessLog.some((record) => record.evidenceId === evidenceId);
}

/**
 * Get all buyers with access to evidence
 */
export function getBuyersWithAccess(evidenceId: string): string[] {
   const now = new Date();
   const buyers = new Set<string>();

   accessLog.forEach((record) => {
      if (
         record.evidenceId === evidenceId &&
         (!record.expiresAt || record.expiresAt > now)
      ) {
         buyers.add(record.buyerId);
      }
   });

   return Array.from(buyers);
}
