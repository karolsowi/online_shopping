import Chart from "react-google-charts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { useGetOrderSummaryQuery } from "../hooks/orderHooks";

export function DashboardPage() {

  const { data: summary, isLoading, error } = useGetOrderSummaryQuery();
  return (
    <div>
      <h1>Panel administratora</h1>
      <br/>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as ApiErrorType)}
        </MessageBox>
      ) : !summary ? (
        <MessageBox variant="danger">Nic nie znaleziono</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text> Użytkownicy</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && summary.orders[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Card.Title>
                  <Card.Text> Zamówienia</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0} zł
                  </Card.Title>
                  <Card.Text> Sprzedaż</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sprzedaż</h2>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>Brak</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Ładowanie wykresu...</div>}
                data={[
                  ["Data", "Sprzedaż"],
                  ...summary.dailyOrders.map(
                    (x: { _id: string; sales: number }) => [x._id, x.sales]
                  ),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Kategorie</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>Brak</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Ładowanie wykresu...</div>}
                data={[
                  ["Category", "Products"],
                  ...summary.productCategories.map(
                    (x: { _id: string; count: number }) => [x._id, x.count]
                  ),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}
