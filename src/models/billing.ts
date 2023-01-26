import { TierSubscripton } from "types.ts/billing";

export interface IBillingHistoryItem {
  currency: string,
  at: string,
  status: string,
  _id: string,
  amount: number,
  SK: string,
  type: TierSubscripton
  paymentUrl: string
}