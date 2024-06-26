import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartItemType } from "../types/Cart";
import { useStore } from "../store-context";
import { MessageBox } from "../components/MessageBox";

export function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const {
    mode,
    cart: { cartItems },
  } = state;

  function updateCartHandler(item: CartItemType, quantity: number) {
    if (item.countInStock < quantity) {
      toast.warn("Produkt wyprzedany");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  }

 return (
    <div>
      <Helmet>
        <title>Koszyk</title>
      </Helmet>
      <h1>Koszyk</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Koszyk  jest pusty. <Link to="/">Dodaj coś do zamówienia</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>zł{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() =>
                          dispatch({ type: "CART_REMOVE_ITEM", payload: item })
                        }
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                <h5>Rzeczy w koszyku: {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}</h5>
                  <h3>
                    Wartość : &nbsp;
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} zł
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => navigate("/signin?redirect=/shipping")}
                      disabled={cartItems.length === 0}
                    >
                      Złóż zamówienie
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
