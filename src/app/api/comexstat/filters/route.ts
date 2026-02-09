import { Agent } from 'https';
import { NextResponse } from 'next/server';

const COMEXSTAT_FILTERS_URL = 'https://api-comexstat.mdic.gov.br/general/filters';

export async function GET() {
    try {
        const response = await fetch(COMEXSTAT_FILTERS_URL, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('COMEXSTAT Filters API error:', errorText);
            return NextResponse.json(
                { error: 'Falha ao obter filtros', details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching COMEXSTAT filters:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar requisição' },
            { status: 500 }
        );
    }
}
