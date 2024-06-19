import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function ControlledCarousel({ items }: { items: { imageUrl: string, redirectUrl: string }[] }) {
  return (
    <Carousel
      style={{ width: "100%" , marginBottom: "3rem", marginTop: "-48px"}}
      variant="dark"
      indicators={false}
      controls={false}
      fade={true}
      >
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <Link to={item.redirectUrl}>
            <img
              className="d-block w-100"
              src={item.imageUrl}
              alt={`Slide ${index + 1}`}
              style={{ objectFit: "cover" }}
              width={300}
              height={300}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
