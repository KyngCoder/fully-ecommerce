import React from 'react'
import {AppBar, Toolbar,IconButton,MenuItem,Badge,Typography} from '@material-ui/core'

import {ShoppingCart} from '@material-ui/icons'
import { ClassNames } from '@emotion/react'

import useStyles from './styles'
import logo from '../../assets/kyngcoder.png'

const Navbar = ({totalItems}) => {
    const classes = useStyles()

  return(
   <>
       <AppBar position="fixed" className={ClassNames.appBar} color="inherit">
        <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
                <img src={logo} alt="kyngcoder" height="36px" className={classes.image} />
                Kyngcoders
            </Typography>
            <div className={classes.grow} />
            <div className={classes.button} >
                <IconButton color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </div>
        </Toolbar>
        </AppBar>
   </>
  )
}

export default Navbar