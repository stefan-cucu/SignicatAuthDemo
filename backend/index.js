// Assignment backend
// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const app = express();
const port = 8080;

// Import client credentials from environment variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let accessToken = "";
let tokenType = "";
let expiresIn = 3600;

// Middleware
app.use(cors());
app.use(cookieParser());

// Interval to refresh access token
const getAccessToken = () => {
  axios
    .post(
      `https://api.signicat.io/oauth/connect/token`,
      "grant_type=client_credentials&scope=identify",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
      }
    )
    .then((response) => {
      accessToken = response.data.access_token;
      tokenType = response.data.token_type;
      expiresIn = parseInt(response.data.expires_in);
    });
  setTimeout(getAccessToken, expiresIn);
};
const tokenTimeout = setTimeout(getAccessToken, expiresIn);

// Routes
// Start a new session
app.get("/api/session", (req, res) => {
  axios
    .post(
      `https://api.signicat.io/identification/v2/sessions`,
      {
        flow: "redirect",
        allowedProviders: ["no_bankid_netcentric", "no_bankid_mobile"],
        include: ["name", "date_of_birth"],
        redirectSettings: {
          successUrl:
            "https://developer.signicat.io/landing-pages/identification-success.html",
          abortUrl:
            "https://developer.signicat.io/landing-pages/something-wrong.html",
          errorUrl:
            "https://developer.signicat.io/landing-pages/something-wrong.html",
        },
      },
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // If successful, redirect to signicat authentication page and create a cookie with the session id
      console.log(response.data.url);
      res.cookie("SignicatSessionId", response.data.id);
      res.redirect(response.data.url);
    })
    .catch((error) => {
      // If unsuccessful, return the error 
      res.send(error);
    });
});

// Get session
app.get("/api/session/:sessionId", (req, res) => {
  console.log(req.params.sessionId);
  axios
    .get(
      `https://api.signicat.io/identification/v2/sessions/${req.params.sessionId}`,
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
