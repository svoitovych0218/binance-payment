import { Dropdown, Figure, Image, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './providers/AuthProvider';
import { routes } from 'constants/routes';
import Logo from 'assets/images/logo_black.png';

export const Navigation = () => {
    const auth = useAuth();
    console.log(auth?.user);
    return (
        <Container fluid>
            <Row>
                <Navbar style={{ padding: '0 15px 0 15px' }} bg="light" collapseOnSelect expand="lg" variant="light">
                    <Navbar.Brand href="#home">
                            <Figure.Image width={50} src={Logo}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {auth?.user && <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="mr-auto">
                            <Nav.Link href={routes.dashboard}>Робоча зона</Nav.Link>
                            <Nav.Link href={routes.configurations}>Конфігурація користувачів</Nav.Link>
                            <Nav.Link href={routes.transactionHistory}>Історія транзакцій</Nav.Link>
                            {auth?.user.role === UserRole.Owner && <Nav.Link href={routes.apiKeys}>API Keys</Nav.Link>}
                            <Nav.Link href={routes.billing}>Білінг</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    }
                    {
                        auth?.user && <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                        Авторизовано: {auth?.user?.SK?.replace('User-', '') ?? ''}
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