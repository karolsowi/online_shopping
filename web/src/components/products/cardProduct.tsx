interface Props {
  thumb_src: string;
  thumb_alt: string;
  title: string;
  description: string;
  volume: number;
  material: string;
  position: string;
}

export default function CardProduct({
  thumb_src,
  thumb_alt,
  title,
  description,
  volume,
  material,
  position
}: Props) {

  const classList = "card-body " + "text-" + position;

  return (
    <>
      <div className="card card-product border mb-5 shadow-xs border-radius-lg">
        <a href="product">
          <div className="height-350">
            <img className="w-100 h-100 p-4 rounded-top" src={`${import.meta.env.BASE_URL}${thumb_src}`} alt={thumb_alt} />
          </div>
          <div className={classList}>
            {(title) && 
              <h4 className="font-weight-bold">
                {title}
              </h4>
            }
            {(material) && 
              <h6 className="text-md mb-1 text-body">{material}</h6>
            }

            {(description) && 
              <p className="text-body">{description}</p>
            }
           
            {(volume) && 
              <h4 className="mb-0 text-lg mt-1 mb-3">
                {volume.toLocaleString()} ml
              </h4>
            }

            {!(description || material) &&
              <a href="#" className="font-weight-normal text-body text-sm">Shop Now</a>
            }
          </div>
        </a>
      </div>
    </>
  );
};
