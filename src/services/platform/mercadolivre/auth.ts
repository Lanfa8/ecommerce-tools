import { MercadoLivreClient } from '@/clients/mercadolivre';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const KEYS = {
  ACCESS_TOKEN: 'mercadolivre:main:access_token',
  REFRESH_TOKEN: 'mercadolivre:main:refresh_token',
};

export async function getValidToken() {
  const cachedAccessToken = await redis.get<string>(KEYS.ACCESS_TOKEN);

  if (cachedAccessToken) {
    return cachedAccessToken;
  }

  return await refreshCredentials();
}

async function refreshCredentials() {
  // 2. Tenta recuperar o refresh token do Redis. 
  // Se não tiver (primeira vez rodando), pega da variável de ambiente.
  let currentRefreshToken = await redis.get<string>(KEYS.REFRESH_TOKEN);
  
  if (!currentRefreshToken) {
    console.log("Refresh token não encontrado no Redis, usando o INITIAL_REFRESH_TOKEN");
    currentRefreshToken = process.env.INITIAL_REFRESH_TOKEN || '';
  }

  if (!currentRefreshToken) {
    throw new Error("CRÍTICO: Nenhum refresh token disponível. Autenticação manual necessária.");
  }

  try {
    const data = await MercadoLivreClient.refreshAccessToken(
        process.env.NEXT_PUBLIC_MERCADOLIVRE_CLIENT_ID!, 
        process.env.MERCADOLIVRE_CLIENT_SECRET!, 
        currentRefreshToken,
    );

    const ttl = data.expires_in ? (data.expires_in - 60) : 3600; 
    await redis.set(KEYS.ACCESS_TOKEN, data.access_token, { ex: ttl });

    if (data.refresh_token) {
        await redis.set(KEYS.REFRESH_TOKEN, data.refresh_token);
    } else {
        await redis.set(KEYS.REFRESH_TOKEN, currentRefreshToken);
    }

    return data.access_token;

  } catch (error) {
    console.error("Falha ao renovar token:", error);
    throw error;
  }
}