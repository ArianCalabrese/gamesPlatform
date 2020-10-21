const express = require("express");
const { check } = require("express-validator");

const serversController = require("../controllers/serversController");

const router = express.Router();

router.get("/", serversController.getServers);
router.get("/:sid", serversController.getServerById);
router.post(
  "/create",
  [check("name").not().isEmpty() /*check("maxplayers").*/],
  serversController.createServer
);
module.exports = router;
