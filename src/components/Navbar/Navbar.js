import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Badge,
  Typography,
} from "@material-ui/core";

import { ShoppingCart } from "@material-ui/icons";
import { ClassNames } from "@emotion/react";

import useStyles from "./styles";
import logo from "../../assets/kyngcoder.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={ClassNames.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            <img
              src={logo}
              alt="kyngcoder"
              height="36px"
              className={classes.image}
            />
            Kyngcoders
          </Typography>

          <div className={classes.grow} />
          {location.pathname ==="/" &&(
              <div className={classes.button}>
                <IconButton color="inherit">
                  <Badge badgeContent={totalItems} color="secondary">
                    <Link to="/cart">
                      <ShoppingCart />
                    </Link>
                  </Badge>
                </IconButton>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
