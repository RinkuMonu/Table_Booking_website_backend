const express = require("express");
const router = express.Router();
const slotController = require("../Controllers/slotController");

router.post("/", slotController.createSlotSet);

router.get("/business/:businessId", slotController.getAllSlotSets); 

router.get("/:id", slotController.getSlotSetById);

router.put("/:id", slotController.updateSlotSet);

router.delete("/:id", slotController.deleteSlotSet);

router.patch("/:id/times", slotController.updateDayTimes);

module.exports = router;