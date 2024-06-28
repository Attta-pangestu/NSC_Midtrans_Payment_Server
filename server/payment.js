const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint untuk handle payment
app.post("/create-transaction", async (req, res) => {
  const orderId = "order-id-dummy";
  const grossAmount = 100000; // contoh jumlah nominal

  const transactionDetails = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
