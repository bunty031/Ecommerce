import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  const generateBill = () => {
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 30);
    doc.text(`Customer: ${order.user?.name || "N/A"}`, 14, 40);
    doc.text(`Phone: ${order.shippingInfo?.phoneNo || "N/A"}`, 14, 50);
    doc.text(
      `Address: ${
        order.shippingInfo
          ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}`
          : "N/A"
      }`,
      14,
      60
    );
    doc.text(`Payment ID: ${order.paymentInfo?.id || "N/A"}`, 14, 70);
    doc.text(
      `Payment Status: ${
        order.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"
      }`,
      14,
      80
    );

    const items = order.orderItems?.map((item) => [
      item.name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.price * item.quantity}`,
    ]);

    autoTable(doc, {
      startY: 90,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: items || [],
    });

    doc.text(
      `Total Amount: ₹${order.totalPrice?.toFixed(2) || 0}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`Invoice_${order._id}.pdf`);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>

              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                {order.paymentInfo && order.paymentInfo.id && (
                  <div>
                    <p>Payment ID:</p>
                    <span>{order.paymentInfo.id}</span>
                  </div>
                )}

                <div>
                  <p>Amount:</p>
                  <span>₹{order.totalPrice && order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* ✅ Download Button at the End */}
            <div className="downloadInvoiceSection">
              <button onClick={generateBill} className="downloadInvoiceBtn">
                Download Invoice
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
