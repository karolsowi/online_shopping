import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export function SearchBox() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setQuery("");
    }
  }, [location.pathname]);

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    navigate(query ? `/search?search=${query}` : "/search");
  }

  return (
    <Form className="flex-grow-1 d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Szukaj"
          aria-label="Szukaj"
          aria-describedby="button-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-info" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
