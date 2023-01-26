import { BillingStatus, TierSubscripton } from "types.ts/billing";

export const localizedBillingStatuses: Record<BillingStatus, string> = {
  [BillingStatus.CREATED]: "Створено",
  [BillingStatus.DECLINED]: "Відмінено",
  [BillingStatus.PAID]: "Оплачено",
  [BillingStatus.PENDING]: "В обробці",
  [BillingStatus.REFUNDED]: "Повернено"
}

export const localizedTierSubscription: Record<TierSubscripton, string> = {
  [TierSubscripton.Month]: "Місяць",
  [TierSubscripton.Quarter]: "3 місяці",
  [TierSubscripton.Year]: 'Рік'
}