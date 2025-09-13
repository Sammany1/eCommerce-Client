export interface Merchant {
    id: number;
    name: string;
    adminId: number;
}

export const DEFAULT_MERCHANT: Merchant = {
  id: 0,
  name: "placeholder",
  adminId: 0
};