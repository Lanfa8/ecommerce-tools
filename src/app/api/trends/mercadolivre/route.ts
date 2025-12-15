import { createMercadoLivreClient } from '@/clients/mercadolivre';
import { getValidToken } from '@/services/platform/mercadolivre/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const meliToken = await getValidToken();
    const mercadolivreClient = createMercadoLivreClient(meliToken);

    const response = await mercadolivreClient.trends.get();
    console.log('Got MercadoLivre trends response:', response);

    return NextResponse.json({
        result: response
    });
}