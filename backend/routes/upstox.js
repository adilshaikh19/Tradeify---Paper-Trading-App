const express = require("express");
const router = express.Router();
require("dotenv").config();

const CLIENT_ID = process.env.FYERS_APP_ID;
const REDIRECT_URI = process.env.FYERS_REDIRECT_URI;

function generateAuthCodeUrl() {
  const authCodeUrl = `https://api.fyers.in/api/v2/generate-authcode?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&state=some_random_state_value`;
  return authCodeUrl;
}

// Endpoint to redirect the user to FYERS login for auth code generation
router.get("/login", (req, res) => {
  const authCodeUrl = generateAuthCodeUrl();
  res.redirect(authCodeUrl);
});


router.get("/callback", (req, res) => {
  const { code } = req.query; // Authorization code
  if (code) {
    console.log("Authorization Code:", code);
    res.send(
      "Authorization successful! Now you can use this code to request an access token."
    );
  } else {
    res.status(400).send("Authorization failed. No auth code returned.");
  }
});

module.exports = router;
