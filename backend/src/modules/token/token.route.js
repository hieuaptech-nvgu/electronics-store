const express = require("express");
const router = express.Router();
const TokenController = require("./token.controller");

router.post("/refresh-token", TokenController.refreshAuthTokens);

module.exports = router;