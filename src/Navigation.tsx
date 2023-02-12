import { Dropdown, Figure, Row, NavLinkProps } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './providers/AuthProvider';
import { routes } from 'constants/routes';
import Logo from 'assets/images/logo_black.png';
import { CardList, CashStack, HouseDoorFill, KeyFill, PersonLinesFill } from 'react-bootstrap-icons';
import { CSSProperties, FC } from 'react';

const navLinkStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10
}

const WrapperNavLink: FC<NavLinkProps> = ({ children, ...rest }) => <Nav.Link
    style={navLinkStyle}
    {...rest}
>
    {children}
</Nav.Link>

export const Navigation = () => {
    const auth = useAuth();
    console.log(auth?.user);
    return (
        <Container fluid>
            <Row>
                <Navbar style={{ padding: '0 15px 0 15px' }} bg="light" collapseOnSelect expand="lg" variant="light">
                    <Navbar.Brand href={routes.dashboard}>
                        <Figure.Image width={50} src={Logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {auth?.user && <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="mr-auto">
                            <WrapperNavLink href={routes.dashboard}>
                                <HouseDoorFill />
                                Головна
                            </WrapperNavLink>
                            <WrapperNavLink href={routes.configurations}>
                                <PersonLinesFill />
                                Користувачі
                            </WrapperNavLink>
                            <WrapperNavLink href={routes.transactionHistory}>
                                <CardList />
                                Історія транзакцій
                            </WrapperNavLink>
                            {auth?.user.role === UserRole.Owner && <WrapperNavLink href={routes.apiKeys}>
                                <KeyFill />
                                API ключі
                            </WrapperNavLink>}
                            <WrapperNavLink href={routes.billing}>
                                <CashStack />
                                Білінг
                            </WrapperNavLink>
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