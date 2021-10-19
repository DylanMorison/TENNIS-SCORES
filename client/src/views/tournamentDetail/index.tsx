import React from "react";
import { Redirect, RouteComponentProps, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  Grid,
  makeStyles,
  Typography,
  Divider,
  Paper,
  List,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridItem: {
    // height: "100vh",
  },
  paper: {
    width: "90%",
    textAlign: "center",
    margin: "auto",
    borderRadius: "8px",
  },
  mainTopPaper: {
    marginTop: "25px",
  },
  mainBottomPaper: {
    // height: "63%",
    marginTop: "45px",
  },
  mainBottomPaperDiv: {
    // border: "1px solid red",
    height: "75%",
    flexWrap: "wrap",
    marginTop: "30px",
    margin: "auto",
  },
  sidePaper: {
    height: "calc(70% + 45px)",
    marginTop: "25px",
  },
  btn: {
    borderRadius: "8px",
  },
  time: {
    margin: "auto",
  },
}));

type paramType = {
  Sid: string;
};

type propType = {
  Sid: string;
} & RouteComponentProps;

const TournamentDetail = (props: propType) => {
  const classes = useStyles();
  const params: paramType = useParams();
  const Tennis = useAppSelector((state) => state.Tennis);
  const User = useAppSelector((state) => state.User);

  if (!User.isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  let tournament;
  if (!!Tennis.matchesByDate) {
    tournament = Tennis.matchesByDate.find((tournament) => {
      if (tournament.Sid === params.Sid) {
        return tournament;
      }
    });
  } else {
    return <Redirect to="/tournaments" />;
  }

  const title = tournament?.tournamentTitle;
  const type = tournament?.tournamentType;
  const events = tournament?.events;

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        {/* <Grid item xs className={classes.gridItem}>
          <Paper className={`${classes.paper} ${classes.sidePaper}`}>
            Schedule of Play
            <Divider />
            <List>
              <ListItemText>Match1</ListItemText>
              <ListItemText>Match2</ListItemText>
              <ListItemText>Match3</ListItemText>
              <ListItemText>etc...</ListItemText>
            </List>
          </Paper>
        </Grid> */}
        <Grid item sm={8} xs={12} className={classes.gridItem}>
          <Paper className={`${classes.paper} ${classes.mainTopPaper}`}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2" paragraph>
              {type}
            </Typography>
          </Paper>
          <Paper className={`${classes.paper} ${classes.mainBottomPaper}`}>
            <div className={classes.mainBottomPaperDiv}>
              <Typography variant="body1">Matches Completed </Typography>
              <Divider />
              {events!.map((event) => (
                <Typography key={event.Eid}>{event.results.score}</Typography>
              ))}
            </div>
          </Paper>
        </Grid>
        {/* <Grid item xs className={classes.gridItem}>
          <Paper className={`${classes.paper} ${classes.sidePaper}`}>
            Live Matches
            <Divider />
            <List>
              <ListItemText>Match1</ListItemText>
              <ListItemText>Match2</ListItemText>
              <ListItemText>Match3</ListItemText>
              <ListItemText>etc...</ListItemText>
            </List>
          </Paper>
        </Grid> */}
      </Grid>
    </>
  );
};

export default TournamentDetail;
