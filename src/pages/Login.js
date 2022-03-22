import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      if (auth.mode === "admin") {
        navigate("/clients");
      } else if (auth.mode === "user") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, []);
  // hitesh.gorana@gmail.com
  // HiteshGorana
  // obbserv@gmail.com
  const onClick = () => {
    auth
      .signIn(username, password, (path) => {})
      .then((res) => {
        setTimeout(window.location.reload.bind(window.location), 100);
      });
  };
  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className={"text-center"}>
                {/*<b>LOGIN</b>*/}
                <br />
                <img
                  src="https://react.opositive.io/Assets/logo-red.png"
                  alt="logo"
                />
              </h3>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type={"email"}
                  placeholder={"Enter Email"}
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
                  variant="danger"
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
                    "Sign In"
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

export default Login;
