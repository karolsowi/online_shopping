import { Col, Row } from "react-bootstrap";

export function CheckoutSteps(props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) {

  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Logowanie</Col>
      <Col className={props.step2 ? "active" : ""}>Dostawa</Col>
      <Col className={props.step3 ? "active" : ""}>Płatność</Col>
      <Col className={props.step4 ? "active" : ""}>Finalizacja</Col>
    </Row>
  );
}
