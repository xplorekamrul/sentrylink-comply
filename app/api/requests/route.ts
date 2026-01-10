import { mockBuyerRequests } from '@/lib/mockData';
import type { BuyerRequest } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

// In-memory store (would be database in production)
let requests: BuyerRequest[] = [...mockBuyerRequests];

/**
 * GET /api/requests
 * Retrieve all buyer requests
 */
export async function GET(request: NextRequest) {
   try {
      return NextResponse.json({
         success: true,
         data: requests,
         count: requests.length,
      });
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to fetch requests' },
         { status: 500 }
      );
   }
}

/**
 * POST /api/requests
 * Create a new buyer request
 */
export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      const { docType, dueDate, buyerName } = body;

      if (!docType || !dueDate || !buyerName) {
         return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
         );
      }

      const newRequest: BuyerRequest = {
         id: `req-${Date.now()}`,
         docType,
         dueDate: new Date(dueDate),
         status: 'pending',
         buyerName,
         requestedAt: new Date(),
      };

      requests.push(newRequest);

      return NextResponse.json(
         {
            success: true,
            data: newRequest,
            message: 'Request created successfully',
         },
         { status: 201 }
      );
   } catch (error) {
      return NextResponse.json(
         { success: false, error: 'Failed to create request' },
         { status: 500 }
      );
   }
}
