import { Form, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { addPlace } from "../apis";

const PlaceForm = ({ onDone }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [burl, setBurl] = useState("");
  const [iframe, setIframe] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const OnClick = async () => {
    console.log({
      name: name,
      email: email,
      iframe: iframe,
      password: password,
      url: burl,
      mode: "user",
    });
    const json = await addPlace(
      {
        name: name,
        email: email,
        iframe: iframe,
        password: password,
        url: burl,
        mode: "user",
      },
      auth.token
    );
    if (json) {
      setName("");
      setEmail("");
      setBurl("");
      setIframe("");
      setPassword("");
      onDone();
    }
  };
  return (
    <div>
      <br />
      <h4 className={"text-center"}>New Client</h4>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type={"text"}
          placeholder={"Enter Name"}
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type={"email"}
          placeholder={"Enter Email"}
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Brand Url</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Enter Brand Url"}
          value={burl}
          onChange={(evt) => setBurl(evt.target.value)}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Iframe</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          style={{ resize: "none" }}
          type={"text"}
          placeholder={"Enter Iframe"}
          value={iframe}
          onChange={(evt) => setIframe(evt.target.value)}
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={"password"}
          placeholder={"Enter Password"}
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </Form.Group>
      <br />
      <div className="d-grid gap-2">
        <Button variant={"standard"} block={"true"} onClick={OnClick}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default PlaceForm;
