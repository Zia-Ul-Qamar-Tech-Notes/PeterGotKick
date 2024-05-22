const express = require("express");
const app = express();
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const path = require("path");

// Serve static files (images)
app.use("/Images", express.static(path.join(__dirname, "Images")));

// Define route for fetching product prices
app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  sneaks.getProductPrices(productId, function (err, product) {
    if (err) {
      console.error("Error getting product prices:", err);
      res.status(500).send(`Error getting product prices: ${err.message}`);
    } else {
      // Get the price values
      const stockXPrice = product.lowestResellPrice.stockX;
      const goatPrice = product.lowestResellPrice.goat;
      const flightClubPrice = product.lowestResellPrice.flightClub;

      res.send(`
        <html>
          <head>
            <title>Product Prices</title>
          </head>
          <body>
            <h1>Product Prices</h1>
            <img src="/Images/sneakers/jordan1chicago.jpg">
            <p>StockX Price: ${stockXPrice}+</p>
            <p>Goat Price: ${goatPrice}+</p>
            <p>Flight Club Price: ${flightClubPrice}+</p>
          </body>
        </html>
      `);
    }
  });
});

// Serve your index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
