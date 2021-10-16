import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getTennisMatchesByDate } from "../../redux/slices/Tennis/tennisThunk";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Grid,
  styled,
  Card,
  useTheme,
  CardActionArea,
  CardActions,
  Container,
  makeStyles,
  CardContent,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Fab,
  TextField,
  Collapse,
  Divider,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10px",
  },
  header: {
    height: 300,
    background: "#dfdfdf",
  },
  Card: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: "auto",
    textAlign: "center",
    "&:hover": {
      cursor: "auto",
    },
  },
  CustomCardAction: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    textAlign: "center",
    padding: 0,
    margin: 0,
  },
  cardActionBtn: {
    marginLeft: "auto",
  },
  CardActions: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    textAlign: "center",
    padding: 0,
    margin: 0,
    height: "30px",
  },
  DateFAB: {
    position: "fixed",
    right: "2%",
    bottom: "2%",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  datePickerContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "20px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const initDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`;
};

const LiveScores = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const Tennis = useAppSelector((state) => state.Tennis);
  const User = useAppSelector((state) => state.User);
  const [date, setDate] = useState(initDate());
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(getTennisMatchesByDate(date));
  }, []);

  const renderTennisMatches = () => {
    if (!Tennis.matchesByDate) {
      return null;
    }

    if (!User.isAuthenticated) {
      return <Redirect to="/signin" />;
    }

    return Tennis.matchesByDate.map(
      ({ Sid, tournamentTitle, tournamentType, events }, index) => (
        <>
          <Grid md={4} sm={6} xs={12} key={index} item>
            <Card variant="outlined" key={index * 100} className={classes.Card}>
              <CardActionArea style={{ height: "140px" }}>
                <CardContent>
                  <Button
                    fullWidth
                    variant="text"
                    size="large"
                    style={{ textTransform: "none", color: "black" }}
                    disableRipple
                    disableFocusRipple
                    disabled
                  >
                    {tournamentTitle}
                  </Button>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {tournamentType}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.CardActions}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginLeft: "20px" }}
                >
                  Sid: {Sid}
                </Typography>
                <IconButton
                  style={{ marginLeft: "auto" }}
                  disableFocusRipple
                  disableRipple
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                style={{ minHeight: "380px" }}
              >
                <CardContent>
                  <Typography paragraph>Results:</Typography>
                  <Divider />

                  {events.map((event) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        key={event.Eid}
                        align="left"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {event.results.score}
                      </Typography>
                      <Divider />
                    </>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </>
      )
    );
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <form className={classes.datePickerContainer} noValidate>
        <TextField
          variant="outlined"
          id="date"
          label="Date"
          type="date"
          value={date}
          className={classes.textField}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <Grid container spacing={3}>
        {renderTennisMatches()}
      </Grid>
      <Fab
        className={classes.DateFAB}
        onClick={() => {
          debugger;
          if (!date) {
            alert("please select a valid date");
            return;
          }
          dispatch(getTennisMatchesByDate(date.trim().replace("-", "")));
        }}
      >
        <RefreshIcon />
      </Fab>
    </Container>
  );
};

export default LiveScores;
