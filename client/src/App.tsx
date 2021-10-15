import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/index";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import SignIn from "./views/signin/index";
import Signup from "./views/signup/index";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { pink, teal, yellow, blueGrey, red, deepOrange } from "@material-ui/core/colors";

const test = () => {
  return (
    <div>
      <h2>test</h2>
    </div>
  );
};

function App() {
  useEffect(() => {
    axios.get("/api_backend/test").then((res) => {
      console.log({ res });
    });
  }, []);

  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: yellow,
    },
  });

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <CssBaseline />
            <Switch>
              <Route exact path="/" component={test} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
