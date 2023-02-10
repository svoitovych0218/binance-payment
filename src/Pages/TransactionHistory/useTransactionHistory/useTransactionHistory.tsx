import { Dispatch, useReducer, useState, useEffect, useCallback, useMemo } from "react";
import {
  TransactionHistoryFiltersAction,
  IPayment,
  IFiltersState,
  TransactionHistoryFiltersActionTypes,
  PaymentStatus
} from "types.ts/payment";
import { getPayments } from "api/getPayments";
import { getExcelReport } from "api/getExcelReport";
import { reducer } from "./reducer";
import { subMonths, endOfDay, startOfDay } from "date-fns";
import { toast } from "react-toastify";
import { RefundModal } from "../RefundModal";
import { refund } from "api/refund";

interface IReturnValue {
  dispatch: Dispatch<TransactionHistoryFiltersAction>
  payments: IPayment[]
  completedTotal: number | undefined
  getExcellReportCallback: () => void
  filters: IFiltersState
  isLoadingPayments: boolean
  fetchMorePayments: () => void
  handleOpenRefundModal: (sk: string) => void
  refundModalElement: JSX.Element
}

export const useTransactionHistory = (): IReturnValue => {
  const [isLoadingRefund, setIsLoadingRefund] = useState(false);
  const [openRefunModal, setOpenRefunModal] = useState<boolean>(false);
  const [activeSK, setActiveSK] = useState<string>();
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
    limit: 20,
    cursor: undefined,
    search: ''
  });

  useEffect(() => {
    setIsLoadingPayments(true);
    setPayments([]);
    (async () => {
      const res = await getPayments(filters.from, filters.to, filters.paidOnly, filters.limit, filters.search);
      setPayments(res.payments);
      setCompletedTotal(res.completedPaymentsSum);
      dispatch({
        type: TransactionHistoryFiltersActionTypes.SET_CURSOR,
        payload: res.LastEvaluatedKey
      });
      setIsLoadingPayments(false);
    })()
  }, [filters.from, filters.to, filters.paidOnly, filters.limit, filters.search]);

  const fetchMorePayments = useCallback(async () => {
    if (filters.cursor
      && !isLoadingPayments) {
      setIsLoadingPayments(true);
      const res = await getPayments(filters.from, filters.to, filters.paidOnly, filters.limit, filters.search, filters.cursor);
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

  const handleRefund = useCallback(async () => {
    setIsLoadingRefund(true);
    if (!activeSK)
      return;
    try {
      await refund(activeSK);
      setPayments(prevPayments => prevPayments.map(p => {
        if (p.SK === activeSK)
          return {
            ...p,
            status: PaymentStatus.REFUNDED
          }
        return p;
      }))
      toast('Кошти успішно повернено', { type: "success" })
    }
    catch {
      toast('Щось пішло не так', { type: "error" });
    }
    finally {
      handleCloseRefundModal();
      setIsLoadingRefund(false);
    }
  }, [activeSK]);

  const handleOpenRefundModal = (sk: string) => {
    setActiveSK(sk);
    setOpenRefunModal(true);
  }

  const handleCloseRefundModal = () => {
    setActiveSK(undefined);
    setOpenRefunModal(false);
  }

  const refundModalElement = useMemo(() => {
    return (
      <RefundModal
        isLoading={isLoadingRefund}
        onHide={handleCloseRefundModal}
        show={openRefunModal}
        onSubmit={handleRefund}
      />
    )
  }, [handleRefund, isLoadingRefund, openRefunModal]);

  return {
    dispatch,
    payments,
    completedTotal,
    getExcellReportCallback,
    filters,
    isLoadingPayments,
    fetchMorePayments,
    handleOpenRefundModal,
    refundModalElement
  }
}