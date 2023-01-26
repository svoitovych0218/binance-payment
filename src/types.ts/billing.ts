export enum TierSubscripton {
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Year = 'YEAR',
}

export interface ISubscriptionRate {
  price: number
  duration: string
  isBestPrice: boolean
}

export enum BillingStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  PAID = "PAID",
  DECLINED = "DECLINED",
  REFUNDED = "REFUNDED"
}