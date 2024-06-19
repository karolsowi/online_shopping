import ProductBadge from './productBadge';
import ProductRating from './productRating';
import ProductSizes from './productSizes';
import ProductGallery from './productGallery'

interface Props {
  thumb_src: string;
  title: string;
  volume: number;
  material: string[];
  sizes: Map<string,number>;
  images: ({
    src: string;
    alt: string;
  })[];
}

export default function ProductQuickview({
  thumb_src,
  title,
  volume,
  material,
  sizes,
  images
}: Props) {

  return (
    <>
    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Product Quickview
    </button>
    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div className="modal-content">
          <div className="card card-product">
            <div className="card-body d-block d-lg-flex p-4">
              <button type="button" className="btn-close text-dark position-absolute me-4 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
              {(thumb_src) && 
                <ProductGallery images={images} />
              }
              <div className="w-100 w-lg-70 ps-lg-5 mt-4 mt-md-5">
                <div className="d-flex align-items-center">
                  {(title.length != 0) && 
                    <h3 className="me-4">{title}</h3>
                  }
                {(volume) && 
                  <>
                    <div className="d-flex">
                      <h4 className="mb-0">${volume.toLocaleString()}</h4>
                      <input className="opacity-0 d-none" defaultValue={volume} />
                    </div>
                  </>
                }
                </div>
                <p className="mt-4">As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends.</p>
                {(material != 0) && 
                  <>
                    <h6 className="mt-4">Color</h6>
                    {(material) &&
                      <ProductBadge material={material} />
                    }
                  </>
                }
                {(sizes.size != 0) && 
                  <ProductSizes sizes={sizes}/>
                }
                <div className="d-block text-center">
                  <button className="btn btn-dark w-100">Checkout</button>
                  <button className="btn btn-white w-100">Continue Shopping</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
