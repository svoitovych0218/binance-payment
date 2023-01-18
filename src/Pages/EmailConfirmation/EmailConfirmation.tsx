import { routes } from "constants/routes";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmEmail } from "../../api/confirmEmail";
import { useQuery } from "../../hooks/useQuery";


export const EmailConfirmation = () => {
    const [requestSent, setRequestSent] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const query = useQuery();

    const queryData = useMemo(() => {
        return {
            organization: query.get('organization'),
            code: query.get('code'),
            userName: query.get('userName')
        }
    }, [query]);

    const wrongUrl = !queryData.code || !queryData.organization || !queryData.userName;

    const confirmEmailRequest = async (code: string, organization: string, userName: string) => {
        try {
            await confirmEmail(code, organization, userName);
            toast("Активовано!", { type: 'success' });
            setSuccess(true);
            setRequestSent(true);
            setTimeout(() => {
                navigate(routes.login);
            }, 3000);
        } catch {
            toast("Помилка. Посилання невалідне", { type: 'error' });
        }
    }

    useEffect(() => {
        if (queryData && !wrongUrl) {
            confirmEmailRequest(queryData.code!, queryData.organization!, queryData.userName!);
        }
    }, [wrongUrl, queryData])

    return (
        <Container>
            <Row>
                <Col md={4} sm={12}></Col>
                {requestSent && success ? <Col md={4} sm={12}>
                    Дякуюємо! Ваша електронна адреса підтверджена. Ми перенаправляємо вас на сторінку входу {' '}
                    <Link to={routes.login}>Увійти</Link>
                </Col> : <Col md={4} sm={12}>
                    {(wrongUrl || (requestSent && !success)) && 'Помилка. Посилання на активацію електронної адреси не дійсне'}
                </Col>
                }
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}