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