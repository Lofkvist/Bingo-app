import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

import Typography from "@mui/material/Typography";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Challenges = () => {
  const { userDataJson, setUserDataJson } = useContext(UserContext);
  const [statusOfChallenges, setStatusOfChallenges] = useState();

  useEffect(() => {
    // Excecutes upon load, user is stored
    const data = JSON.parse(window.localStorage.getItem("USER_DATA"));

    setUserDataJson({
      id: data.id,
      firstName: data.firstName,
      challenges: data.challenges,
    });
    setStatusOfChallenges(data.challenges);
  }, [setUserDataJson]);

  const toggleChallengeStatus = (challengeId) => {
    // Toggle isCompleted of specific challenge
    const userId = userDataJson.id;

    const currentStatus = statusOfChallenges.find(
      (e) => e._id === challengeId
    ).isCompleted;

    const index = statusOfChallenges.findIndex((e) => e._id === challengeId);

    var newChallenges = statusOfChallenges;
    newChallenges[index].isCompleted = !currentStatus;

    const data = JSON.parse(window.localStorage.getItem("USER_DATA"));

    // Update local storage variable
    window.localStorage.setItem(
      "USER_DATA",
      JSON.stringify({
        id: data.id,
        firstName: data.firstName,
        challenges: newChallenges,
      })
    );

    setStatusOfChallenges((current) =>
      current.map((challenge) => {
        if (challenge._id === challengeId) {
          return { ...challenge, isCompleted: !currentStatus };
        }
        return challenge;
      })
    );

    setUserDataJson({
      ...userDataJson,
      challenges: statusOfChallenges,
    });

    // Update database
    var api;
    if (!currentStatus) {
      api = `http://localhost:8000/user/true/${userId}/${challengeId}`;
    } else {
      api = `http://localhost:8000/user/false/${userId}/${challengeId}`;
    }

    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };

    fetch(api, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then()
      .catch((error) => console.log(error));
  };

  // Update challenges variabel to display change
  const challenges = JSON.parse(
    window.localStorage.getItem("USER_DATA")
  ).challenges;

  const list = challenges.map((challenge) => {
    return (
      <>
        {challenge.isCompleted ? (
          <Card
            text="black"
            bg="light"
            lg={2}
            style={{
              width: "25rem",
              height: "8rem",
              padding: "5px",
              margin: "5px",
            }}
          >
            <Typography style={{ padding: "3px" }} variant="p">
              {challenge.description}
            </Typography>
            <Button
              style={{ margin: "auto", width: "7rem" }}
              onClick={() => toggleChallengeStatus(challenge._id)}
              variant="outline-danger"
            >
              <Typography>Not done?</Typography>
            </Button>
          </Card>
        ) : (
          <Card
            text="black"
            bg="light"
            lg={2}
            style={{
              width: "25rem",
              height: "8rem",
              padding: "5px",
              margin: "5px",
            }}
          >
            <Typography style={{ padding: "3px" }} variant="p">
              {challenge.description}
            </Typography>
            <Button
              align="center"
              style={{ margin: "auto", width: "7rem" }}
              onClick={() => toggleChallengeStatus(challenge._id)}
              variant="success"
            >
              <Typography>Done?</Typography>
            </Button>
          </Card>
        )}
      </>
    );
  });
  return (
    <Container style={{ marginTop: "20px" }}>
      <Button style={{ position: "absolute" }} variant="dark" href="/">
        Home
      </Button>
      <Typography variant="h3" align="center" style={{ margin: "20px" }}>
        Your Challenges
      </Typography>
      <Row>
        <Col>{list[0]}</Col>
        <Col>{list[1]}</Col>
        <Col>{list[2]}</Col>
      </Row>
      <Row>
        <Col>{list[3]}</Col>
        <Col>{list[4]}</Col>
        <Col>{list[5]}</Col>
      </Row>
      <Row>
        <Col>{list[6]}</Col>
        <Col>{list[7]}</Col>
        <Col>{list[8]}</Col>
      </Row>
    </Container>
  );
};

export default Challenges;
