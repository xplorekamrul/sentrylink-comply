import { grantAccess } from '@/lib/access';
import type { Pack } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

// In-memory store (would be database in production)
let packs: Pack[] = [];
let packStatusSimulation: Map<string, NodeJS.Timeout> = new Map();

/**
 * GET /api/packs
 * Retrieve all packs
 */
export async function GET(request: NextRequest) {
   try {
      return NextResponse.json({
         success: true,
         data: packs,
         count: packs.length,
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to fetch packs' },
         { status: 500 }
      );
   }
}

/**
 * POST /api/packs
 * Create a new export pack
 * 
 * Body:
 * {
 *   name: string,
 *   evidenceIds: string[],
 *   buyerId?: string
 * }
 */
export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      const { name, evidenceIds, buyerId } = body;

      if (!name || !evidenceIds || evidenceIds.length === 0) {
         return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
         );
      }

      const newPack: Pack = {
         id: `pack-${Date.now()}`,
         name,
         evidenceIds,
         createdAt: new Date(),
         status: 'pending',
      };

      packs.push(newPack);

      // Simulate async job: pending → ready after 2 seconds
      const timeout = setTimeout(() => {
         const packIndex = packs.findIndex((p) => p.id === newPack.id);
         if (packIndex !== -1) {
            packs[packIndex].status = 'ready';
            packs[packIndex].downloadUrl = `/downloads/${newPack.id}.zip`;

            // Grant access to buyer if provided
            if (buyerId) {
               evidenceIds.forEach((evidenceId: string) => {
                  grantAccess(evidenceId, buyerId, 'pack');
               });
            }
         }
         packStatusSimulation.delete(newPack.id);
      }, 2000);

      packStatusSimulation.set(newPack.id, timeout);

      return NextResponse.json(
         {
            success: true,
            data: newPack,
            message: 'Pack created. Processing...',
         },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to create pack' },
         { status: 500 }
      );
   }
}
