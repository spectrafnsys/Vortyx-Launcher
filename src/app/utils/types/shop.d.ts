export type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: {
    featured?: string;
    icon: string;
  };
  rarity: {
    value: string;
    displayValue: string;
  };
};
