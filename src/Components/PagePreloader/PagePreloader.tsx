import { Container, Row, Spinner } from "react-bootstrap"

export const PagePreloader = () => {

    return (
        <Container>
            <Row style={{ justifyContent: 'center' }} >
                <Spinner style={{marginTop: '150px'}} animation="border" variant="primary"/>
            </Row>
        </Container>
    )
}