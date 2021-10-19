import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAppDispatch } from "../../redux/hooks";
import { actions } from "../../redux/slices/User/userSlice";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import { Link, useParams } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TimelineIcon from "@material-ui/icons/Timeline";
import "./index.css";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      zIndex: "auto",
    },
    paper: {
      marginRight: theme.spacing(12),
    },
  })
);

// {/* <Button
//   ref={anchorRef}
//   aria-controls={open ? "menu-list-grow" : undefined}
//   aria-haspopup="true"
//   onClick={handleToggle}
// >
//   Toggle Menu Grow
// </Button> */}

type MenuListCompositionProps = {
  anchorRef: React.RefObject<HTMLButtonElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export default function MenuListComposition(props: MenuListCompositionProps) {
  const { anchorRef, setOpen, open } = props;
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={`${classes.root} z`}>
      <div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to="/tournaments" style={{ textDecoration: "none" }}>
                      <MenuItem
                        onClick={handleClose}
                        selected={location.pathname === "/tournaments" && true}
                      >
                        <ListItemIcon>
                          <TimelineIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <Typography color="primary">Results</Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/live" style={{ textDecoration: "none" }}>
                      <MenuItem
                        onClick={handleClose}
                        selected={location.pathname === "/live" && true}
                      >
                        <ListItemIcon>
                          <LiveTvIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <Typography color="primary">Live</Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/live" style={{ textDecoration: "none" }}>
                      <MenuItem
                        onClick={(e) => {
                          dispatch(actions.signOutUser());
                          handleClose(e);
                        }}
                      >
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <Typography color="primary">Logout</Typography>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
