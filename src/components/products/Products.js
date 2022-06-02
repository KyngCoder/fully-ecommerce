import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Grid } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Product from './product/Product';
import useStyles from './styles';

const products = [
    {id:1, name:  'Shoes', description: 'Running Shoes',image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",price:'400'},
    {id:2, name: 'Macbook', description: 'Apple Macbook Pro',image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",price:'1200'},
]



const Products = () => {
    const classes = useStyles();
  return (
    <main className={classes.content}>
    <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
            {products.map((product => (
                <Grid item key={product.id} xs={12 } sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>
            )))}
        </Grid>
    </main>
  )
}

export default Products