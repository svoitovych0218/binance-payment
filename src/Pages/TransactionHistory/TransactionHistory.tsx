import { Container, Row } from "react-bootstrap";
import { PaymentsTable } from "./Table"

export const TransactionHistory = () => {

    return (
        <Container>
            <Row>
                <PaymentsTable />
            </Row>
        </Container>
    )
}