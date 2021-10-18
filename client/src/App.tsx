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
import LiveScores from "./views/tournaments/index";
import RequireAuth from "./utils/RequireAuth";
import { useAppSelector } from "./redux/hooks";
import { LinearProgress } from "@material-ui/core";
import { useAppDispatch } from "./redux/hooks";
import TournamentDetail from "./views/tournamentDetail/index";

const App = () => {
  const User = useAppSelector((state) => state.User);
  const Tennis = useAppSelector((state) => state.Tennis);

  useEffect(() => {
    if (!!User.error) {
      alert(User.error);
    }
  }, [User.error]);

  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: teal,
    },
    typography: {},
  });

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          {User.loading || Tennis.loading ? (
            <LinearProgress color="secondary" />
          ) : (
            <LinearProgress color="secondary" variant="determinate" value={100} />
          )}
          <CssBaseline />
          <Switch>
            <Route exact path="/" />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/tournaments" component={LiveScores} />
            <Route exact path="/tournaments/:Sid" component={TournamentDetail} />
            {/* <RequireAuth exact path="/livescores" component={LiveScores} /> */}
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
