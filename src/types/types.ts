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
  [binId: number]: {
    cutIds: number[];
    remainingSpace: number;
  };
}

const binResult = {
  1: {
    cutIds: [1, 5, 7, 9],
    remainingspace: 8,
  },

  2: {
    Cutids: [2, 3, 4, 6, 8],
    Remainingspace: 2,
  },
};

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
