import { Container, Row } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

export const EmailNotActivated = () => {
    const auth = useAuth();

    return (
        <Container>
            <Row>
                <h5>Вітаємо {auth?.user?.name}! На вашу електронну адресу було відправлено лист для підтвердження реєстрації. Перейдіть будь-ласка за посиланняв що було вказано в листі для користування системою.</h5>
            </Row>
        </Container>
    )
}