export interface ShopParams {
  id: string;
  name: string;
}
export interface CategoryParams {
  id: string;
  name: string;
}

export interface ProductParams {
  id: string;
  name: string;
  category: string; 
  shop: string;
  isBought?: boolean;}