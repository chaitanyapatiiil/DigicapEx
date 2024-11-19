const express = require("express");
const coincapController = require("../controllers/coincapController")


const router = express.Router();

router.get("/crypto", coincapController.getCryptoData)

module.exports = router