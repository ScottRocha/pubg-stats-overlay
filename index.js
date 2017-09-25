/* eslint-disable no-process-env */

const express = require("express");
const path = require("path");
const config = require("config");

const app = express();

// Set a flag stating that the app is ready
app.isReady = true;

if (config.env === "production") {

  const compression = require("compression");
  app.use(compression());

} else {

  // Set a flag stating that the app is not ready pending webpack compilation
  app.isReady = false;

  const webpack = require("webpack");

  // const WebpackDevServer = require("webpack-dev-server");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  compiler.plugin("done", () => {

    app.isReady = true;

  });

  app.use(require("webpack-dev-middleware")(compiler, {

    //  noInfo: true,
    "publicPath": webpackConfig.output.publicPath,
    "hot": true,

    //   historyApiFallback: true
  }));

}

// uncomment after placing your favicon in /public
// const favicon = require("serve-favicon");
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const logger = require("./handlers/logger");
logger.debug("Overriding \"Express\" logger");
app.use(require("morgan")("combined", { "stream": logger.stream }));

const methodOverride = require("method-override");
app.use(methodOverride());

// tell the app to parse HTTP body messages
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }));

const xFrameOptions = require("x-frame-options");
app.use(xFrameOptions());

const xXssProtection = require("x-xss-protection");
app.use(xXssProtection());

const xContentTypeOptions = require("dont-sniff-mimetype");
app.use(xContentTypeOptions());

const contentSecurityPolicy = require("helmet-csp");
app.use(contentSecurityPolicy({
  "directives": {
    "baseUri": ["'none'"],
    "defaultSrc": ["'self'"],
    "scriptSrc": [ "'self'", "'unsafe-inline'", "'unsafe-eval'", "cdnjs.cloudflare.com", "maxcdn.bootstrapcdn.com" ],
    "styleSrc": [ "'self'", "'unsafe-inline'", "fonts.googleapis.com", "maxcdn.bootstrapcdn.com" ],
    "fontSrc": [ "'self'", "fonts.gstatic.com", "maxcdn.bootstrapcdn.com" ],
    "imgSrc": [ "'self'", "data:" ],
    "sandbox": [ "allow-forms", "allow-same-origin", "allow-scripts" ],
    "objectSrc": ["'none'"],
  },
}));

// tell the app to look for static files in these directories
app.use("/", express.static(path.join(__dirname, "/server/static/")));
app.use("/dist", express.static(path.join(__dirname, "/client/dist/")));

const mongodb = require("./handlers/mongodb")(logger);

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API routes
const apiRoutes = require("./server/routes/api")(mongodb);
app.use("/api", upload.fields([]), apiRoutes);

const cors = require("cors");
app.use(cors());

app.get("*", (req, res) => {

  res.sendFile(path.join(__dirname, "/client/dist/", "index.html"));

});

// start the server
const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => {

  logger.info((config.env === "production" ? "Production" : "Development") + " Express server running on port " + PORT);

});

module.exports = app;
