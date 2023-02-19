import { format } from 'date-fns';

export const getFormattedDateInLocalTimeZone = (
  date: string | Date,
  formatType: string = 'dd/MM/yyyy HH:mm:ss'
) => {
  return format(new Date(date), formatType)
}

export const getDateWithOffset = (offsetInDays: number) => {
  return new Date(new Date().setDate(new Date().getDate() + offsetInDays));
}

export const getDateDifferenceInDay = (a: Date, b: Date) => {
  return Math.floor((+a - +b) / 1000 / 60 / 60 / 24)
}