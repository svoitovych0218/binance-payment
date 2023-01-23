import { getBillingHistory } from 'api/getBillingHistory';
import { IBillingHistoryItem } from 'models/billing';
import { FC, useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { getFormattedDateInLocalTimeZone } from 'utils/date';

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
    return <div style={{textAlign: 'center', marginBottom: '1rem'}}>
      <Spinner variant='primary'/>
    </div>

  return (
    <Table size='sm' striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Сума</th>
          <th>Статус</th>
          <th>Створено</th>
        </tr>
      </thead>
      <tbody>
        {data.map(s => (
          <tr key={s.SK}>
            <td>{s.SK}</td>
            <td>{s.amount} {s.currency}</td>
            <td>{s.status}</td>
            <td>{getFormattedDateInLocalTimeZone(s.at)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}