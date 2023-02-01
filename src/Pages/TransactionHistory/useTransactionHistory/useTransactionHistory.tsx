import { Dispatch, useReducer, useState, useEffect, useCallback } from "react";
import {
  TransactionHistoryFiltersAction,
  IPayment,
  IFiltersState,
  TransactionHistoryFiltersActionTypes
} from "types.ts/payment";
import { getPayments } from "api/getPayments";
import { getExcelReport } from "api/getExcelReport";
import { reducer } from "./reducer";
import { subMonths, endOfDay, startOfDay } from "date-fns";
import { toast } from "react-toastify";

interface IReturnValue {
  dispatch: Dispatch<TransactionHistoryFiltersAction>
  payments: IPayment[]
  completedTotal: number | undefined
  getExcellReportCallback: () => void
  filters: IFiltersState
  isLoadingPayments: boolean
  fetchMorePayments: () => void
}

export const useTransactionHistory = (): IReturnValue => {
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const date = new Date();
  const prevMonth = startOfDay(subMonths(date, 1)).toISOString();
  const now = endOfDay(date).toISOString();
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [completedTotal, setCompletedTotal] = useState<number | undefined>();
  const [filters, dispatch] = useReducer(reducer, {
    from: prevMonth,
    to: now,
    paidOnly: false,
    limit: 10,
    cursor: undefined
  });

  useEffect(() => {
    setIsLoadingPayments(true);
    setPayments([]);
    (async () => {
      const res = await getPayments(filters.from, filters.to, filters.paidOnly, filters.limit);
      setPayments(res.payments);
      setCompletedTotal(res.completedPaymentsSum);
      dispatch({
        type: TransactionHistoryFiltersActionTypes.SET_CURSOR,
        payload: res.LastEvaluatedKey
      });
      setIsLoadingPayments(false);
    })()
  }, [filters.from, filters.to, filters.paidOnly, filters.limit]);

  const fetchMorePayments = useCallback(async () => {
    console.log('fetch More payments');
    if (filters.cursor
      && !isLoadingPayments) {
      setIsLoadingPayments(true);
      const res = await getPayments(filters.from, filters.to, filters.paidOnly, filters.limit, filters.cursor);
      setPayments(prevPayments => [...prevPayments, ...res.payments]);
      setCompletedTotal(res.completedPaymentsSum);
      dispatch({
        type: TransactionHistoryFiltersActionTypes.SET_CURSOR,
        payload: res.LastEvaluatedKey
      });
      setIsLoadingPayments(false);
    }
  }, [filters, isLoadingPayments]);

  const getExcellReportCallback = useCallback(async () => {
    try {
      const url = await getExcelReport(new Date(filters.from).toISOString(), new Date(filters.to).toISOString(), filters.paidOnly);
      window.open(url);
    } catch (e: any) {
      toast(e.response?.data?.message ?? 'Something went wrong', { type: 'error' });
    }
  }, [filters]);

  return {
    dispatch,
    payments,
    completedTotal,
    getExcellReportCallback,
    filters,
    isLoadingPayments,
    fetchMorePayments
  }
}