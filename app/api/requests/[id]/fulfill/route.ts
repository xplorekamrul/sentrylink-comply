import { grantAccess } from '@/lib/access';
import type { BuyerRequest } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

// In-memory store (would be database in production)
let requests: BuyerRequest[] = [];

/**
 * PUT /api/requests/:id/fulfill
 * Fulfill a buyer request with evidence
 * 
 * Body:
 * {
 *   evidenceId: string,
 *   buyerId: string,
 *   expiresAt?: Date
 * }
 */
export async function PUT(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   try {
      const { id } = await params;
      const body = await request.json();
      const { evidenceId, buyerId, expiresAt } = body;

      if (!evidenceId || !buyerId) {
         return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
         );
      }

      // Find and update request
      const requestIndex = requests.findIndex((r) => r.id === id);
      if (requestIndex === -1) {
         return NextResponse.json(
            { success: false, error: 'Request not found' },
            { status: 404 }
         );
      }

      // Grant access to buyer
      grantAccess(evidenceId, buyerId, 'fulfill', expiresAt ? new Date(expiresAt) : undefined);

      // Update request status
      requests[requestIndex].status = 'fulfilled';

      return NextResponse.json({
         success: true,
         data: requests[requestIndex],
         message: 'Request fulfilled successfully',
         accessGranted: {
            evidenceId,
            buyerId,
            accessType: 'fulfill',
            expiresAt: expiresAt || null,
         },
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to fulfill request' },
         { status: 500 }
      );
   }
}

/**
 * GET /api/requests/:id
 * Get request status
 */
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   try {
      const { id } = await params;
      const foundRequest = requests.find((r) => r.id === id);

      if (!foundRequest) {
         return NextResponse.json(
            { success: false, error: 'Request not found' },
            { status: 404 }
         );
      }

      return NextResponse.json({
         success: true,
         data: foundRequest,
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to fetch request' },
         { status: 500 }
      );
   }
}
