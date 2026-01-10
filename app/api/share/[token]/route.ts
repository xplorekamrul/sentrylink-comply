import { mockEvidence } from '@/lib/mockData';
import { NextRequest, NextResponse } from 'next/server';

interface ShareLink {
   token: string;
   evidenceIds: string[];
   expiresAt: Date;
   createdAt: Date;
   revokedAt?: Date;
   accessCount: number;
}

// In-memory store (would be database in production)
let shareLinks: ShareLink[] = [];

/**
 * GET /api/share/:token
 * Access shared evidence via token
 * Returns limited supplier profile info
 */
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ token: string }> }
) {
   try {
      const { token } = await params;
      const shareLink = shareLinks.find((link) => link.token === token);

      if (!shareLink) {
         return NextResponse.json(
            { success: false, error: 'Invalid or expired share link' },
            { status: 404 }
         );
      }

      // Check if link is revoked
      if (shareLink.revokedAt) {
         return NextResponse.json(
            { success: false, error: 'Share link has been revoked' },
            { status: 403 }
         );
      }

      // Check if link is expired
      if (new Date() > shareLink.expiresAt) {
         return NextResponse.json(
            { success: false, error: 'Share link has expired' },
            { status: 403 }
         );
      }

      // Get shared evidence (limited info)
      const sharedEvidence = mockEvidence
         .filter((e) => shareLink.evidenceIds.includes(e.id))
         .map((e) => ({
            id: e.id,
            name: e.name,
            docType: e.docType,
            status: e.status,
            expiryDate: e.expiryDate,
            owner: e.owner,
            lastUpdated: e.lastUpdated,
            versionCount: e.versions.length,
            // Don't include full version history in shared view
         }));

      // Increment access count
      shareLink.accessCount++;

      // Log access (would be audit log in production)
      const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
      console.log(`[AUDIT] Share link accessed: ${token} from ${clientIp}`);

      return NextResponse.json({
         success: true,
         data: {
            evidence: sharedEvidence,
            accessCount: shareLink.accessCount,
            expiresAt: shareLink.expiresAt,
            createdAt: shareLink.createdAt,
         },
         message: 'Shared evidence retrieved successfully',
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to retrieve shared evidence' },
         { status: 500 }
      );
   }
}

/**
 * DELETE /api/share/:token
 * Revoke a share link
 */
export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ token: string }> }
) {
   try {
      const { token } = await params;
      const shareLink = shareLinks.find((link) => link.token === token);

      if (!shareLink) {
         return NextResponse.json(
            { success: false, error: 'Share link not found' },
            { status: 404 }
         );
      }

      shareLink.revokedAt = new Date();

      return NextResponse.json({
         success: true,
         message: 'Share link revoked successfully',
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to revoke share link' },
         { status: 500 }
      );
   }
}
