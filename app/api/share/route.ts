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
 * POST /api/share
 * Create a shareable link for evidence
 * 
 * Body:
 * {
 *   evidenceIds: string[],
 *   expiryDays?: number (default: 7)
 * }
 */
export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      const { evidenceIds, expiryDays = 7 } = body;

      if (!evidenceIds || evidenceIds.length === 0) {
         return NextResponse.json(
            { success: false, error: 'Missing evidence IDs' },
            { status: 400 }
         );
      }

      // Generate unique token
      const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiryDays);

      const shareLink: ShareLink = {
         token,
         evidenceIds,
         expiresAt,
         createdAt: new Date(),
         accessCount: 0,
      };

      shareLinks.push(shareLink);

      return NextResponse.json(
         {
            success: true,
            data: {
               token,
               shareUrl: `/share/${token}`,
               expiresAt,
               expiryDays,
            },
            message: 'Share link created successfully',
         },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to create share link' },
         { status: 500 }
      );
   }
}
