interface StoreDoubleColumnProps {
  title: string;
}

export default function StoreNavigationDoubleColumn({}: StoreDoubleColumnProps) {
  return (
    <>
    <div className="row mt-5">
      <div className="col-12 col-lg-5 mb-4 mb-lg-0">
        <h6 className="w-100 pb-3 border-bottom">Product categories</h6>
        <div className="d-flex pt-2">
          <ul className="nav flex-column ms-n3">
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="catalogue" target="_blank">
                Airless
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="catalogue" target="_blank">
                Pumps
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="catalogue" target="_blank">
                Roll-on
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="catalogue" target="_blank">
                Other
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-12 col-lg-7 mb-4 mb-lg-0">
        <h6 className="w-100 pb-3 border-bottom">Navigate</h6>
        <div className="d-flex pt-2">
          <ul className="nav flex-column ms-n3">
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="contact" target="_blank">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="about" target="_blank">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="faq" target="_blank">
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="sustainability" target="_blank">
                Sustainability
              </a>
            </li>
          </ul>
          <ul className="nav flex-column ms-6 ms-md-11 ms-lg-10">
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="#" target="_blank">
                Terms & Conditions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="#" target="_blank">
                Privacy policy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-body text-sm" href="#" target="_blank">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
    </>
  );
};
