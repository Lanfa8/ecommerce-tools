import type { MercadoLivreClient } from '../index';

export class ItemsResource {
  constructor(private client: MercadoLivreClient) {}

  /**
   * Get an item by ID
   * @param itemId The item ID (e.g., MLB12345678)
   */
  public async get(itemId: string) {
    return this.client.get(`/items/${itemId}`);
  }

  /**
   * Create a new item
   * @param itemData The item data
   */
  public async create(itemData: any) {
    return this.client.post('/items', itemData);
  }

  /**
   * Update an item
   * @param itemId The item ID
   * @param itemData The data to update
   */
  public async update(itemId: string, itemData: any) {
    return this.client.put(`/items/${itemId}`, itemData);
  }
}
