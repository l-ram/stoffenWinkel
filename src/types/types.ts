export interface CheckoutData {
  total: number;
  paymentType: string;
  user: string;
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
