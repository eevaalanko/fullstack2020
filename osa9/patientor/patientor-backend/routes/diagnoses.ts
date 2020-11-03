import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.get("/:id", (req, res) => {
  const diagnose = diagnoseService.findById(req.params.id);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { code, name, latin } = req.body;
  const newDiagnoseEntry = diagnoseService.addEntry(code, name, latin);
  res.json(newDiagnoseEntry);
});

export default router;
