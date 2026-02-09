import { ComexstatRequest } from '@/app/comexstat/types';
import { Agent } from 'https';
import { NextRequest, NextResponse } from 'next/server';

const COMEXSTAT_API_URL = 'https://api-comexstat.mdic.gov.br/general';

export async function POST(req: NextRequest) {
    try {
        const body: ComexstatRequest = await req.json();


        console.log('Received COMEXSTAT request:', body);
        const response = await fetch(COMEXSTAT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('COMEXSTAT API error:', errorText);
            return NextResponse.json(
                { error: 'Falha ao consultar API COMEXSTAT', details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching COMEXSTAT data:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar requisição' },
            { status: 500 }
        );
    }
}
