const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require('csurf');

const routes = require('./routes');
const { environment } = require("./config");

const isProduction = environment === "production";

const app = express();

app.use(cors());

app.use(
    helmet.crossOriginResourcePolicy({ 
      policy: "cross-origin" 
    })
  );
  
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());


app.use(csrf({ cookie: true }))

app.use(routes);

module.exports = app;