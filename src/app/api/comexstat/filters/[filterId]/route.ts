import { NextRequest, NextResponse } from 'next/server';

const COMEXSTAT_FILTER_VALUES_URL = 'https://api-comexstat.mdic.gov.br/general/filters';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ filterId: string }> }
) {
    try {
        const { filterId } = await params;

        const response = await fetch(`${COMEXSTAT_FILTER_VALUES_URL}/${filterId}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`COMEXSTAT Filter Values API error for ${filterId}:`, errorText);
            return NextResponse.json(
                { error: `Falha ao obter valores do filtro ${filterId}`, details: errorText },
                { status: response.status }
            );
        }
        
        const data = await response.json();
        console.log(data)
        return NextResponse.json({
            data: data.data[0] ?? [],
        });
    } catch (error) {
        console.error('Error fetching COMEXSTAT filter values:', error);
        return NextResponse.json(
            { error: 'Erro interno ao processar requisição' },
            { status: 500 }
        );
    }
}
