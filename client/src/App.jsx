import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { useState } from "react";

// Pages & components
import { UserContext } from "./UserContext";

//Pages
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import Registration from "./pages/Registration";

// CSS
import styles from "../src/css/App.module.css"

function App() {
  const [userDataJson, setUserDataJson] = useState(null);

  return (
    <div className={styles.app}>
      <UserContext.Provider value={{ userDataJson, setUserDataJson }}>
        <Routes>
          <Route
            path="/challenges"
            element={
              <RequireAuth loginPath="/">
                <Challenges />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/registration/" element={<Registration />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
