import { useState } from "react";
import { Badge, Button, Card, Carousel, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MessageBox } from "../components/MessageBox";
import { ProductPageSkeleton } from "../components/ProductPageSkeleton";
import { Rating } from "../components/Rating";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { useStore } from "../store-context";
import { ApiErrorType } from "../types/ApiError";
import { convertProductToCartItem, getError } from "../utils/utils";

export function ProductPage() {
  const {
    state: { cart },
    dispatch,
  } = useStore();

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  function addToCartHandler() {
    if (!product) return;

    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.warn("Produkt wyprzedany");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product), quantity },
    });
    toast.success("Dodano do koszyka");

    navigate("/cart");
  }

  return isLoading ? (
    <ProductPageSkeleton />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Nie znaleziono produktu</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={8}>
          <Carousel indicators={true} variant="dark">
            {product.images.map((image, index) => (
              <Carousel.Item key={index} >
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${product.name} image ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  style={{ cursor: "pointer", height: "25rem", objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
              <h4>{product.brand}</h4>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Opis : <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
          <Row>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Cena:</Col>
                    <Col>{product.price} zł</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Stan:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">Dostępny</Badge>
                      ) : (
                        <Badge bg="danger">Niedostępny</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item className="border-0">
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Dodaj do koszyka
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" dialogClassName="modal-90w">
        <Modal.Body style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <Carousel activeIndex={modalImageIndex} onSelect={(selectedIndex) => setModalImageIndex(selectedIndex)} indicators={false} variant="dark">
            {product.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${product.name} image ${index + 1}`}
                  style={{ maxHeight: "80vh", objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
}
