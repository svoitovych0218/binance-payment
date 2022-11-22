import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Navigation = () => {
    return (
        <Container>
        <Navbar bg="light" collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="#home">Crypto Payments</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#features">Configurations</Nav.Link>
                    <Nav.Link href="#pricing">History</Nav.Link>
                </Nav>
                {/* </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end"> */}
                {/* <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text> */}
            </Navbar.Collapse>
        </Navbar>
        </Container>
    )
}