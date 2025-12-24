import express from "express";
import {getEquipment,addEquipment,updateEquipment,deleteEquipment} from "../controllers/equipment.controller.js";

const router = express.Router();

router.get("/", getEquipment);
router.post("/", addEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;
