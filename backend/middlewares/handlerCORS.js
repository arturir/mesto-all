const router = require("express").Router();

const allowedCors = [
  "https://gosu.nomoredomainsmonster.ru",
  "https://api.gosu.nomoredomainsmonster.ru",
  "http://gosu.nomoredomainsmonster.ru",
  "https://api.gosu.nomoredomainsmonster.ru",
  "http://localhost:3000"
];

router.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE,NEWMETHOD";
  const requestHeaders = req.headers["access-control-request-headers"];
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

module.exports = router;
