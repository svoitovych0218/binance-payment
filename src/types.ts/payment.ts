
export interface IPayment {
  _id: string;
  SK: string;
  createdByUserName: string;
  createdAt: string;
  status: PaymentStatus;
  amountUAH: number;
  amount: number;
  currency: string;
  binanceResponse: any;
  receipNumber: string;
  paidAt?: string;
  cancelledBy?: string;
  refundedBy?: string;
  description: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum TransactionHistoryFiltersActionTypes {
  SET_FROM_DATE,
  SET_TO_DATE,
  SET_PAID_ONLY,
  SET_CURSOR,
  SET_SEARCH
}

export type TransactionHistoryFiltersAction =
  { type: TransactionHistoryFiltersActionTypes.SET_FROM_DATE, payload: { from: IFiltersState['from'] } }
  | { type: TransactionHistoryFiltersActionTypes.SET_TO_DATE, payload: { to: IFiltersState['to'] } }
  | { type: TransactionHistoryFiltersActionTypes.SET_PAID_ONLY, payload: { paidOnly: IFiltersState['paidOnly'] } }
  | { type: TransactionHistoryFiltersActionTypes.SET_CURSOR, payload: IFiltersState['cursor'] }
  | { type: TransactionHistoryFiltersActionTypes.SET_SEARCH, payload: IFiltersState['search'] }

export interface ILastEvaluatedKey {
  SK: string
  _id: string
}

export interface IFiltersState {
  from: string,
  to: string,
  paidOnly: boolean,
  limit: number,
  cursor?: ILastEvaluatedKey
  search: string
}
