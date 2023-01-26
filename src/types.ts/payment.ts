
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
  