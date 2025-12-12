import type { MercadoLivreClient } from '../index';

type TrendsResponse = Array<{
    keyword: string;
    url: string;
}>;

export class TrendsResource {
    constructor(private client: MercadoLivreClient) { }

    private DEFAULT_SITE_ID = 'MLB';

    public async get() {
        return this.client.get<TrendsResponse>(`/trends/${this.DEFAULT_SITE_ID}`);
    }
}

