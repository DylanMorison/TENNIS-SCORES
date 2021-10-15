import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, styled } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import TimerIcon from "@material-ui/icons/Timer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const LogoButton = styled(Button)({
  border: 0,
  borderRadius: 3,
  color: "white",
  height: 48,
  padding: "30px 30px",
  textTransform: "uppercase",
});

const LogoIcon = styled(WhatshotIcon)({
  width: 40,
  height: 40,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    logoButtonHover: {
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
    tabs: {
      marginLeft: "50px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    authButtons: {
      marginLeft: "auto",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const User = useAppSelector((state) => state.User);

  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const CustomAppBar = styled(AppBar)({
    backgroundColor: theme.palette.background.paper,
  });

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to={`${User.isAuthenticated ? "/" : "/"}`} style={{ textDecoration: "none" }}>
            <LogoButton
              disableFocusRipple
              startIcon={<LogoIcon />}
              className={classes.logoButtonHover}
            >
              <Typography variant="h6">TENNIS SCORES</Typography>
            </LogoButton>
          </Link>

          <div className={classes.authButtons}>
            <ButtonGroup>
              {User.isAuthenticated ? //   logout // <Button color="secondary" onClick={() => dispatch(actions.logout())}>
              // </Button>
              null : (
                <ButtonGroup>
                  <Button component={Link} to="/signin" color="secondary">
                    login
                  </Button>
                  <Button component={Link} to="/signup" color="secondary">
                    signup
                  </Button>
                </ButtonGroup>
              )}
            </ButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );

  // return (
  //   <div className={classes.root}>
  //     <AppBar position="static" className={classes.AppBar}>
  //       <Toolbar disableGutters>
  //         <IconButton
  //           edge="start"
  //           className={classes.menuButton}
  //           color="inherit"
  //           aria-label="menu"
  //           component={Link}
  //           to="/"
  //           onClick={(e: React.MouseEvent) => {
  //             handleChange(e, 0);
  //           }}
  //         >
  //           <Typography variant="button" className={classes.menuText}>
  //             Tennis Scores App
  //           </Typography>
  //         </IconButton>
  //         <LogoButton
  //           disableFocusRipple
  //           startIcon={<LogoIcon />}
  //           className={classes.logoButtonHover}
  //         >
  //           <Typography variant="h6">Drooper Trivia</Typography>
  //         </LogoButton>
  //         {/* {User.isAuthenticated ? null : (
  //           <>
  //             <Tabs className={classes.tabs} value={value} onChange={handleChange}>
  //               <Tab
  //                 label="REGISTER"
  //                 component={Link}
  //                 to="/signup"
  //                 disableRipple
  //                 classes={{
  //                   selected: classes.selectedTab,
  //                 }}
  //               />
  //               <Tab
  //                 label="LOGIN"
  //                 component={Link}
  //                 to="/signin"
  //                 disableRipple
  //                 classes={{
  //                   selected: classes.selectedTab,
  //                 }}
  //               />
  //             </Tabs>
  //           </>
  //         )} */}
  //       </Toolbar>
  //     </AppBar>
  //   </div>
  // );
};

export default Navbar;
