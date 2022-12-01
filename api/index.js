const express = require("express");
const cors = require("cors");

const products = require("./products"); 
const app = express();
const stripe = require('stripe')('sk_test_51M9V0UCoUrOC4mQYF9JdoDOoZrcZ5BSXKfUTJCMkDkpMedvcADLtuN9nRwAwbL39bIQpu4CzKby0xNPomsXof8GG000zi8gTr4');

// Middleware
app.use(express.json()); 
app.use(cors());
app.use(express.static("public"));

app.get("/", (res) => {
  res.send("This is an online shop API for testing...");
});

// Send to the frontend.
app.get("/products", (req, res) => {
  res.send(products);
});

// Stripe checkout session.
app.post("/checkout", async (req, res ) => {

  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];

  items.forEach((items) => {
    lineItems.push(
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: items.name,
            images: [items.image],
            description: items.desc,
            metadata: {
              id: items.id,
            },
          },
          unit_amount: items.price*200,
        },
        quantity: items.productQuantity,
      },
    );
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "TR"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: lineItems,
    mode: 'payment',
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.send(JSON.stringify({ 
    url: session.url,
  }));

});

const port = process.env.PORT || 4000;

app.listen(port, console.log(`This server is running on the port number ${port}...`));