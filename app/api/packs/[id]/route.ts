import type { Pack } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

// In-memory store (would be database in production)
let packs: Pack[] = [];

/**
 * GET /api/packs/:id
 * Get pack status and download URL
 */
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   try {
      const { id } = await params;
      const pack = packs.find((p) => p.id === id);

      if (!pack) {
         return NextResponse.json(
            { success: false, error: 'Pack not found' },
            { status: 404 }
         );
      }

      return NextResponse.json({
         success: true,
         data: pack,
         ready: pack.status === 'ready',
         downloadUrl: pack.downloadUrl || null,
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to fetch pack' },
         { status: 500 }
      );
   }
}

/**
 * DELETE /api/packs/:id
 * Delete a pack
 */
export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   try {
      const { id } = await params;
      const packIndex = packs.findIndex((p) => p.id === id);

      if (packIndex === -1) {
         return NextResponse.json(
            { success: false, error: 'Pack not found' },
            { status: 404 }
         );
      }

      packs.splice(packIndex, 1);

      return NextResponse.json({
         success: true,
         message: 'Pack deleted successfully',
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to delete pack' },
         { status: 500 }
      );
   }
}
