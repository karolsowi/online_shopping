import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { useSigninMutation } from "../hooks/userHooks";
import { useStore } from "../store-context";
import { LoadingBox } from "../components/LoadingBox";

export function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useStore();
  const { userInfo } = state;
  const { mutateAsync: signin, isLoading } = useSigninMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo]);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const data = await signin({
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiErrorType));
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Logowanie</title>
      </Helmet>
      <h1 className="my-3">Logowanie</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Zaloguj się
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        <div className="mb-3">
          <Link to={`/signup?redirect=${redirect}`}>Załóż nowe konto</Link>
        </div>
      </Form>
    </Container>
  );
}
