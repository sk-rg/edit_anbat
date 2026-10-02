/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Client service for souvenir shop orders (/api/souvenir-orders).
 */

import { CartItem, Language, SouvenirOrder, SouvenirOrderStatus } from '../types';

export interface PlaceSouvenirOrderInput {
  cart: CartItem[];
  fulfillment: 'pickup' | 'shipping';
  shipping?: { name: string; phone: string; city: string; address: string };
  language: Language;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Server responded with ${response.status}`);
  }
  return data as T;
}

export async function placeSouvenirOrder(input: PlaceSouvenirOrderInput): Promise<SouvenirOrder> {
  const response = await fetch('/api/souvenir-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: input.cart.map(item => ({ productId: item.product.id, quantity: item.quantity })),
      fulfillment: input.fulfillment,
      shipping: input.shipping,
      language: input.language
    })
  });
  return parseResponse<SouvenirOrder>(response);
}

export async function fetchAllSouvenirOrders(adminKey: string): Promise<SouvenirOrder[]> {
  const response = await fetch('/api/souvenir-orders', { headers: { 'x-admin-key': adminKey } });
  return parseResponse<SouvenirOrder[]>(response);
}

export async function updateSouvenirOrderStatus(
  orderId: string,
  status: SouvenirOrderStatus,
  adminKey: string
): Promise<SouvenirOrder> {
  const response = await fetch(`/api/souvenir-orders/${encodeURIComponent(orderId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify({ status })
  });
  return parseResponse<SouvenirOrder>(response);
}
