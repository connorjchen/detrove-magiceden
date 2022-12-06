import express from "express";
import { addEmail } from "../services/landingServices.js";

const router = express.Router();

router.post("/email", async function (req, res) {
  const { email } = req.body;
  await addEmail(email, req, res);
});

export default router;
