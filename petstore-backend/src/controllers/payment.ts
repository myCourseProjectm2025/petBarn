import axios from "axios";
import { initPaymentSessionWithClickPay } from "../model/payment";

const createPayment = async (req: any, res: any) => {
  const {
    booking_id,
    payment_status,
    transaction_id,
    payment_method,
    amount,
    payment_gateway,
  } = req.body;
  const payment = await initPaymentSessionWithClickPay({
      booking_id,
      payment_status,
      transaction_id,
      payment_method,
      amount,
      payment_gateway,
    });
    console.log('payment :>> ', payment);
  const paymentData = {
    "profile_id": 46145,
    "tran_type": "sale",
    "tran_class": "ecom" ,
    "cart_id":"4244b9fd-c7e9-4f16-8d3c-4fe7das248ca",
    "cart_description": "Dummy Order 35925502061445345",
    "cart_currency": "JOD",
    "cart_amount": 46.17,
    "return": "http://localhost:8080/payment/payment-callback"
  };
  const result =  await axios.post(process.env.PAYMENT_API_URL || '',paymentData)
  res.status(200).json(result.data);
};

const paymentCallback = async (req: any, res: any) => {
  console.log('req.body :>> ', req.body);
  /*
  return data from payment gateway
 {
  tran_ref: 'TST2506800290545',
  merchant_id: 4974,
  profile_id: 46145,
  cart_id: '4244b9fd-c7e9-4f16-8d3c-4fe7ess248ca',
  cart_description: 'Dummy Order 35925502061445345',
  cart_currency: 'JOD',
  cart_amount: '46.170',
  tran_currency: 'JOD',
  tran_total: '46.170',
  tran_type: 'Sale',
  tran_class: 'ECom',
  customer_details: {
    name: 'Mousa Ibrahim',
    email: 'mousakibrahim@gmail.com',
    street1: 'Alquesmeh',
    city: 'Amman',
    state: 'IR',
    country: 'JO',
    zip: 'N/A',
    ip: '94.249.81.246'
  },
  payment_result: {
    response_status: 'A',
    response_code: 'G56338',
    response_message: 'Authorised',
    acquirer_ref: 'TRAN0301.67CE0A72.005E227F',
    cvv_result: ' ',
    avs_result: ' ',
    transaction_time: '2025-03-09T21:38:58Z'
  },
  payment_info: {
    payment_method: 'Visa',
    card_type: 'Credit',
    card_scheme: 'Visa',
    payment_description: '4000 00## #### 0002',
    expiryMonth: 1,
    expiryYear: 2030
  },
  ipn_trace: 'IPNS0301.67CE0A72.005A22E6'
}

  */
  res.status(200).json(req);
};

export { createPayment, paymentCallback };
