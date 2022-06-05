import React from 'react'
import Review from './Review'
import {Typography,Button,Divider} from '@material-ui/core'
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { useNavigate } from 'react-router'

const PaymentForm = ({shippingData,checkoutToken,backStep,onCaptureCheckout,nextStep,handleEmptyCard}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

  const navigate = useNavigate()
  const handleSubmit = async(event,elements,stripe) => {
  event.preventDefault();
  if(!stripe || !elements) return;

  
  const cardElement = elements.getElement(CardElement);

  const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

  if (error) {
    alert('failed to send payment');
    
  } else {
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
      shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id,
        },
      },
    };

    onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();

    
  }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
              <CardElement />
                <br /> <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outlined" onClick={backStep}>Back</Button>
                  <Button variant="contained" disabled={!stripe} color="primary" type="submit">Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm