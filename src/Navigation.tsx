import { Dropdown, Figure, Row, NavLinkProps, OverlayTrigger, Popover } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './providers/AuthProvider';
import { routes } from 'constants/routes';
import Logo from 'assets/images/logo_black.png';
import { CardList, CashStack, HouseDoorFill, KeyFill, PersonLinesFill } from 'react-bootstrap-icons';
import React, { CSSProperties, FC } from 'react';
import { getDateWithOffset, getDateDifferenceInDay } from 'utils/date';
import { Stopwatch } from 'react-bootstrap-icons';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';

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

const popover = (left: number) => (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Повідомлення</Popover.Header>
        <Popover.Body>
            Ваша підписка на CRM систему закінчеється через <strong>{left}</strong> днів.
            Перейдіть на сторінку <Link to={routes.billing}>Білінгу</Link> щоб продовжити підписку. Інакше створення платежів буде недоступним після закінчення вказаного терміну.
        </Popover.Body>
    </Popover>
);

export const Navigation = () => {
    const auth = useAuth();
    const overlayRef = React.useRef(null);
    const subscriptionDaysLefs = auth?.user?.subscriptionPaidTill ? getDateDifferenceInDay(new Date(auth?.user?.subscriptionPaidTill),  new Date()) : undefined;
    


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
                        subscriptionDaysLefs && subscriptionDaysLefs <= 14 &&
                        <OverlayTrigger
                            key={'bottom'}
                            placement={'bottom'}
                            trigger={['hover']}
                            delay={{hide: 10000, show: 0}}
                            overlay={popover(subscriptionDaysLefs)}
                        >
                            <Badge
                                style={{ marginRight: '20px', cursor:'pointer' }}
                                color="warning" badgeContent={subscriptionDaysLefs}>
                                <Stopwatch size={25} />
                            </Badge>
                        </OverlayTrigger>
                    }
                    <div className='justify-content-end'>
                        {
                            auth?.user && <Navbar.Collapse >
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
                    </div>
                </Navbar>
            </Row>
        </Container>
    )
}