
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
  receipNumber?: string;
  paidAt?: string;
  cancelledBy?: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum TransactionHistoryFiltersActionTypes {
  SET_FROM_DATE,
  SET_TO_DATE,
  SET_PAID_ONLY,
  SET_CURSOR
}

export type TransactionHistoryFiltersAction =
  { type: TransactionHistoryFiltersActionTypes.SET_FROM_DATE, payload: { from: IFiltersState['from'] } }
  | { type: TransactionHistoryFiltersActionTypes.SET_TO_DATE, payload: { to: IFiltersState['to'] } }
  | { type: TransactionHistoryFiltersActionTypes.SET_PAID_ONLY, payload: { paidOnly: IFiltersState['paidOnly'] } }
  | { type: TransactionHistoryFiltersActionTypes.SET_CURSOR, payload: IFiltersState['cursor'] }

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
}
