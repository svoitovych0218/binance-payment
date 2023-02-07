import { 
  IFiltersState,
  TransactionHistoryFiltersAction,
  TransactionHistoryFiltersActionTypes
} from "types.ts/payment"
import { Reducer } from "react"
import { endOfDay, startOfDay } from "date-fns"

export const reducer: Reducer<IFiltersState, TransactionHistoryFiltersAction> = (state, action) => {
  switch (action.type) {
    case TransactionHistoryFiltersActionTypes.SET_FROM_DATE: {
      return {
        ...state,
        from: startOfDay(new Date(action.payload.from)).toISOString()
      }
    }
    case TransactionHistoryFiltersActionTypes.SET_TO_DATE: {
      return {
        ...state,
        to: endOfDay(new Date(action.payload.to)).toISOString()
      }
    }
    case TransactionHistoryFiltersActionTypes.SET_PAID_ONLY: {
      return {
        ...state,
        paidOnly: action.payload.paidOnly
      }
    }
    case TransactionHistoryFiltersActionTypes.SET_CURSOR: {
      return {
        ...state,
        cursor: action.payload
      }
    }
    default: {
      return state;
    }
  }
}