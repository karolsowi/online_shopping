import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCategoriesQuery } from "./hooks/productHooks";
import { ListGroup } from "react-bootstrap";
import { useStore } from "./store-context";
import { LoadingBox } from "./components/LoadingBox";
import { MessageBox } from "./components/MessageBox";
import { SearchBox } from "./components/SearchBox";
import { getError } from "./utils/utils";
import { ApiErrorType } from "./types/ApiError";

export function App() {
  const { state, dispatch } = useStore();
  const { mode, fullBox, cart, userInfo } = state;
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [sidebarIsOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  function signOutHandler() {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  }

  return (
    <div
      className={
        sidebarIsOpen
          ? fullBox
            ? "site-container active-cont d-flex flex-column full-box"
            : "site-container active-cont d-flex flex-column"
          : fullBox
          ? "site-container d-flex flex-column full-box"
          : "site-container d-flex flex-column"
      }
      style={{ minHeight: "100vh" }} // Ensuring the minimum height of the container is 100vh
    >
      <ToastContainer position="top-left" closeOnClick={true} limit={1} />
      <header className="mb-5">
        <Navbar
          className="navbar navbar-expand-lg shadow-sm"
          style={{ backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          expand="lg"
        >
          <Container>
            <LinkContainer to="/" className="header-link">
              <Navbar.Brand >TechStore</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="me-auto ms-5">
                <SearchBox/>
              </Nav>
              <Nav className="ml-auto">
                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Konto`}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Konto użytkownika</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Wyloguj się
                    </Link>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>Zaloguj się</Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown className="header-link" title="Admin">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Panel</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Produkty</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Zamówienia</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Użytkownicy</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to="/orderhistory" className="nav-link header-link">
                  Zamówienia
                </Link>
                <Link to="/cart" className="nav-link header-link p-0">
                  <span className="cart-badge">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                  <svg
                    fill="#000000"
                    viewBox="130 150 200 300"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
                  </svg>
                  <span>Koszyk</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div
          style={{ background: "#f8f9fa", borderBottom: "1px solid #e0e0e0"}}
          className="sub-header d-flex justify-content-start align-items-center p-2 z-index-10"
        >
          <Container className="d-flex">
            {["Wyprzedaż"].map((item) => (
              <Link
                key={item}
                className="nav-link header-link p-2"
                to={`/search?tag=${"SALE"}`}
              >
                {item}
              </Link>
            ))}
            {isLoading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">
                {getError(error as ApiErrorType)}
              </MessageBox>
            ) : (
              categories &&
              categories.map((category) => (
                <Link
                  key={category}
                  className="nav-link header-link p-2"
                  to={{ pathname: "/search", search: `category=${category}` }}
                >
                  {category}
                </Link>
              ))
            )}
          </Container>
        </div>
      </header>
      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user ">
            <div className="d-flex justify-content-between align-items-center">
              <LinkContainer
                to={userInfo ? `/profile` : `/signin`}
                onClick={() => setSidebarOpen(!sidebarIsOpen)}
              >
                <span>{userInfo ? userInfo.name : `sign in`}</span>
              </LinkContainer>
              <Button
                variant={mode}
                onClick={() => setSidebarOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiErrorType)}
            </MessageBox>
          ) : (
            categories &&
            categories.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
      <main style={{ flexGrow: 1, marginBottom: "1rem" }}>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer
        className="border-top d-flex justify-content-center align-items-center"
        id="footer"
        style={{ background: "#f8f9fa", padding: "1rem", flexShrink: 0 }}
      >
        <div className="text-center" style={{ color: "gray" }}>
          TechStore - Karol Sowiński &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
