import { getBillingHistory } from 'api/getBillingHistory';
import { localizedBillingStatuses, localizedTierSubscription } from 'constants/billing';
import { IBillingHistoryItem } from 'models/billing';
import { FC, useEffect, useState } from 'react';
import { OverlayTrigger, Spinner, Table, Tooltip } from 'react-bootstrap';
import { BillingStatus } from 'types.ts/billing';
import { getFormattedDateInLocalTimeZone } from 'utils/date';
import { CreditCard } from 'react-bootstrap-icons';

export const BillingHistoryContainer: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IBillingHistoryItem[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const history = await getBillingHistory();
        setData(history);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading)
    return <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <Spinner variant='primary' />
    </div>

  return (
    <Table size='sm' striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Сума</th>
          <th>Статус</th>
          <th>Створено</th>
          <th>Тариф</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map(s => (
          <tr key={s.SK}>
            <td>{s.SK}</td>
            <td>{s.amount} {s.currency}</td>
            <td>{localizedBillingStatuses[s.status as BillingStatus] || ''}</td>
            <td>{getFormattedDateInLocalTimeZone(s.at)}</td>
            <td>{localizedTierSubscription[s.type]}</td>
            <td>
              {s.status === BillingStatus.CREATED && <OverlayTrigger
                placement='top'
                overlay={
                  <Tooltip id={`tooltip-${s.SK}`}>
                    Оплатити
                  </Tooltip>
                }
              >
                <CreditCard onClick={() => window.open(s.paymentUrl)} cursor="pointer" color='#0d6efd' />
              </OverlayTrigger>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}