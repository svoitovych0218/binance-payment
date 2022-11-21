import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export interface IPaymentTableItem {
    _id: string;
    SK: string;
    amount: number;
    status: string;
    createdByUserName: string;
    createdAt: string;
    binanceResponse: any;
}

export const PaymentsTable = ({ items }: { items: IPaymentTableItem[] }) => {
    const [show, setShow] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<IPaymentTableItem | undefined>(undefined);
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount crypto</th>
                        <th>Created by</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>QR code</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(s => (
                        <tr>
                            <td>{s.SK}</td>
                            <td>{s.amount}</td>
                            <td>{s.createdByUserName}</td>
                            <td>{s.status}</td>
                            <td>{s.createdAt}</td>
                            <td><button onClick={() => {
                                setSelectedItem(s);
                                setShow(true);
                            }}>Show qr code</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show}>
                <Modal.Header closeButton onHide={()=>setShow(false)}>
                    <Modal.Title>Payment QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img alt='QR Code' style={{width: '100%'}} src={selectedItem?.binanceResponse.data.qrcodeLink} />
                </Modal.Body>
            </Modal>
        </>
    );
}