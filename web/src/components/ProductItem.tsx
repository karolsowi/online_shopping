import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartItemType } from "../types/Cart";
import { ProductType } from "../types/Product";
import { convertProductToCartItem } from "../utils/utils";
import { useStore } from "../store-context";
import { Rating } from "./Rating";

export function ProductItem({ product }: { product: ProductType }) {
  const { state, dispatch } = useStore();
  const {
    cart: { cartItems },
  } = state;

  function addToCartHandler(item: CartItemType) {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.warn("Produkt wyprzedany");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });

    toast.success("Produkt dodany do koszyka");
  }

  return (
    <Card style={{ marginBottom: "2rem", position: "relative" }}>
      <Link to={`/product/${product.slug}`}>
        <Card.Img
          src={product.images[0]}
          alt={`${product.name} image`}
          className="d-block w-100"
          style={{ objectFit: "cover" }}
          width={300}
          height={300}
        />
        {product.isSale && (
          <div className="badge-overlay">
            <span className="top-right badge-sale red">Wyprzedaż</span>
          </div>
        )}
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price} zł</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Wyprzedany
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Dodaj do koszyka
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
