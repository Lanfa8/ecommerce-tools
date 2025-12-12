import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ItemsResource } from './resources/items';
import { TrendsResource } from './resources/trends';

const handleAxiosError = (error: any) => {
  console.error('MercadoLivre API Error:', error.response?.data || error.message);
  return Promise.reject(error);
};

export interface MLTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
}

export class MercadoLivreClient {
  private client: AxiosInstance;
  public items: ItemsResource;
  public trends: TrendsResource;

  constructor(accessToken?: string) {
    const config: AxiosRequestConfig = {
      baseURL: 'https://api.mercadolibre.com',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    this.client = axios.create(config);

    this.items = new ItemsResource(this);
    this.trends = new TrendsResource(this);

    this.client.interceptors.response.use(
      (response) => response,
      handleAxiosError
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  /**
   * Exchanges the OAuth code for an access token.
   */
  public static async exchangeAuthCode(
    clientId: string,
    clientSecret: string,
    code: string,
    redirectUri: string
  ): Promise<MLTokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code', code);
    params.append('redirect_uri', redirectUri);

    const client = axios.create();
    client.interceptors.response.use((response) => response, handleAxiosError);

    const response = await client.post<MLTokenResponse>(
      'https://api.mercadolibre.com/oauth/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  }

  /**
   * Refreshes the access token using the refresh token.
   */
  public static async refreshAccessToken(
    clientId: string,
    clientSecret: string,
    refreshToken: string
  ): Promise<MLTokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('refresh_token', refreshToken);

    const client = axios.create();
    client.interceptors.response.use((response) => response, handleAxiosError);

    const response = await client.post<MLTokenResponse>(
      'https://api.mercadolibre.com/oauth/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  }
}

export const createMercadoLivreClient = (accessToken?: string) => new MercadoLivreClient(accessToken);
