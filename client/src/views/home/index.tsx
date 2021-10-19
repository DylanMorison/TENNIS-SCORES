import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Grid, Typography } from "@material-ui/core";
import homePic from "../../assets/t1.png";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${homePic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
  homeInfo: {
    width: "25%",
    marginRight: "45px",
  },
  border: {
    border: "2px solid red",
  },
}));

const Home = () => {
  const classes = useStyles();
  const User = useAppSelector((state) => state.User);

  const authHome = (
    <ButtonGroup fullWidth>
      <Button variant="contained" color="secondary" component={Link} to="/tournaments">
        Past Results
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/live">
        Live Matches
      </Button>
    </ButtonGroup>
  );

  const guestHome = (
    <Typography variant="h4" color="secondary">
      Welcome :)
    </Typography>
  );

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-end"
        direction="column"
        className={`${classes.root}`}
      >
        <Grid justifyContent="center" className={`${classes.homeInfo}`}>
          <Grid item>
            <Typography variant="h4" align="center"></Typography>
          </Grid>
          <Grid item justifyContent="center">
            {User.isAuthenticated ? authHome : guestHome}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
