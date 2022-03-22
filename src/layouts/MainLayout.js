import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const onSignIn = () => {
    navigate("/login");
  };
  const goToPlaces = () => {
    navigate("/clients");
  };
  const onSignOut = () => {
    auth.signOut();
    navigate("/login");
  };
  const Element = () => {
    if (auth.mode === "admin") {
      return (
        <Nav>
          <Nav.Link onClick={() => goToPlaces()}>CLIENTS</Nav.Link>
        </Nav>
      );
    } else {
      return <span />;
    }
  };
  const space = <span>&nbsp;&nbsp;</span>;
  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand herf="/">{space}DASHBOARD</Navbar.Brand>
        {auth.token ? <Element /> : <span />}
        <Nav className="flex-grow-1 justify-content-end">
          {auth.token ? (
            <Nav.Link onClick={() => onSignOut()}>
              Logout{space}
              {space}
            </Nav.Link>
          ) : (
            [
              <Nav.Link key={1} onClick={() => onSignIn()}>
                Login{space}
                {space}
              </Nav.Link>,
            ]
          )}
        </Nav>
      </Navbar>
      <br />
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
