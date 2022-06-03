import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Grid } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Product from './product/Product';
import useStyles from './styles';





const Products = ({products,handleAddToCart}) => {
    const classes = useStyles();
  return (
    <main className={classes.content}>
    <div className={classes.toolbar} />
        <Grid container justifyContent="center" spacing={4}>
            {products.map((product => (
                <Grid item key={product.id} xs={12 } sm={6} md={4} lg={3}>
                    <Product product={product} handleAddToCart={handleAddToCart} />
                </Grid>
            )))}
        </Grid>
    </main>
  )
}

export default Products