import { format } from 'date-fns';

export const getFormattedDateInLocalTimeZone = (
  date: string | Date,
  formatType: string = 'dd/MM/yyyy HH:mm:ss'
) => {
  return format(new Date(date), formatType)
}