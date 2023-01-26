import { useSignOut } from "react-auth-kit";

// Components
import LogInForm from "../components/LogInForm";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const Home = () => {
  const signOut = useSignOut();

  const logOut = () => {
    signOut();

    JSON.parse(window.localStorage.setItem("USER_DATA", null));
  };

  // Return Login form, or directing buttons depending on whether
  // user id logged in
  return (
    <div>
      {JSON.parse(window.localStorage.getItem("USER_DATA")) ? (
        <Container>
          <Row style={{ width: "50rem", margin: " 50px auto" }}>
            <Col>
              <Card bg="light" style={{ width: "20rem", height: "10rem" }}>
                <Button
                  variant="outline-danger"
                  style={{ margin: "auto", width: "12rem" }}
                  onClick={logOut}
                >
                  Log out
                </Button>
              </Card>
            </Col>
            <Col>
              <Card bg="light" style={{ width: "20rem", height: "10rem" }}>
                <Button
                  style={{ margin: "auto", width: "12rem" }}
                  variant="outline-success"
                  href="/challenges"
                >
                  To the challenges
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <LogInForm />
      )}
    </div>
  );
};

export default Home;
