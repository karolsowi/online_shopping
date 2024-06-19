interface Props {
  title: string;
}

export default function OrderSummary({

}: Props) {

  return (
    <>
      <div className="form-group">
        <label>Adres</label>
        <input type="text" className="form-control" placeholder="Ulica, nr" />
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label>Miasto</label>
            <input type="text" className="form-control" placeholder="Miasto" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Kraj</label>
            <input type="text" className="form-control" placeholder="Kraj" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Kod pocztowy</label>
            <input type="text" className="form-control" placeholder="00-000" />
          </div>
        </div>
      </div>
    </>
  );
}