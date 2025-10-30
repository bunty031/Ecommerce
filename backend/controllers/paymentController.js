const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: req.body.amount, // amount in paise
    currency: "INR",
    receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
  };

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.sendRazorpayApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    razorpayKey: process.env.RAZORPAY_KEY_ID,
  });
});
