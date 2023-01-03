import { Button, Dropdown, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './providers/AuthProvider';

export const Navigation = () => {
    const auth = useAuth();
    console.log(auth?.user);
    return (
        <Container>
            <Row>
                <Navbar style={{ padding: '0 15px 0 15px' }} bg="light" collapseOnSelect expand="lg" variant="light">
                    <Navbar.Brand href="#home">Crypto Payments</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {auth?.user && <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="mr-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/configurations">Configurations</Nav.Link>
                            <Nav.Link href="/transaction-history">Transaction History</Nav.Link>
                            {auth?.user.user_role === UserRole.Owner && <Nav.Link href='api-keys'>API Keys</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                    }
                    {
                        auth?.user && <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                        Signed in as: {auth?.user?.user_sk?.replace('User-', '') ?? ''}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => auth?.logout()}>Вийти</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* <Button style={{ float: 'right' }} variant='secondary' onClick={() => auth?.logout()}>Вийти</Button> */}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    }
                </Navbar>
            </Row>
        </Container>
    )
}