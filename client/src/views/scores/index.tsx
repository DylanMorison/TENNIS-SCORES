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
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
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
}));

const LiveScores = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const Tennis = useAppSelector((state) => state.Tennis);
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(getTennisMatchesByDate("20211015"));
  }, [dispatch]);

  const renderTennisMatches = () => {
    if (!Tennis.matchesByDate) {
      return null;
    }

    return Tennis.matchesByDate.map(({ Sid, tournamentTitle, tournamentType }, index) => (
      <>
        <Grid md={3} sm={6} xs={12} key={index} item>
          <Card variant="outlined" key={index * 100} className={classes.Card}>
            <CardActionArea>
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
            </CardActions>
          </Card>
        </Grid>
      </>
    ));
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <form className={classes.datePickerContainer} noValidate>
        <TextField
          variant="outlined"
          id="date"
          label="Date"
          type="date"
          defaultValue="2021-05-24"
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
          debugger
          dispatch(getTennisMatchesByDate(date.trim().replace("-", "")));
        }}
      >
        <RefreshIcon />
      </Fab>
    </Container>
  );
};

export default LiveScores;
