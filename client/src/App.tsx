import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/index";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import SignIn from "./views/signin/index";
import Signup from "./views/signup/index";
import { MuiThemeProvider, createTheme, makeStyles } from "@material-ui/core/styles";
import { pink, teal, yellow, blueGrey, red, deepOrange } from "@material-ui/core/colors";
import unauthorized from "./views/unauthorized";
import NotFound from "./views/404/index";
import LiveScores from "./views/scores/index";
import RequireAuth from "./utils/RequireAuth";
import { useAppSelector } from "./redux/hooks";
import { LinearProgress } from "@material-ui/core";

const test = () => {
  return (
    <div>
      <h2>test</h2>
    </div>
  );
};

const App = () => {
  const User = useAppSelector((state) => state.User);

  useEffect(() => {
    axios.get("/api/test").then((res) => {
      console.log({ res });
    });
  }, []);

  useEffect(() => {
    if (!!User.error) {
      alert(User.error);
    }
  }, [User.error]);

  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: yellow,
    },
  });

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          {User.loading ? (
            <LinearProgress color="secondary" />
          ) : (
            <LinearProgress color="secondary" variant="determinate" value={0} />
          )}
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={LiveScores} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
            <RequireAuth exact path="/livescores" component={LiveScores} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            >
              <Route path="/unauthorized" component={unauthorized} />
              <Route component={NotFound} />
            </div>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

export default App;
