import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

const AddressForm = ({checkoutToken,next}) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const fetchShippingCountries = async (checkOutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkOutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
 

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  },[]) 

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data)=> next({...data,shippingCountry,shippingCountries,shippingSubdivision,shippingOption}))}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="First name"
                {...register("First name", { required: true, maxLength: 80 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Last name"
                {...register("Last name", { required: true, maxLength: 100 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Address"
                {...register("Address", {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="City"
                {...register("city", {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Zip/Postal code"
                {...register("Zip/Postal code", {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Email"
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
