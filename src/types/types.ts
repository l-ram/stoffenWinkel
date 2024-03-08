export interface CheckoutData {
  total: number;
  paymentType: string;
  user: string;
}

export interface CutInput {
  id: number;
  length: number;
  count: number;
}

export interface UserCuts {
  id: number;
  length: number;
  count: number;
}

export interface Bin {
  id: number;
  remainingSpace: number;
}

export interface PackingResult {
  bins: number[];
  binsUsed: number;
}

export interface BinResult {
  [binId: string]: {
    cutIds: number[];
    remainingSpace: number;
  };
}

export interface SelectedProduct {
  [material: string]: {
    title: string;
    subtitle: string;
    price: number;
    info: string;
    size: string;
    weight: string;
    images: string[];
  }[];
}
