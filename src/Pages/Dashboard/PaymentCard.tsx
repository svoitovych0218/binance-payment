import { Card, ListGroup } from "react-bootstrap"

export interface IPaymentTableItem {
    _id: string;
    SK: string;
    amount: number;
    status: string;
    createdByUserName: string;
    createdAt: string;
    binanceResponse: any;
}

export const PaymentCard = ({ item }: { item: IPaymentTableItem }) => {
    return (
        <Card style={{marginBottom: '50px'}}>
            <Card.Body>
                <Card.Title style={{
                    width: '100%',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    whiteSpace: 'nowrap'
                }}>{`#${item.SK}`}</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src={item.binanceResponse.data.qrcodeLink} />
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Amount: {item.amount.toFixed(2)}</ListGroup.Item>
                <ListGroup.Item>Created by: {item.createdByUserName}</ListGroup.Item>
                <ListGroup.Item>Status: {item.status}</ListGroup.Item>
                <ListGroup.Item>createdAt: {new Date(item.createdAt).toLocaleTimeString()}</ListGroup.Item>
            </ListGroup>
            {/* <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body> */}
        </Card>
    )
}