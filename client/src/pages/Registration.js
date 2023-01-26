import RegistrationForm from "../components/RegistrationForm";

// Material UI
import Grid from "@mui/material/Grid";
import Button from "react-bootstrap/Button";

const Registration = () => {
  console.log(JSON.parse(window.localStorage.getItem("USER_DATA")));

  return (
    <div>
      <RegistrationForm />
      {JSON.parse(window.localStorage.getItem("USER_DATA")) && (
        <Grid style={{ marginTop: "10px" }} align="center" xs={12} item>
          <Button
            style={{ margin: "auto", width: "12rem" }}
            variant="outline-success"
            href="/challenges"
          >
            Log in!
          </Button>
        </Grid>
      )}
    </div>
  );
};

export default Registration;
