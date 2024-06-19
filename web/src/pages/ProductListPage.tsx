import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Paginate } from "../components/Pagination";
import {
  useGetProductsQuery,
} from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { getError } from "../utils/utils";

export function ProductListPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error} = useGetProductsQuery(page);

  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
      </Row>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as ApiErrorType)}
        </MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAZWA</th>
                <th>CENA</th>
                <th>KATEGORIA</th>
                <th>PRODUCENT</th>
              </tr>
            </thead>
            <tbody>
              {data!.products.map((product) => (
                <tr key={product._id.toString()}>
                  <td>{product._id.toString()}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {data && data.pagination.totalCount > 1 && (
              <Paginate
                total={data.pagination.pageCount}
                current={page}
                onChange={(value) => setPage(value)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
