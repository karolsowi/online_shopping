import ProductGallery from './productGallery'

interface Props {
  title: string;
  material: string[];
  images: ({
    src: string;
    alt: string;
  })[];
  full_description: string;
  volume: number;
  highlights: string[];
  details: string;
}

export default function ProductOverview({
  title = '',
  images = [],
  full_description = '',
  volume = 0,
  highlights = [],
  details = '',
}: Props) {

  return (
    <>
    <div className="card card-product card-plain">
      <div className="row">

        {(images.length > 0) && 
          <ProductGallery images={images}/>
        }
        <div className="col-12 col-lg-6 ps-lg-5">
          {(title.length !== 0) && 
            <h3 className="mt-4">{title}</h3>
          }
            <>
            <ul className="list-unstyled col-lg-7">
              <li className="mt-5">
                <div className="d-flex justify-content-between">
                  <p className={`fw-normal`}>Volume</p>
                  <p className={`fw-bold` }>{volume.toLocaleString()} ml</p>
                </div>
              </li>
              <li className="mt-2">
                <div className="d-flex justify-content-between">
                  <p className={`fw-normal`}>Material</p>
                  <p className={`fw-bold` }>{(', ')}</p>
                </div>
              </li>
              <li className="border-bottom mt-2">
                <div className="d-flex justify-content-between">
                <p className={`fw-normal`}>Color</p>
                <p className={`fw-bold` }>White</p>
                </div>
              </li>
            </ul>
          </>

          {(full_description.length !== 0) && 
              <p className="mb-5">{full_description}</p>
            }
          <form action="" method="post">
            <button className="btn btn-dark btn-lg" type="submit">Send inquiry</button>
          </form>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12 col-lg-6">
          <h4>Product Description</h4>
          <p>There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill. I’m not really specifically talented at anything except for the ability to learn. That’s what I do. That’s what I’m here for. Don’t be afraid to be wrong because you can’t learn anything from a compliment.</p>
          {(highlights.length !== 0) && 
           <>
             <h6>Benefits</h6>
              <ul className="text-sm">
              {highlights?.map(highlight => 
                <li className="mb-2">{highlight}</li>
              )}
              </ul>
           </>
          }
           {(details.length !== 0) && 
            <>
              <h6>More about product</h6>
              <p>{details}</p>
            </>
           }
        </div>
      </div>
    </div>
    </>
  );
};
