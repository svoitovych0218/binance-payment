import { ISubscriptionRate, TierSubscripton } from "types.ts/billing";

export const subscriptionRates: Record<TierSubscripton, ISubscriptionRate> = {
  [TierSubscripton.Month]: {
    duration: '1 місяць',
    price: 900,
    isBestPrice: false
  },
  [TierSubscripton.Quarter]: {
    duration: '3 місяці',
    price: 810,
    isBestPrice: true
  },
  [TierSubscripton.Year]: {
    duration: '1 рік',
    price: 765,
    isBestPrice: false
  }
}