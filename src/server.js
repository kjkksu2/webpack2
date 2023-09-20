const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");

const app = express();

if (process.env.NODE_ENV === "dev") {
  console.log("development mode");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const configuration = require("../webpack/webpack.dev.config");
  const webpack = require("webpack");
  const webpackCompiler = webpack(configuration);

  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  );

  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));
}

app.use("/", expressStaticGzip(path.join(__dirname, "../dist")));
app.get("/", (req, res) => {
  const absolutePathToHtmlFile = path.join(__dirname, "../dist/index.html");
  res.sendFile(absolutePathToHtmlFile);
});

app.listen(3000, () => console.log("Listening on port 3000"));
