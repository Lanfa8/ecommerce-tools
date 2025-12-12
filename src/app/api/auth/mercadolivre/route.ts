import { MercadoLivreClient } from '@/clients/mercadolivre';
import { NextResponse } from 'next/server';

interface OAuthRequest {
    code: string;
    redirectUri: string;
}

export async function POST(request: Request) {
    const req = await request.json();
    const { code, redirectUri } = JSON.parse(req.body) as OAuthRequest;

    const authRes = await MercadoLivreClient.exchangeAuthCode(
        process.env.NEXT_PUBLIC_MERCADOLIVRE_CLIENT_ID!,
        process.env.MERCADOLIVRE_CLIENT_SECRET!,
        code as string,
        redirectUri as string
    );

    return NextResponse.json({
        accessToken: authRes.access_token,
        refreshToken: authRes.refresh_token
    });
}