import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signinUser } from "../../redux/slices/User/userThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EmailTextField } from "../../components/AuthFields/EmailTextField";
import { PasswordTextField } from "../../components/AuthFields/PasswordTextField";
import { isValidEmail } from "../../utils/index";
import { actions } from "../../redux/slices/Tennis/tennisSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://dylan.morison.io">
        Dylan Morison
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const isAuthenticated = useAppSelector((state) => state.User.isAuthenticated);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { resetTennisMatchesByDate } = actions;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    dispatch(resetTennisMatchesByDate());
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/tournaments" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <EmailTextField email={email} emailError={emailError} setEmail={setEmail} />
          <PasswordTextField password={password} setPassword={setPassword} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              if (!isValidEmail(email)) {
                setEmailError(true);
              } else {
                setEmailError(false);
                dispatch(signinUser(email, password));
              }
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink style={{ textDecoration: "none", color: "black" }} to="/signup">
                Already have an account?
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
