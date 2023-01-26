import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useSignIn } from "react-auth-kit";
import axios from "axios";

import Typography from "@mui/material/Typography";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserDataJson } = useContext(UserContext);
  const signIn = useSignIn();

  const handleFirstNameChange = (name) => {
    setFirstName(name.target.value);
  };
  const handlePasswordChange = (password) => {
    setPassword(password.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:8000/allChallenges")
      .then((res) => {
        let allChallenges = res.data;
        const numChallenges = 9;
        const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
        const challengesDescriptions = shuffled.slice(0, numChallenges);

        let challenges = [];
        for (let i = 0; i < numChallenges; i++) {
          challenges[i] = {
            description: challengesDescriptions[i].challenge,
            isCompleted: false,
          };
        }

        // Använd about och tilldela inte en utmaniog om personen till den själv
        // Loopa igenom challenges och sätt description till status och isCompleted till false och about
        const user = { firstName, password, challenges };
        console.log(user);

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };

        fetch("http://localhost:8000/user/new", options)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong ...");
            }
          })

          .then((data) => {
            setUserDataJson(data);
            const info = data.user;
            const token = data.token;
            window.localStorage.setItem(
              "USER_DATA",
              JSON.stringify({
                id: info._id,
                firstName: info.firstName,
                challenges: info.challenges,
              })
            );

            signIn({
              token: token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: { firstName: info.firstName },
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h2" gutterBottom align="center">
        Register
      </Typography>
      <Row>
        <Card
          text="white"
          bg="secondary"
          lg={1}
          style={{ width: "38rem", padding: "10px" }}
        >
          <Button
            style={{ position: "relative", left: "-16.9rem", top: "-5.5rem" }}
            variant="dark"
            href="/"
          >
            Home
          </Button>
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
            <Button onClick={handleSubmit} variant="success">
              Submit
            </Button>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
