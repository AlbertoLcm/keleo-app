export interface PaymentSummary {
  cash: number;
  credit_card: number;
  debit_card: number;
  bank_transfer: number;
  complimentary: number;
  other: number;
  total: number;
}

export interface DailySummary {
  sessionStart: string;
  sessionEnd: string;
  systemTotals: PaymentSummary;
  totalAccounts: number;
  totalCancelled: number;
  restaurantName: string;
  restaurantLogo: string | null;
}

export interface BlindCount {
  cash: number;
  credit_card: number;
  debit_card: number;
  bank_transfer: number;
  other: number;
}

export interface CashRegisterDifferences {
  cash: number;
  credit_card: number;
  debit_card: number;
  bank_transfer: number;
  other: number;
  total: number;
}

export interface CashRegisterSession {
  id: string;
  restaurant_id: string;
  opened_by: string;
  session_start: string;
  session_end: string | null;
  system_total: string;
  counted_total: string;
  difference_total: string;
  notes: string | null;
  status: 'open' | 'closed';
  created_at: string;
  users_opened: { name: string };
  users_closed: { name: string } | null;
}

/** Threshold (MXN) above which a justification comment is required */
export const DIFFERENCE_THRESHOLD = 50;
