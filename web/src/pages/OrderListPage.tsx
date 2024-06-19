import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../hooks/orderHooks";
import { useState } from "react";
import { Paginate } from "../components/Pagination";

export function OrderListPage() {

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetOrdersQuery(page);

  const { mutateAsync: deleteOrder, isLoading: loadingDelete } =
    useDeleteOrderMutation();
  async function deleteHandler(id: string) {
    if (window.confirm("Czy na pewno chcesz usunąć?")) {
      try {
        await deleteOrder(id);
        await refetch();
        toast.success("Usunięto zamówienie");
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  }

  return (
    <div>
      <Helmet>
        <title>Zamówienia</title>
      </Helmet>
      <h1>Zamówienia</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
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
                <th>UŻYTKOWNIK</th>
                <th>DATA</th>
                <th>KWOTA</th>
                <th>ZAPŁACONO</th>
                <th>DOSTARCZONO</th>
                <th>OPCJE</th>
              </tr>
            </thead>
            <tbody>
              {data!.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : "Usunięty użytkownik"}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "Nie"}</td>

                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "Nie"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Szczegóły
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(order._id)}
                    >
                      Usuń
                    </Button>
                  </td>
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
