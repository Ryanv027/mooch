require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

stripe.customers
  .create({
    email: "foo-customer@example.com",
    description: "Yo-Yo Ma's Mama's yo-yo, yo"
    // shipping: {
    //   address: "1526 India Street, San Diego, CA 92101"
    // }
  })
  .then(console.log(stripe.customers._stripe))
  .catch(error => {
    console.log(error);
  });
