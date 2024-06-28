// File: api/payment.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());

app.post("/api/payment", async (req, res) => {
  const { order_id, gross_amount } = req.body;

  const transactionDetails = {
    transaction_details: {
      order_id,
      gross_amount,
    },
  };

  try {
    const midtransResponse = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      transactionDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic " +
            Buffer.from("SB-Mid-server-SS8AIdrIFyMHqE4oFTHrZehP").toString(
              "base64"
            ),
        },
      }
    );

    res.json(midtransResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = app;
