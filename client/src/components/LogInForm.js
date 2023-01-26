import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import AxiosError from "axios";

import Typography from "@mui/material/Typography";

import Link from "@mui/material/Link";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const LogInForm = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const signIn = useSignIn();

  const { setUserDataJson } = useContext(UserContext);

  const handleFirstNameChange = (name) => {
    setFirstName(name.target.value);
  };
  const handlePasswordChange = (password) => {
    setPassword(password.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const values = { firstName: firstName, password: password };
    console.log("Values: ", values);
    console.log("firstname: ", values.firstName);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        values
      );

      // Set localStorage variable
      window.localStorage.setItem(
        "USER_DATA",
        JSON.stringify({
          id: response.data._id,
          firstName: response.data.firstName,
          challenges: response.data.challenges,
        })
      );

      setUserDataJson({
        id: response.data._id,
        firstName: response.data.firstName,
        challenges: response.data.challenges,
      });

      // Create session
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { firstName: values.firstName },
      });
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setErrorMessage(err.response.data.error);
      }
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h2" gutterBottom align="center">
        Log in
      </Typography>
      <Typography gutterBottom variant="h6" align="center" color="secondary">
        {errorMessage}
      </Typography>
      <Row>
        <Card
          text="white"
          bg="secondary"
          lg={1}
          style={{ width: "38rem", padding: "10px" }}
        >
          <Form style={{ margin: "0" }}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={handleFirstNameChange}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button onClick={onSubmit} variant="success">
              Log in
            </Button>
          </Form>
        </Card>
        <Typography align="center" style={{ marginTop: "20px" }}>
          Not registered? <Link href="/registration"> Do do!</Link>
        </Typography>
      </Row>
    </Container>
  );
};

export default LogInForm;
