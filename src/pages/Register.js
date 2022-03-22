import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../contexts/AuthContext";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      navigate("/clients");
    }
  });
  const onClick = () => {
    auth.register(username, password, () => navigate("/clients"));
  };
  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className={"text-center"}>
                <b>REGISTER</b>
              </h3>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Enter Username"}
                  value={username}
                  onChange={(evt) => setUsername(evt.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={"Enter Password"}
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </Form.Group>
              <br />
              <div className="d-grid gap-2">
                <Button
                  variant="standard"
                  block={"true"}
                  onClick={onClick}
                  size={"lg"}
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <Spinner
                      variant="standard"
                      as={"span"}
                      animation={"border"}
                      size={"sm"}
                      role={"status"}
                      aria-hidden={"true"}
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Register;
