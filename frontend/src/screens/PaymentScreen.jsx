import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { SavePaymentMethod } from "../slices/cartSlice";

/**
 * The default payment method is set to PayPal for development purposes.
 * This component is designed to allow easy addition of other payment methods, any other local payment options.
 */
const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Redirect to shipping if no address is provided
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  // State to hold the selected payment method, defaulting to PayPal
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  /**
   * Handles form submission to save the selected payment method
   * @param {Event} e - The form submission event
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SavePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
