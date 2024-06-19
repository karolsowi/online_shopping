import ProductImages from './productImages';

interface Props {
  title: string;
  volume: number;
  images: ({
    src: string;
    alt: string;
  })[];
  material: string[];
  full_description: string;
  data: Map<string,string>
}

export default function productOverviewGallery({
  title,
  images,
  material,
  full_description,
}: Props) {
  
  return (
    <>
    <div className="card card-product card-plain">
      <div className="row">
        {(images.length != 0) && 
          <ProductImages images={images}/>
        }
        <div className="col-12 col-lg-6 mt-5 mt-lg-0">
          {(title.length != 0) && 
            <h2>{title}</h2>
          }
            {(material && material.length !== 0) &&
            <>
              <div className="d-flex mb-3">
                <h4 className="font-weight-normal">{material ? `$${material.toLocaleString()}` : ''}</h4>
                <input className="opacity-0" defaultValue={material} />
              </div>
            </>
          }
          <p className="mt-4">{full_description}</p>
          
          <div className="d-flex align-items-center mt-4">
            <button className="btn btn-dark btn-lg mb-0 me-4">Add to Cart</button>
            <a href="#favorite">
              <i id="heart1" className="far fa-heart text-2xl" ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
