import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import axios from "axios";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const amount = Math.round(orderInfo.totalPrice * 100); // paise

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handlePayment = async () => {
    try {
      const { data: { razorpayKey } } = await axios.get("/api/v1/razorpaykey");
      const { data: { order: razorpayOrder } } = await axios.post(
        "/api/v1/payment/process",
        { amount }
      );

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Ecommerce Website",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          order.paymentInfo = {
            id: response.razorpay_payment_id,
            status: "succeeded",
          };

          dispatch(createOrder(order));
          history.push("/success");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999",
        },
        notes: {
          address: shippingInfo.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      alert.error(error.response?.data?.message || "Payment failed");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <button className="paymentFormBtn" onClick={handlePayment}>
          Pay ₹{orderInfo && orderInfo.totalPrice}
        </button>
      </div>
    </Fragment>
  );
};

export default Payment;
